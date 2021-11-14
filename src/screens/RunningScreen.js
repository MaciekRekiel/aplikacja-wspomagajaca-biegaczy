// REACT REACT-NATIVE IMPORTS
import React, { useState, useEffect, useContext, useRef } from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import * as TaskManager from "expo-task-manager";
import {
  Accuracy,
  stopLocationUpdatesAsync,
  startLocationUpdatesAsync,
  getCurrentPositionAsync,
  watchPositionAsync,
} from "expo-location";

// REUSABLE COMPONENTS IMPORT
import Spacer from "../components/Spacer";
import Column from "../components/Column";
import Map from "../components/Map";
import Stoper from "../components/Stoper";
import { Context as LocationContext } from "../context/LocationContext";

const RunningScreen = () => {
  const { state, addLocation, startRunning, stopRunning, startStoper } =
    useContext(LocationContext);
  const [loc, setLoc] = useState(null);

  // BACKGROUND TASK
  TaskManager.defineTask("TASK_FETCH_LOCATION", async ({ data, error }) => {
    if (error) {
      console.log(error.message);
      return;
    }
    if (data) {
      const { locations } = data;
      setLoc(locations[0]);
    }
  });

  // ON COMPONENT RENDER LOCATION FETCHING
  const initialLocation = async () => {
    const location = await getCurrentPositionAsync({
      accuracy: Accuracy.BestForNavigation,
    });
    addLocation(location);
  };

  // ICON LOCATION FETCHING
  const getUserLocation = async () => {
    const subscriber = await watchPositionAsync(
      {
        accuracy: Accuracy.BestForNavigation,
      },
      (location) => addLocation(location)
    );
    setTimeout(() => {
      subscriber.remove();
    }, 1000);
  };

  // BACKGROUND AND FOREGROUND TRACKING
  const startTrackingLocation = async () => {
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
    startRunning();
  };

  // STOP TRACKING LOCATION
  const stopTrackingLocation = async () => {
    await stopLocationUpdatesAsync("TASK_FETCH_LOCATION");
    stopRunning();
  };

  // TIME RENDER HELPER FUNCTION
  const renderTime = () => {
    // XX:XX TIME OUTPUT
    const { runningTime } = state;
    let secValue = runningTime % 60;
    let minValue = Math.floor(runningTime / 60);
    minValue < 10 ? (minValue = `0${minValue}`) : null;
    secValue < 10 ? (secValue = `0${secValue}`) : null;
    return `${minValue}:${secValue}`;
  };

  // SAVE LOCATION TO THE CONTEXT EVERYTIME LOCATION STATE CHANGES
  useEffect(() => {
    if (loc) {
      addLocation(loc, state.running);
    }
  }, [loc]);

  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={initialLocation} />
      {state.running ? <Stoper interval={1000} callback={startStoper} /> : null}
      <Spacer>
        <View style={styles.card}>
          <Column title="KM" value={state.distance} />
          <Column title="Czas" value={renderTime()} />
          <Column title="Kcal" value={0} />
        </View>
      </Spacer>
      <Map onIconPress={getUserLocation} />
      <Spacer>
        {state.running ? (
          <Button title="Stop" onPress={stopTrackingLocation} />
        ) : (
          <Button title="Start" onPress={startTrackingLocation} />
        )}
        <Spacer></Spacer>
        {state.runningTime > 0 && !state.running ? (
          <Button
            title="Save The Session"
            onPress={() => console.log("Zapisuje")}
          />
        ) : null}
      </Spacer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
  },
  card: {
    backgroundColor: "#EDEDE9",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 8,
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 5,
    height: 100,
  },
});

export default RunningScreen;
