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
import CustomPicker from "./CustomPicker";
import { colorsMain } from "../../styles/colors";
import { SCREEN_WIDTH } from "../../utils/screen";
import { Context as AuthContext } from "../../context/AuthContext";
import { useError } from "../../hooks/useError";

const ModalForm = ({ modalVisible, setShowFormModal }) => {
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("Male");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors] = useError();
  const {
    state: { token },
    editPersonalInfo,
    clearErrors,
  } = useContext(AuthContext);

  const onChange = (word, callback, limit) => {
    let newText = word.replace(/[^0-9]/g, "");
    if (word.length === 0 || word[0] === "0") {
      callback("");
      return;
    }
    newText = parseInt(word);
    if (newText < limit) {
      callback(newText.toString());
    }
  };

  const renderForm = () => {
    return (
      <>
        <Text style={styles.modalHeader}>
          Fill following <Text style={styles.modalEmpText}>Data</Text> in order
          to unlock all features of the app
        </Text>
        <CustomPicker
          selectedValue={gender}
          onValueChange={setGender}
          items={["Male", "Female"]}
        />
        <Input
          placeholder="Age"
          errorMessage={errors.invalidAge || errors.ageIsEmpty}
          value={age}
          isNumeric
          onChangeText={(newValue) => onChange(newValue, setAge, 100)}
        />
        <Input
          placeholder="Height"
          errorMessage={errors.invalidHeight || errors.heightIsEmpty}
          value={height}
          isNumeric
          onChangeText={(newValue) => onChange(newValue, setHeight, 251)}
        />
        <Input
          placeholder="Weight"
          errorMessage={errors.invalidWeight || errors.weightIsEmpty}
          value={weight}
          isNumeric
          onChangeText={(newValue) => onChange(newValue, setWeight, 251)}
        />
        <View style={styles.modalRow}>
          <TouchableNativeFeedback
            onPress={() =>
              setTimeout(() => {
                setShowFormModal(false);
              }, 150)
            }
            background={TouchableNativeFeedback.Ripple(
              colorsMain.headerButtonBackgroundPrimary
            )}
          >
            <View style={styles.modalButton}>
              <Text style={styles.buttonText}>Cancel</Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback
            onPress={async () => {
              setLoading(true);
              setSuccess(
                await editPersonalInfo({
                  token,
                  gender,
                  age,
                  weight,
                  height,
                })
              );
              setLoading(false);
            }}
            background={TouchableNativeFeedback.Ripple(
              colorsMain.headerButtonBackgroundPrimary
            )}
          >
            {loading ? (
              <View style={styles.modalButton}>
                <ActivityIndicator
                  size={18}
                  color={colorsMain.headerButtonBackgroundSecondary}
                />
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
          You've <Text style={styles.modalEmpText}>Successfully</Text> applied
          the changes
        </Text>
        <TouchableNativeFeedback
          onPress={() =>
            setTimeout(() => {
              setShowFormModal(false);
            }, 150)
          }
          background={TouchableNativeFeedback.Ripple(
            colorsMain.headerButtonBackgroundPrimary
          )}
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

export default ModalForm;
