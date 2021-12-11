import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

const CustomPicker = ({ items, selectedValue, onValueChange }) => {
  const renderItems = () => {
    return items.map((item) => {
      return (
        <Picker.Item
          key={item}
          style={styles.selectItem}
          label={item}
          value={item}
        />
      );
    });
  };

  return (
    <View style={styles.inputContainer}>
      <Picker
        selectedValue={selectedValue}
        mode="dropdown"
        style={styles.selectStyle}
        dropdownIconColor="white"
        onValueChange={onValueChange}
      >
        {renderItems()}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    minHeight: 48,
    marginVertical: 16,
    fontSize: 18,
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 8,
  },
  selectStyle: {
    flex: 1,

    color: "white",
  },
  selectItem: {
    fontSize: 20,
    color: "black",
  },
});

export default CustomPicker;
