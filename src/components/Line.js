import React from "react";
import { View } from "react-native";

const Line = ({ width }) => {
  const styles = () => {
    return {
      borderBottomWidth: 1,
      borderColor: "white",
      width,
      alignSelf: "center",
      marginVertical: 15,
    };
  };
  return <View style={styles()} />;
};

export default Line;
