import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";

import Header from "../components/mainFlow/Header";
import CustomBackground from "../components/mainFlow/CustomBackground";
import { colorsMain } from "../styles/colors";
import MapView, { Polyline } from "react-native-maps";
import { nightMapTheme } from "../utils/customMapStyles";
import Button from "../components/mainFlow/Button";
import serverInstance from "../apis/server";
import { Context as AuthContext } from "../context/AuthContext";

const EventDetailsEventsScreen = ({ navigation }) => {
  const { loadUser } = useContext(AuthContext);
  const [item, setItem] = useState(null);
  const [destination, setDestination] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);
  const [alreadyIn, setAlreadyIn] = useState(false);

  useEffect(() => {
    const item = navigation.getParam("item");
    const token = navigation.getParam("token");
    const from = navigation.getParam("from");
    const userEvents = navigation.getParam("userEvents");
    setItem(item);
    setDestination(from);
    setToken(token);
    if (userEvents.length) {
      setAlreadyIn(userEvents.includes(item._id));
    }
    setLoading(false);
  }, []);

  if (!item || loading) {
    return (
      <>
        <Header
          title="Event Details"
          backIcon
          backIconOnPress={() => navigation.navigate(destination)}
        />
        <CustomBackground safeAreaSecured justifyContent="center">
          <ActivityIndicator size={64} color={colorsMain.secondary} />
        </CustomBackground>
      </>
    );
  }

  const joinEventHandler = async () => {
    try {
      await serverInstance.post(
        `/events/${item._id}/join`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await loadUser();
      setAlreadyIn(true);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const leaveEventHandler = async () => {
    try {
      await serverInstance.delete(`/events/${item._id}/leave`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await loadUser();
      setAlreadyIn(false);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <>
      <Header
        title="Event Details"
        backIcon
        backIconOnPress={() => navigation.navigate(destination)}
      />
      <CustomBackground safeAreaSecured justifyContent="flex-start">
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.row}>
          <Text style={styles.rowText}>{item.address.country}</Text>
          <Text style={styles.rowText}>{item.address.city}</Text>
          <Text style={styles.rowText}>{item.address.street}</Text>
        </View>
        {item.details ? <Text style={styles.text}>{item.details}</Text> : null}
        <Text
          style={styles.text}
        >{`Participants: ${item.participants.length}`}</Text>
        <Text
          style={styles.text}
        >{`Max Participants: ${item.maxParticipants}`}</Text>
        <MapView
          loadingEnabled
          loadingBackgroundColor={colorsMain.backgroundPrimary}
          style={styles.map}
          customMapStyle={nightMapTheme}
          initialRegion={{
            ...item.route[0].coords,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
          }}
        >
          <Polyline
            strokeColor="rgba(2, 149, 182, 1)"
            strokeWidth={6}
            coordinates={item.route.map((route) => route.coords)}
          />
          <Polyline
            strokeColor="rgba(31, 255, 218, 0.7)"
            strokeWidth={4}
            coordinates={item.route.map((route) => route.coords)}
          />
        </MapView>
        {alreadyIn ? (
          <Button title="Leave The Event" onPress={leaveEventHandler} />
        ) : (
          <Button title="Take Part In" onPress={joinEventHandler} />
        )}
      </CustomBackground>
    </>
  );
};

const styles = StyleSheet.create({
  name: {
    fontSize: 28,
    color: colorsMain.primary,
    marginHorizontal: 15,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    marginHorizontal: 15,
    marginTop: 16,
    justifyContent: "space-between",
  },
  rowText: {
    fontSize: 18,
    color: colorsMain.primary,
  },
  text: {
    fontSize: 18,
    color: colorsMain.primary,
    marginHorizontal: 15,
    marginTop: 8,
  },
  map: {
    marginTop: 15,
    height: 350,
  },
});

export default EventDetailsEventsScreen;
