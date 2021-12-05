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

const Button = ({ title, onPress }) => {
  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple(
        colorsMain.headerButtonBackgroundPrimary
      )}
      onPress={onPress}
    >
      <View style={styles.buttonStyle}>
        <Text style={styles.buttonTextStyle}>{title}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

Button.defaultProps = {
  title: "Title",
  onPress: () => console.log("Attach on press handler"),
};

const styles = StyleSheet.create({
  buttonStyle: {
    height: 48,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    borderColor: colorsMain.headerButtonBackgroundPrimary,
    borderWidth: 1.5,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  buttonTextStyle: {
    fontSize: 20,
    textShadowColor: colorsMain.shadowColor,
    fontWeight: "700",
    textShadowOffset: { width: 1.25, height: 1.25 },
    letterSpacing: 1.25,
    textShadowRadius: 1,
    color: colorsMain.headerButtonBackgroundPrimary,
  },
});

export default Button;
