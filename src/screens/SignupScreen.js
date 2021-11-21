// REACT REACT-NATIVE IMPORTS
import React, { useState, useContext } from "react";
import {
  StyleSheet,
  ScrollView,
  ImageBackground,
  StatusBar,
  Dimensions,
  View,
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

const SCREEN_HEIGHT = Dimensions.get("window").height;

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
              placeholder="Enter username"
              iconProps={{ type: "antdesign", name: "user" }}
              value={login}
              onChangeText={setLogin}
              errorMessage={errors.loginIsEmpty || errors.loginInvalid}
            />
            <Input
              placeholder="Enter email"
              iconProps={{ type: "MaterialIcons", name: "email" }}
              value={email}
              onChangeText={setEmail}
              errorMessage={
                errors.emailIsEmpty || errors.emailExists || errors.emailInvalid
              }
            />
            <Input
              placeholder="Enter password"
              iconProps={{ type: "entypo", name: "lock" }}
              value={password}
              onChangeText={setPassword}
              errorMessage={errors.passwordIsEmpty || errors.passTooShort}
              secureTextEntry
            />
            <Input
              placeholder="Confirm password"
              iconProps={{ type: "entypo", name: "lock" }}
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
            <Link
              title="Already have an account? Try to Sign In!"
              callback={() => navigation.navigate("Signin")}
            />
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
    paddingTop: SCREEN_HEIGHT / 6,
  },
  imageBackgroundStyle: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(46, 41, 78, 0.7)",
  },
});

export default SignupScreen;

/* 
<SafeAreaView style={styles.container}>
      <ScrollView>
        <NavigationEvents onWillFocus={clearErrors} />
        <Spacer>
          <Text h3>Sign Up</Text>
        </Spacer>
        <Input
          label="Username"
          leftIcon={<AntDesign name="user" size={24} color="grey" />}
          placeholder="Username"
          autoCorrect={false}
          autoCapitalize="none"
          value={login}
          onChangeText={setLogin}
          errorMessage={errors.loginIsEmpty || errors.loginExists}
        />
        <Input
          label="Email"
          leftIcon={<MaterialIcons name="email" size={24} color="grey" />}
          placeholder="email@address.com"
          autoCorrect={false}
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          errorMessage={
            errors.emailIsEmpty || errors.emailExists || errors.emailInvalid
          }
        />
        <Input
          label="Password"
          leftIcon={<Entypo name="lock" size={24} color="grey" />}
          placeholder="password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          errorMessage={errors.passwordIsEmpty || errors.passTooShort}
        />
        <Input
          label="Confirm Password"
          leftIcon={<Entypo name="lock" size={24} color="grey" />}
          placeholder="confirm password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          errorMessage={errors.confirmPasswordIsEmpty || errors.passDontMatch}
        />
        <Spacer>
          <Button
            title="Sign Up"
            onPress={() => signup({ login, email, password, confirmPassword })}
          />
        </Spacer>
        <Link
          title="Already have an account? Try to sign in!"
          callback={() => navigation.navigate("Signin")}
        />
      </ScrollView>
    </SafeAreaView>
*/
