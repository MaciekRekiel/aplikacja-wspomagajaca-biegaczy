import React, { useState, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { Context as AuthContext } from "../context/AuthContext";
import CustomBackground from "../components/mainFlow/CustomBackground";
import Avatar from "../components/mainFlow/Avatar";
import { colorsMain } from "../styles/colors";
import Button from "../components/mainFlow/Button";
import ModalForm from "../components/mainFlow/ModalForm";

const ProfileScreen = ({ navigation }) => {
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editPasswordModalVisible, setEditPasswordModalVisible] =
    useState(false);
  const {
    state: { user },
  } = useContext(AuthContext);
  if (!user) {
    return null;
  }

  const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  return (
    <CustomBackground safeAreaSecured justifyContent="flex-start">
      <View style={styles.firstRow}>
        <Avatar
          size={80}
          name={user.login}
          edit
          editCallback={setImageModalVisible}
          modalVisible={imageModalVisible}
        />
        <View style={styles.column}>
          <Text style={styles.login}>{user.login}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>
      </View>
      <View style={styles.accountDetails}>
        <View style={styles.row}>
          <Text style={styles.textHeader}>Gender:</Text>
          <Text style={styles.textData}>
            {user.age ? capitalize(user.gender) : "Not provided"}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.textHeader}>Age:</Text>
          <Text style={styles.textData}>
            {user.age ? user.age : "Not provided"}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.textHeader}>Height:</Text>
          <Text style={styles.textData}>
            {user.height ? `${user.height} cm` : "Not provided"}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.textHeader}>Weight:</Text>
          <Text style={styles.textData}>
            {user.weight ? `${user.weight} kg` : "Not provided"}
          </Text>
        </View>
        <View>
          <Button
            title="Edit Personal Info"
            onPress={() => setEditModalVisible(true)}
          />
          <ModalForm
            modalVisible={editModalVisible}
            setShowFormModal={setEditModalVisible}
          />
        </View>
      </View>
      <View style={styles.passwordView}>
        <Text style={styles.textHeader}>Change Password</Text>
        <Text style={styles.textParagraph}>
          In order to change password, click following button
        </Text>
        <Button
          title="Edit Password"
          onPress={() => setEditPasswordModalVisible(true)}
        />
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
  firstRow: {
    marginHorizontal: 24,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: colorsMain.secondary,
    borderBottomWidth: 2,
  },
  accountDetails: {
    borderColor: colorsMain.secondary,
    borderBottomWidth: 2,
    paddingBottom: 16,
    marginHorizontal: 24,
  },
  passwordView: {
    marginTop: 16,
    borderColor: colorsMain.secondary,
    borderBottomWidth: 2,
    marginHorizontal: 24,
    paddingBottom: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  textHeader: {
    color: colorsMain.primary,
    fontSize: 24,
    fontWeight: "700",
  },
  textData: {
    color: colorsMain.primary,
    fontSize: 24,
    fontWeight: "500",
    marginLeft: 16,
  },
  textParagraph: {
    color: colorsMain.primary,
    fontSize: 24,
    marginVertical: 12,
    fontWeight: "500",
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
