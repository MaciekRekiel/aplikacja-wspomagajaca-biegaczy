import React from "react";
import { ImageBackground, StatusBar, View } from "react-native";

const CustomImageBackground = ({ style, children }) => {
  return (
    <ImageBackground
      source={require("../../../assets/bg.jpg")}
      resizeMethod="auto"
      style={style.imageBackgroundStyle}
    >
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <View style={style.overlay}>{children}</View>
    </ImageBackground>
  );
};

export default CustomImageBackground;
