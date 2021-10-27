import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import Spacer from "./Spacer";

const Link = ({ title, callback }) => {
  return (
    <TouchableOpacity onPress={callback}>
      <Spacer>
        <Text style={styles.link}>{title}</Text>
      </Spacer>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  link: {
    color: "blue",
  },
});

export default Link;
