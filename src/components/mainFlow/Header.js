import React from "react";
import { View, StyleSheet, Text, TouchableNativeFeedback } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Icon, Button } from "react-native-elements";

import { colorsAuth, colorsMain } from "../../styles/colors";

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
      elevation: 20,
      backgroundColor: colorsMain.backgroundHeader,
      height: 90,
    },
    headerText: {
      position: "absolute",
      color: colorsMain.headerButtonBackgroundPrimary,
      bottom: 12,
      left: backIcon ? 54 : 18,
      fontSize: 20,
      fontWeight: "bold",
    },
    iconStyle: {
      position: "absolute",
      bottom: 12,
      left: 12,
    },
    rightButtonPlacement: {
      position: "absolute",
      right: 12,
      bottom: 8,
    },
    rightButtonBorder: {
      padding: 1.5,
      borderRadius: 4,
    },
    rightButtonContainer: {
      backgroundColor: colorsMain.backgroundHeader,
      paddingHorizontal: 12,
      paddingVertical: 6,
    },
    rightButtonText: {
      fontSize: 18,
      color: colorsMain.headerButtonBackgroundSecondary,
    },
  });

  return (
    <>
      <View style={{ height: 0, marginBottom: 90 }} />
      <View style={styles.header}>
        {backIcon ? (
          <Icon
            onPress={backIconOnPress}
            color={colorsMain.headerButtonBackgroundPrimary}
            type="ionicon"
            name="arrow-back"
            containerStyle={styles.iconStyle}
          />
        ) : null}
        <Text style={styles.headerText}>{title}</Text>
        <View style={styles.rightButtonPlacement}>
          {rightButton ? (
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.rightButtonBorder}
              colors={[
                colorsMain.headerButtonBackgroundPrimary,
                colorsMain.headerButtonBackgroundSecondary,
              ]}
            >
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple(
                  colorsMain.headerButtonBackgroundPrimary
                )}
                onPress={rightButtonCallback}
              >
                <View style={styles.rightButtonContainer}>
                  <Text style={styles.rightButtonText}>Sign out</Text>
                </View>
              </TouchableNativeFeedback>
            </LinearGradient>
          ) : null}
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
