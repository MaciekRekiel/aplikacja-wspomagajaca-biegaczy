import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { colorsMain } from "../../styles/colors";
import serverInstance from "../../apis/server";

const EventsCard = ({ header, content, items }) => {
  let content = <Text style={styles.headerCaption}>{content}</Text>;

  if (items.length) {
    const renderItems = items.map((item) => {});
  }

  return null;
};

EventsCard.defaultProps = {
  header: "Set header...",
  content: "Set content...",
};

const styles = StyleSheet.create({});

export default EventsCard;
