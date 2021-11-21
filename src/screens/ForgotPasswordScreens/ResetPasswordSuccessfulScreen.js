// REACT REACT-NATIVE IMPORTS
import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Text, Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";


// REUSABLE COMPONENTS IMPORTS
import Spacer from "../../components/Spacer";
import { navigate } from "../../navigationRef";

const ResetPasswordSuccessfulScreen = ({ navigation }) => {

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Spacer>
                    <Text h3>Success</Text>
                </Spacer>
                <Spacer>
                    <Text>Your password has been successfully changed.</Text>
                </Spacer>
                <Spacer>
                    <Button
                        title="Sign In"
                        onPress={() => navigate("Signin")}
                    />
                </Spacer>
            </ScrollView>
        </SafeAreaView>
    );
};

ResetPasswordSuccessfulScreen.navigationOptions = () => {
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

export default ResetPasswordSuccessfulScreen;
