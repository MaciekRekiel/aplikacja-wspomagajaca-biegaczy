import React from "react";
import { ScrollView, View, StyleSheet, Dimensions } from "react-native";
import { Text } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { LineChart } from "react-native-chart-kit";

import Spacer from "../components/Spacer";
import Column from "../components/Column";

const StatsScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <ScrollView>
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
        <LineChart
          data={{
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
                data: [
                  Math.floor(Math.random() * 25),
                  Math.floor(Math.random() * 25),
                  Math.floor(Math.random() * 25),
                  Math.floor(Math.random() * 25),
                  Math.floor(Math.random() * 25),
                  Math.floor(Math.random() * 25),
                  Math.floor(Math.random() * 25),
                  Math.floor(Math.random() * 25),
                  Math.floor(Math.random() * 25),
                  Math.floor(Math.random() * 25),
                  Math.floor(Math.random() * 25),
                  Math.floor(Math.random() * 25),
                ],
              },
            ],
          }}
          width={Dimensions.get("window").width - 30} // from react-native
          height={220}
          yAxisSuffix=" km"
          yAxisInterval={1} // optional, defaults to 1
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
      </ScrollView>
    </SafeAreaView>
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
