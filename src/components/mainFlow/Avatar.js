import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import { colorsMain } from "../../styles/colors";
import ModalEditImage from "./ModalEditImage";
import { Context as AuthContext } from "../../context/AuthContext";

const Avatar = ({ name, size, edit, editCallback, modalVisible }) => {
  const {
    state: { avatar },
  } = useContext(AuthContext);

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

  if (avatar) {
    return (
      <View>
        <Image
          source={{ uri: avatar }}
          style={{
            height: size,
            width: size,
            borderRadius: size / 2,
            justifyContent: "center",
            alignItems: "center",
          }}
        />
        {renderEditButton(edit)}
        <ModalEditImage
          modalVisible={modalVisible}
          editCallback={editCallback}
        />
      </View>
    );
  }

  return (
    <View style={styles.avatarContainer}>
      <Text style={styles.avatarText}>{firstLetter(name)}</Text>
      {renderEditButton(edit)}
      <ModalEditImage modalVisible={modalVisible} editCallback={editCallback} />
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
