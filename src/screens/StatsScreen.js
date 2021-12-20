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
