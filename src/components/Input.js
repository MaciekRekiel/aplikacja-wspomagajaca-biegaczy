import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { Icon } from "react-native-elements";

import Spacer from "./Spacer";

const Input = ({
  iconProps,
  placeholder,
  errorMessage,
  value,
  onChangeText,
  secureTextEntry,
}) => {
  const [focus, setFocus] = useState(false);
  const dynamicStyle = (isFocus) => {
    return isFocus
      ? {
          ...styles.inputContainer,
          backgroundColor: "rgba(182, 198, 205, 0.1)",
        }
      : { ...styles.inputContainer };
  };

  return (
    <Spacer>
      <View style={dynamicStyle(focus)}>
        <Icon
          {...iconProps}
          containerStyle={styles.iconContainerStyle}
          iconStyle={styles.iconStyle}
        />
        <TextInput
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor="rgba(182, 198, 205, 0.4)"
          autoCorrect={false}
          autoCapitalize="none"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
        />
        {errorMessage ? (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : null}
      </View>
    </Spacer>
  );
};

Input.defaultProps = {
  secureTextEntry: false,
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    height: 60,
    padding: 0,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "rgba(182, 198, 205, 0.7)",
    borderRadius: 30,
    elevation: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    color: "rgba(182, 198, 205, 1)",
    fontFamily: "Roboto",
  },
  iconStyle: {
    fontSize: 32,
    color: "rgba(182, 198, 205, 1)",
  },
  iconContainerStyle: {
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  errorMessage: {
    position: "absolute",
    bottom: -24,
    left: 34,
    color: "red",
  },
});

export default Input;
