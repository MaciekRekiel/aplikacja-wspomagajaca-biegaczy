import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, ListItem } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";

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
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        // colors={["hsl(234, 43%, 36%)", "hsl(218, 69%, 40%)"]}
        colors={["hsl(203, 68%, 30%)", "hsl(203, 68%, 37%)"]}
        style={styles.card}
      >
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
      </LinearGradient>
    </Spacer>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 8,
    borderRadius: 4,
    elevation: 5,
  },
});

export default Card;
