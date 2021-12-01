import React from "react";
import { View, StyleSheet, Text, TouchableNativeFeedback } from "react-native";
import { Icon, Button } from "react-native-elements";

const Header = ({
  title,
  backIcon,
  backIconOnPress,
  rightButton,
  rightButtonCallback,
}) => {
  const styles = StyleSheet.create({
    header: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      elevation: 5,
      backgroundColor: "hsl(234, 43%, 19%)",
      height: 90,
      borderColor: "green",
      borderWidth: 1,
      marginBottom: 90,
    },
    headerText: {
      position: "absolute",
      color: "white",
      bottom: 12,
      left: backIcon ? 54 : 18,
      fontSize: 20,
      fontWeight: "bold",
      borderColor: "red",
      borderWidth: 1,
    },
    iconStyle: {
      position: "absolute",
      bottom: 12,
      left: 12,
    },
    rightButtonStyle: {
      position: "absolute",
      right: 12,
      bottom: 8,
    },
  });

  return (
    <>
      <View style={{ height: 0, marginBottom: 90 }} />
      <View style={styles.header}>
        {backIcon ? (
          <Icon
            onPress={backIconOnPress}
            color="white"
            type="ionicon"
            name="arrow-back"
            containerStyle={styles.iconStyle}
          />
        ) : null}
        <Text style={styles.headerText}>{title}</Text>
        <View style={styles.rightButtonStyle}>
          <TouchableNativeFeedback>
            <View style={{ backgroundColor: "lightblue", padding: 8 }}>
              <Text style={{ color: "white", fontSize: 24 }}>Sign out</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    </>
  );
};

Header.defaultProps = {
  title: "Make Title",
  backIcon: false,
  callback: () => console.log("There is no callback"),
};

export default Header;
