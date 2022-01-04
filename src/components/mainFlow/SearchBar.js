import React, { useEffect, useContext, useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { debounce } from "lodash";

import { Context as EventContext } from "../../context/EventContext";
import { colorsMain } from "../../styles/colors";
import { navigate } from "../../navigationRef";

const SearchBar = ({ term, setTerm, token, userEvents }) => {
  const { state, searchForEvents, clearEvents } = useContext(EventContext);
  const debouceRequest = useCallback((text) => request(text), []);

  const request = debounce(async (text) => {
    searchForEvents({ name: text });
  }, 500);

  const onTextChange = (text) => {
    debouceRequest(text);
    setTerm(text);
  };

  const renderItems = () => {
    return state.events.map((item) => {
      return (
        <TouchableNativeFeedback
          key={item._id}
          onPress={() => {
            clearEvents();
            navigate("EventDetailsEvents", {
              item,
              from: "Events",
              token,
              userEvents,
            });
          }}
        >
          <View style={styles.dropdownListItem}>
            <Text style={styles.dropdownListItemText}>{item.name}</Text>
            <Text style={styles.dropdownListItemText}>
              {item.date.slice(0, 10)}
            </Text>
          </View>
        </TouchableNativeFeedback>
      );
    });
  };

  return (
    <>
      <View style={styles.inputContainer}>
        <FontAwesome style={styles.icon} name="search" />
        <TextInput
          style={styles.input}
          autoCorrect={false}
          value={term}
          onChangeText={onTextChange}
          placeholder="Search for Event"
          placeholderTextColor={colorsMain.primary}
        />
      </View>
      {state.events.length ? (
        <View style={styles.dropdownList}>{renderItems()}</View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: colorsMain.backgroundSecondary,
    height: 54,
    borderRadius: 5,
    margin: 15,
    flexDirection: "row",
    borderRadius: 40,
    elevation: 5,
  },
  input: {
    flex: 1,
    fontSize: 18,
    marginRight: 12,
    color: colorsMain.primary,
  },
  icon: {
    fontSize: 30,
    color: colorsMain.primary,
    alignSelf: "center",
    marginHorizontal: 12,
  },
  dropdownList: {
    marginHorizontal: 15 + 24,
    backgroundColor: colorsMain.backgroundPrimary,
    borderWidth: 0.25,
    borderBottomWidth: 0,
    borderColor: colorsMain.secondary,
    marginTop: -14,
  },
  dropdownListItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 0.25,
    borderColor: colorsMain.secondary,
  },
  dropdownListItemText: {
    fontSize: 20,
    paddingHorizontal: 8,
    color: colorsMain.primary,
    paddingVertical: 8,
  },
});

export default SearchBar;
