// REACT REACT-NATIVE IMPORTS
import React, { useEffect, useContext, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { Button } from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import { HeaderBackButton } from "react-navigation-stack";
import {
  Accuracy,
  stopLocationUpdatesAsync,
  startLocationUpdatesAsync,
  watchPositionAsync,
} from "expo-location";

// REUSABLE COMPONENTS IMPORT
import Spacer from "../components/Spacer";
import Column from "../components/Column";
import Map from "../components/Map";
import Stoper from "../components/Stoper";
import { Context as LocationContext } from "../context/LocationContext";

const RunningScreen = ({ navigation }) => {
  const {
    state: { running, runningTime, distance },
    addLocation,
    startRunning,
    stopRunning,
    setTime,
  } = useContext(LocationContext);
  const subID = useRef(null);

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

  useEffect(() => {
    // STOPER JEST PROBLEMEM
    navigation.setParams({ running });
  }, [running]);

  return (
    <View style={styles.container}>
      <NavigationEvents onWillBlur={stopForegroundLocationFetching} />
      <Stoper interval={1000} callback={setTime} show={running} />
      <Spacer>
        <View style={styles.card}>
          <Column title="KM" value={distance} />
          <Column title="Czas" value={renderTime()} />
          <Column title="Kcal" value={0} />
        </View>
      </Spacer>
      <Map onIconPress={getUserLocation} />
      <Spacer>
        {running ? (
          <Button title="Stop" onPress={stopTrackingLocation} />
        ) : (
          <Button title="Start" onPress={startTrackingLocation} />
        )}
        <Spacer></Spacer>
        {runningTime > 0 && !running ? (
          <Button
            title="Save The Session"
            onPress={() => console.log("Zapisuje")}
          />
        ) : null}
      </Spacer>
    </View>
  );
};

RunningScreen.navigationOptions = ({ navigation }) => {
  const running = navigation.getParam("running");
  return {
    headerShown: !running,
    title: "Running",
    // headerLeft: () => (
    //   <HeaderBackButton
    //     onPress={async () => {
    //       // const running = navigation.getParam("running");
    //       // const stopStoper = navigation.getParam("stopStoper");
    //       // if (running) {
    //       //   stopStoper();
    //       // }
    //       navigation.navigate("Home");
    //     }}
    //   />
    // ),
  };
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
