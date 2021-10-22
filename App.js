import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";
import HomeScreen from "./src/screens/HomeScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import StatsScreen from "./src/screens/StatsScreen";
import EventsScreen from "./src/screens/EventsScreen";

const switchNavigator = createSwitchNavigator({
  auth: createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen,
  }),
  main: createBottomTabNavigator({
    Home: createStackNavigator({
      Home: HomeScreen,
    }),
    Profile: createStackNavigator({
      Profile: ProfileScreen,
    }),
    Statistics: StatsScreen,
    Events: EventsScreen,
  }),
});

export default createAppContainer(switchNavigator);
