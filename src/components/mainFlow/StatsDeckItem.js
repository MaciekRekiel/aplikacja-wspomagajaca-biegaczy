import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MapView, { Polyline } from "react-native-maps";

import { colorsMain } from "../../styles/colors";
import { SCREEN_WIDTH } from "../../utils/screen";
import { nightMapTheme } from "../../utils/customMapStyles";

import { navigate } from "../../navigationRef";

const StatsDeckItem = ({ stat }) => {
  const renderDistance = () => {
    let renderValue = stat.distance / 1000;
    return `${renderValue.toFixed(2)} km`;
  };

  const renderTime = () => {
    let secValue = stat.totalTime % 60;
    let minValue = Math.floor(stat.totalTime / 60);
    minValue < 10 ? (minValue = `0${minValue}`) : null;
    secValue < 10 ? (secValue = `0${secValue}`) : null;
    return `${minValue}:${secValue}`;
  };

  const renderCalories = () => {
    return `${stat.caloriesBurned.toFixed(1)} Kcal`;
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() =>
        navigate("RunDetailHome", {
          stat,
          from: "Home",
        })
      }
    >
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={[
          colorsMain.cardBackroundPrimary,
          colorsMain.cardBackgroundSecondary,
        ]}
        style={styles.box}
      >
        <Text style={styles.dataHeader}>{stat.date.slice(0, 10)}</Text>
        <View style={styles.row}>
          <View>
            <Text style={styles.textCenter}>Distance</Text>
            <Text style={styles.textCenter}>{renderDistance()}</Text>
          </View>
          <View>
            <Text style={styles.textCenter}>Time</Text>
            <Text style={styles.textCenter}>{renderTime()}</Text>
          </View>
          <View>
            <Text style={styles.textCenter}>Calories</Text>
            <Text style={styles.textCenter}>{renderCalories()}</Text>
          </View>
        </View>
        <MapView
          loadingEnabled
          loadingBackgroundColor={colorsMain.backgroundPrimary}
          style={{ flex: 1 }}
          customMapStyle={nightMapTheme}
          zoomEnabled={false}
          pitchEnabled={false}
          scrollEnabled={false}
          rotateEnabled={false}
          initialRegion={{
            ...stat.route[0].coords,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
          }}
        >
          <Polyline
            strokeColor="rgba(2, 149, 182, 1)"
            strokeWidth={6}
            coordinates={stat.route.map((route) => route.coords)}
          />
          <Polyline
            strokeColor="rgba(31, 255, 218, 0.7)"
            strokeWidth={4}
            coordinates={stat.route.map((route) => route.coords)}
          />
        </MapView>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  box: {
    height: 350,
    width: SCREEN_WIDTH - 30,
    margin: 15,
    borderRadius: 8,
    padding: 15,
    elevation: 5,
  },
  dataHeader: {
    fontSize: 20,
    color: colorsMain.primary,
    marginBottom: 12,
    fontWeight: "bold",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  textCenter: {
    textAlign: "center",
    color: colorsMain.primary,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default StatsDeckItem;
