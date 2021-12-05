import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { requestForegroundPermissionsAsync } from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Context as AuthContext } from "../context/AuthContext";
import { Context as LocationContext } from "../context/LocationContext";
import Spacer from "../components/Spacer";
import SwipeDeck from "../components/SwipeDeck";
import Header from "../components/mainFlow/Header";
import Stoper from "../components/Stoper";
import Greetings from "../components/mainFlow/Greetings";
import CustomBackground from "../components/mainFlow/CustomBackground";
import Button from "../components/mainFlow/Button";
import ModalInitialAsk from "../components/mainFlow/ModalInitialAsk";
import ModalForm from "../components/mainFlow/ModalForm";

const HomeScreen = ({ navigation }) => {
  const { state, signout } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const {
    state: { permissions, running },
    grantPermissions,
    rejectPermissions,
    setTime,
  } = useContext(LocationContext);

  const getPermissionsAndTryShowModal = async () => {
    try {
      // PERMISSION PART
      const { granted } = await requestForegroundPermissionsAsync();
      if (!granted) {
        rejectPermissions();
        throw new Error("Location permission not granted");
      }
      grantPermissions();
      // MODAL PART
      const modalWasShown = await AsyncStorage.getItem("modalWasShown");

      // NEGACJA !modalWasShown zeby dzialalo
      if (modalWasShown) {
        await AsyncStorage.setItem("modalWasShown", "1");
        setShowModal(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // INITIAL PERMISSION REQUEST
  useEffect(() => {
    if (!permissions) {
      getPermissionsAndTryShowModal();
    }
  }, []);

  return (
    <>
      <Header title="Home" rightButton rightButtonCallback={signout} />
      <Stoper interval={1000} callback={setTime} show={running} />
      <CustomBackground>
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
            <Button
              title="Request Permissions"
              onPress={getPermissionsAndTryShowModal}
            />
          )}
        </Spacer>
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
