import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Avatar, Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";

import Spacer from "../components/Spacer";

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Spacer>
        <View style={styles.row}>
          <Avatar
            rounded
            size="large"
            source={{
              uri: "https://images.generated.photos/hHCTnFYWP99SDS2h1nNRN8EPgD5j4oco54V78LD3jEg/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LmNvbmQvMmJkOGRj/Y2QtZDg1NS00ZTEy/LWE0NzAtYjEyNDcz/MzJmYjFlLmpwZw.jpg",
            }}
          />
          <Button
            title="Sign out"
            onPress={() => navigation.navigate("Signin")}
          />
        </View>
      </Spacer>
      <Spacer>
        <View>
          <Text h2>Twoje Nadchodzące eventy...</Text>
        </View>
      </Spacer>
      <Spacer>
        <View>
          <Button
            title="Rozpocznij Bieg"
            onPress={() => navigation.navigate("Running")}
          />
        </View>
      </Spacer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default HomeScreen;
