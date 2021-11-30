// REACT REACT-NATIVE IMPORTS
import React, { useState, useContext } from "react";
import { Text, ScrollView } from "react-native";
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

const ConfirmResetPasswordScreen = ({ navigation }) => {
  const [resetCode, setResetCode] = useState("");
  const [errors] = useError();
  const {
    state: { loading },
    validateResetCode,
    resendResetCode,
  } = useContext(AuthContext);

  return (
    <CustomImageBackground style={styles}>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewStyle}>
          <Spacer>
            <Text style={styles.header}>Enter reset code</Text>
          </Spacer>
          <Spacer>
            <Text style={styles.description}>
              Enter the code that you received in email.
            </Text>
          </Spacer>
          <Input
            placeholder="Enter the code"
            iconProps={{ type: "material-community", name: "lock-reset" }}
            value={resetCode}
            onChangeText={(value) => setResetCode(value.replace(/[^0-9]/g, ""))}
            errorMessage={errors.resetCodeIsEmpty || errors.invalidResetCode}
          />
          <Button
            title="Confirm"
            onPress={() =>
              validateResetCode({
                email: navigation.getParam("email"),
                resetCode,
              })
            }
            loading={loading}
          />
          <Link callback={() => navigation.navigate("Signin")}>
            Go Back to the{" "}
            <Text style={{ color: "rgba(211, 74, 74, 1)", fontWeight: "bold" }}>
              Sign In
            </Text>{" "}
            page
          </Link>
          <Line width={148} />
          <Link
            callback={() =>
              resendResetCode({ email: navigation.getParam("email") })
            }
          >
            Resend the{" "}
            <Text style={{ color: "rgba(211, 74, 74, 1)", fontWeight: "bold" }}>
              Code
            </Text>
          </Link>
        </ScrollView>
      </SafeAreaView>
    </CustomImageBackground>
  );
};

const styles = authStyles();

export default ConfirmResetPasswordScreen;
