import React from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Text, Avatar, Button, ListItem } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

import Spacer from "../components/Spacer";

const HomeScreen = ({ navigation }) => {
  return (
    // <SafeAreaView style={{ flex: 1, borderColor: "green", borderWidth: 1 }}>
    <ScrollView>
      <View style={styles.container}>
        <Spacer>
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
          <View style={styles.card}>
            <Text h2>Twoje Nadchodzące eventy...</Text>
            <TouchableOpacity>
              <ListItem>
                <ListItem.Content>
                  <ListItem.Title>Title1</ListItem.Title>
                  <ListItem.Subtitle>Subtitle1</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            </TouchableOpacity>
            <TouchableOpacity>
              <ListItem>
                <ListItem.Content>
                  <ListItem.Title>Title2</ListItem.Title>
                  <ListItem.Subtitle>Subtitle2</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            </TouchableOpacity>
            <TouchableOpacity>
              <ListItem>
                <ListItem.Content>
                  <ListItem.Title>Title2</ListItem.Title>
                  <ListItem.Subtitle>Subtitle2</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            </TouchableOpacity>
            <TouchableOpacity>
              <ListItem>
                <ListItem.Content>
                  <ListItem.Title>Title2</ListItem.Title>
                  <ListItem.Subtitle>Subtitle2</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            </TouchableOpacity>
            <TouchableOpacity>
              <ListItem>
                <ListItem.Content>
                  <ListItem.Title>Title2</ListItem.Title>
                  <ListItem.Subtitle>Subtitle2</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            </TouchableOpacity>
            <TouchableOpacity>
              <ListItem>
                <ListItem.Content>
                  <ListItem.Title>Title2</ListItem.Title>
                  <ListItem.Subtitle>Subtitle2</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            </TouchableOpacity>
            <TouchableOpacity>
              <ListItem>
                <ListItem.Content>
                  <ListItem.Title>Title2</ListItem.Title>
                  <ListItem.Subtitle>Subtitle2</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            </TouchableOpacity>
          </View>
        </Spacer>
        <Spacer>
          <Button
            title="Rozpocznij Bieg"
            onPress={() => navigation.navigate("Running")}
          />
        </Spacer>
      </View>
    </ScrollView>
    // </SafeAreaView>
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
    marginBottom: 24,
  },
});

export default HomeScreen;
