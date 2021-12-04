import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, ScrollView, StatusBar, Text } from "react-native";
import { Avatar, Button } from "react-native-elements";
import { requestForegroundPermissionsAsync } from "expo-location";
import { LinearGradient } from "expo-linear-gradient";

import { Context as AuthContext } from "../context/AuthContext";
import { Context as LocationContext } from "../context/LocationContext";
import Spacer from "../components/Spacer";
import SwipeDeck from "../components/SwipeDeck";
import Header from "../components/mainFlow/Header";
import Stoper from "../components/Stoper";
import Greetings from "../components/mainFlow/Greetings";
import { colorsMain } from "../styles/colors";

const HomeScreen = ({ navigation }) => {
  const { state, signout } = useContext(AuthContext);
  const {
    state: { permissions, running },
    grantPermissions,
    rejectPermissions,
    setTime,
  } = useContext(LocationContext);

  const getPermissions = async () => {
    try {
      const { granted } = await requestForegroundPermissionsAsync();
      if (!granted) {
        rejectPermissions();
        throw new Error("Location permission not granted");
      }
      grantPermissions();
    } catch (error) {
      console.log(error);
    }
  };

  // INITIAL PERMISSION REQUEST
  useEffect(() => {
    getPermissions();
  }, []);

  return (
    <>
      <Header title="Home" rightButton rightButtonCallback={signout} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <StatusBar
          barStyle="light-content"
          translucent={true}
          backgroundColor="transparent"
        />
        <Stoper interval={1000} callback={setTime} show={running} />
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          //colors={["hsl(231, 33%, 16%)", "hsl(218, 69%, 20%)"]}
          colors={[
            colorsMain.backgroundPrimary,
            colorsMain.backgroundSecondary,
          ]}
          style={styles.container}
        >
          <View>
            <Greetings user={state.user} />
            <SwipeDeck />
            <SwipeDeck />
          </View>
          <Spacer>
            {permissions ? (
              <Button
                title="Start Running"
                onPress={() => navigation.navigate("Running")}
              />
            ) : (
              <Button title="Request Permissions" onPress={getPermissions} />
            )}
          </Spacer>
        </LinearGradient>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#EDEDE9",
    padding: 8,
    borderRadius: 4,
    elevation: 5,
  },
  avatar: {
    shadowColor: "#000",
    elevation: 10,
    borderWidth: 2,
    borderColor: "hsl(203, 68%, 27%)",
  },
});

export default HomeScreen;
