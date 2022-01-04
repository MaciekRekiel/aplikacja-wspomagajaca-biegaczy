import React from "react";
import { View, Text, StyleSheet, Modal } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { SCREEN_WIDTH } from "../../../utils/screen";
import { colorsMain } from "../../../styles/colors";
import Button from "../Button";

const ModalEventFinished = ({
  modalVisible,
  setModalVisible,
  eventName,
  resetFinishedEvent,
}) => {
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
          <Text style={styles.modalText}>Congratulations!</Text>
          <Text style={styles.modalText}>
            You've finished the event {eventName}
          </Text>
          <Button
            title="Finish"
            onPress={() => {
              resetFinishedEvent();
              setModalVisible(false);
            }}
          />
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
});

export default ModalEventFinished;
