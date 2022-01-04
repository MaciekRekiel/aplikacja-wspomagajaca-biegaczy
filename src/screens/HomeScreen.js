import React, { useState, useEffect, useContext } from "react";
import { View } from "react-native";
import { requestForegroundPermissionsAsync } from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Context as AuthContext } from "../context/AuthContext";
import { Context as LocationContext } from "../context/LocationContext";
import { Context as EventContext } from "../context/EventContext";
import SwipeDeck from "../components/SwipeDeck";
import Header from "../components/mainFlow/Header";
import Stoper from "../components/Stoper";
import Greetings from "../components/mainFlow/Greetings";
import CustomBackground from "../components/mainFlow/CustomBackground";
import Button from "../components/mainFlow/Button";
import ModalInitialAsk from "../components/mainFlow/ModalInitialAsk";
import ModalForm from "../components/mainFlow/ModalForm";
import EventsCard from "../components/mainFlow/EventsCard";

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
  } = useContext(EventContext);

  const [showModal, setShowModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);

  const getPermissions = async () => {
    const { granted } = await requestForegroundPermissionsAsync();
    if (!granted) rejectPermissions();
    grantPermissions();
  };

  const tryShowModal = async () => {
    const modalWasShown = await AsyncStorage.getItem("modalWasShown");
    if (!modalWasShown) {
      await AsyncStorage.setItem("modalWasShown", "1");
      setShowModal(true);
    }
  };

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

  // INITIAL PERMISSION REQUEST
  useEffect(() => {
    if (!permissions) {
      getPermissionsAndTryShowModal();
    } else {
      getMyEvents();
    }
  }, []);

  return (
    <>
      <Header title="Home" rightButton rightButtonCallback={signout} />
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
