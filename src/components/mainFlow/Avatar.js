import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  Modal,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import { colorsMain } from "../../styles/colors";

import { SCREEN_WIDTH } from "../../utils/screen";
import { ScrollView } from "react-native-gesture-handler";

const Avatar = ({ name, size, edit, editCallback, modalVisible }) => {
  const styles = StyleSheet.create({
    avatarContainer: {
      height: size,
      width: size,
      borderRadius: size / 2,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colorsMain.secondary,
      elevation: 10,
    },
    avatarText: {
      color: colorsMain.primary,
      fontSize: size / 2.9,
    },
    circle: {
      backgroundColor: colorsMain.primary,
      position: "absolute",
      height: size / 2.4,
      width: size / 2.4,
      borderWidth: 2,
      borderColor: colorsMain.backgroundPrimary,
      borderRadius: size,
      right: -2,
      bottom: -2,
      overflow: "hidden",
    },
    insideCircle: {
      backgroundColor: colorsMain.primary,
      position: "absolute",
      height: size / 2.4,
      width: size / 2.4,
      borderWidth: 2,
      borderColor: colorsMain.backgroundPrimary,
      borderRadius: size,
      right: -2,
      bottom: -2,
      overflow: "hidden",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    modalBackground: {
      flexGrow: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalBody: {
      height: 250,
      width: SCREEN_WIDTH - 50,
      borderRadius: 16,
      backgroundColor: "white",
      justifyContent: "center",
    },
    modalButton: {
      height: 30,
      backgroundColor: "red",
      marginHorizontal: 16,
      borderRadius: 8,
    },
  });

  const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const firstLetter = (word) => {
    return capitalize(word.charAt(0));
  };

  const renderEditButton = (bool) => {
    return bool ? (
      <View style={styles.circle}>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple(
            colorsMain.headerButtonBackgroundPrimary
          )}
          onPress={() => editCallback(true)}
        >
          <View style={styles.insideCircle}>
            <Feather
              name="edit"
              size={size / 4}
              color={colorsMain.backgroundPrimary}
            />
          </View>
        </TouchableNativeFeedback>
      </View>
    ) : null;
  };

  return (
    <View style={styles.avatarContainer}>
      <Text style={styles.avatarText}>{firstLetter(name)}</Text>
      {renderEditButton(edit)}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        statusBarTranslucent={true}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalBody}>
            <TouchableNativeFeedback
              onPress={() =>
                setTimeout(() => {
                  editCallback(false);
                }, 200)
              }
            >
              <View style={styles.modalButton}>
                <Text>AAA</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </Modal>
    </View>
  );
};

Avatar.defaultProps = {
  letter: "A",
  size: 50,
  edit: false,
  editCallback: () => console.log("Attach on press listener"),
  modalVisible: false,
};

export default Avatar;
