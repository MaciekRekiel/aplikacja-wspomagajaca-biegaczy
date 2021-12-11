import React from "react";
import {
  StyleSheet,
  View,
  Modal,
  TouchableNativeFeedback,
  Text,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { colorsMain } from "../../styles/colors";
import { SCREEN_WIDTH } from "../../utils/screen";

const ModalInitialAsk = ({ modalVisible, setShowModal, setShowFormModal }) => {
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
          <Text style={styles.modalHeader}>
            Welcome in <Text style={styles.modalEmpText}>RunnerApp</Text>
          </Text>
          <Text style={styles.modalHeader}>
            In order to unlock all features our application provides, all you
            have to do is to complete one last form
          </Text>
          <Text style={styles.modalHeader}>
            You might do it later as well via{" "}
            <Text style={styles.modalEmpText}>Profile</Text> panel
          </Text>
          <View style={styles.modalRow}>
            <TouchableNativeFeedback
              onPress={() =>
                setTimeout(() => {
                  setShowModal(false);
                }, 150)
              }
              background={TouchableNativeFeedback.Ripple(
                colorsMain.headerButtonBackgroundPrimary
              )}
            >
              <View style={styles.modalButton}>
                <Text style={styles.buttonText}>Later</Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback
              onPress={() => {
                setTimeout(() => {
                  setShowModal(false);
                  setTimeout(() => {
                    setShowFormModal(true);
                  }, 150);
                }, 150);
              }}
              background={TouchableNativeFeedback.Ripple(
                colorsMain.headerButtonBackgroundPrimary
              )}
            >
              <View style={styles.modalButton}>
                <Text style={styles.buttonText}>To From</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
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
  modalButton: {
    minHeight: 48,
    minWidth: 100,
    backgroundColor: "transparent",
    borderColor: colorsMain.headerButtonBackgroundPrimary,
    borderWidth: 1.5,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  modalHeader: {
    marginVertical: 8,
    fontSize: 22,
    color: "white",
  },
  modalEmpText: {
    color: colorsMain.headerButtonBackgroundSecondary,
    textShadowColor: colorsMain.shadowColor,
    fontWeight: "700",
    textShadowOffset: { width: 1.875, height: 1.875 },
    textShadowRadius: 1,
    letterSpacing: 1.125,
  },
  modalRow: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  buttonText: {
    fontSize: 18,
    color: colorsMain.headerButtonBackgroundPrimary,
    textShadowColor: colorsMain.shadowColor,
    fontWeight: "700",
    textShadowOffset: { width: 1.875, height: 1.875 },
    textShadowRadius: 1,
  },
});

export default ModalInitialAsk;
