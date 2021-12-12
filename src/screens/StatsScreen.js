import React, { useState, useContext } from "react";
import { ScrollView, View, StyleSheet, Dimensions } from "react-native";
import { Text } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { LineChart } from "react-native-chart-kit";

import Spacer from "../components/Spacer";
import Column from "../components/Column";
import CustomBackground from "../components/mainFlow/CustomBackground";
import { Context as AuthContext } from "../context/AuthContext";

const StatsScreen = ({ navigation }) => {
  const [currYear, setCurrYear] = useState(new Date().getFullYear());
  const [currMonth, setCurrMonth] = useState(new Date().getMonth());
  const {
    state: { user },
  } = useContext(AuthContext);

  const chartData = (whichData) => {
    const labels = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const datasets = [
      {
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
    ];
    if (user) {
      if (user.statistics.length > 0) {
        user.statistics.forEach((item) => {
          const index = parseInt(item.date.slice(5, 7)) - 1;
          let value = 0;
          switch (whichData) {
            case "distance":
              value = parseFloat((item.distance / 1000).toFixed(2));
              break;
            case "totalTime":
              value = item.totalTime;
              break;
            case "caloriesBurned":
              value = item.caloriesBurned;
              break;
          }
          datasets[0].data[index] += value;
        });
      }
    }
    return { labels, datasets };
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

  const renderCurrentMonthStats = () => {
    const values = {
      sessions: 0,
      totalTime: 0,
      distance: 0,
      caloriesBurned: 0,
    };

    if (user) {
      if (user.statistics.length > 0) {
        user.statistics.forEach((item) => {
          const index = parseInt(item.date.slice(5, 7)) - 1;
          if (index === currMonth) {
            values.sessions += 1;
            values.totalTime += item.totalTime;
            values.distance += item.distance;
            values.caloriesBurned += item.caloriesBurned;
          }
        });
      }
      return (
        <Spacer>
          <View style={styles.card}>
            <Text h4>Current Month</Text>
            <View style={styles.cardContent}>
              <Column title="Sessions" value={values.sessions} />
              <Column title="Time" value={renderTime(values.totalTime)} />
              <Column title="Km" value={(values.distance / 1000).toFixed(2)} />
              <Column title="Kcal" value={values.caloriesBurned.toFixed(1)} />
            </View>
          </View>
        </Spacer>
      );
    }
  };

  const renderOfAllTimeStats = () => {
    const values = {
      sessions: 0,
      totalTime: 0,
      distance: 0,
      caloriesBurned: 0,
    };

    if (user) {
      if (user.statistics.length > 0) {
        user.statistics.forEach((item) => {
          values.sessions += 1;
          values.totalTime += item.totalTime;
          values.distance += item.distance;
          values.caloriesBurned += item.caloriesBurned;
        });
      }
      return (
        <Spacer>
          <View style={styles.card}>
            <Text h4>Current Month</Text>
            <View style={styles.cardContent}>
              <Column title="Sessions" value={values.sessions} />
              <Column title="Time" value={renderTime(values.totalTime)} />
              <Column title="Km" value={(values.distance / 1000).toFixed(2)} />
              <Column title="Kcal" value={values.caloriesBurned.toFixed(1)} />
            </View>
          </View>
        </Spacer>
      );
    }
  };

  const renderChart = (suffix, whichData, callback) => {
    return (
      <LineChart
        data={callback(whichData)}
        height={220}
        width={Dimensions.get("window").width - 32}
        yAxisSuffix={suffix}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#4775AE",
          backgroundGradientTo: "#233B57",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          marginLeft: 15,
          borderRadius: 16,
        }}
      />
    );
  };

  return (
    <CustomBackground safeAreaSecured justifyContent="flex-start">
      {renderCurrentMonthStats()}
      {renderOfAllTimeStats()}
      {renderChart(" km", "distance", chartData)}
      {renderChart(" s", "totalTime", chartData)}
      {renderChart(" Kcal", "caloriesBurned", chartData)}
    </CustomBackground>
  );
};

StatsScreen.navigationOptions = {
  title: "Statistics",
  tabBarIcon: ({ tintColor }) => {
    return <FontAwesome name="bar-chart" size={20} color={tintColor} />;
  },
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#EDEDE9",
    justifyContent: "space-around",
    padding: 8,
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 5,
    height: 124,
  },
  cardContent: {
    flexDirection: "row",
  },
});

export default StatsScreen;
