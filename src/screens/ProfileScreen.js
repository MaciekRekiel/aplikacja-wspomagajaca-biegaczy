import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";

const ProfileScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Text h3>Profile Screen</Text>
    </SafeAreaView>
  );
};

ProfileScreen.navigationOptions = {
  title: "Profile",
  tabBarIcon: ({ tintColor }) => {
    return <FontAwesome name="user" size={20} color={tintColor} />;
  },
};

const styles = StyleSheet.create({});

export default ProfileScreen;
