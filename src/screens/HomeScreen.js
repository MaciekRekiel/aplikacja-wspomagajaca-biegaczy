import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Avatar, Button } from "react-native-elements";
import { requestForegroundPermissionsAsync } from "expo-location";
import * as TaskManager from "expo-task-manager";

import { Context as AuthContext } from "../context/AuthContext";
import { Context as LocationContext } from "../context/LocationContext";
import Spacer from "../components/Spacer";
import Card from "../components/Card";

const HomeScreen = ({ navigation }) => {
  const [loc, setLoc] = useState(null);
  useEffect(() => {
    if (loc) {
      addLocation(loc, running);
    }
  }, [loc]);
  TaskManager.defineTask("TASK_FETCH_LOCATION", async ({ data, error }) => {
    if (error) {
      console.log(error.message);
      return;
    }
    if (data) {
      const { locations } = data;
      setLoc(locations[0]);
    }
  });

  const { state, signout } = useContext(AuthContext);
  const {
    state: { permissions, running },
    grantPermissions,
    rejectPermissions,
    addLocation,
  } = useContext(LocationContext);

  const getPermissions = async () => {
    try {
      const { granted } = await requestForegroundPermissionsAsync();
      if (!granted) {
        rejectPermissions();
        throw new Error("Location permission not granted");
      }
      grantPermissions();
    } catch (error) {
      console.log(error);
    }
  };

  // INITIAL PERMISSION REQUEST
  useEffect(() => {
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
          {permissions ? (
            <Button
              title="Start Running"
              onPress={() => navigation.navigate("Running")}
            />
          ) : (
            <Button title="Request Permissions" onPress={getPermissions} />
          )}
        </Spacer>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#161A31",
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
