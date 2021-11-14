// REACT REACT-NATIVE IMPORTS
import React, { useState, useContext } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { NavigationEvents } from "react-navigation";
import { Input, Text, Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

// ICONS IMPORTS
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

// REUSABLE COMPONENTS IMPORTS
import { Context as AuthContext } from "../context/AuthContext";
import { useError } from "../hooks/useError";
import Spacer from "../components/Spacer";
import Link from "../components/Link";

const SignupScreen = ({ navigation }) => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors] = useError();
  const { signup, clearErrors } = useContext(AuthContext);

  return (
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
    justifyContent: "center",
    paddingTop: 64,
  },
});

export default SignupScreen;
