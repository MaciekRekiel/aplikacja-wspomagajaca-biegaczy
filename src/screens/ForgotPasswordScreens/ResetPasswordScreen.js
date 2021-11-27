import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
  ImageBackground,
  Text,
} from "react-native";
import { NavigationEvents } from "react-navigation";
import { SafeAreaView } from "react-native-safe-area-context";

import { Context as AuthContext } from "../../context/AuthContext";
import { useError } from "../../hooks/useError";
import Link from "../../components/Link";
import Line from "../../components/Line";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Spacer from "../../components/Spacer";
import { SCROLLVIEW_PADDING_TOP } from "../../utils/screen";

const ChangePasswordScreen = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors] = useError();
  const {
    state: { loading },
    resetPassword,
    clearErrors,
  } = useContext(AuthContext);

  return (
    <ImageBackground
      source={require("../../../assets/bg.jpg")}
      resizeMethod="auto"
      style={styles.imageBackgroundStyle}
    >
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <View style={styles.overlay}>
        <SafeAreaView style={styles.container}>
          <NavigationEvents onWillFocus={clearErrors} />
          <ScrollView contentContainerStyle={styles.scrollViewStyle}>
            <Spacer>
              <Text style={styles.header}>Change the Password</Text>
            </Spacer>
            <Input
              placeholder="Password"
              iconProps={{ type: "feather", name: "lock" }}
              value={password}
              onChangeText={setPassword}
              errorMessage={errors.passwordIsEmpty || errors.passTooShort}
              secureTextEntry
            />
            <Input
              placeholder="Confirm Password"
              iconProps={{ type: "feather", name: "lock" }}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              errorMessage={
                errors.confirmPasswordIsEmpty || errors.passDontMatch
              }
              secureTextEntry
            />
            <Button
              title="Change Password"
              onPress={() => {
                resetPassword({
                  password,
                  confirmPassword,
                  token: navigation.getParam("token"),
                });
              }}
              loading={loading}
            />
            <Link>
              Go Back to the{" "}
              <Text
                style={{ color: "rgba(211, 74, 74, 1)", fontWeight: "bold" }}
              >
                Sign In
              </Text>{" "}
              page
            </Link>
            <Line width={148} />
          </ScrollView>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
};

ChangePasswordScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewStyle: {
    paddingTop: SCROLLVIEW_PADDING_TOP,
  },
  imageBackgroundStyle: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(46, 41, 78, 0.7)",
  },
  header: {
    fontSize: 32,
    color: "white",
  },
});

export default ChangePasswordScreen;
