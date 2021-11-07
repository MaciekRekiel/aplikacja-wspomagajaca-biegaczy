import React, { useState, useContext } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import MapView, { Circle, Polyline } from "react-native-maps";

import Spacer from "./Spacer";
import { Context as LocationContext } from "../context/LocationContext";

const Map = () => {
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
      <MapView
        style={styles.map}
        initialRegion={{
          ...currentLocation.coords,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        }}
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
    height: 300,
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
