import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { colorsMain } from "../../styles/colors";
import serverInstance from "../../apis/server";
import { navigate } from "../../navigationRef";

const EventsCard = ({ header, caption, items, from, to, userEvents, type }) => {
  const itemBody = (item) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigate(to, {
            item,
            from,
            userEvents: userEvents || [],
          });
        }}
        key={item._id}
      >
        <View style={styles.listItem}>
          <Text style={styles.listItemText}>{item.name}</Text>
          <Text style={styles.listItemText}>{item.maxParticipants}</Text>
          <Text style={styles.listItemText}>{item.date.slice(0, 10)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  let cardContent = <Text style={styles.headerCaption}>{caption}</Text>;
  if (items.length) {
    let renderItems = [];

    switch (type) {
      case "recommended":
        renderItems = items.map((item) => {
          if (userEvents.length) {
            if (userEvents.includes(item._id)) {
              return null;
            }
          }
          return itemBody(item);
        });
        // REMOVE NULLS WHICH OCCUR WHENEVER USER ALREADY TAKES PART IN THE EVENT
        renderItems = renderItems.filter((item) => item);
        if (renderItems.length) {
          cardContent = (
            <>
              <View style={styles.row}>
                <Text style={styles.rowText}>Name</Text>
                <Text style={styles.rowText}>Max Participants</Text>
                <Text style={styles.rowText}>Date</Text>
              </View>
              {renderItems}
            </>
          );
        }
        break;
      case "my_events":
        renderItems = items.map((item) => {
          return itemBody(item);
        });
        if (renderItems.length) {
          cardContent = (
            <>
              <View style={styles.row}>
                <Text style={styles.rowText}>Name</Text>
                <Text style={styles.rowText}>Max Participants</Text>
                <Text style={styles.rowText}>Date</Text>
              </View>
              {renderItems}
            </>
          );
        }
      default:
        break;
    }
  }

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={[
        colorsMain.cardBackroundPrimary,
        colorsMain.cardBackgroundSecondary,
      ]}
      style={styles.container}
    >
      <Text style={styles.header}>{header}</Text>
      {cardContent}
    </LinearGradient>
  );
};

EventsCard.defaultProps = {
  header: "Set header...",
  content: "Set content...",
  type: "my_events",
  userEvents: [],
};

const styles = StyleSheet.create({
  container: {
    margin: 15,
    padding: 15,
    elevation: 4,
    borderRadius: 8,
  },
  header: {
    fontSize: 28,
    color: colorsMain.primary,
    borderBottomWidth: 2,
    borderColor: colorsMain.secondary,
    paddingBottom: 4,
    marginBottom: 8,
  },
  headerCaption: {
    fontSize: 16,
    color: colorsMain.primary,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  rowText: {
    fontSize: 18,
    color: colorsMain.primary,
    flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderWidth: 0.5,
    borderRadius: 4,
    marginTop: 8,
    borderColor: colorsMain.secondary,
  },
  listItemText: {
    fontSize: 14,
    color: colorsMain.primary,
    flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
  },
});

export default EventsCard;
