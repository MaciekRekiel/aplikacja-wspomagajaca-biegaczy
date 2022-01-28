import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Modal,
  TouchableNativeFeedback,
  Text,
  ActivityIndicator,
} from "react-native";
import { NavigationEvents } from "react-navigation";
import { LinearGradient } from "expo-linear-gradient";

import Input from "./Input";
import { colorsMain } from "../../styles/colors";
import { SCREEN_WIDTH } from "../../utils/screen";
import { Context as AuthContext } from "../../context/AuthContext";
import { useError } from "../../hooks/useError";

const ModalEditPasswordForm = ({ modalVisible, setShowFormModal }) => {
  const [currentPass, setCurrentPass] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors] = useError();
  const {
    state: { token },
    editPassword,
    clearErrors,
  } = useContext(AuthContext);

  const renderForm = () => {
    return (
      <>
        <Text style={styles.modalHeader}>
          Fill following <Text style={styles.modalEmpText}>Data</Text> in order
          to change your password
        </Text>
        <Input
          placeholder="Current password"
          errorMessage={errors.passIncorrect || errors.currentPassIsEmpty}
          value={currentPass}
          secureTextEntry
          onChangeText={setCurrentPass}
        />
        <Input
          placeholder="New password"
          errorMessage={errors.passTooShort || errors.newPasswordIsEmpty}
          value={newPassword}
          secureTextEntry
          onChangeText={setNewPassword}
        />
        <Input
          placeholder="Confirm new password"
          errorMessage={errors.passDontMatch || errors.confirmPasswordIsEmpty}
          value={confirmPassword}
          secureTextEntry
          onChangeText={setConfirmPassword}
        />
        <View style={styles.modalRow}>
          <TouchableNativeFeedback
            onPress={() =>
              setTimeout(() => {
                setShowFormModal(false);
              }, 150)
            }
            background={TouchableNativeFeedback.Ripple(colorsMain.secondary)}
          >
            <View style={styles.modalButton}>
              <Text style={styles.buttonText}>Cancel</Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback
            onPress={async () => {
              setLoading(true);
              setSuccess(
                await editPassword({
                  token,
                  currentPass,
                  newPassword,
                  confirmPassword,
                })
              );
              setLoading(false);
            }}
            background={TouchableNativeFeedback.Ripple(colorsMain.secondary)}
          >
            {loading ? (
              <View style={styles.modalButton}>
                <ActivityIndicator size={18} color={colorsMain.secondary} />
              </View>
            ) : (
              <View style={styles.modalButton}>
                <Text style={styles.buttonText}>Submit</Text>
              </View>
            )}
          </TouchableNativeFeedback>
        </View>
      </>
    );
  };

  const renderSuccess = () => {
    return (
      <>
        <Text style={styles.modalHeader}>
          You've <Text style={styles.modalEmpText}>Successfully</Text> changed
          your password!
        </Text>
        <TouchableNativeFeedback
          onPress={() =>
            setTimeout(() => {
              setShowFormModal(false);
            }, 150)
          }
          background={TouchableNativeFeedback.Ripple(colorsMain.secondary)}
        >
          <View style={styles.successButton}>
            <Text style={styles.buttonText}>Close</Text>
          </View>
        </TouchableNativeFeedback>
      </>
    );
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      statusBarTranslucent={true}
    >
      <NavigationEvents onWillFocus={clearErrors} />
      <View style={styles.modalBackground}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.modalBody}
          colors={[
            colorsMain.backgroundPrimary,
            colorsMain.backgroundSecondary,
          ]}
        >
          {success ? renderSuccess() : renderForm()}
        </LinearGradient>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.75)",
  },
  modalBody: {
    width: SCREEN_WIDTH - 50,
    padding: 16,
    borderRadius: 8,
    justifyContent: "space-around",
    elevation: 10,
  },
  modalButton: {
    minHeight: 48,
    minWidth: 124,
    backgroundColor: "transparent",
    borderColor: colorsMain.secondary,
    borderWidth: 1.5,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  successButton: {
    minHeight: 48,
    marginTop: 32,
    backgroundColor: "transparent",
    borderColor: colorsMain.secondary,
    borderWidth: 1.5,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  modalHeader: {
    marginVertical: 8,
    fontSize: 22,
    color: "white",
  },
  modalEmpText: {
    color: colorsMain.secondary,
    textShadowColor: colorsMain.shadowColor,
    fontWeight: "700",
    textShadowOffset: { width: 1.875, height: 1.875 },
    textShadowRadius: 1,
    letterSpacing: 1.125,
  },
  modalRow: {
    marginTop: 32,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  buttonText: {
    fontSize: 18,
    color: colorsMain.secondary,
    textShadowColor: colorsMain.shadowColor,
    fontWeight: "700",
  },
});

export default ModalEditPasswordForm;
