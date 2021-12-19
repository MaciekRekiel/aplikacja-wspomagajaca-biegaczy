import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { Context as AuthContext } from "../context/AuthContext";
import Header from "../components/mainFlow/Header";
import CustomBackground from "../components/mainFlow/CustomBackground";
import { colorsMain } from "../styles/colors";

const AllStatsScreen = ({ navigation }) => {
  const [stats, setStats] = useState({
    sessions: 0,
    totalTime: 0,
    distance: 0,
    caloriesBurned: 0,
    stats: [],
  });
  const [thisMonth, setThisMonth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setStats(navigation.getParam("stats"));
    setThisMonth(navigation.getParam("thisMonth"));
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <>
        <Header
          backIcon
          backIconOnPress={() => navigation.navigate("Stats")}
          title="Stats"
        />
        <CustomBackground justifyContent="center">
          <ActivityIndicator size={64} color={colorsMain.secondary} />
        </CustomBackground>
      </>
    );
  }

  if (!stats) {
    return null;
  }

  const renderList = () => {
    const newArr = [...stats.stats].reverse();
    const renderItems = newArr.map((stat) => {
      return (
        <TouchableOpacity
          style={styles.listItem}
          key={stat._id}
          onPress={() =>
            navigation.navigate("RunDetailStats", {
              id: stat._id,
              navigateWhere: "AllStats",
              from: thisMonth ? "Current Month" : "All Time",
              stats,
            })
          }
        >
          <LinearGradient
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 4,
              paddingVertical: 8,
              borderRadius: 4,
            }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={[
              colorsMain.cardBackroundPrimary,
              colorsMain.cardBackgroundSecondary,
            ]}
          >
            <Text style={styles.listItemText}>{stat.date.slice(0, 10)}</Text>
            <Text style={styles.listItemText}>
              {renderTime(stat.totalTime)}
            </Text>
            <Text style={styles.listItemText}>{`${(
              stat.distance / 1000
            ).toFixed(2)} km`}</Text>
            <Text style={styles.listItemText}>
              {`${stat.caloriesBurned} Kcal`}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      );
    });
    return (
      <View style={{ marginTop: 20, marginHorizontal: 8 }}>{renderItems}</View>
    );
  };

  const renderTime = (time) => {
    let secValue = time % 60;
    let minValue = Math.floor(time / 60);
    let hourValue = Math.floor(time / 3600);
    minValue < 10 ? (minValue = `0${minValue}`) : null;
    secValue < 10 ? (secValue = `0${secValue}`) : null;
    hourValue < 10 ? (hourValue = `0${hourValue}`) : null;
    return `${hourValue}:${minValue}:${secValue}`;
  };

  return (
    <>
      <Header
        backIcon
        backIconOnPress={() => navigation.navigate("Stats")}
        title="Stats"
      />
      <CustomBackground justifyContent="flex-start">
        <Text style={styles.header}>{`${
          thisMonth ? "Current Month" : "All Time"
        } Stats`}</Text>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.columnText}>(Sessions)</Text>
            <Text style={styles.columnText}>{stats.sessions}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.columnText}>(Time)</Text>
            <Text style={styles.columnText}>{renderTime(stats.totalTime)}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.columnText}>(Km)</Text>
            <Text style={styles.columnText}>
              {(stats.distance / 1000).toFixed(2)}
            </Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.columnText}>(Kcal)</Text>
            <Text style={styles.columnText}>
              {stats.caloriesBurned.toFixed(1)}
            </Text>
          </View>
        </View>
        {renderList()}
      </CustomBackground>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 8,
    fontSize: 28,
    color: colorsMain.primary,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    marginHorizontal: 8,
    borderBottomWidth: 2,
    borderColor: colorsMain.secondary,
  },
  column: {
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    minHeight: 56,
  },
  columnText: {
    fontSize: 16,
    color: colorsMain.primary,
  },
  listItem: {
    marginVertical: 2.5,
    borderRadius: 4,
    borderColor: colorsMain.secondary,
    borderWidth: 0.5,
  },
  listItemText: {
    color: colorsMain.primary,
    fontSize: 16,
    flex: 1,
    textAlign: "center",
  },
});

export default AllStatsScreen;
