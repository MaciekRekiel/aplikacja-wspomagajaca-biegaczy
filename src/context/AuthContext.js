import AsyncStorage from "@react-native-async-storage/async-storage";
import _ from "lodash";

import createDataContext from "./createDataContext";
import serverInstance from "../apis/server";
import { navigate } from "../navigationRef";

const SIGNIN = "SIGNIN";
const SIGNOUT = "SIGNOUT";
const ADD_ERROR = "ADD_ERROR";
const CLEAR_ERROR = "CLEAR_ERROR";
const ADD_LOADING = "ADD_LOADING";
const REMOVE_LOADING = "REMOVE_LOADING";

const authReducer = (state, action) => {
  switch (action.type) {
    case SIGNIN:
      return {
        user: action.payload.user,
        token: action.payload.token,
        errorMessages: {},
      };
    case SIGNOUT:
      return { user: null, token: null, errorMessages: {} };
    case ADD_ERROR:
      return { ...state, loading: false, errorMessages: { ...action.payload } };
    case CLEAR_ERROR:
      return { ...state, errorMessages: {} };
    case ADD_LOADING:
      return { ...state, loading: true };
    case REMOVE_LOADING:
      return { ...state, loading: false };
    default:
      return state;
  }
};

const autoLogin = (dispatch) => {
  return async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const responseUser = await serverInstance.get("/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch({
          type: SIGNIN,
          payload: { token, user: responseUser.data.user },
        });
        navigate("Home");
      } else {
        navigate("Signup");
      }
    } catch (error) {
      dispatch({
        type: SIGNOUT,
      });
      navigate("Signup");
    }
  };
};

const clearErrors = (dispatch) => {
  return () => {
    dispatch({
      type: CLEAR_ERROR,
    });
  };
};

const signup = (dispatch) => {
  return async ({
    login = "",
    email = "",
    password = "",
    confirmPassword = "",
  }) => {
    const errorMessages = {};

    login = login.trim();
    email = email.trim().toLowerCase();
    password = password.trim();
    confirmPassword = confirmPassword.trim();
    if (!login) {
      errorMessages.loginIsEmpty = "You must enter a username";
    }
    if (!email) {
      errorMessages.emailIsEmpty = "You must enter a email";
    }
    if (!password) {
      errorMessages.passwordIsEmpty = "You must enter a password";
    }
    if (!confirmPassword) {
      errorMessages.confirmPasswordIsEmpty = "You must confirm password";
    }

    // If there is no errors, try to make request
    if (_.isEmpty(errorMessages)) {
      try {
        dispatch({
          type: ADD_LOADING,
        });
        const response = await serverInstance.post("/users", {
          login,
          email,
          password,
          confirmPassword,
        });

        // Saving auth token
        await AsyncStorage.setItem("token", response.data.token);

        // Fetching and saving all data about the user
        const responseUser = await serverInstance.get("/users/me", {
          headers: {
            Authorization: `Bearer ${response.data.token}`,
          },
        });

        dispatch({
          type: SIGNIN,
          payload: { token: response.data.token, user: responseUser.data.user },
        });
        dispatch({
          type: REMOVE_LOADING,
        });
        navigate("Home");
      } catch (error) {
        // Server Validation Errors
        dispatch({
          type: REMOVE_LOADING,
        });
        dispatch({
          type: ADD_ERROR,
          payload: error.response.data.errorMessages,
        });
      }
    } else {
      // At least one error occurred
      dispatch({
        type: ADD_ERROR,
        payload: errorMessages,
      });
    }
  };
};

const signin = (dispatch) => {
  return async ({ login = "", password = "" }) => {
    const errorMessages = {};

    login = login.trim();
    password = password.trim();

    if (!login) {
      errorMessages.loginIsEmpty = "You must enter your username or email";
    }
    if (!password) {
      errorMessages.passwordIsEmpty = "You must enter a password";
    }

    // Check if provided login is email
    login.includes("@") ? (login = login.toLowerCase()) : null;

    if (_.isEmpty(errorMessages)) {
      try {
        // Trying to log in
        dispatch({
          type: ADD_LOADING,
        });
        const response = await serverInstance.post("/users/login", {
          login,
          password,
        });

        // Savin auth token
        await AsyncStorage.setItem("token", response.data.token);

        // Fetching and saving all data about the user
        const responseUser = await serverInstance.get("/users/me", {
          headers: {
            Authorization: `Bearer ${response.data.token}`,
          },
        });
        dispatch({
          type: SIGNIN,
          payload: { token: response.data.token, user: responseUser.data.user },
        });
        dispatch({
          type: REMOVE_LOADING,
        });
        navigate("Home");
      } catch (error) {
        // Server Validation Errors
        dispatch({
          type: ADD_ERROR,
          payload: error.response.data.errorMessages,
        });
      }
    } else {
      // At least one error occurred
      dispatch({
        type: ADD_ERROR,
        payload: errorMessages,
      });
    }
  };
};

const signout = (dispatch) => {
  return async () => {
    // Removing token from state and async storage
    await AsyncStorage.removeItem("token");
    dispatch({
      type: SIGNOUT,
    });
    navigate("Signin");
  };
};
export const { Provider, Context } = createDataContext(
  authReducer,
  { signup, signin, signout, clearErrors, autoLogin },
  { user: null, token: null, errorMessages: {}, loading: false }
);
