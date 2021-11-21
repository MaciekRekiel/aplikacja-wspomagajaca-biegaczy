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

/* 
return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://images.pexels.com/photos/1748447/pexels-photo-1748447.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        }}
        resizeMethod="auto"
        style={{ flex: 1, justifyContent: "center" }}
      >
        <ScrollView>
          <NavigationEvents onWillFocus={clearErrors} />
          <Spacer>
            <Text h3>Sign In</Text>
          </Spacer>
          <Input
            label="Login"
            leftIcon={<AntDesign name="user" size={24} color="grey" />}
            placeholder="Email or Username"
            autoCorrect={false}
            autoCapitalize="none"
            value={login}
            onChangeText={setLogin}
            errorMessage={errors.loginIsEmpty || errors.loginInvalid}
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
            errorMessage={errors.passwordIsEmpty || errors.passwordInvalid}
          />
          <Spacer>
            <Button
              title="Sign In"
              onPress={() => signin({ login, password })}
            />
          </Spacer>
          <Link
            title="Don't have an account? Go back to a Sign Up page."
            callback={() => navigation.navigate("Signup")}
          />
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

SigninScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};
*/
