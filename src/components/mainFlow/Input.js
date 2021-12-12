import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";

const Input = ({
  placeholder,
  errorMessage,
  value,
  onChangeText,
  isNumeric,
  secureTextEntry,
}) => {
  const [focus, setFocus] = useState(false);

  const dynamicStyle = (isFocus) => {
    return isFocus
      ? { ...styles.inputContainer, backgroundColor: "rgba(255,0,0, 0.2)" }
      : { ...styles.inputContainer };
  };

  return (
    <View style={dynamicStyle(focus)}>
      <TextInput
        style={styles.textInput}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        keyboardType={isNumeric ? "numeric" : "default"}
        placeholder={placeholder}
        autoCorrect={false}
        autoCapitalize="none"
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="white"
        secureTextEntry={secureTextEntry}
      />
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
    </View>
  );
};

Input.defaultProps = {
  isNumer: false,
  secureTextEntry: false,
};

const styles = StyleSheet.create({
  inputContainer: {
    minHeight: 48,
    marginVertical: 16,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 20,
    color: "white",
  },
  errorMessage: {
    position: "absolute",
    bottom: -24,
    left: 12,
    color: "yellow",
  },
});

export default Input;
