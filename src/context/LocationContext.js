import createDataContext from "./createDataContext";
import { calculateDistance } from "../utils/calculateDistance";
import serverInstance from "../apis/server";

import { calc } from "../utils/runningMET";

const ADD_CURRENT_LOCATION = "ADD_CURRENT_LOCATION";
const ADD_LOCATION = "ADD_LOCATION";
const START_RUNNING = "START_RUNNING";
const STOP_RUNNING = "STOP_RUNNING";
const SET_TIME = "SET_TIME";
const SET_DISTANCE = "SET_DISTANCE";
const SET_BURNED_CALORIES = "SET_BURNED_CALORIES";
const GRANT_PERMISSIONS = "GRANT_PERMISSIONS";
const REJECT_PERMISSIONS = "REJECT_PERMISSIONS";
const RESET_STATS = "RESET_STATS";

const locationReducer = (state, action) => {
  switch (action.type) {
    case ADD_CURRENT_LOCATION:
      return { ...state, currentLocation: action.payload };
    case ADD_LOCATION:
      return { ...state, locations: [...state.locations, action.payload] };
    case START_RUNNING:
      return { ...state, running: true };
    case SET_TIME:
      return { ...state, runningTime: state.runningTime + 1 };
    case STOP_RUNNING:
      return { ...state, running: false };
    case SET_DISTANCE:
      const length = state.locations.length;
      if (length > 1) {
        const { locations } = state;

        const {
          coords: { latitude: lat1, longitude: lon1 },
        } = locations[length - 1];
        const {
          coords: { latitude: lat2, longitude: lon2 },
        } = locations[length - 2];
        let additionalDistance = calculateDistance(lat1, lon1, lat2, lon2);
        const timeDiff = state.runningTime - state.lastTimeMeasurement;
        let averageSpeed = 0;
        // timeDiff != 0
        if (timeDiff) {
          averageSpeed = (additionalDistance * 3.6) / timeDiff;
        } else {
          averageSpeed = additionalDistance * 3.6;
        }

        let distance = state.distance + additionalDistance;
        distance = parseFloat(distance.toFixed(2));

        // THESE STATS ALWAYS EXIST TOGETHER SO ALL I NEED TO DO IS TO CHECK
        // ONLY ONE OF THEM
        const { gender, age, height, weight } = action.payload.user;
        let burnedCalories;
        if (gender) {
          const value = gender === "male" ? 5 : -161;
          const BMR = 9.99 * weight + 6.25 * height - 4.92 * age + value;

          const MET = calc(averageSpeed);
          burnedCalories = (BMR * MET * (timeDiff / 3600)) / 24;
        }

        if (burnedCalories) {
          return {
            ...state,
            distance,
            lastTimeMeasurement: state.runningTime,
            burnedCalories: state.burnedCalories + burnedCalories,
          };
        }
        return {
          ...state,
          distance,
        };
      }
      return { ...state };
    case SET_BURNED_CALORIES:
      return { ...state };
    case RESET_STATS:
      return {
        ...state,
        locations: [],
        lastTimeMeasurement: 0,
        runningTime: 0,
        distance: 0,
        burnedCalories: 0,
        averageSpeed: 0,
      };
    case GRANT_PERMISSIONS:
      return { ...state, permissions: true };
    case REJECT_PERMISSIONS:
      return { ...state, permissions: false };
    default:
      return state;
  }
};

const resetStats = (dispatch) => {
  return () => {
    dispatch({
      type: RESET_STATS,
    });
  };
};
const uploadRoute = (dispatch) => {
  return async ({ token, runningTime, distance, burnedCalories, route }) => {
    runningTime = parseInt(runningTime);
    distance = parseFloat(distance.toFixed(2));
    burnedCalories = parseFloat(burnedCalories.toFixed(1));

    let averageSpeed = (distance * 36) / (10 * runningTime);
    averageSpeed = parseFloat(averageSpeed.toFixed(2));

    try {
      await serverInstance.post(
        "/users/statistics",
        {
          totalTime: runningTime,
          distance,
          caloriesBurned: burnedCalories,
          averageSpeed,
          route,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log(error.response.data);
    }
  };
};
const setTime = (dispatch) => {
  return () => {
    dispatch({
      type: SET_TIME,
    });
  };
};
const grantPermissions = (dispatch) => {
  return () => {
    dispatch({
      type: GRANT_PERMISSIONS,
    });
  };
};
const rejectPermissions = (dispatch) => {
  return () => {
    dispatch({
      type: REJECT_PERMISSIONS,
    });
  };
};
const startRunning = (dispatch) => {
  return () => {
    dispatch({
      type: START_RUNNING,
    });
  };
};
const stopRunning = (dispatch) => {
  return () => {
    dispatch({
      type: STOP_RUNNING,
    });
  };
};
const addLocation = (dispatch) => {
  return (location, running, user) => {
    dispatch({
      type: ADD_CURRENT_LOCATION,
      payload: location,
    });

    if (running) {
      // TO UPDATE LOCATIONS
      dispatch({
        type: ADD_LOCATION,
        payload: location,
      });
      // TO UPDATE DISTANCE
      dispatch({
        type: SET_DISTANCE,
        payload: { location, user },
      });
    }
  };
};

export const { Provider, Context } = createDataContext(
  locationReducer,
  {
    addLocation,
    startRunning,
    stopRunning,
    setTime,
    grantPermissions,
    rejectPermissions,
    uploadRoute,
    resetStats,
  },
  {
    permissions: null,
    running: false,
    locations: [],
    currentLocation: null,
    lastTimeMeasurement: 0,
    runningTime: 0,
    distance: 0,
    burnedCalories: 0,
    averageSpeed: 0,
  }
);
