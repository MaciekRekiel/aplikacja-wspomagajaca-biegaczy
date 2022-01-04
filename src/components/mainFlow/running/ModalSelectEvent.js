import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  FlatList,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { Context as EventContext } from "../../../context/EventContext";
import { SCREEN_WIDTH } from "../../../utils/screen";
import { colorsMain } from "../../../styles/colors";
import { calculateDistance } from "../../../utils/calculateDistance";
import Button from "../Button";

const ModalSelectEvent = ({
  modalVisible,
  setModalVisible,
  setEventRoute,
  setShowEventMarkers,
}) => {
  const {
    state: { myEvents },
  } = useContext(EventContext);

  const renderItem = ({ item }) => {
    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple(colorsMain.secondary)}
        onPress={() => {
          let routeDistance = 0;
          const { route } = item;
          for (let i = 0; i < route.length - 1; i++) {
            routeDistance += calculateDistance(
              route[i].coords.latitude,
              route[i].coords.longitude,
              route[i + 1].coords.latitude,
              route[i + 1].coords.longitude
            );
          }
          setModalVisible(false);
          setShowEventMarkers(true);
          setEventRoute({
            choosen: true,
            route,
            routeDistance,
            eventName: item.name,
          });
        }}
      >
        <View style={styles.listItem}>
          <Text style={styles.listItemText}>{item.name}</Text>
          <Text style={styles.listItemText}>{item.address.city}</Text>
        </View>
      </TouchableNativeFeedback>
    );
  };

  const renderList = () => {
    if (!myEvents.length) {
      return (
        <>
          <Text style={styles.modalText}>
            You don't take part in any upcoming event.
          </Text>
          <Text style={styles.modalText}>
            Join one of them in order to be able to select the route and
            participate
          </Text>
          <Button title="Go Back" onPress={() => setModalVisible(false)} />
        </>
      );
    }

    return (
      <>
        <Text style={styles.modalText}>Select one of these events</Text>
        <FlatList
          keyExtractor={(item) => item._id}
          data={myEvents}
          renderItem={renderItem}
        />
        <Button title="Go Back" onPress={() => setModalVisible(false)} />
      </>
    );
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      statusBarTranslucent={true}
    >
      <View style={styles.modalBackground}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.modalBody}
          colors={[
            colorsMain.backgroundPrimary,
            colorsMain.backgroundSecondary,
          ]}
        >
          {renderList()}
        </LinearGradient>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.75)",
  },
  modalBody: {
    width: SCREEN_WIDTH - 50,
    padding: 16,
    borderRadius: 8,
    justifyContent: "space-around",
    elevation: 10,
  },
  modalText: {
    color: colorsMain.primary,
    fontSize: 22,
    marginBottom: 12,
    marginHorizontal: 15,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: colorsMain.secondary,
    padding: 8,
    borderRadius: 4,
    marginHorizontal: 15,
    marginBottom: 8,
  },
  listItemText: {
    color: colorsMain.primary,
    fontSize: 18,
  },
});

export default ModalSelectEvent;
