// REACT REACT-NATIVE IMPORTS
import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// REUSABLE COMPONENTS IMPORTS
import Button from "../../components/Button";
import Spacer from "../../components/Spacer";
import CustomImageBackground from "../../components/authFlow/CustomImageBackground";
import { authStyles } from "../../styles/authStyles";

const ResetPasswordSuccessfulScreen = ({ navigation }) => {
  return (
    <CustomImageBackground style={styles}>
      <SafeAreaView style={styles.scrollViewStyle}>
        <Spacer>
          <Text style={styles.header}>Success</Text>
        </Spacer>
        <Spacer>
          <Text style={styles.description}>
            Your password has been successfully changed!
          </Text>
        </Spacer>
        <Button title="Finish" onPress={() => navigation.navigate("Signin")} />
      </SafeAreaView>
    </CustomImageBackground>
  );
};

const styles = authStyles();

export default ResetPasswordSuccessfulScreen;
