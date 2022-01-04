import React, { useState } from "react";
import { StyleSheet, Text, ScrollView } from "react-native";

import CurrentMonthItem from "./CurrentMonthItem";
import AllTimeItem from "./AllTimeItem";
import Chart from "./Chart";
import { colorsMain } from "../../../styles/colors";

const SwipeDeck = ({ year, stats }) => {
  const [currYear, setCurrYear] = useState(new Date().getFullYear());
  const renderCurrentMonthItem = () => {
    if (currYear != year) {
      return null;
    } else {
      return <CurrentMonthItem stats={stats} />;
    }
  };

  return (
    <>
      <Text style={styles.title}>{year}</Text>
      <ScrollView
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      >
        {renderCurrentMonthItem()}
        <AllTimeItem stats={stats} />
        <Chart data={stats} type="distance" />
        <Chart data={stats} type="totalTime" />
        <Chart data={stats} type="caloriesBurned" />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    color: colorsMain.primary,
    marginLeft: 15,
  },
});

export default SwipeDeck;
