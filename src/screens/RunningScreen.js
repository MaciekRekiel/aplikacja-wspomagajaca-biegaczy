import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

import Spacer from "../components/Spacer";

const RunningScreen = () => {
  return (
    <SafeAreaView>
      <Spacer>
        <Text h2>Cos tam Running screen</Text>
      </Spacer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default RunningScreen;
