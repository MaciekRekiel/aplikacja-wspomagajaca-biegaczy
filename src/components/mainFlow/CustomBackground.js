import React from "react";
import { ScrollView, StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { colorsMain } from "../../styles/colors";

const CustomBackground = ({ children, safeAreaSecured }) => {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
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
            paddingTop: (safeAreaSecured && 48) || 0,
          }}
        >
          {children}
        </LinearGradient>
      </ScrollView>
    </>
  );
};

CustomBackground.defaultProps = {
  safeAreaSecured: false,
};

export default CustomBackground;
