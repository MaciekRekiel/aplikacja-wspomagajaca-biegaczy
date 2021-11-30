import React, { useState, useContext } from "react";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Context as AuthContext } from "../../context/AuthContext";
import { useError } from "../../hooks/useError";
import Link from "../../components/Link";
import Line from "../../components/Line";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Spacer from "../../components/Spacer";
import CustomImageBackground from "../../components/authFlow/CustomImageBackground";
import { authStyles } from "../../styles/authStyles";

const ChangePasswordScreen = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors] = useError();
  const {
    state: { loading },
    resetPassword,
  } = useContext(AuthContext);

  return (
    <CustomImageBackground style={styles}>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewStyle}>
          <Spacer>
            <Text style={styles.header}>Change the Password</Text>
          </Spacer>
          <Input
            placeholder="Password"
            iconProps={{ type: "feather", name: "lock" }}
            value={password}
            onChangeText={setPassword}
            errorMessage={errors.passwordIsEmpty || errors.passTooShort}
            secureTextEntry
          />
          <Input
            placeholder="Confirm Password"
            iconProps={{ type: "feather", name: "lock" }}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            errorMessage={errors.confirmPasswordIsEmpty || errors.passDontMatch}
            secureTextEntry
          />
          <Button
            title="Change Password"
            onPress={() => {
              resetPassword({
                password,
                confirmPassword,
                token: navigation.getParam("token"),
              });
            }}
            loading={loading}
          />
          <Link>
            Go Back to the <Text style={styles.highlightedText}>Sign In</Text>{" "}
            page
          </Link>
          <Line width={148} />
        </ScrollView>
      </SafeAreaView>
    </CustomImageBackground>
  );
};

const styles = authStyles();

export default ChangePasswordScreen;
