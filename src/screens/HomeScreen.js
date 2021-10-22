import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Avatar, Button } from "react-native-elements";
import Spacer from "../components/Spacer";

const HomeScreen = () => {
  return (
    <View>
      <Spacer>
        <View style={styles.row}>
          <Avatar
            rounded
            size="xlarge"
            source={{
              uri: "https://images.generated.photos/hHCTnFYWP99SDS2h1nNRN8EPgD5j4oco54V78LD3jEg/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LmNvbmQvMmJkOGRj/Y2QtZDg1NS00ZTEy/LWE0NzAtYjEyNDcz/MzJmYjFlLmpwZw.jpg",
            }}
          />
          <Button title="Sign out" />
        </View>
      </Spacer>
    </View>
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
