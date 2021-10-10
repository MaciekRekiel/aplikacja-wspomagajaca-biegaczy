import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import { FontAwesome } from "@expo/vector-icons";

const IconFields = () => {
  return (
    <View style={styles.iconView}>
      <TouchableOpacity style={styles.button}>
        <FontAwesome style={styles.icon} name="google-plus" color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <FontAwesome style={styles.icon} name="facebook" color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <FontAwesome style={styles.icon} name="twitter" color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  iconView: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    borderWidth: 2,
    borderColor: "black",
    width: 100,
    height: 100,
    borderRadius: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontSize: 40,
    padding: 20,
  },
});

export default IconFields;
