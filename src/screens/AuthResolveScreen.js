import React, { useEffect, useContext } from "react";
import { StyleSheet, ActivityIndicator, StatusBar, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { Context as AuthContext } from "../context/AuthContext";
import { colorsMain } from "../styles/colors";

const AuthResolveScreen = () => {
  const { autoLogin } = useContext(AuthContext);

  useEffect(() => {
    setTimeout(() => {
      autoLogin();
    }, 850);
  }, []);

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={[colorsMain.backgroundPrimary, colorsMain.backgroundSecondary]}
      style={styles.container}
    >
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle="light-content"
      />
      <Text style={styles.textStyle}>RunnerApp</Text>
      <ActivityIndicator size={64} color={colorsMain.secondary} />
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
