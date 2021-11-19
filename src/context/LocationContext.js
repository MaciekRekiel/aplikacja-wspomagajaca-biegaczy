import createDataContext from "./createDataContext";
import { calculateDistance } from "../utils/calculateDistance";

const ADD_CURRENT_LOCATION = "ADD_CURRENT_LOCATION";
const ADD_LOCATION = "ADD_LOCATION";
const START_RUNNING = "START_RUNNING";
const STOP_RUNNING = "STOP_RUNNING";
const SET_TIME = "SET_TIME";
const SET_DISTANCE = "SET_DISTANCE";
const GRANT_PERMISSIONS = "GRANT_PERMISSIONS";
const REJECT_PERMISSIONS = "REJECT_PERMISSIONS";

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
        const additionalDistance = calculateDistance(lat1, lon1, lat2, lon2);
        return { ...state, distance: state.distance + additionalDistance };
      }
      return { ...state };
    case GRANT_PERMISSIONS:
      return { ...state, permissions: true };
    case REJECT_PERMISSIONS:
      return { ...state, permissions: false };
    default:
      return state;
  }
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
  return (location, running) => {
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
        payload: location,
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
  },
  {
    permissions: null,
    running: false,
    locations: [],
    currentLocation: null,
    runningTime: 0,
    distance: 0,
  }
);
