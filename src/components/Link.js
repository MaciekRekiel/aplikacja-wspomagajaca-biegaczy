import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import Spacer from "./Spacer";

import { colorsAuth } from "../styles/colors";

const Link = ({ callback, children }) => {
  return (
    <TouchableOpacity onPress={callback}>
      <Spacer>
        <Text style={styles.link}>{children}</Text>
      </Spacer>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  link: {
    color: colorsAuth.secondary,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default Link;
