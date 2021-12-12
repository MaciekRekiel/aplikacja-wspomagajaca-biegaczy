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
    console.log(whichData);
    console.log(user.statistics[0][whichData]);
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
      <Spacer>
        <View style={styles.card}>
          <Text h4>Current Month</Text>
          <View style={styles.cardContent}>
            <Column title="Sessions" value={0} />
            <Column title="Time" value={0} />
            <Column title="Km" value={0} />
            <Column title="Kcal" value={0} />
          </View>
        </View>
      </Spacer>
      <Spacer>
        <View style={styles.card}>
          <Text h4>Of All Time</Text>
          <View style={styles.cardContent}>
            <Column title="Sessions" value={0} />
            <Column title="Time" value={0} />
            <Column title="Km" value={0} />
            <Column title="Kcal" value={0} />
          </View>
        </View>
      </Spacer>
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
