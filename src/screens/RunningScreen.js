// REACT REACT-NATIVE IMPORTS
import React, { useState, useEffect, useContext, useRef } from "react";
import { ToastAndroid } from "react-native";
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
import { Context as EventContext } from "../context/EventContext";
import { calculateDistance } from "../utils/calculateDistance";
import Map from "../components/Map";
import Stoper from "../components/Stoper";
import Header from "../components/mainFlow/Header";
import CustomBackground from "../components/mainFlow/CustomBackground";
import Button from "../components/mainFlow/Button";
import CardRunning from "../components/mainFlow/CardRunning";
import ModalSelectEvent from "../components/mainFlow/running/ModalSelectEvent";
import ModalEventFinished from "../components/mainFlow/running/ModalEventFinished";

// JESZCZE POKAZAĆ JAKIEGOS MODALA ZE UKONCZONO EVENT :)

const RunningScreen = ({ navigation }) => {
  const {
    state: { token, user },
    fetchStats,
  } = useContext(AuthContext);
  const {
    state: {
      running,
      runningTime,
      distance,
      locations,
      burnedCalories,
      currentLocation,
    },
    addLocation,
    startRunning,
    stopRunning,
    setTime,
    uploadRoute,
    resetStats,
  } = useContext(LocationContext);
  const {
    state: { eventFinished },
    doesFinishedEvent,
    resetFinishedEvent,
  } = useContext(EventContext);

  const [reset, setReset] = useState(false);
  const [showModalSelect, setShowModalSelect] = useState(false);
  const [showModalFinished, setShowModalFinished] = useState(false);
  const [showEventMarkers, setShowEventMarkers] = useState(true);
  const [eventRoute, setEventRoute] = useState({
    choosen: false,
    route: [],
    routeDistance: null,
    eventName: null,
  });
  const subID = useRef(null);

  TaskManager.defineTask("TASK_FETCH_LOCATION", async ({ data, error }) => {
    if (error) {
      return;
    }
    if (data) {
      await addLocation(data.locations[0], running, user);
      if (eventRoute.choosen && eventRoute.route.length) {
        const { routeDistance, route } = eventRoute;
        doesFinishedEvent(
          distance,
          routeDistance,
          currentLocation,
          route[route.length - 1]
        );
      }
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
    try {
      await stopLocationUpdatesAsync("TASK_FETCH_LOCATION");
    } catch (error) {
      console.log(error);
    }
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
      return (
        <Button
          title="Start"
          onPress={() => {
            let distanceBetweenPoints = 0;
            if (eventRoute.choosen) {
              distanceBetweenPoints = calculateDistance(
                currentLocation.coords.latitude,
                currentLocation.coords.longitude,
                eventRoute.route[eventRoute.route.length - 1].coords.latitude,
                eventRoute.route[eventRoute.route.length - 1].coords.longitude
              );
            }

            // YOU MUST BE AT LEAST 20m AWAY FROM START TO BEGIN THE RUN
            if (distanceBetweenPoints > 20)
              ToastAndroid.show(
                "You must be nearby the start!",
                ToastAndroid.SHORT
              );
            else {
              setShowEventMarkers(false);
              startTrackingLocation();
            }
          }}
        />
      );
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

  useEffect(() => {
    if (eventFinished) {
      stopTrackingLocation();
      setReset(true);
    }
  }, [eventFinished]);

  return (
    <>
      <Header
        title="Running"
        backIcon
        backIconOnPress={() => navigation.navigate("Home")}
      />
      <Stoper interval={1000} callback={setTime} show={running} />
      <CustomBackground>
        <NavigationEvents onWillBlur={stopForegroundLocationFetching} />
        <CardRunning
          distance={distance}
          runningTime={runningTime}
          burnedCalories={burnedCalories}
        />
        <Map
          disableIcon={running}
          selectIconOnPress={setShowModalSelect}
          removeIconOnPress={setEventRoute}
          eventRoute={eventRoute}
          showEventMarkers={showEventMarkers}
        />
        {renderButtons()}
        <ModalSelectEvent
          modalVisible={showModalSelect}
          setModalVisible={setShowModalSelect}
          setEventRoute={setEventRoute}
          setShowEventMarkers={setShowEventMarkers}
        />
        <ModalEventFinished
          modalVisible={showModalFinished}
          setModalVisible={setShowModalFinished}
          eventName={eventRoute.eventName}
          resetFinishedEvent={resetFinishedEvent}
        />
      </CustomBackground>
    </>
  );
};

export default RunningScreen;
