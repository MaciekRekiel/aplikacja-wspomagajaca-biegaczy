import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Icon } from "react-native-elements";

const Header = ({ title, backIcon, callback }) => {
  const styles = StyleSheet.create({
    header: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 100,
      elevation: 5,
      backgroundColor: "hsl(234, 43%, 19%)",
      height: 90,
    },
    headerText: {
      position: "absolute",
      color: "white",
      bottom: 8,
      left: backIcon ? 54 : 18,
      fontSize: 20,
      fontWeight: "bold",
    },
    iconStyle: {
      position: "absolute",
      bottom: 8,
      left: 12,
    },
  });

  return (
    <View style={styles.header}>
      {backIcon ? (
        <Icon
          onPress={callback}
          color="white"
          type="ionicon"
          name="arrow-back"
          containerStyle={styles.iconStyle}
        />
      ) : null}
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
};

Header.defaultProps = {
  title: "Make Title",
  backIcon: false,
  callback: () => console.log("There is no callback"),
};

export default Header;
