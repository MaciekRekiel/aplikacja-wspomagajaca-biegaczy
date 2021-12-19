// REACT
import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator, Header } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Animated, Easing } from "react-native";

// ICONS
import { Entypo, FontAwesome } from "@expo/vector-icons";

// UTILS
import { setNavigator } from "./src/navigationRef";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Provider as LocationProvider } from "./src/context/LocationContext";
import { colorsMain } from "./src/styles/colors";

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
import RunDetailsScreen from "./src/screens/RunDetailsScreen";
import RunDetailsStatsScreen from "./src/screens/RunDetailsStatsScreen";
import AllStatsScreen from "./src/screens/AllStatsScreen";

// HOME SCREEN
const Home = createSwitchNavigator({
  Home: HomeScreen,
  Running: RunningScreen,
  RunDetail: RunDetailsScreen,
});
Home.navigationOptions = {
  title: "Home",
  tabBarIcon: ({ tintColor }) => {
    return <Entypo name="home" size={20} color={tintColor} />;
  },
};

const Stats = createSwitchNavigator({
  Stats: StatsScreen,
  RunDetailStats: RunDetailsStatsScreen,
  AllStats: AllStatsScreen,
});

Stats.navigationOptions = {
  title: "Statistics",
  tabBarIcon: ({ tintColor }) => {
    return <FontAwesome name="bar-chart" size={20} color={tintColor} />;
  },
};

// ENTIRE NAVIGATION
const switchNavigator = createSwitchNavigator({
  authResolve: AuthResolveScreen,
  auth: createSwitchNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen,
    ForgotPassword: ForgotPasswordScreen,
    ConfirmResetPassword: ConfirmResetPasswordScreen,
    ResetPassword: ResetPasswordScreen,
    ResetPasswordSuccessful: ResetPasswordSuccessfulScreen,
  }),
  main: createBottomTabNavigator(
    {
      Home,
      Profile: ProfileScreen,
      Stats,
      Events: EventsScreen,
    },
    {
      tabBarOptions: {
        activeTintColor: colorsMain.headerColor,
        style: {
          borderTopColor: colorsMain.headerBackground,
          backgroundColor: colorsMain.headerBackground,
        },
      },
    }
  ),
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
