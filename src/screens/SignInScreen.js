import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const SignInScreen = () => {
  return (
    <View>
      <Text>Cos</Text>
      <View>
        <View>
          <TextInput />
        </View>
        <View>
          <TextInput />
        </View>
      </View>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <FontAwesome name="google-plus" size={24} color="black" />
        <FontAwesome name="facebook" size={24} color="black" />
        <TouchableOpacity>
          <FontAwesome name="twitter" size={50} color="black" />
          <Text>Znika</Text>
        </TouchableOpacity>
      </View>
      <Button title="Sign in" onPress={() => console.log("..")} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default SignInScreen;
