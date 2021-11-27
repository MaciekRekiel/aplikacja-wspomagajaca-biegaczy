// REACT REACT-NATIVE IMPORTS
import React, { useState, useContext } from "react";
import {
  StyleSheet,
  ScrollView,
  ImageBackground,
  StatusBar,
  Dimensions,
  View,
  Text,
} from "react-native";
import { NavigationEvents } from "react-navigation";
import { SafeAreaView } from "react-native-safe-area-context";

// REUSABLE COMPONENTS IMPORTS
import { Context as AuthContext } from "../../context/AuthContext";
import { useError } from "../../hooks/useError";
import Line from "../../components/Line";
import Link from "../../components/Link";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Spacer from "../../components/Spacer";

const SCREEN_HEIGHT = Dimensions.get("window").height;

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [errors] = useError();
  const { forgotPassword, clearErrors } = useContext(AuthContext);

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
          <ScrollView contentContainerStyle={styles.scrollViewStyle}>
            <NavigationEvents onWillFocus={clearErrors} />
            <Spacer>
              <Text style={styles.header}>Forgot Password</Text>
            </Spacer>
            <Spacer>
              <Text style={styles.description}>
                Enter email that you provided during account creation. We will
                send a code to your email address that will allow you to reset
                your password.
              </Text>
            </Spacer>
            <Input
              placeholder="email@address.com"
              iconProps={{ type: "feather", name: "mail" }}
              value={email}
              onChangeText={setEmail}
              errorMessage={errors.emailIsEmpty || errors.userNotExists}
            />
            <Button
              title="Send Code"
              onPress={() => forgotPassword({ email })}
            />
            <Link callback={() => navigation.navigate("Signin")}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewStyle: {
    paddingTop: SCREEN_HEIGHT / 5,
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
  description: {
    fontSize: 16,
    color: "white",
  },
});

ForgotPasswordScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

export default ForgotPasswordScreen;
