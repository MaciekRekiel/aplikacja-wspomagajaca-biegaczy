import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { colorsMain } from "../../../styles/colors";
import { SCREEN_WIDTH } from "../../../utils/screen";
import { navigate } from "../../../navigationRef";
import { renderTime } from "../../../utils/renderTime";
import Button from "../Button";

const AllTimeItem = ({ stats }) => {
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

    stats.forEach((stat) => {
      values.sessions += 1;
      values.totalTime += stat.totalTime;
      values.distance += stat.distance;
      values.caloriesBurned += stat.caloriesBurned;
      values.stats = [...values.stats, stat];
    });
    setRenderValues(values);
  }, [stats]);

  if (!stats) {
    return null;
  }

  const renderList = () => {
    let renderItems = [];
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
    return (
      <>
        <View style={{ marginVertical: 20 }}>{renderItems}</View>
        {renderValues.sessions > 3 ? (
          <Button
            title="Show More"
            onPress={() => {
              navigate("AllStats", {
                stats: renderValues,
              });
            }}
          />
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
      <Text style={styles.title}>All Time</Text>
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

AllTimeItem.defaultProps = {
  stats: [],
};

const styles = StyleSheet.create({
  box: {
    minHeight: 148,
    maxHeight: 424,
    margin: 15,
    borderRadius: 8,
    padding: 15,
    elevation: 5,
    width: SCREEN_WIDTH - 30,
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
    minHeight: 96,
    borderBottomWidth: 2,
    borderColor: colorsMain.secondary,
  },
  column: {
    justifyContent: "space-around",
    alignItems: "center",
  },
  columnText: {
    fontSize: 15,
    fontWeight: "bold",
    color: colorsMain.primary,
  },
  listItem: {
    marginTop: 6,
    borderWidth: 0.5,
    borderRadius: 4,
    paddingHorizontal: 4,
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

export default AllTimeItem;
