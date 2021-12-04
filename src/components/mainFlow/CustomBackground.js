import React from "react";
import { ScrollView, StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { colorsMain } from "../../styles/colors";

const CustomBackground = ({ children }) => {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={[
            colorsMain.backgroundPrimary,
            colorsMain.backgroundSecondary,
          ]}
          style={{
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          {children}
        </LinearGradient>
      </ScrollView>
    </>
  );
};

export default CustomBackground;
