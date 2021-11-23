// REACT REACT-NATIVE IMPORTS
import React, { useState, useContext } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { NavigationEvents } from "react-navigation";
import { Input, Text, Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

// ICONS IMPORTS
import { MaterialIcons } from "@expo/vector-icons";

// REUSABLE COMPONENTS IMPORTS
import { Context as AuthContext } from "../../context/AuthContext";
import { useError } from "../../hooks/useError";
import Spacer from "../../components/Spacer";
import { navigate } from "../../navigationRef";

const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState("");
    const [errors] = useError();
    const { forgotPassword, clearErrors } = useContext(AuthContext);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <NavigationEvents onWillFocus={clearErrors} />
                <Spacer>
                    <Text h3>Forgot Password</Text>
                </Spacer>
                <Spacer>
                    <Text>Enter email that you provided during account creation.
                        We will send a code to your email address that will allow you to reset your password.</Text>
                </Spacer>
                <Input
                    label="Email"
                    leftIcon={<MaterialIcons name="email" size={24} color="grey" />}
                    placeholder="email@address.com"
                    autoCorrect={false}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                    errorMessage={
                        errors.emailIsEmpty || errors.userNotExists
                    }
                />
                <Spacer>
                    <Button title="Send code" onPress={() => forgotPassword({ email })} />
                </Spacer>
                <Spacer>
                    <Button title="Cancel" onPress={() => navigate("Signin")} />
                </Spacer>
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

ForgotPasswordScreen.navigationOptions = () => {
    return {
        headerShown: false,
    };
};

export default ForgotPasswordScreen;
