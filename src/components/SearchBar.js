import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const SearchBar = () => {
  return (
    <View style={styles.inputContainer}>
      <FontAwesome style={styles.icon} name="search" />
      <TextInput
        style={styles.input}
        autoCorrect={false}
        placeholder="Search for Event"
        onSubmitEditing={() => console.log("Submited")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: "#EDEDE9",
    height: 54,
    borderRadius: 5,
    margin: 15,
    flexDirection: "row",
    borderRadius: 40,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 18,
    marginRight: 12,
  },
  icon: {
    fontSize: 30,
    alignSelf: "center",
    marginHorizontal: 12,
  },
});

export default SearchBar;
