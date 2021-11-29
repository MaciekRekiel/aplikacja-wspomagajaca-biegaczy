// REACT REACT-NATIVE IMPORTS
import React, { useState, useContext } from "react";
import {
  StyleSheet,
  ScrollView,
  ImageBackground,
  View,
  StatusBar,
  Text,
} from "react-native";
import { NavigationEvents } from "react-navigation";
import { SafeAreaView } from "react-native-safe-area-context";

// REUSABLE COMPONENTS IMPORTS
import { Context as AuthContext } from "../context/AuthContext";
import { useError } from "../hooks/useError";
import Link from "../components/Link";
import Input from "../components/Input";
import Button from "../components/Button";
import Line from "../components/Line";
import { calculatePaddingTop } from "../utils/screen";
import { authStyles } from "../styles/authStyles";

const SCROLLVIEW_PADDING_TOP = calculatePaddingTop({
  750: 0.15,
  700: 0.1,
  650: 0.5,
});

const SigninScreen = ({ navigation }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [errors] = useError();
  const {
    signin,
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
              placeholder="Enter login or email"
              iconProps={{ type: "antdesign", name: "user" }}
              value={login}
              onChangeText={setLogin}
              errorMessage={errors.loginIsEmpty || errors.loginInvalid}
            />
            <Input
              placeholder="Enter the password"
              iconProps={{
                type: "feather",
                name: "lock",
              }}
              value={password}
              onChangeText={setPassword}
              errorMessage={errors.passwordIsEmpty || errors.passwordInvalid}
              secureTextEntry
            />
            <Button
              title="Sign in"
              onPress={() => signin({ login, password })}
              loading={loading}
            />
            <Link callback={() => navigation.navigate("Signup")}>
              Don't have an account? Go back to a{" "}
              <Text style={styles.highlightedText}>Sign Up</Text> page
            </Link>
            <Line width={148} />
            <Link callback={() => navigation.navigate("ForgotPassword")}>
              Forgot Password?
            </Link>
          </ScrollView>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
};

const styles = authStyles(SCROLLVIEW_PADDING_TOP);

export default SigninScreen;
