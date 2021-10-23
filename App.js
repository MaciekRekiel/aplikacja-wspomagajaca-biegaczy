import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Entypo } from "@expo/vector-icons";

import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";
import HomeScreen from "./src/screens/HomeScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import StatsScreen from "./src/screens/StatsScreen";
import EventsScreen from "./src/screens/EventsScreen";
import RunningScreen from "./src/screens/RunningScreen";

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

const switchNavigator = createSwitchNavigator({
  auth: createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen,
  }),
  main: createBottomTabNavigator({
    Home,
    Profile: ProfileScreen,
    Stats: StatsScreen,
    Events: EventsScreen,
  }),
});

export default createAppContainer(switchNavigator);
