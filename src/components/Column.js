import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-elements";

const Column = ({ title, value }) => {
  return (
    <View style={styles.container}>
      <Text>({title})</Text>
      <Text>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
});

export default Column;
