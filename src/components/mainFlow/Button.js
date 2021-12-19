import React from "react";
import { StyleSheet, View, TouchableNativeFeedback, Text } from "react-native";

import { colorsMain } from "../../styles/colors";

const Button = ({ title, onPress }) => {
  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple(colorsMain.secondary)}
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
    borderColor: colorsMain.secondary,
    borderWidth: 2,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 4,
  },
  buttonTextStyle: {
    fontSize: 20,
    fontWeight: "700",
    color: colorsMain.secondary,
  },
});

export default Button;
