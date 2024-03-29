import { Platform, ToastAndroid } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import _ from "lodash";

import createDataContext from "./createDataContext";
import serverInstance from "../apis/server";
import { navigate } from "../navigationRef";
import { arrayBufferToBase64 } from "../utils/arrayBufferToBase64";

const SIGNIN = "SIGNIN";
const SIGNOUT = "SIGNOUT";
const ADD_ERROR = "ADD_ERROR";
const CLEAR_ERROR = "CLEAR_ERROR";
const ADD_LOADING = "ADD_LOADING";
const REMOVE_LOADING = "REMOVE_LOADING";
const EDIT_PERSONAL_INFO = "EDIT_PERSONAL_INFO";
const EDIT_AVATAR = "EDIT_AVATAR";
const ADD_STATS = "ADD_STATS";
const LOAD_USER = "LOAD_USER";

const authReducer = (state, action) => {
  switch (action.type) {
    case LOAD_USER:
      return { ...state, user: action.payload.user };
    case SIGNIN:
      let avatar;
      if (action.payload.user.avatar) {
        avatar = `data:image/jpg;base64,${arrayBufferToBase64(
          action.payload.user.avatar.data.data
        )}`;
      } else {
        avatar = null;
      }

      return {
        user: action.payload.user,
        token: action.payload.token,
        avatar,
        errorMessages: {},
      };
    case ADD_STATS:
      return { ...state, user: action.payload.user };
    case SIGNOUT:
      return { user: null, token: null, avatar: null, errorMessages: {} };
    case EDIT_PERSONAL_INFO:
      return { ...state, user: action.payload.user };
    case EDIT_AVATAR:
      return { ...state, avatar: action.payload.imageUri };
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

const loadUser = (dispatch) => {
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
          type: LOAD_USER,
          payload: { user: responseUser.data.user },
        });
      }
    } catch (error) {}
  };
};
const editPassword = (dispatch) => {
  return async ({
    token,
    currentPass = "",
    newPassword = "",
    confirmPassword = "",
  }) => {
    dispatch({
      type: CLEAR_ERROR,
    });
    const errorMessages = {};
    currentPass = currentPass.trim();
    newPassword = newPassword.trim();
    confirmPassword = confirmPassword.trim();
    if (!currentPass) {
      errorMessages.currentPassIsEmpty = "You must enter your current password";
    }
    if (!newPassword) {
      errorMessages.newPasswordIsEmpty = "You must enter your new password";
    }
    if (!confirmPassword) {
      errorMessages.confirmPasswordIsEmpty =
        "You must enter your confirm password";
    }
    if (_.isEmpty(errorMessages)) {
      try {
        await serverInstance.patch(
          "/users/change-password-authenticated",
          {
            currentPassword: currentPass,
            newPassword,
            confirmPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return true;
      } catch (error) {
        dispatch({
          type: ADD_ERROR,
          payload: errorMessages,
        });
      }
    } else {
      dispatch({
        type: ADD_ERROR,
        payload: errorMessages,
      });
    }
  };
};
const fetchStats = (dispatch) => {
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
          type: ADD_STATS,
          payload: { user: responseUser.data.user },
        });
        navigate("Home");
      }
    } catch (error) {}
  };
};
const uploadAvatar = () => {
  return async ({ token, imageUri }) => {
    const formData = new FormData();
    formData.append("avatar", {
      name: `${new Date()}_avatar`,
      uri: imageUri, // String
      type: "image/jpg",
    });
    try {
      await serverInstance.patch("/users/avatar", formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {}
  };
};
const editAvatar = (dispatch) => {
  return (imageUri) => {
    dispatch({
      type: EDIT_AVATAR,
      payload: { imageUri },
    });
  };
};
const editPersonalInfo = (dispatch) => {
  return async ({ token, gender = "", age = "", height = "", weight = "" }) => {
    dispatch({
      type: CLEAR_ERROR,
    });
    const errorMessages = {};
    gender = gender.trim();
    age = age.trim();
    height = height.trim();
    weight = weight.trim();
    if (!age) {
      errorMessages.ageIsEmpty = "You must enter your age";
    }
    if (!height) {
      errorMessages.heightIsEmpty = "You must enter your height";
    }
    if (!weight) {
      errorMessages.weightIsEmpty = "You must enter your weight";
    }

    if (_.isEmpty(errorMessages)) {
      try {
        age = parseInt(age);
        height = parseInt(height);
        weight = parseInt(weight);
        await serverInstance.patch(
          "/users/personal",
          {
            gender,
            age,
            height,
            weight,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const responseUser = await serverInstance.get("/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch({
          type: EDIT_PERSONAL_INFO,
          payload: { user: responseUser.data.user },
        });
        return true;
      } catch (error) {
        dispatch({
          type: ADD_ERROR,
          payload: errorMessages,
        });
      }
    } else {
      dispatch({
        type: ADD_ERROR,
        payload: errorMessages,
      });
    }
  };
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
        navigate("Signin");
      }
    } catch (error) {
      dispatch({
        type: SIGNOUT,
      });
      navigate("Signin");
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
    dispatch({
      type: CLEAR_ERROR,
    });
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
    dispatch({
      type: CLEAR_ERROR,
    });
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
        dispatch({
          type: ADD_LOADING,
        });
        const response = await serverInstance.post("/users/login", {
          login,
          password,
        });

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
const resendResetCode = () => {
  return async ({ email }) => {
    try {
      await serverInstance.post("/users/forgot-password", {
        email,
      });
    } catch (error) {
      if (Platform.OS === "android") {
        ToastAndroid.show("Can't resend reset code.", ToastAndroid.LONG);
      }
    }
  };
};
const forgotPassword = (dispatch) => {
  return async ({ email = "" }) => {
    email = email.trim().toLowerCase();

    if (!email) {
      dispatch({
        type: ADD_ERROR,
        payload: { emailIsEmpty: "You must enter a email" },
      });
    }
    // If there is no errors, try to make request
    else {
      try {
        dispatch({
          type: CLEAR_ERROR,
        });
        dispatch({
          type: ADD_LOADING,
        });
        await serverInstance.post("/users/forgot-password", {
          email,
        });
        dispatch({
          type: REMOVE_LOADING,
        });
        navigate("ConfirmResetPassword", { email });
      } catch (error) {
        // Server Validation Errors
        dispatch({
          type: REMOVE_LOADING,
        });
        dispatch({
          type: ADD_ERROR,
          payload: { userNotExists: error.response.data.error },
        });
      }
    }
  };
};
const validateResetCode = (dispatch) => {
  return async ({ email = "", resetCode = "" }) => {
    resetCode = resetCode.trim();
    if (!resetCode) {
      dispatch({
        type: ADD_ERROR,
        payload: { resetCodeIsEmpty: "You must enter a reset code" },
      });
    }
    // If there is no errors, try to make request
    else {
      try {
        dispatch({
          type: CLEAR_ERROR,
        });
        dispatch({
          type: ADD_LOADING,
        });
        const response = await serverInstance.post(
          `/users/reset-password/${resetCode}`,
          {
            email,
          }
        );
        dispatch({
          type: REMOVE_LOADING,
        });
        navigate("ResetPassword", { token: response.data.token });
      } catch (error) {
        // Server Validation Errors
        dispatch({
          type: REMOVE_LOADING,
        });
        dispatch({
          type: ADD_ERROR,
          payload: { invalidResetCode: error.response.data.error },
        });
      }
    }
  };
};
const resetPassword = (dispatch) => {
  return async ({ password = "", confirmPassword = "", token = "" }) => {
    const errorMessages = {};
    password = password.trim();
    confirmPassword = confirmPassword.trim();
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
          type: CLEAR_ERROR,
        });
        dispatch({
          type: ADD_LOADING,
        });
        await serverInstance.patch(
          "/users/change-password",
          {
            password,
            confirmPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        dispatch({
          type: REMOVE_LOADING,
        });
        navigate("ResetPasswordSuccessful");
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
  {
    signup,
    signin,
    forgotPassword,
    resendResetCode,
    validateResetCode,
    resetPassword,
    signout,
    clearErrors,
    autoLogin,
    editPersonalInfo,
    editAvatar,
    uploadAvatar,
    fetchStats,
    editPassword,
    loadUser,
  },
  {
    user: null,
    token: null,
    avatar: null,
    errorMessages: {},
    loading: false,
  }
);
