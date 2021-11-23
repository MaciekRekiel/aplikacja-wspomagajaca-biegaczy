// REACT REACT-NATIVE IMPORTS
import React, { useState, useContext } from "react";
import {
  StyleSheet,
  ScrollView,
  ImageBackground,
  View,
  StatusBar,
  Dimensions,
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

const SCREEN_HEIGHT = Dimensions.get("window").height;

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
      source={{
        uri: "https://images.pexels.com/photos/1748447/pexels-photo-1748447.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      }}
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
              iconProps={{ type: "entypo", name: "lock" }}
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
            <Link
              title="Don't have an account? Go back to a Sign Up page."
              callback={() => navigation.navigate("Signup")}
            />
            <Line width={148} />
            <Link title="Forgot Password?" callback={() => console.log("a")} />
          </ScrollView>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewStyle: {
    paddingTop: SCREEN_HEIGHT / 4,
  },
  imageBackgroundStyle: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(46, 41, 78, 0.7)",
  },
});

SigninScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

export default SigninScreen;
