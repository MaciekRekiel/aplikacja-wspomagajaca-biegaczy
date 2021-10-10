import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import InputFields from "../components/InputFields";
import IconFields from "../components/IconFields";

const source = {
  uri: "https://images.pexels.com/photos/694587/pexels-photo-694587.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
};

const SignInScreen = () => {
  return (
    <View style={styles.signInView}>
      <ImageBackground source={source} resizeMode="cover" style={styles.image}>
        <View style={styles.overlay}>
          <InputFields />
          <IconFields />
          {/* <Button
        style={styles.signInButton}
        title="Sign in"
        onPress={() => console.log("..")}
      /> */}
          <TouchableOpacity style={styles.signInButton}>
            <Text style={styles.buttonText}>SIGN IN</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  signInView: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  image: {
    flex: 1,
  },
  overlay: {
    justifyContent: "space-between",
    flex: 1,
    backgroundColor: "rgba(86, 73, 76, 0.6)",
  },
  signInButton: {
    backgroundColor: "#86BBD8",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default SignInScreen;
