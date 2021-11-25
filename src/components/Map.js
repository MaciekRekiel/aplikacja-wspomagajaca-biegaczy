import React, { useContext } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import MapView, { Circle, Polyline } from "react-native-maps";
import { nightMapTheme } from "../utils/customMapStyles"
import { Icon } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";

import Spacer from "./Spacer";
import { Context as LocationContext } from "../context/LocationContext";

const Map = ({ onIconPress }) => {
  const {
    state: { currentLocation, locations },
  } = useContext(LocationContext);

  if (!currentLocation) {
    return (
      <Spacer>
        <ActivityIndicator size="large" color="#00f" />
      </Spacer>
    );
  }

  return (
    <Spacer>
      <View style={styles.icon}>
        <Icon
          reverse
          name="map-marker"
          type="font-awesome"
          color="rgba(73, 151, 253, 1)"
          onPress={onIconPress}
        />
      </View>
      <MapView
        style={styles.map}
        customMapStyle={nightMapTheme}
        initialRegion={{
          ...currentLocation.coords,
          latitudeDelta: 0.002,
          longitudeDelta: 0.002,
        }}
        region={{
          ...currentLocation.coords,
          latitudeDelta: 0.002,
          longitudeDelta: 0.002,
        }}
        onPress={() => console.log("HA")}
      >
        <Circle
          center={currentLocation.coords}
          radius={3}
          strokeColor="rgba(73, 151, 253, 1)"
          fillColor="rgba(73, 151, 253, 0.3)"
        />
        <Polyline
          strokeColor="rgba(2, 149, 182, 1)"
          strokeWidth={6}
          coordinates={locations.map((loc) => loc.coords)}
        />
        <Polyline
          // lineDashPattern={[1]}
          strokeColor="rgba(31, 255, 218, 0.7)"
          strokeWidth={4}
          coordinates={locations.map((loc) => loc.coords)}
        />
      </MapView>
    </Spacer>
  );
};

const styles = StyleSheet.create({
  map: {
    position: "relative",
    height: 300,
  },
  icon: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 10,
  },
});

export default Map;

/*
I am using expo, so I go to node_modules/react-native-maps/lib/components/MapPolyline.js and comment "lineJoin" and "lineCap" properties:

const defaultProps = {
strokeColor: '#0',
strokeWidth: 1,
// lineJoin: 'round',
// lineCap: 'round',
};

and it works because I found out "lineCap" cannot be set to default whenever the "lineDashPattern" property is null.
*/