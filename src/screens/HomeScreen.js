import React, { useState, useEffect, useContext } from "react";
import { View } from "react-native";
import { requestForegroundPermissionsAsync } from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Context as AuthContext } from "../context/AuthContext";
import { Context as LocationContext } from "../context/LocationContext";
import { Context as EventContext } from "../context/EventContext";
import Header from "../components/mainFlow/Header";
import CustomBackground from "../components/mainFlow/CustomBackground";
import Greetings from "../components/mainFlow/Greetings";
import Button from "../components/mainFlow/Button";
import SwipeDeck from "../components/SwipeDeck";
import EventsCard from "../components/mainFlow/EventsCard";
import Stoper from "../components/Stoper";
import ModalInitialAsk from "../components/mainFlow/ModalInitialAsk";
import ModalForm from "../components/mainFlow/ModalForm";

const HomeScreen = ({ navigation }) => {
  const {
    state: { user, token },
    signout,
  } = useContext(AuthContext);
  const {
    state: { permissions, running },
    grantPermissions,
    rejectPermissions,
    setTime,
  } = useContext(LocationContext);
  const {
    state: { myEvents },
    searchForMyEvents,
    signOut,
  } = useContext(EventContext);

  const [showModal, setShowModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);

  // INITIAL GEOLOCALIZATION PERMISIONS
  const getPermissions = async () => {
    const { granted } = await requestForegroundPermissionsAsync();
    if (!granted) rejectPermissions();
    grantPermissions();
  };

  // INITIAL MODAL TO SHOW
  const tryShowModal = async () => {
    const modalWasShown = await AsyncStorage.getItem("modalWasShown");
    if (!modalWasShown) {
      await AsyncStorage.setItem("modalWasShown", "1");
      setShowModal(true);
    }
  };

  // SEARCH FOR EVENT THE USER TAKES PART IN
  const getMyEvents = async () => {
    if (user) {
      if (user.events.length) {
        await searchForMyEvents();
      }
    }
  };

  const getPermissionsAndTryShowModal = async () => {
    try {
      await getPermissions(); // PERMISSION PART
      await getMyEvents(); // MY EVENTS PART
      await tryShowModal(); // MODAL PART
    } catch (error) {
      return;
    }
  };

  // RENDERS 3 LAST RECORDS
  const renderSwipeDeck = () => {
    if (user) {
      if (user.statistics.length > 0) {
        const stats = [...user.statistics];
        stats.reverse();
        return <SwipeDeck stats={stats.slice(0, 3)} />;
      }
    }
    return null;
  };

  const renderMyEvents = () => {
    if (user) {
      return (
        <EventsCard
          header="My Events"
          caption="You don't take part in any event..."
          from="Home"
          to="EventDetailsHome"
          type="my_events"
          items={myEvents}
          userEvents={user.events}
          token={token}
        />
      );
    }
  };

  const clearContext = () => {
    signout();
    signOut();
  };

  useEffect(() => {
    if (!permissions) {
      getPermissionsAndTryShowModal();
    } else {
      getMyEvents();
    }
  }, []);

  return (
    <>
      <Header title="Home" rightButton rightButtonCallback={clearContext} />
      <Stoper interval={1000} callback={setTime} show={running} />
      <CustomBackground>
        <View>
          <Greetings user={user} />
          {renderSwipeDeck()}
          {renderMyEvents()}
        </View>
        {permissions ? (
          <Button
            title="Start Running"
            onPress={() => navigation.navigate("Running")}
          />
        ) : (
          <Button
            title="Request Permissions"
            onPress={getPermissionsAndTryShowModal}
          />
        )}
        <ModalInitialAsk
          modalVisible={showModal}
          setShowModal={setShowModal}
          setShowFormModal={setShowFormModal}
        />
        <ModalForm
          modalVisible={showFormModal}
          setShowFormModal={setShowFormModal}
        />
      </CustomBackground>
    </>
  );
};

export default HomeScreen;
