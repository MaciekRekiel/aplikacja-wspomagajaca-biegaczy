// REACT REACT-NATIVE IMPORTS
import React from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  ImageBackground,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// REUSABLE COMPONENTS IMPORTS
import Button from "../../components/Button";
import Line from "../../components/Line";
import Spacer from "../../components/Spacer";
import { SCROLLVIEW_PADDING_TOP } from "../../utils/screen";

const ResetPasswordSuccessfulScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../../../assets/bg.jpg")}
      resizeMethod="auto"
      style={styles.imageBackgroundStyle}
    >
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <View style={styles.overlay}>
        <SafeAreaView style={styles.container}>
          <Spacer>
            <Text style={styles.header}>Success</Text>
          </Spacer>
          <Spacer>
            <Text style={styles.description}>
              Your password has been successfully changed!
            </Text>
          </Spacer>
          <Button
            title="Finish"
            onPress={() => navigation.navigate("Signin")}
          />
          <Line width={148} />
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
};

ResetPasswordSuccessfulScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: SCROLLVIEW_PADDING_TOP,
  },
  imageBackgroundStyle: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(46, 41, 78, 0.7)",
  },
  header: {
    fontSize: 32,
    color: "white",
  },
  description: {
    fontSize: 16,
    color: "white",
  },
});

export default ResetPasswordSuccessfulScreen;
