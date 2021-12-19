import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { colorsMain } from "../../styles/colors";

const CardRunning = ({ distance, runningTime, burnedCalories }) => {
  const renderTime = () => {
    let secValue = runningTime % 60;
    let minValue = Math.floor(runningTime / 60);
    minValue < 10 ? (minValue = `0${minValue}`) : null;
    secValue < 10 ? (secValue = `0${secValue}`) : null;
    return `${minValue}:${secValue}`;
  };

  const renderDistance = () => {
    let kmValue = distance / 1000;
    kmValue = kmValue.toFixed(2);
    return kmValue;
  };

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={[
        colorsMain.cardBackroundPrimary,
        colorsMain.cardBackgroundSecondary,
      ]}
      style={styles.container}
    >
      <Text style={styles.header}>Running Stats</Text>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.textCenter}>Distance</Text>
          <Text style={styles.textCenter}>{renderDistance()}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.textCenter}>Time</Text>
          <Text style={styles.textCenter}>{renderTime()}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.textCenter}>Calories</Text>
          <Text style={styles.textCenter}>{burnedCalories.toFixed(1)}</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    padding: 15,
    borderRadius: 8,
    elevation: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  header: {
    fontSize: 24,
    color: colorsMain.primary,
    fontWeight: "bold",
    marginBottom: 16,
  },
  column: {
    minHeight: 50,
    justifyContent: "space-between",
  },
  textCenter: {
    textAlign: "center",
    color: colorsMain.primary,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default CardRunning;
