import React, { useContext } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { LineChart } from "react-native-chart-kit";

import CustomBackground from "../components/mainFlow/CustomBackground";
import StatsComponent from "../components/mainFlow/StatsComponent";
import { Context as AuthContext } from "../context/AuthContext";
import Chart from "../components/mainFlow/Chart";

const StatsScreen = ({ navigation }) => {
  const {
    state: { user },
  } = useContext(AuthContext);

  if (!user) {
    return null;
  }

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
      <StatsComponent
        title="Current Month"
        stats={user.statistics}
        onlyThisMonth
      />
      <StatsComponent title="All Time" stats={user.statistics} />
      <Chart data={user.statistics} type="distance" />
      <Chart data={user.statistics} type="totalTime" />
      <Chart data={user.statistics} type="caloriesBurned" />
    </CustomBackground>
  );
};

const styles = StyleSheet.create({});

export default StatsScreen;
