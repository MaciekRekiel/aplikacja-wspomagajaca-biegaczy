import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";

import SearchBar from "../components/SearchBar";
import Card from "../components/Card";

const EventsScreen = ({ navigation }) => {
  const data = [
    { title: "Title 1", subtitle: "Subtitle 1" },
    { title: "Title 2", subtitle: "Subtitle 2" },
    { title: "Title 3", subtitle: "Subtitle 3" },
    { title: "Title 4", subtitle: "Subtitle 4" },
    { title: "Title 5", subtitle: "Subtitle 5" },
    { title: "Title 6", subtitle: "Subtitle 6" },
    { title: "Title 7", subtitle: "Subtitle 7" },
  ];

  return (
    <SafeAreaView>
      <ScrollView>
        <SearchBar />
        <Card title="My Events" data={data} />
        <Card title="Recommended Events" data={data} />
        <Card title="Finished Events" />
      </ScrollView>
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
