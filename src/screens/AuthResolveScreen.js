import React, { useEffect, useContext } from "react";
import { StyleSheet, ActivityIndicator, StatusBar, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { Context as AuthContext } from "../context/AuthContext";

const AuthResolveScreen = () => {
  const { autoLogin } = useContext(AuthContext);

  useEffect(() => {
    setTimeout(() => {
      autoLogin();
    }, 1250);
  }, []);

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={["hsl(203, 68%, 20%)", "hsl(203, 68%, 30%)"]}
      style={styles.container}
    >
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle="light-content"
      />
      <Text style={styles.textStyle}>RunnerApp</Text>
      <ActivityIndicator size={64} color="rgba(211, 74, 74, 1)" />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    fontSize: 36,
    color: "white",
    marginBottom: 45,
  },
});

export default AuthResolveScreen;
