import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import MapView, { Polyline } from "react-native-maps";

import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";

import { nightMapTheme } from "../utils/customMapStyles";
import { colorsMain } from "../styles/colors";
import CustomBackground from "../components/mainFlow/CustomBackground";
import Header from "../components/mainFlow/Header";

const RunDetailsScreen = ({ navigation: { navigate, getParam } }) => {
  const [data, setData] = useState(null);
  const [from, setFrom] = useState("Home");

  useEffect(() => {
    const stat = getParam("stat");
    const from = getParam("from");
    setFrom(from);
    setData(stat);
  }, []);

  const renderTime = (totalTime) => {
    let secValue = totalTime % 60;
    let minValue = Math.floor(totalTime / 60);
    let hourValue = Math.floor(totalTime / 3600);
    secValue < 10 ? (secValue = `0${secValue}`) : null;
    minValue < 10 ? (minValue = `0${minValue}`) : null;
    hourValue < 10 ? (hourValue = `0${hourValue}`) : null;
    return `${hourValue}:${minValue}:${secValue}`;
  };

  if (!data) {
    return (
      <>
        <Header title="Stats" backIcon backIconOnPress={() => navigate(from)} />
        <CustomBackground justifyContent={"center"}>
          <ActivityIndicator size={64} color="rgba(211, 74, 74, 1)" />
        </CustomBackground>
      </>
    );
  }

  return (
    <>
      <Header title="Stats" backIcon backIconOnPress={() => navigate(from)} />
      <CustomBackground justifyContent="flex-start">
        <Text style={styles.textHeader}>
          {data.date.slice(0, 10)} Session details
        </Text>
        <View style={styles.mainRow}>
          <Text style={styles.text}>Distance:</Text>

          <View style={styles.row}>
            <FontAwesome5
              name="shoe-prints"
              size={18}
              color={colorsMain.secondary}
            />
            <Text style={styles.textIcon}>{`${(data.distance / 1000).toFixed(
              2
            )} km`}</Text>
          </View>
        </View>
        <View style={styles.mainRow}>
          <Text style={styles.text}>Distance in meters:</Text>

          <View style={styles.row}>
            <FontAwesome5
              name="shoe-prints"
              size={18}
              color={colorsMain.secondary}
            />
            <Text style={styles.textIcon}>{`${data.distance} m`}</Text>
          </View>
        </View>
        <View style={styles.mainRow}>
          <Text style={styles.text}>Total time:</Text>

          <View style={styles.row}>
            <FontAwesome5 name="clock" size={20} color={colorsMain.secondary} />
            <Text style={styles.textIcon}>{renderTime(data.totalTime)}</Text>
          </View>
        </View>
        <View style={styles.mainRow}>
          <Text style={styles.text}>Average speed:</Text>

          <View style={styles.row}>
            <FontAwesome5
              name="running"
              size={22}
              color={colorsMain.secondary}
            />
            <Text style={styles.textIcon}>{`${data.averageSpeed} km/h`}</Text>
          </View>
        </View>
        <View style={styles.mainRow}>
          <Text style={styles.text}>Burned calories:</Text>

          <View style={styles.row}>
            <MaterialIcons
              name="no-food"
              size={24}
              color={colorsMain.secondary}
            />
            <Text style={styles.textIcon}>{`${data.caloriesBurned} Kcal`}</Text>
          </View>
        </View>
        <MapView
          loadingEnabled
          loadingBackgroundColor={colorsMain.backgroundPrimary}
          style={styles.map}
          customMapStyle={nightMapTheme}
          initialRegion={{
            ...data.route[0].coords,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
          }}
        >
          <Polyline
            strokeColor="rgba(2, 149, 182, 1)"
            strokeWidth={6}
            coordinates={data.route.map((route) => route.coords)}
          />
          <Polyline
            strokeColor="rgba(31, 255, 218, 0.7)"
            strokeWidth={4}
            coordinates={data.route.map((route) => route.coords)}
          />
        </MapView>
      </CustomBackground>
    </>
  );
};

const styles = StyleSheet.create({
  textHeader: {
    fontSize: 24,
    color: colorsMain.primary,
    marginHorizontal: 24,
    paddingVertical: 16,
    borderBottomColor: colorsMain.secondary,
    borderBottomWidth: 2,
  },
  text: {
    fontSize: 20,
    color: colorsMain.primary,
  },
  textIcon: {
    marginLeft: 8,
    fontSize: 20,
    color: colorsMain.primary,
  },
  mainRow: {
    marginHorizontal: 24,
    marginVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  map: {
    height: 350,
    marginVertical: 24,
  },
});

export default RunDetailsScreen;
