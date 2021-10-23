import React from "react";
import { StyleSheet } from "react-native";
import { Button, Text } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";

const StatsScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Text h3>Stats Screen</Text>
    </SafeAreaView>
  );
};

StatsScreen.navigationOptions = {
  title: "Statistics",
  tabBarIcon: ({ tintColor }) => {
    return <FontAwesome name="bar-chart" size={20} color={tintColor} />;
  },
};

const styles = StyleSheet.create({});

export default StatsScreen;
