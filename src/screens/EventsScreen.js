import React from "react";
import { StyleSheet } from "react-native";
import { Button, Text } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";

const EventsScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Text h3>Events Screen</Text>
    </SafeAreaView>
  );
};

EventsScreen.navigationOptions = {
  title: "Events",
  tabBarIcon: ({ tintColor }) => {
    return <MaterialIcons name="event" size={20} color={tintColor} />;
  },
};

const styles = StyleSheet.create({});

export default EventsScreen;
