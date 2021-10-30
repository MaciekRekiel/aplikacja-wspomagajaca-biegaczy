// REACT REACT-NATIVE IMPORTS
import React, { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { NavigationEvents } from "react-navigation";
import { Input, Text, Button } from "react-native-elements";
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
    <View style={styles.container}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 300,
  },
});

SigninScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

export default SigninScreen;

// import React, { useState } from "react";
// import {
//   View,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   ImageBackground,
// } from "react-native";

// import InputFields from "../components/InputFields";
// import IconFields from "../components/IconFields";

// const source = {
//   uri: "https://images.pexels.com/photos/694587/pexels-photo-694587.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
// };

// const SignInScreen = () => {
//   return (
//     <View style={styles.signInView}>
//       <ImageBackground source={source} resizeMode="cover" style={styles.image}>
//         <View style={styles.overlay}>
//           <InputFields />
//           <IconFields />
//           {/* <Button
//         style={styles.signInButton}
//         title="Sign in"
//         onPress={() => console.log("..")}
//       /> */}
//           <TouchableOpacity style={styles.signInButton}>
//             <Text style={styles.buttonText}>SIGN IN</Text>
//           </TouchableOpacity>
//         </View>
//       </ImageBackground>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   signInView: {
//     position: "absolute",
//     top: 0,
//     bottom: 0,
//     left: 0,
//     right: 0,
//   },
//   image: {
//     flex: 1,
//   },
//   overlay: {
//     justifyContent: "space-between",
//     flex: 1,
//     backgroundColor: "rgba(86, 73, 76, 0.6)",
//   },
//   signInButton: {
//     backgroundColor: "#86BBD8",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   buttonText: {
//     fontSize: 32,
//     fontWeight: "bold",
//     color: "#fff",
//   },
// });

// export default SignInScreen;
