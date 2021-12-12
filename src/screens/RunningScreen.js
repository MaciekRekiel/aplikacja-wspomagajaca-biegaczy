// REACT REACT-NATIVE IMPORTS
import React, { useState, useEffect, useContext, useRef } from "react";
import { View, StyleSheet, StatusBar, ScrollView } from "react-native";
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
import { Context as AuthContext } from "../context/AuthContext";
import Spacer from "../components/Spacer";
import Column from "../components/Column";
import Map from "../components/Map";
import Stoper from "../components/Stoper";
import Header from "../components/mainFlow/Header";
import CustomBackground from "../components/mainFlow/CustomBackground";
import Button from "../components/mainFlow/Button";

const RunningScreen = ({ navigation }) => {
  const [reset, setReset] = useState(false);
  const {
    state: { token, user },
    fetchStats,
  } = useContext(AuthContext);
  const {
    state: { running, runningTime, distance, locations, burnedCalories },
    addLocation,
    startRunning,
    stopRunning,
    setTime,
    uploadRoute,
    resetStats,
  } = useContext(LocationContext);
  const subID = useRef(null);

  TaskManager.defineTask("TASK_FETCH_LOCATION", async ({ data, error }) => {
    if (error) {
      console.log(error.message);
      return;
    }
    if (data) {
      addLocation(data.locations[0], running, user);
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
      //distanceInterval: 2,
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

  const renderDistance = () => {
    let kmValue = distance / 1000;
    kmValue = kmValue.toFixed(2);
    return kmValue;
  };

  const renderButtons = () => {
    if (reset) {
      return (
        <>
          <Button
            title="Reset"
            onPress={() => {
              resetStats();
              setReset(false);
            }}
          />
          <Button
            title="Save The Session"
            onPress={async () => {
              await uploadRoute({
                token,
                runningTime,
                distance,
                burnedCalories,
                route: locations,
              });
              resetStats();
              setReset(false);
              await fetchStats();
            }}
          />
        </>
      );
    }
    if (running) {
      return (
        <Button
          title="Stop"
          onPress={() => {
            stopTrackingLocation();
            setReset(true);
          }}
        />
      );
    }
    if (!running && !reset) {
      return <Button title="Start" onPress={startTrackingLocation} />;
    }
  };

  // INITIAL FOREGROUND FETCHING
  useEffect(() => {
    if (!running && !reset) {
      startForegroundLocationFetching();
    }
    return () => {
      stopForegroundLocationFetching();
    };
  }, [running, reset]);

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
            <Column title="KM" value={renderDistance()} />
            <Column title="Czas" value={renderTime()} />
            <Column title="Kcal" value={burnedCalories.toFixed(1)} />
          </LinearGradient>
        </Spacer>
        <Map />
        {renderButtons()}
        {/* <Spacer>
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
              onPress={() => {
                uploadRoute({
                  token,
                  runningTime,
                  distance,
                  burnedCalories,
                  route: locations,
                });
              }}
            />
          ) : null}
        </Spacer> */}
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
