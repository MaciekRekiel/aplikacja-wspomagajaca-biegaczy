import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getCurrentPositionAsync,
  Accuracy,
  reverseGeocodeAsync,
} from "expo-location";

import { calculateDistance } from "../utils/calculateDistance";
import createDataContext from "./createDataContext";
import serverInstance from "../apis/server";

const SET_EVENTS = "SET_EVENTS";
const CLEAR_EVENTS = "CLEAR_EVENTS";
const SET_RECOMMENDED = "SET_RECOMMENDED";
const SET_MY_EVENTS = "SET_MY_EVENTS";
const ADD_LOADING = "ADD_LOADING";
const REMOVE_LOADING = "REMOVE_LOADING";
const EVENT_FINISHED = "EVENT_FINISHED";
const RESET_EVENT_FINISHED = "RESET_EVENT_FINISHED";
const SIGN_OUT = "SIGN_OUT";

const eventReducer = (state, action) => {
  switch (action.type) {
    case SIGN_OUT:
      return {
        events: [],
        recommendedEvents: [],
        myEvents: [],
        loading: false,
        eventFinished: false,
      };
    case SET_EVENTS:
      return { ...state, events: [...action.payload] };
    case CLEAR_EVENTS:
      return { ...state, events: [] };
    case SET_RECOMMENDED:
      return { ...state, recommendedEvents: [...action.payload] };
    case SET_MY_EVENTS:
      return { ...state, myEvents: [...action.payload] };
    case ADD_LOADING:
      return { ...state, loading: true };
    case REMOVE_LOADING:
      return { ...state, loading: false };
    case EVENT_FINISHED:
      return { ...state, eventFinished: true };
    case RESET_EVENT_FINISHED:
      return { ...state, eventFinished: false };
  }
};

const signOut = (dispatch) => {
  return () => {
    dispatch({
      type: SIGN_OUT,
    });
  };
};
const searchForEvents = (dispatch) => {
  return async (query) => {
    if (query.name) {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await serverInstance.get("/events", {
          params: {
            ...query,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch({
          type: SET_EVENTS,
          payload: response.data || [],
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      dispatch({
        type: SET_EVENTS,
        payload: [],
      });
    }
  };
};
const clearEvents = (dispatch) => {
  return () => {
    dispatch({
      type: CLEAR_EVENTS,
    });
  };
};
const searchForRecommended = (dispatch) => {
  return async (currentLocation) => {
    try {
      dispatch({
        type: ADD_LOADING,
      });
      const token = await AsyncStorage.getItem("token");
      let location, response;
      if (!currentLocation) {
        response = await getCurrentPositionAsync({
          accuracy: Accuracy.BestForNavigation,
        });
        location = {
          latitude: response.coords.latitude,
          longitude: response.coords.longitude,
        };
      } else {
        location = {
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        };
      }
      response = await reverseGeocodeAsync(location);
      const query = {
        city: response[0].city,
      };
      response = await serverInstance.get("/events", {
        params: {
          ...query,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({
        type: SET_RECOMMENDED,
        payload: response.data || [],
      });
      dispatch({
        type: REMOVE_LOADING,
      });
    } catch (error) {
      dispatch({
        type: REMOVE_LOADING,
      });
      console.log(error);
    }
  };
};
const searchForMyEvents = (dispatch) => {
  return async () => {
    try {
      dispatch({
        type: ADD_LOADING,
      });
      const token = await AsyncStorage.getItem("token");
      const response = await serverInstance.get("/users/events", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: SET_MY_EVENTS,
        payload: response.data || [],
      });
      dispatch({
        type: REMOVE_LOADING,
      });
    } catch (error) {
      dispatch({
        type: REMOVE_LOADING,
      });
      console.log(error);
    }
  };
};
const joinEvent = (dispatch) => {
  return async (id, loadUser) => {
    try {
      dispatch({
        type: ADD_LOADING,
      });
      const token = await AsyncStorage.getItem("token");
      await serverInstance.post(
        `/events/${id}/join`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // UPDATE MY EVENTS
      const response = await serverInstance.get("/users/events", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: SET_MY_EVENTS,
        payload: response.data || [],
      });

      // REFREST USER AUTH CONTEXT
      await loadUser();
      dispatch({
        type: REMOVE_LOADING,
      });
    } catch (error) {
      dispatch({
        type: REMOVE_LOADING,
      });
      console.log(error.response.message);
    }
  };
};
const leaveEvent = (dispatch) => {
  return async (id, loadUser) => {
    try {
      dispatch({
        type: ADD_LOADING,
      });
      const token = await AsyncStorage.getItem("token");
      await serverInstance.delete(`/events/${id}/leave`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // UPDATE MY EVENTS
      const response = await serverInstance.get("/users/events", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: SET_MY_EVENTS,
        payload: response.data || [],
      });

      // REFREST USER AUTH CONTEXT
      await loadUser();
      dispatch({
        type: REMOVE_LOADING,
      });
    } catch (error) {
      dispatch({
        type: REMOVE_LOADING,
      });
      console.log(error);
    }
  };
};
const doesFinishedEvent = (dispatch) => {
  return (currentDistance, eventDistance, currentCoords, finishCoords) => {
    let distanceBetweenPoints = calculateDistance(
      currentCoords.coords.latitude,
      currentCoords.coords.longitude,
      finishCoords.coords.latitude,
      finishCoords.coords.longitude
    );
    if (distanceBetweenPoints < 20 && currentDistance > eventDistance * 0.9) {
      dispatch({
        type: EVENT_FINISHED,
      });
    }
  };
};
const resetFinishedEvent = (dispatch) => {
  return () => {
    dispatch({
      type: RESET_EVENT_FINISHED,
    });
  };
};

export const { Provider, Context } = createDataContext(
  eventReducer,
  {
    searchForEvents,
    clearEvents,
    searchForRecommended,
    searchForMyEvents,
    joinEvent,
    leaveEvent,
    doesFinishedEvent,
    resetFinishedEvent,
    signOut,
  },
  {
    events: [],
    recommendedEvents: [],
    myEvents: [],
    loading: false,
    eventFinished: false,
  }
);
