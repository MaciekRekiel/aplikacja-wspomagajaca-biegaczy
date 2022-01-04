import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { colorsMain } from "../../styles/colors";
import { navigate } from "../../navigationRef";
import Button from "./Button";

const StatsComponent = ({ title, stats, onlyThisMonth }) => {
  const [currMonth, setCurrMonth] = useState(new Date().getMonth());
  const [renderValues, setRenderValues] = useState({
    sessions: 0,
    totalTime: 0,
    distance: 0,
    caloriesBurned: 0,
    stats: [],
  });

  useEffect(() => {
    const values = {
      sessions: 0,
      totalTime: 0,
      distance: 0,
      caloriesBurned: 0,
      stats: [],
    };

    if (stats.length > 0) {
      stats.forEach((stat) => {
        const index = parseInt(stat.date.slice(5, 7)) - 1;
        if (onlyThisMonth) {
          if (index === currMonth) {
            values.sessions += 1;
            values.totalTime += stat.totalTime;
            values.distance += stat.distance;
            values.caloriesBurned += stat.caloriesBurned;
            values.stats = [...values.stats, stat];
          }
        } else {
          values.sessions += 1;
          values.totalTime += stat.totalTime;
          values.distance += stat.distance;
          values.caloriesBurned += stat.caloriesBurned;
          values.stats = [...values.stats, stat];
        }
      });
    }
    setRenderValues(values);
  }, [stats]);

  if (!stats) {
    return null;
  }

  const onPressButton = () => {
    navigate("AllStats", { stats: renderValues, thisMonth: onlyThisMonth });
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

  const renderList = () => {
    // RENDER FIRST 3 OF THEM
    let renderItems = [];
    if (!onlyThisMonth) {
      renderItems = stats.slice(0, 3).map((stat) => {
        return (
          <TouchableOpacity
            key={stat._id}
            onPress={() =>
              navigate("RunDetailStats", {
                id: stat._id,
                navigateWhere: "Stats",
              })
            }
          >
            <View style={styles.listItem}>
              <Text style={styles.listItemText}>{stat.date.slice(0, 10)}</Text>
              <Text style={styles.listItemText}>
                {renderTime(stat.totalTime)}
              </Text>
              <Text style={styles.listItemText}>
                {`${(stat.distance / 1000).toFixed(2)} km`}
              </Text>
            </View>
          </TouchableOpacity>
        );
      });
    } else {
      const reverseArr = [...stats].reverse();
      renderItems = reverseArr.slice(0, 3).map((stat) => {
        return (
          <TouchableOpacity
            key={stat._id}
            onPress={() =>
              navigate("RunDetailStats", {
                id: stat._id,
                navigateWhere: "Stats",
              })
            }
          >
            <View style={styles.listItem}>
              <Text style={styles.listItemText}>{stat.date.slice(0, 10)}</Text>
              <Text style={styles.listItemText}>
                {renderTime(stat.totalTime)}
              </Text>
              <Text style={styles.listItemText}>
                {`${(stat.distance / 1000).toFixed(2)} km`}
              </Text>
            </View>
          </TouchableOpacity>
        );
      });
    }
    return (
      <>
        <View style={{ marginVertical: 20 }}>{renderItems}</View>
        {renderValues.sessions > 3 ? (
          <Button title="Show More" onPress={onPressButton} />
        ) : null}
      </>
    );
  };

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={[
        colorsMain.cardBackroundPrimary,
        colorsMain.cardBackgroundSecondary,
      ]}
      style={styles.box}
    >
      <Text style={styles.title}>{title}</Text>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.columnText}>(Sessions)</Text>
          <Text style={styles.columnText}>{renderValues.sessions}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.columnText}>(Time)</Text>
          <Text style={styles.columnText}>
            {renderTime(renderValues.totalTime)}
          </Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.columnText}>(Km)</Text>
          <Text style={styles.columnText}>
            {(renderValues.distance / 1000).toFixed(2)}
          </Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.columnText}>(Kcal)</Text>
          <Text style={styles.columnText}>
            {renderValues.caloriesBurned.toFixed(1)}
          </Text>
        </View>
      </View>
      {renderList()}
    </LinearGradient>
  );
};

StatsComponent.defaultProps = {
  title: "Some title",
  stats: [],
  currentMonth: false,
};

const styles = StyleSheet.create({
  box: {
    minHeight: 148,
    margin: 15,
    borderRadius: 8,
    padding: 15,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    color: colorsMain.primary,
  },
  titleLoading: {
    fontSize: 28,
    color: colorsMain.primary,
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    flex: 1,
    borderBottomWidth: 2,
    borderColor: colorsMain.secondary,
  },
  column: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  columnText: {
    fontSize: 16,
    color: colorsMain.primary,
  },
  listItem: {
    marginTop: 8,
    borderWidth: 0.5,
    borderRadius: 4,
    borderColor: colorsMain.secondary,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  listItemText: {
    color: colorsMain.primary,
    fontSize: 16,
  },
});

export default StatsComponent;
