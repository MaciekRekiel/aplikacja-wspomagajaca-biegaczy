// REACT REACT-NATIVE IMPORTS
import React, { useState, useContext } from "react";
import { ScrollView, Text } from "react-native";
import { NavigationEvents } from "react-navigation";
import { SafeAreaView } from "react-native-safe-area-context";

// REUSABLE COMPONENTS IMPORTS
import { Context as AuthContext } from "../../context/AuthContext";
import { useError } from "../../hooks/useError";
import Line from "../../components/Line";
import Link from "../../components/Link";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Spacer from "../../components/Spacer";
import CustomImageBackground from "../../components/authFlow/CustomImageBackground";
import { authStyles } from "../../styles/authStyles";

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [errors] = useError();
  const {
    state: { loading },
    forgotPassword,
    clearErrors,
  } = useContext(AuthContext);

  return (
    <CustomImageBackground style={styles}>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewStyle}>
          <NavigationEvents onWillFocus={clearErrors} />
          <Spacer>
            <Text style={styles.header}>Forgot Password</Text>
          </Spacer>
          <Spacer>
            <Text style={styles.description}>
              Enter email that you provided during account creation. We will
              send a code to your email address that will allow you to reset
              your password.
            </Text>
          </Spacer>
          <Input
            placeholder="email@address.com"
            iconProps={{ type: "feather", name: "mail" }}
            value={email}
            onChangeText={setEmail}
            errorMessage={errors.emailIsEmpty || errors.userNotExists}
          />
          <Button
            title="Send Code"
            onPress={() => forgotPassword({ email })}
            loading={loading}
          />
          <Link callback={() => navigation.navigate("Signin")}>
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

export default ForgotPasswordScreen;
