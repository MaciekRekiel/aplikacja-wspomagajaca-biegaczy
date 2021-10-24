import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Circle } from "react-native-maps";

import Spacer from "../components/Spacer";
import Column from "../components/Column";

const RunningScreen = () => {
  const [start, setStart] = useState(false);
  const [time, setTime] = useState(0);

  // useEffect(() => {
  //   let id = setInterval(() => {
  //     setTime((currentValue) => {
  //       return currentValue + 1;
  //     });
  //   }, 1000);
  // }, []);

  const initalRegion = {
    latitude: 51.23612,
    longitude: 22.5489,
    longitudeDelta: 0.005,
    latitudeDelta: 0.005,
  };

  return (
    <View style={styles.container}>
      <Spacer>
        <View style={styles.card}>
          <Column title="KM" value={0} />
          <Column title="Czas" value={time} />
          <Column title="Kcal" value={0} />
        </View>
      </Spacer>
      <Spacer>
        <MapView style={styles.map} initialRegion={initalRegion}>
          <Circle
            center={{ latitude: 51.23612, longitude: 22.5489 }}
            radius={15}
            strokeColor="rgba(73, 151, 253, 1)"
            fillColor="rgba(73, 151, 253, 0.3)"
          />
        </MapView>
      </Spacer>
      <Spacer>
        <Button
          title={start ? "Stop" : "Start"}
          onPress={() => setStart(!start)}
        />
      </Spacer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
  },
  card: {
    backgroundColor: "#EDEDE9",
    flexDirection: "row",
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
    height: 100,
  },
  map: {
    height: 300,
  },
});

export default RunningScreen;
