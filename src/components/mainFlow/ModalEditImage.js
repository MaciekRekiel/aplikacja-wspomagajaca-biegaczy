import React, { useContext } from "react";
import {
  StyleSheet,
  View,
  Modal,
  TouchableNativeFeedback,
  Text,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";

import { colorsMain } from "../../styles/colors";
import { SCREEN_WIDTH } from "../../utils/screen";
import { Context as AuthContext } from "../../context/AuthContext";

const ModalEditImage = ({ modalVisible, editCallback }) => {
  const {
    state: { token },
    editAvatar,
    uploadAvatar,
  } = useContext(AuthContext);

  const pickImage = async () => {
    editCallback(false);
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) {
      alert("Sorry, we need camera roll permissions to make this work!");
    }
    if (granted) {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      });

      if (!response.cancelled) {
        editAvatar(response.uri);
        await uploadAvatar({ token, imageUri: response.uri });
      }
    }
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
          <Text style={styles.modalHeader}>
            You can <Text style={styles.modalEmpText}>Edit</Text> your avatar
            image here
          </Text>
          <View style={styles.modalRow}>
            <TouchableNativeFeedback
              onPress={() =>
                setTimeout(() => {
                  editCallback(false);
                }, 200)
              }
              background={TouchableNativeFeedback.Ripple(
                colorsMain.headerButtonBackgroundPrimary
              )}
            >
              <View style={styles.modalButton}>
                <Text style={styles.buttonText}>Cancel</Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback
              onPress={pickImage}
              background={TouchableNativeFeedback.Ripple(
                colorsMain.headerButtonBackgroundPrimary
              )}
            >
              <View style={styles.modalButton}>
                <Text style={styles.buttonText}>Choose</Text>
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
    height: 250,
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
    borderColor: colorsMain.secondary,
    borderWidth: 1.5,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  modalHeader: {
    fontSize: 22,
    color: "white",
  },
  modalEmpText: {
    color: colorsMain.secondary,
    textShadowColor: colorsMain.shadowColor,
    fontWeight: "700",
    textShadowOffset: { width: 1.875, height: 1.875 },
    textShadowRadius: 1,
    letterSpacing: 1.125,
  },
  modalRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  buttonText: {
    fontSize: 18,
    color: colorsMain.secondary,
    textShadowColor: colorsMain.shadowColor,
    fontWeight: "700",
  },
});

export default ModalEditImage;
