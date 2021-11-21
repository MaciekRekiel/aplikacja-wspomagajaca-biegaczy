// REACT REACT-NATIVE IMPORTS
import React, { useState, useContext } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { NavigationEvents } from "react-navigation";
import { Input, Text, Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

// ICONS IMPORTS
import { Entypo } from "@expo/vector-icons";

// REUSABLE COMPONENTS IMPORTS
import { Context as AuthContext } from "../../context/AuthContext";
import { useError } from "../../hooks/useError";
import { navigate } from "../../navigationRef";
import Spacer from "../../components/Spacer";

const ChangePasswordScreen = ({ navigation }) => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors] = useError();
    const { resetPassword, clearErrors } = useContext(AuthContext);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <NavigationEvents onWillFocus={clearErrors} />
                <Spacer>
                    <Text h3>Change Password</Text>
                </Spacer>
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
                    <Button title="Change Password" onPress={() => { resetPassword({ password, confirmPassword, token: navigation.getParam('token') }) }} />
                </Spacer>
                <Spacer>
                    <Button title="Cancel" onPress={() => navigate("Signin")} />
                </Spacer>
            </ScrollView>
        </SafeAreaView>
    );
};

ChangePasswordScreen.navigationOptions = () => {
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

export default ChangePasswordScreen;
