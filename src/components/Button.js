import React from "react";
import { StyleSheet } from "react-native";
import { Button as ElemButton } from "react-native-elements";

import Spacer from "./Spacer";
import { colorsAuth } from "../styles/colors";

const Button = ({ title, onPress, loading }) => {
  return (
    <Spacer>
      <ElemButton
        title={title}
        containerStyle={styles.buttonContainerStyle}
        titleStyle={styles.buttonTitleStyle}
        buttonStyle={styles.buttonStyle}
        onPress={onPress}
        loading={loading}
      />
    </Spacer>
  );
};

const styles = StyleSheet.create({
  buttonContainerStyle: {
    borderRadius: 40,
    fontSize: 24,
    elevation: 10,
  },
  buttonStyle: {
    backgroundColor: colorsAuth.primary,
    height: 48,
  },
  buttonTitleStyle: {
    fontSize: 18,
  },
});

export default Button;
