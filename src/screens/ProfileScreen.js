import React, { useState, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { Context as AuthContext } from "../context/AuthContext";
import CustomBackground from "../components/mainFlow/CustomBackground";
import Avatar from "../components/mainFlow/Avatar";
import { colorsMain } from "../styles/colors";
import Button from "../components/mainFlow/Button";

const ProfileScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { state } = useContext(AuthContext);
  if (!state.user) {
    return null;
  }

  return (
    <CustomBackground safeAreaSecured>
      <View style={styles.row}>
        <Avatar
          size={80}
          name={state.user.login}
          edit
          editCallback={setModalVisible}
          modalVisible={modalVisible}
        />
        <View style={styles.column}>
          <Text style={styles.login}>{state.user.login}</Text>
          <Text style={styles.email}>{state.user.email}</Text>
        </View>
      </View>
    </CustomBackground>
  );
};

ProfileScreen.navigationOptions = {
  title: "Profile",
  tabBarIcon: ({ tintColor }) => {
    return <FontAwesome name="user" size={20} color={tintColor} />;
  },
};

const styles = StyleSheet.create({
  row: {
    marginHorizontal: 35,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: colorsMain.secondary,
    borderBottomWidth: 2,
  },
  column: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "space-between",
  },
  login: {
    color: colorsMain.primary,
    fontSize: 24,
    textShadowColor: colorsMain.shadowColor,
    fontWeight: "700",
    textShadowOffset: { width: 1.5, height: 1.5 },
    textShadowRadius: 1,
    letterSpacing: 1.125,
  },
  email: {
    color: colorsMain.primary,
    fontSize: 18,
    textShadowColor: colorsMain.shadowColor,
    fontWeight: "700",
    textShadowOffset: { width: 1.5, height: 1.5 },
    textShadowRadius: 1,
  },
});

export default ProfileScreen;
