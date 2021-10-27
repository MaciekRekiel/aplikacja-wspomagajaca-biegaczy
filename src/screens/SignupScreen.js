import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Text, Button } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import _ from "lodash";

import { Context as AuthContext } from "../context/AuthContext";
import Spacer from "../components/Spacer";
import Link from "../components/Link";

const SignupScreen = ({ navigation }) => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const {
    state: { errorMessages },
    signup,
  } = useContext(AuthContext);

  useEffect(() => {
    const errorsObj = {};
    for (let err in errorMessages) {
      errorsObj[err] = errorMessages[err];
    }
    if (!_.isEmpty(errorsObj)) {
      setErrors(errorsObj);
    }
  }, [errorMessages]);

  return (
    <View style={styles.container}>
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
        errorMessage={errors.loginIsEmpty}
      />
      <Input
        label="Email"
        leftIcon={<MaterialIcons name="email" size={24} color="grey" />}
        placeholder="email@address.com"
        autoCorrect={false}
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        errorMessage={errors.emailIsEmpty}
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
        errorMessage={errors.passwordIsEmpty}
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
        errorMessage={errors.confirmPasswordIsEmpty}
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
    </View>
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
    marginBottom: 100,
  },
  error: {
    color: "red",
    fontSize: 16,
    marginHorizontal: 15,
  },
});

export default SignupScreen;
