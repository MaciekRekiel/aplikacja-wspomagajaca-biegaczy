// REACT
import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

// ICONS
import { Entypo } from "@expo/vector-icons";

// UTILS
import { setNavigator } from "./src/navigationRef";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Provider as LocationProvider } from "./src/context/LocationContext";

// SCREENS IMPORT
import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";
import HomeScreen from "./src/screens/HomeScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import StatsScreen from "./src/screens/StatsScreen";
import EventsScreen from "./src/screens/EventsScreen";
import RunningScreen from "./src/screens/RunningScreen";
import AuthResolveScreen from "./src/screens/AuthResolveScreen";
import ForgotPasswordScreen from "./src/screens/ForgotPasswordScreens/ForgotPasswordScreen";
import ConfirmResetPasswordScreen from "./src/screens/ForgotPasswordScreens/ConfirmResetPasswordScreen";
import ResetPasswordScreen from "./src/screens/ForgotPasswordScreens/ResetPasswordScreen";
import ResetPasswordSuccessfulScreen from "./src/screens/ForgotPasswordScreens/ResetPasswordSuccessfulScreen";

// HOME SCREEN
const Home = createStackNavigator({
  Home: HomeScreen,
  Running: RunningScreen,
});
Home.navigationOptions = {
  title: "Home",
  tabBarIcon: ({ tintColor }) => {
    return <Entypo name="home" size={20} color={tintColor} />;
  },
};

// ENTIRE NAVIGATION
const switchNavigator = createSwitchNavigator({
  authResolve: AuthResolveScreen,
  auth: createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen,
    ForgotPassword: ForgotPasswordScreen,
    ConfirmResetPassword: ConfirmResetPasswordScreen,
    ResetPassword: ResetPasswordScreen,
    ResetPasswordSuccessful: ResetPasswordSuccessfulScreen
  }),
  main: createBottomTabNavigator({
    Home,
    Profile: ProfileScreen,
    Stats: StatsScreen,
    Events: EventsScreen,
  }),
});

const App = createAppContainer(switchNavigator);
export default () => {
  return (
    <LocationProvider>
      <AuthProvider>
        <App ref={(navigator) => setNavigator(navigator)} />
      </AuthProvider>
    </LocationProvider>
  );
};
