// REACT REACT-NATIVE IMPORTS
import React, { useState, useEffect, useContext, useRef } from "react";
import { StyleSheet } from "react-native";
import { NavigationEvents } from "react-navigation";
import * as TaskManager from "expo-task-manager";
import {
  Accuracy,
  stopLocationUpdatesAsync,
  startLocationUpdatesAsync,
  watchPositionAsync,
} from "expo-location";

// REUSABLE COMPONENTS IMPORT
import { Context as LocationContext } from "../context/LocationContext";
import { Context as AuthContext } from "../context/AuthContext";
import Map from "../components/Map";
import Stoper from "../components/Stoper";
import Header from "../components/mainFlow/Header";
import CustomBackground from "../components/mainFlow/CustomBackground";
import Button from "../components/mainFlow/Button";
import CardRunning from "../components/mainFlow/CardRunning";

// import serverInstance from "../apis/server";

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

  // const addEventTemp = async (token, route) => {
  //   const name = "Tour de Dom";
  //   const details = "Takes part in my house";
  //   const address = {
  //     country: "Polska",
  //     city: "Gródki",
  //     street: "Gródki Pierwsze",
  //   };
  //   const date = new Date();
  //   date.setDate(24);
  //   const maxParticipants = 10;
  //   try {
  //     await serverInstance.post(
  //       "/events",
  //       {
  //         name,
  //         details,
  //         address,
  //         date,
  //         maxParticipants,
  //         route,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     console.log("Done?");
  //   } catch (error) {
  //     console.log(error.response.data);
  //   }
  // };

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
              // await addEventTemp(token, locations);
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
        <CardRunning
          distance={distance}
          runningTime={runningTime}
          burnedCalories={burnedCalories}
        />
        <Map />
        {renderButtons()}
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
