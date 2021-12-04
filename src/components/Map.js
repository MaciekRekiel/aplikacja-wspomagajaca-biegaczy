import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import MapView, { Circle, Polyline } from "react-native-maps";
import { nightMapTheme } from "../utils/customMapStyles";

import { Context as LocationContext } from "../context/LocationContext";
import { colorsMain } from "../styles/colors";

const Map = () => {
  const {
    state: { currentLocation, locations },
  } = useContext(LocationContext);

  if (!currentLocation) {
    return null;
  }

  return (
    <MapView
      loadingEnabled
      style={styles.map}
      loadingBackgroundColor={colorsMain.backgroundPrimary}
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
        strokeColor="rgba(31, 255, 218, 0.7)"
        strokeWidth={4}
        coordinates={locations.map((loc) => loc.coords)}
      />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    height: 350,
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
