import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Avatar, Button } from "react-native-elements";
import Card from "../components/Card";

import Spacer from "../components/Spacer";

const HomeScreen = ({ navigation }) => {
  const data = [
    { title: "Title 1", subtitle: "Subtitle 1" },
    { title: "Title 2", subtitle: "Subtitle 2" },
    { title: "Title 3", subtitle: "Subtitle 3" },
    { title: "Title 4", subtitle: "Subtitle 4" },
    { title: "Title 5", subtitle: "Subtitle 5" },
    { title: "Title 6", subtitle: "Subtitle 6" },
    { title: "Title 7", subtitle: "Subtitle 7" },
  ];

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <View style={styles.row}>
            <Avatar
              rounded
              size="large"
              containerStyle={styles.avatar}
              source={{
                uri: "https://images.generated.photos/hHCTnFYWP99SDS2h1nNRN8EPgD5j4oco54V78LD3jEg/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LmNvbmQvMmJkOGRj/Y2QtZDg1NS00ZTEy/LWE0NzAtYjEyNDcz/MzJmYjFlLmpwZw.jpg",
              }}
            />
            <Button
              type="outline"
              buttonStyle={{ paddingHorizontal: 20 }}
              title="Sign out"
              onPress={() => navigation.navigate("Signin")}
            />
          </View>
          <Card title="Twoje Nadchodzące Eventy..." data={data} />
        </View>
        <Spacer>
          <Button
            title="Rozpocznij Bieg"
            onPress={() => navigation.navigate("Running")}
          />
        </Spacer>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#EDEDE9",
    padding: 8,
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 5,
  },
  avatar: {
    shadowColor: "#000",
    elevation: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 15,
  },
});

export default HomeScreen;
