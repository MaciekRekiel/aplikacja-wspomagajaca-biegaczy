// REACT REACT-NATIVE IMPORTS
import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  StatusBar,
  ImageBackground,
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
import { SCROLLVIEW_PADDING_TOP } from "../../utils/screen";

const ConfirmResetPasswordScreen = ({ navigation }) => {
  const [resetCode, setResetCode] = useState("");
  const [errors] = useError();
  const { validateResetCode, resendResetCode, clearErrors } =
    useContext(AuthContext);

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
              <Text style={styles.header}>Enter reset code</Text>
            </Spacer>
            <Spacer>
              <Text style={styles.description}>
                Enter the code that you received in email.
              </Text>
            </Spacer>
            <Input
              placeholder="Enter the code"
              iconProps={{ type: "material-community", name: "lock-reset" }}
              value={resetCode}
              onChangeText={(value) =>
                setResetCode(value.replace(/[^0-9]/g, ""))
              }
              errorMessage={errors.resetCodeIsEmpty || errors.invalidResetCode}
            />
            <Button
              title="Confirm"
              onPress={() =>
                validateResetCode({
                  email: navigation.getParam("email"),
                  resetCode,
                })
              }
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
            <Link
              callback={() =>
                resendResetCode({ email: navigation.getParam("email") })
              }
            >
              Resend the{" "}
              <Text
                style={{ color: "rgba(211, 74, 74, 1)", fontWeight: "bold" }}
              >
                Code
              </Text>
            </Link>
          </ScrollView>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
};

ConfirmResetPasswordScreen.navigationOptions = () => {
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
  description: {
    fontSize: 16,
    color: "white",
  },
});

/*
<SafeAreaView style={styles.container}>
            <ScrollView>
                <NavigationEvents onWillFocus={clearErrors} />
                <Spacer>
                    <Text h3>Enter reset code</Text>
                </Spacer>
                <Spacer>
                    <Text>Enter the code that you received in email.</Text>
                </Spacer>
                <Input
                    label="Reset code"
                    leftIcon={<MaterialCommunityIcons name="lock-reset" size={24} color="grey" />}
                    placeholder="Enter code"
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="number-pad"
                    maxLength={6}
                    value={resetCode}
                    onChangeText={value => setResetCode(value.replace(/[^0-9]/g, ''))}
                    errorMessage={errors.resetCodeIsEmpty || errors.invalidResetCode}
                />
                <Link
                    title="Resend code."
                    callback={() => resendResetCode({ email: navigation.getParam('email') })}
                />
                <Spacer>
                    <Button title="Confirm" onPress={() => validateResetCode({ email: navigation.getParam('email'), resetCode })} />
                </Spacer>
                <Spacer>
                    <Button title="Cancel" onPress={() => navigate("Signin")} />
                </Spacer>
            </ScrollView>
        </SafeAreaView>
*/

export default ConfirmResetPasswordScreen;
