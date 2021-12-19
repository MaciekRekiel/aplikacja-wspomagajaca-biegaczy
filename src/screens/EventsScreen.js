import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import {
  reverseGeocodeAsync,
  getCurrentPositionAsync,
  Accuracy,
} from "expo-location";

import { Context as LocationContext } from "../context/LocationContext";
import { Context as AuthContext } from "../context/AuthContext";
import CustomBackground from "../components/mainFlow/CustomBackground";
import SearchBar from "../components/SearchBar";
import serverInstance from "../apis/server";

const EventsScreen = ({ navigation }) => {
  const {
    state: { token },
  } = useContext(AuthContext);
  const {
    state: { permissions, currentLocation },
  } = useContext(LocationContext);

  const [loading, setLoading] = useState(true);

  const searchForRecommended = async (currentLocation) => {
    let location, response;
    if (!currentLocation) {
      response = await getCurrentPositionAsync({
        accuracy: Accuracy.BestForNavigation,
      });
      location = {
        latitude: response.coords.latitude,
        longitude: response.coords.longitude,
      };
    } else {
      location = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      };
    }
    response = await reverseGeocodeAsync(location);
    const query = {
      city: "Gródki",
    };
    try {
      response = await serverInstance.get("/events", {
        params: {
          ...query,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      response.data.forEach((a) => {
        console.log(a.name, a.address);
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    if (permissions) {
      searchForRecommended(currentLocation);
    }
  }, []);

  return (
    <CustomBackground safeAreaSecured justifyContent="flex-start">
      <SearchBar />
      <Text>Aaaaaaaaaaaaaaaaaa</Text>
    </CustomBackground>
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
