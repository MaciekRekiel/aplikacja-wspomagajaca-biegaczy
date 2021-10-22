import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Input, Text, Button } from "react-native-elements";

import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import Spacer from "../components/Spacer";

const SignupScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Spacer>
        <Text h3>Sign Up</Text>
      </Spacer>
      <Input
        label="Username"
        leftIcon={<AntDesign name="user" size={24} color="grey" />}
        placeholder="Username"
        autoCorrect={false}
        autoCapitalize="none"
      />
      <Input
        label="Email"
        leftIcon={<MaterialIcons name="email" size={24} color="grey" />}
        placeholder="email@address.com"
        autoCorrect={false}
        autoCapitalize="none"
      />
      <Input
        label="Password"
        leftIcon={<Entypo name="lock" size={24} color="grey" />}
        placeholder="password"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
      />
      <Input
        label="Confirm Password"
        leftIcon={<Entypo name="lock" size={24} color="grey" />}
        placeholder="confirm password"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
      />
      <Spacer>
        <Button title="Sign Up" />
      </Spacer>
      <TouchableOpacity onPress={() => navigation.navigate("Signin")}>
        <Spacer>
          <Text style={styles.link}>
            Already have an account? Try to sign in!
          </Text>
        </Spacer>
      </TouchableOpacity>
    </View>
  );
};

SignupScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 100,
  },
  link: {
    color: "blue",
  },
});

export default SignupScreen;
