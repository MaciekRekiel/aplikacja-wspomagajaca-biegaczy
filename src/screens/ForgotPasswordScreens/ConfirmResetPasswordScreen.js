// REACT REACT-NATIVE IMPORTS
import React, { useState, useContext } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { NavigationEvents } from "react-navigation";
import { Input, Text, Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

// ICONS IMPORTS
import { MaterialCommunityIcons } from "@expo/vector-icons";

// REUSABLE COMPONENTS IMPORTS
import { Context as AuthContext } from "../../context/AuthContext";
import { useError } from "../../hooks/useError";
import { navigate } from "../../navigationRef";
import Spacer from "../../components/Spacer";
import Link from "../../components/Link";

const ConfirmResetPasswordScreen = ({ navigation }) => {
    const [resetCode, setResetCode] = useState("");
    const [errors] = useError();
    const { validateResetCode, resendResetCode, clearErrors } = useContext(AuthContext);

    return (
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
        justifyContent: "center",
        paddingTop: 64,
    },
});

export default ConfirmResetPasswordScreen;
