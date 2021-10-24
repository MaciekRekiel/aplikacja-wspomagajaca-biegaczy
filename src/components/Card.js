import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, ListItem } from "react-native-elements";

import Spacer from "./Spacer";

const Card = ({ title, data }) => {
  if (!data) {
    return (
      <Spacer>
        <View style={styles.card}>
          <Text h4>{title}</Text>
        </View>
      </Spacer>
    );
  }

  return (
    <Spacer>
      <View style={styles.card}>
        <Text h3>{title}</Text>
        {data.map(({ title, subtitle }) => (
          <TouchableOpacity key={title}>
            <ListItem>
              <ListItem.Content>
                <ListItem.Title>{title}</ListItem.Title>
                <ListItem.Subtitle>{subtitle}</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          </TouchableOpacity>
        ))}
      </View>
    </Spacer>
  );
};

const styles = StyleSheet.create({
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
});

export default Card;
