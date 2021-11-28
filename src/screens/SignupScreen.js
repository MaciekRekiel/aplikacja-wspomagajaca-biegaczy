// REACT REACT-NATIVE IMPORTS
import React, { useState, useContext } from "react";
import {
  StyleSheet,
  ScrollView,
  ImageBackground,
  StatusBar,
  View,
  Text,
} from "react-native";
import { NavigationEvents } from "react-navigation";
import { SafeAreaView } from "react-native-safe-area-context";

// REUSABLE COMPONENTS IMPORTS
import { Context as AuthContext } from "../context/AuthContext";
import { useError } from "../hooks/useError";
import Line from "../components/Line";
import Link from "../components/Link";
import Button from "../components/Button";
import Input from "../components/Input";
import { calculatePaddingTop } from "../utils/screen";

const SCROLLVIEW_PADDING_TOP = calculatePaddingTop({
  700: 0.15,
  600: 0.1,
});

const SignupScreen = ({ navigation }) => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors] = useError();
  const {
    signup,
    clearErrors,
    state: { loading },
  } = useContext(AuthContext);

  return (
    <ImageBackground
      source={require("../../assets/bg.jpg")}
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
          <ScrollView contentContainerStyle={styles.scrollViewStyle}>
            <NavigationEvents onWillFocus={clearErrors} />
            <Input
              placeholder="Enter username"
              iconProps={{ type: "antdesign", name: "user" }}
              value={login}
              onChangeText={setLogin}
              errorMessage={errors.loginIsEmpty || errors.loginInvalid}
            />
            <Input
              placeholder="Enter email"
              iconProps={{ type: "feather", name: "mail" }}
              value={email}
              onChangeText={setEmail}
              errorMessage={
                errors.emailIsEmpty || errors.emailExists || errors.emailInvalid
              }
            />
            <Input
              placeholder="Enter password"
              iconProps={{ type: "feather", name: "lock" }}
              value={password}
              onChangeText={setPassword}
              errorMessage={errors.passwordIsEmpty || errors.passTooShort}
              secureTextEntry
            />
            <Input
              placeholder="Confirm password"
              iconProps={{ type: "feather", name: "lock" }}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              errorMessage={
                errors.confirmPasswordIsEmpty || errors.passDontMatch
              }
              secureTextEntry
            />
            <Button
              title="Sign Up"
              onPress={() =>
                signup({ login, email, password, confirmPassword })
              }
              loading={loading}
            />
            <Link callback={() => navigation.navigate("Signin")}>
              Already have an account? Try to{" "}
              <Text
                style={{ color: "rgba(211, 74, 74, 1)", fontWeight: "bold" }}
              >
                Sign In
              </Text>{" "}
              !
            </Link>
            <Line width={148} />
          </ScrollView>
        </SafeAreaView>
      </View>
    </ImageBackground>
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
  },
  scrollViewStyle: {
    paddingTop: SCROLLVIEW_PADDING_TOP,
  },
  imageBackgroundStyle: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "	rgba(16, 59, 85, 0.7)",
  },
});

export default SignupScreen;
