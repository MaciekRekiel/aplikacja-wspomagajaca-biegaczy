import createDataContext from "./createDataContext";

const ADD_CURRENT_LOCATION = "ADD_CURRENT_LOCATION";
const ADD_LOCATION = "ADD_LOCATION";
const START_RUNNING = "START_RUNNING";
const STOP_RUNNING = "STOP_RUNNING";
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
    case STOP_RUNNING:
      return { ...state, running: false };
    case GRANT_PERMISSIONS:
      return { ...state, permissions: true };
    case REJECT_PERMISSIONS:
      return { ...state, permissions: false };
    default:
      return state;
  }
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
    //console.log(location);
    dispatch({
      type: ADD_CURRENT_LOCATION,
      payload: location,
    });

    console.log(
      "Added Location lat: ",
      location.coords.latitude,
      "\tlong: ",
      location.coords.longitude
    );

    if (running) {
      dispatch({
        type: ADD_LOCATION,
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
    grantPermissions,
    rejectPermissions,
  },
  { permissions: null, running: false, locations: [], currentLocation: null }
);
