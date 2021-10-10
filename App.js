import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import HomeScreen from "./src/screens/HomeScreen";
import SignInScreen from "./src/screens/SignInScreen";

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    SignIn: SignInScreen,
  },
  {
    initialRouteName: "SignIn",
    defaultNavigationOptions: {
      title: "Home",
    },
  }
);

export default createAppContainer(navigator);
