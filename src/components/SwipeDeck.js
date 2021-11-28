import React from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MapView from "react-native-maps";

import { SCREEN_WIDTH } from "../utils/screen";
import { nightMapTheme } from "../utils/customMapStyles";

const SwipeDeck = () => {
  return (
    <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={["hsl(203, 68%, 30%)", "hsl(203, 68%, 37%)"]}
        style={styles.box}
      >
        <Text style={styles.dataHeader}>26.11.2021</Text>
        <View style={styles.row}>
          <View>
            <Text style={styles.textCenter}>Distance</Text>
            <Text style={styles.textCenter}>3.33 km</Text>
          </View>
          <View>
            <Text style={styles.textCenter}>Time</Text>
            <Text style={styles.textCenter}>00:14:23</Text>
          </View>
          <View>
            <Text style={styles.textCenter}>Calories</Text>
            <Text style={styles.textCenter}>243 Kcal</Text>
          </View>
        </View>
        <MapView
          style={{ flex: 1 }}
          customMapStyle={nightMapTheme}
          zoomEnabled={false}
          pitchEnabled={false}
          scrollEnabled={false}
          rotateEnabled={false}
          initialRegion={{
            latitude: 51.22598129638144,
            longitude: 22.516728194800063,
            latitudeDelta: 0.0005,
            longitudeDelta: 0.0005,
          }}
        />
      </LinearGradient>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={["hsl(203, 68%, 30%)", "hsl(203, 68%, 37%)"]}
        style={styles.box}
      >
        <Text style={styles.dataHeader}>26.11.2021</Text>
        <View style={styles.row}>
          <View>
            <Text style={styles.textCenter}>Distance</Text>
            <Text style={styles.textCenter}>3.33 km</Text>
          </View>
          <View>
            <Text style={styles.textCenter}>Time</Text>
            <Text style={styles.textCenter}>00:14:23</Text>
          </View>
          <View>
            <Text style={styles.textCenter}>Calories</Text>
            <Text style={styles.textCenter}>243 Kcal</Text>
          </View>
        </View>
        <MapView
          style={{ flex: 1 }}
          customMapStyle={nightMapTheme}
          zoomEnabled={false}
          pitchEnabled={false}
          scrollEnabled={false}
          rotateEnabled={false}
          initialRegion={{
            latitude: 51.22598129638144,
            longitude: 22.516728194800063,
            latitudeDelta: 0.0005,
            longitudeDelta: 0.0005,
          }}
        />
      </LinearGradient>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={["hsl(203, 68%, 30%)", "hsl(203, 68%, 37%)"]}
        style={styles.box}
      >
        <Text style={styles.dataHeader}>26.11.2021</Text>
        <View style={styles.row}>
          <View>
            <Text style={styles.textCenter}>Distance</Text>
            <Text style={styles.textCenter}>3.33 km</Text>
          </View>
          <View>
            <Text style={styles.textCenter}>Time</Text>
            <Text style={styles.textCenter}>00:14:23</Text>
          </View>
          <View>
            <Text style={styles.textCenter}>Calories</Text>
            <Text style={styles.textCenter}>243 Kcal</Text>
          </View>
        </View>
        <MapView
          style={{ flex: 1 }}
          customMapStyle={nightMapTheme}
          zoomEnabled={false}
          pitchEnabled={false}
          scrollEnabled={false}
          rotateEnabled={false}
          initialRegion={{
            latitude: 51.22598129638144,
            longitude: 22.516728194800063,
            latitudeDelta: 0.0005,
            longitudeDelta: 0.0005,
          }}
        />
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  box: {
    height: 350,
    width: SCREEN_WIDTH - 30,
    margin: 15,
    borderRadius: 8,
    padding: 15,
  },
  dataHeader: {
    fontSize: 20,
    color: "hsl(234, 43%, 19%)",
    marginBottom: 12,
    fontWeight: "bold",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  textCenter: {
    textAlign: "center",
    color: "hsl(234, 43%, 19%)",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default SwipeDeck;
