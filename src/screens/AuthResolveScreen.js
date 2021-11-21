import React, { useEffect, useContext } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";

import { Context as AuthContext } from "../context/AuthContext";

const AuthResolveScreen = () => {
  const { autoLogin } = useContext(AuthContext);
  useEffect(() => {
    autoLogin();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#00f" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AuthResolveScreen;
