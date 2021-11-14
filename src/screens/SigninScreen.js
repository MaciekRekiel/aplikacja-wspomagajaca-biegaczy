// REACT REACT-NATIVE IMPORTS
import React, { useState, useContext } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { NavigationEvents } from "react-navigation";
import { Input, Text, Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

// ICONS IMPORTS
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

// REUSABLE COMPONENTS IMPORTS
import { Context as AuthContext } from "../context/AuthContext";
import { useError } from "../hooks/useError";
import Spacer from "../components/Spacer";
import Link from "../components/Link";

const SigninScreen = ({ navigation }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [errors] = useError();
  const { signin, clearErrors } = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
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
          <Button title="Sign In" onPress={() => signin({ login, password })} />
        </Spacer>
        <Link
          title="Don't have an account? Go back to a Sign Up page."
          callback={() => navigation.navigate("Signup")}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 64,
  },
});

SigninScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

export default SigninScreen;
