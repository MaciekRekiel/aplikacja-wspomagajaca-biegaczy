import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, ScrollView, StatusBar } from "react-native";
import { Avatar, Button } from "react-native-elements";
import { requestForegroundPermissionsAsync } from "expo-location";
import * as TaskManager from "expo-task-manager";
import { LinearGradient } from "expo-linear-gradient";

import { Context as AuthContext } from "../context/AuthContext";
import { Context as LocationContext } from "../context/LocationContext";
import Spacer from "../components/Spacer";
import Card from "../components/Card";
import SwipeDeck from "../components/SwipeDeck";
import Header from "../components/Header";
import Stoper from "../components/Stoper";

const HomeScreen = ({ navigation }) => {
  // const [loc, setLoc] = useState(null);
  // useEffect(() => {
  //   if (loc) {
  //     addLocation(loc, running);
  //   }
  // }, [loc]);

  const { state, signout } = useContext(AuthContext);
  const {
    state: { permissions, running },
    grantPermissions,
    rejectPermissions,
    addLocation,
    setTime,
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
    <>
      <Header title="Home" backIcon />
      <Stoper interval={1000} callback={setTime} show={running} />
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingTop: 90 }}>
        <StatusBar
          barStyle="light-content"
          translucent={true}
          backgroundColor="transparent"
        />

        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={["hsl(231, 33%, 16%)", "hsl(218, 69%, 20%)"]}
          style={styles.container}
        >
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
            <SwipeDeck />
            <SwipeDeck />
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
        </LinearGradient>
      </ScrollView>
    </>
  );
};

HomeScreen.navigationOptions = () => {
  return {
    headerStyle: {
      backgroundColor: "hsl(234, 43%, 19%)",
    },
    headerShown: false,
    headerTintColor: "white",
  };
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
    elevation: 5,
  },
  avatar: {
    shadowColor: "#000",
    elevation: 10,
    borderWidth: 2,
    borderColor: "hsl(203, 68%, 27%)",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 15,
  },
});

export default HomeScreen;
