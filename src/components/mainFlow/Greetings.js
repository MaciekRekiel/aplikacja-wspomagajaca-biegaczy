import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { colorsMain } from "../../styles/colors";

const Greetings = ({ user }) => {
  const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const firstLetter = (word) => {
    return capitalize(word.charAt(0));
  };

  return (
    <View style={styles.row}>
      <View>
        <Text style={styles.greetingStyle}>Hello,</Text>
        <Text style={styles.loginStyle}>{capitalize(user.login)}</Text>
      </View>
      <View style={styles.avatarContainer}>
        <Text style={styles.avatarText}>{firstLetter(user.login)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 15,
    paddingHorizontal: 20,
  },
  avatarContainer: {
    height: 70,
    width: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colorsMain.secondary,
    elevation: 10,
  },
  avatarText: {
    color: colorsMain.primary,
    fontSize: 24,
  },
  greetingStyle: {
    color: colorsMain.primary,
    fontSize: 24,
    textShadowColor: colorsMain.primary,
    textShadowOffset: { width: 1, height: 0 },
    textShadowRadius: 1,
    letterSpacing: 1.125,
  },
  loginStyle: {
    color: colorsMain.secondary,
    fontSize: 24,
    textShadowColor: colorsMain.shadowColor,
    fontWeight: "700",
    textShadowOffset: { width: 1.5, height: 1.5 },
    textShadowRadius: 1,
    letterSpacing: 1.125,
  },
});

export default Greetings;
