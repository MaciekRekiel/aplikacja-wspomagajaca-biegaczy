import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

import { colorsMain } from "../../../styles/colors";

const Chart = ({ data, type }) => {
  const [chartData, setChartData] = useState({
    labels: [
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
    ],
    datasets: [
      {
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
    ],
  });
  const [sufix, setSufix] = useState(" km");

  useEffect(() => {
    const datasets = retrieveData();
    switch (type) {
      case "distance":
        setSufix(" km");
        break;
      case "totalTime":
        setSufix(" h");
        break;
      case "caloriesBurned":
        setSufix(" Kcal");
        break;
    }
    setChartData({ ...chartData, datasets });
  }, [data]);

  const retrieveData = () => {
    const datasets = [
      {
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
    ];
    data.forEach((item) => {
      const index = parseInt(item.date.slice(5, 7)) - 1;
      let value = 0;
      switch (type) {
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
    if (type === "totalTime") {
      datasets[0].data = datasets[0].data.map((item) => {
        return parseFloat((item / 3600).toFixed(2));
      });
    }
    return datasets;
  };

  return (
    <LineChart
      data={chartData}
      height={280}
      width={Dimensions.get("window").width - 32}
      yAxisSuffix={sufix}
      chartConfig={{
        backgroundGradientFrom: colorsMain.cardBackroundPrimary,
        backgroundGradientTo: colorsMain.cardBackgroundSecondary,
        decimalPlaces: sufix === " h" ? 2 : 1, // optional, defaults to 2dp
        color: (opacity = 1) => `hsla(200, 77%, 92%, ${opacity})`,
        labelColor: (opacity = 1) => `hsla(200, 77%, 92%, ${opacity})`,
        propsForDots: {
          r: "6",
          strokeWidth: "3",
          stroke: colorsMain.secondary,
        },
      }}
      style={styles.container}
      bezier
    />
  );
};

Chart.defaultProps = {
  data: [],
  type: "distance",
  setLoading: () => {},
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: "hidden",
  },
});

export default Chart;
