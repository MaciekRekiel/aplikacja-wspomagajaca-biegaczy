import React, { useState, useEffect, useContext, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import * as TaskManager from "expo-task-manager";
import {
  Accuracy,
  requestForegroundPermissionsAsync,
  requestBackgroundPermissionsAsync,
  stopLocationUpdatesAsync,
  startLocationUpdatesAsync,
  watchPositionAsync,
} from "expo-location";

import Spacer from "../components/Spacer";
import Column from "../components/Column";
import Map from "../components/Map";
import { Context as LocationContext } from "../context/LocationContext";

const RunningScreen = () => {
  const { state, addLocation, startRunning, stopRunning } =
    useContext(LocationContext);
  const [loc, setLoc] = useState(null);
  // Memorize the callback -> changes everytime running flag changes
  // const callback = useCallback(
  //   (location) => {
  //     addLocation(location, state.running);
  //   },
  //   [state.running]
  // );

  TaskManager.defineTask("TASK_FETCH_LOCATION", async ({ data, error }) => {
    if (error) {
      console.log(error.message);
      return;
    }
    if (data) {
      const { locations } = data;
      const { latitude, longitude } = locations[0].coords;
      console.log(`Lat: ${latitude}\tLon: ${longitude}`);
      console.log(loc);
      setLoc(locations[0]);
    }
  });

  const startTrackingLocation = async () => {
    await startLocationUpdatesAsync("TASK_FETCH_LOCATION", {
      accuracy: Accuracy.BestForNavigation,
      timeInterval: 1000,
      distanceInterval: 5,
      foregroundService: {
        notificationTitle: "Using your location",
        notificationBody:
          "To turn off, go back to the app and switch stop navigating.",
      },
    });
    startRunning();
  };

  const stopTrackingLocation = async () => {
    await stopLocationUpdatesAsync("TASK_FETCH_LOCATION");
    stopRunning();
  };

  useEffect(() => {
    if (loc) {
      addLocation(loc, state.running);
    }
  }, [loc]);

  // useEffect(() => {
  //   let subscriber;

  //   const startWatching = async () => {
  //     try {
  //       subscriber = await watchPositionAsync(
  //         {
  //           accuracy: Accuracy.BestForNavigation,
  //           timeInterval: 1000,
  //           distanceInterval: 5,
  //         },
  //         callback
  //       );
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   if (state.running) {
  //     startWatching();
  //   } else {
  //     if (subscriber) {
  //       subscriber.remove();
  //       subscriber = null;
  //     }
  //   }
  //   return () => {
  //     if (subscriber) {
  //       subscriber.remove();
  //       subscriber = null;
  //     }
  //   };
  // }, [state.running, callback]);

  return (
    <View style={styles.container}>
      <Spacer>
        <View style={styles.card}>
          <Column title="KM" value={0} />
          <Column title="Czas" value={0} />
          <Column title="Kcal" value={0} />
        </View>
      </Spacer>
      <Map />
      <Spacer>
        {state.running ? (
          <Button title="Stop" onPress={stopTrackingLocation} />
        ) : (
          <Button title="Start" onPress={startTrackingLocation} />
        )}
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

/*

 useEffect(() => {
    let subscriber;
    const startWatching = async () => {
      try {
        const { granted: foregroundGranted } =
          await requestForegroundPermissionsAsync();
        if (!foregroundGranted) {
          throw new Error("Location permission not granted");
        }
        const { granted: backgroundGranted } =
          await requestBackgroundPermissionsAsync();
        if (!backgroundGranted) {
          throw new Error("Background permission not granted");
        }

        subscriber = await watchPositionAsync(
          {
            accuracy: Accuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 5,
          },
          callback
        );
      } catch (error) {
        console.log(error);
      }
    };

    if (state.running) {
      startWatching();
    } else {
      if (subscriber) {
        subscriber.remove();
        subscriber = null;
      }
    }
    return () => {
      if (subscriber) {
        subscriber.remove();
        subscriber = null;
      }
    };
  }, [state.running, callback]);

*/
