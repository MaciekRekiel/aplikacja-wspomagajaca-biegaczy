// REACT REACT-NATIVE IMPORTS
import React, { useState, useEffect, useContext, useRef } from "react";
import { View, StyleSheet, StatusBar, ScrollView } from "react-native";
import { Button } from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import * as TaskManager from "expo-task-manager";
import { LinearGradient } from "expo-linear-gradient";
import {
  Accuracy,
  stopLocationUpdatesAsync,
  startLocationUpdatesAsync,
  watchPositionAsync,
} from "expo-location";

// REUSABLE COMPONENTS IMPORT
import { Context as LocationContext } from "../context/LocationContext";
import Spacer from "../components/Spacer";
import Column from "../components/Column";
import Map from "../components/Map";
import Stoper from "../components/Stoper";
import Header from "../components/mainFlow/Header";
import CustomBackground from "../components/mainFlow/CustomBackground";

const RunningScreen = ({ navigation }) => {
  const {
    state: { running, runningTime, distance },
    addLocation,
    startRunning,
    stopRunning,
    setTime,
  } = useContext(LocationContext);
  const subID = useRef(null);

  TaskManager.defineTask("TASK_FETCH_LOCATION", async ({ data, error }) => {
    if (error) {
      console.log(error.message);
      return;
    }
    if (data) {
      addLocation(data.locations[0], running);
    }
  });

  // FETCH LOCATION ON SCREEN UP && IS NOT TRACKING
  const startForegroundLocationFetching = async () => {
    subID.current = await watchPositionAsync(
      {
        accuracy: Accuracy.BestForNavigation,
        timeInterval: 5000,
        distanceInterval: 2,
      },
      (location) => addLocation(location)
    );
  };

  // STOP FETCHING LOCATION ON SCREEN BLUR || STARTED TRACKING
  const stopForegroundLocationFetching = () => {
    if (subID.current) {
      subID.current.remove();
      subID.current = null;
    }
  };

  // BACKGROUND AND FOREGROUND TRACKING
  const startTrackingLocation = async () => {
    startRunning();
    await startLocationUpdatesAsync("TASK_FETCH_LOCATION", {
      accuracy: Accuracy.BestForNavigation,
      timeInterval: 1000,
      distanceInterval: 2,
      foregroundService: {
        notificationTitle: "Using your location",
        notificationBody:
          "To turn off, go back to the app and switch stop navigating.",
      },
    });
  };

  // STOP FOREGROUND|BACKGROUND TRACKING LOCATION
  const stopTrackingLocation = async () => {
    await stopLocationUpdatesAsync("TASK_FETCH_LOCATION");
    stopRunning();
  };

  // TIME RENDER HELPER FUNCTION
  const renderTime = () => {
    let secValue = runningTime % 60;
    let minValue = Math.floor(runningTime / 60);
    minValue < 10 ? (minValue = `0${minValue}`) : null;
    secValue < 10 ? (secValue = `0${secValue}`) : null;
    return `${minValue}:${secValue}`;
  };

  // INITIAL FOREGROUND FETCHING
  useEffect(() => {
    if (!running) {
      startForegroundLocationFetching();
    }
    return () => {
      stopForegroundLocationFetching();
    };
  }, [running]);

  return (
    <>
      <Header
        title="Running"
        backIcon
        backIconOnPress={() => navigation.navigate("Home")}
      />
      <Stoper interval={1000} callback={setTime} show={running} />
      <CustomBackground>
        <NavigationEvents
          onWillBlur={() => {
            stopForegroundLocationFetching();
          }}
        />

        <Spacer>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={["hsl(203, 68%, 30%)", "hsl(203, 68%, 37%)"]}
            style={styles.card}
          >
            <Column title="KM" value={distance} />
            <Column title="Czas" value={renderTime()} />
            <Column title="Kcal" value={0} />
          </LinearGradient>
        </Spacer>
        <Map />
        <Spacer>
          {running ? (
            <Button
              type="outline"
              title="Stop"
              onPress={stopTrackingLocation}
            />
          ) : (
            <Button
              type="outline"
              title="Start"
              onPress={startTrackingLocation}
            />
          )}
          <Spacer></Spacer>
          {runningTime > 0 && !running ? (
            <Button
              type="outline"
              title="Save The Session"
              onPress={() => console.log("Zapisuje")}
            />
          ) : null}
        </Spacer>
      </CustomBackground>
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
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 8,
    borderRadius: 4,
    elevation: 5,
    height: 100,
  },
});

export default RunningScreen;
