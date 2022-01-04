import React, { useContext } from "react";
import { View, StyleSheet, TouchableOpacity, Icon } from "react-native";
import MapView, { Circle, Polyline, Marker } from "react-native-maps";
import { Feather } from "@expo/vector-icons";

import { nightMapTheme } from "../utils/customMapStyles";
import { Context as LocationContext } from "../context/LocationContext";
import { colorsMain } from "../styles/colors";

const Map = ({
  disableIcon,
  selectIconOnPress,
  removeIconOnPress,
  eventRoute,
  showEventMarkers,
}) => {
  const {
    state: { currentLocation, locations },
  } = useContext(LocationContext);

  const renderEventRoute = () => {
    return (
      <>
        <Polyline
          strokeColor="rgba(2, 149, 182, 0.5)"
          strokeWidth={10}
          coordinates={eventRoute.route.map((loc) => loc.coords)}
        />
        {showEventMarkers ? (
          <>
            <Marker
              coordinate={{
                latitude: eventRoute.route[0].coords.latitude,
                longitude: eventRoute.route[0].coords.longitude,
              }}
              title="Start"
              description="Event Start"
              pinColor={"green"}
            />
            <Marker
              coordinate={{
                latitude:
                  eventRoute.route[eventRoute.route.length - 1].coords.latitude,
                longitude:
                  eventRoute.route[eventRoute.route.length - 1].coords
                    .longitude,
              }}
              title="Finish"
              description="Event Finish"
              pinColor={"red"}
            />
          </>
        ) : null}
      </>
    );
  };

  const renderIcons = () => {
    return eventRoute.choosen ? (
      <TouchableOpacity
        disabled={disableIcon}
        style={styles.icon}
        onPress={() => {
          removeIconOnPress({
            choosen: false,
            route: [],
            routeDistance: null,
            eventName: null,
          });
        }}
      >
        <Feather name="x" size={36} color={colorsMain.primary} />
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        disabled={disableIcon}
        style={styles.icon}
        onPress={() => selectIconOnPress(true)}
      >
        <Feather name="map" size={36} color={colorsMain.primary} />
      </TouchableOpacity>
    );
  };

  if (!currentLocation) {
    return null;
  }

  return (
    <View>
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
        {eventRoute.choosen ? renderEventRoute() : null}
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
      {renderIcons()}
    </View>
  );
};

Map.defaultProps = {
  disableIcon: false,
  selectIconOnPress: () => console.log("Attach an on press handler"),
  removeIconOnPress: () => console.log("Attach an on press handler"),
};

const styles = StyleSheet.create({
  map: {
    height: 350,
  },
  icon: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colorsMain.cardBackgroundSecondary,
    height: 64,
    width: 64,
    borderRadius: 32,
    top: 8,
    right: 8,
    borderWidth: 0.5,
    borderColor: colorsMain.primary,
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
