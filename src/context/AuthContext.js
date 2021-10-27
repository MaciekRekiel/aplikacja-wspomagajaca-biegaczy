import AsyncStorage from "@react-native-async-storage/async-storage";

import createDataContext from "./createDataContext";
import serverInstance from "../apis/server";
import { navigate } from "../navigationRef";

const SIGNIN = "SIGNIN";
const SIGNOUT = "SIGNOUT";
const ADD_ERROR = "ADD_ERROR";

const authReducer = (state, action) => {
  switch (action.type) {
    case SIGNIN:
      return { user: action.payload.user, token: action.payload.token };
    case SIGNOUT:
      return { user: null, token: null };
    default:
      return state;
  }
};

const signup = (dispatch) => {
  return async ({ login, email, password, confirmPassword }) => {
    try {
      const response = await serverInstance.post("/users", {
        login,
        email,
        password,
        confirmPassword,
      });
      await AsyncStorage.setItem("token", response.data.token);
      const responseUser = await serverInstance.post("/users/me", {
        headers: {
          Authorization: `Bearer ${response.data.token}`,
        },
      });
      dispatch({
        type: SIGNIN,
        payload: { token: response.data.token, user: responseUser.data.user },
      });
      navigate("Home");
    } catch (err) {
      dispatch({
        type: ADD_ERROR,
        payload: "Something went wrong with sign up",
      });
    }
  };
};

const signin = (dispatch) => {
  return async ({ email, password }) => {
    try {
      //console.log("Zaczynam logowanie");
      const response = await serverInstance.post("/users/login", {
        email,
        password,
      });
      await AsyncStorage.setItem("token", response.data.token);
      const responseUser = await serverInstance.get("/users/me", {
        headers: {
          Authorization: `Bearer ${response.data.token}`,
        },
      });
      //console.log("Dane: ", responseUser.data);
      dispatch({
        type: SIGNIN,
        payload: { token: response.data.token, user: responseUser.data.user },
      });
      navigate("Home");
    } catch (err) {
      dispatch({
        type: ADD_ERROR,
        payload: err.error,
      });
    }
  };
};

const signout = (dispatch) => {
  return async () => {
    await AsyncStorage.removeItem("token");
    dispatch({
      type: SIGNOUT,
    });
    navigate("Signin");
  };
};
export const { Provider, Context } = createDataContext(
  authReducer,
  { signup, signin, signout },
  { user: null, token: null }
);
