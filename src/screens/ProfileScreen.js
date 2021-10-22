import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-elements";

const ProfileScreen = ({ navigation }) => {
  return (
    <View>
      <Text h3>Profile Screen</Text>
      <Button title="Click me" onPress={() => navigation.navigate("Home")} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default ProfileScreen;
