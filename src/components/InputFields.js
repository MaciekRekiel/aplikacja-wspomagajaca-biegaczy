import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const InputFields = () => {
  return (
    <View style={styles.inputFieldsView}>
      <View style={styles.inputView}>
        <AntDesign style={styles.inputIcon} name="user" color="black" />
        <TextInput style={styles.inputStyle} placeholder="Email or Username" />
      </View>
      <View style={styles.inputView}>
        <Feather style={styles.inputIcon} name="lock" color="black" />
        <TextInput style={styles.inputStyle} placeholder="Password" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputFieldsView: {
    top: 100,
  },
  inputView: {
    display: "flex",
    flexDirection: "row",
    marginHorizontal: 10,
    borderColor: "#86BBD8",
    borderWidth: 2,
    marginBottom: 16,
    alignItems: "center",
  },
  inputIcon: {
    fontSize: 32,
    padding: 4,
    borderRightWidth: 2,
    borderColor: "#86BBD8",
  },
  inputStyle: {
    flex: 1,
    fontSize: 24,
    paddingLeft: 10,
  },
});

export default InputFields;
