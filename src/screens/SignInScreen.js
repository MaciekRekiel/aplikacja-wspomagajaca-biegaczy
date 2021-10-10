import React, { useState } from "react";
import { View, StyleSheet, Text, Button } from "react-native";

import InputFields from "../components/InputFields";
import IconFields from "../components/IconFields";

const SignInScreen = () => {
  return (
    <View style={styles.signInView}>
      <InputFields />
      <IconFields />
      <Button title="Sign in" onPress={() => console.log("..")} />
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
    justifyContent: "space-between",
  },
});

export default SignInScreen;
