import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Avatar, Button } from "react-native-elements";
import * as TaskManager from "expo-task-manager";
import * as BackgroundFetch from "expo-background-fetch";
import {
  requestForegroundPermissionsAsync,
  requestBackgroundPermissionsAsync,
  getCurrentPositionAsync,
  Accuracy,
} from "expo-location";

import { Context as AuthContext } from "../context/AuthContext";
import { Context as LocationContext } from "../context/LocationContext";
import Spacer from "../components/Spacer";
import Card from "../components/Card";

const HomeScreen = ({ navigation }) => {
  const { state, signout } = useContext(AuthContext);
  const {
    state: { currentLocation, permissions },
    grantPermissions,
    rejectPermissions,
    addLocation,
  } = useContext(LocationContext);

  useEffect(() => {
    const getPermissions = async () => {
      try {
        const { granted: foregroundGranted } =
          await requestForegroundPermissionsAsync();
        if (!foregroundGranted) {
          rejectPermissions();
          throw new Error("Location permission not granted");
        }
        const location = await getCurrentPositionAsync({
          accuracy: Accuracy.BestForNavigation,
        });
        addLocation(location);
        grantPermissions();
      } catch (error) {
        console.log(error);
      }
    };

    getPermissions();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <View style={styles.row}>
            <Avatar
              rounded
              size="large"
              containerStyle={styles.avatar}
              source={{
                uri: "https://images.generated.photos/hHCTnFYWP99SDS2h1nNRN8EPgD5j4oco54V78LD3jEg/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LmNvbmQvMmJkOGRj/Y2QtZDg1NS00ZTEy/LWE0NzAtYjEyNDcz/MzJmYjFlLmpwZw.jpg",
              }}
            />
            <Button
              type="outline"
              buttonStyle={{ paddingHorizontal: 20 }}
              title="Sign out"
              onPress={signout}
            />
          </View>
          <Card title="Twoje Nadchodzące Eventy..." data={[]} />
        </View>
        <Spacer>
          <Button
            title="Rozpocznij Bieg"
            onPress={() => navigation.navigate("Running")}
          />
        </Spacer>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#EDEDE9",
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
  },
  avatar: {
    shadowColor: "#000",
    elevation: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 15,
  },
});

export default HomeScreen;
