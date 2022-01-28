import React, { useState, useEffect, useContext } from "react";
import { ActivityIndicator, View, Text, StyleSheet } from "react-native";

import { Context as AuthContext } from "../context/AuthContext";
import { colorsMain } from "../styles/colors";
import CustomBackground from "../components/mainFlow/CustomBackground";
import SwipeDeck from "../components/mainFlow/stats/SwipeDeck";

const StatsScreen = () => {
  const {
    state: { user },
  } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [component, setComponent] = useState(null);

  useEffect(() => {
    if (user) {
      prepareComponents(user.statistics);
    }
  }, [user]);

  if (!user) {
    return null;
  }

  const prepareComponents = async (stats) => {
    if (!stats.length) {
      const nothingToRender = (
        <View style={styles.container}>
          <Text style={styles.header}>You didn't run so far</Text>
          <Text style={styles.caption}>
            Finish at least one running session in order to display your stats
          </Text>
        </View>
      );
      setComponent(nothingToRender);
      setLoading(false);
      return;
    }

    // I WANT TO MODIFY THE ARR, CANT DO IT ON STATS
    let arr = [...stats];
    // UNIQUE YEARS DESCENDING ORDER
    const uniqueYears = [
      ...new Set(stats.map((item) => parseInt(item["date"].slice(0, 4)))),
    ];
    uniqueYears.sort((a, b) => b - a);

    const renderItems = uniqueYears.map((year) => {
      // GET ONLY THE STATS THAT ARE OF THIS YEAR AND DELETE THEM FROM ARR
      const theYearStats = arr.filter(
        (item) => item["date"].slice(0, 4) == year
      );
      arr = arr.filter((item) => item["date"].slice(0, 4) != year);
      return <SwipeDeck key={year} year={year} stats={theYearStats} />;
    });
    setComponent(renderItems);
    setLoading(false);
  };

  if (loading) {
    return (
      <CustomBackground safeAreaSecured justifyContent="center">
        <ActivityIndicator size={64} color={colorsMain.secondary} />
      </CustomBackground>
    );
  }

  return (
    <CustomBackground safeAreaSecured justifyContent="flex-start">
      {component}
    </CustomBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    justifyContent: "center",
  },
  header: {
    marginHorizontal: 15,
    fontSize: 28,
    color: colorsMain.primary,
  },
  caption: {
    marginHorizontal: 15,
    marginTop: 8,
    fontSize: 18,
    color: colorsMain.primary,
  },
});

export default StatsScreen;
