import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

import { FontAwesome } from "@expo/vector-icons";

const IconFields = () => {
  return (
    <View style={styles.iconFieldsView}>
      <Text style={styles.text}>Connect with</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  iconFieldsView: {
    top: 70,
  },
  text: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: "center",
    fontWeight: "700",
    color: "#86BBD8",
  },
  iconView: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    borderWidth: 5,
    borderColor: "#86BBD8",
    width: 100,
    height: 100,
    borderRadius: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontSize: 40,
    padding: 20,
    color: "#86BBD8",
  },
});

export default IconFields;
