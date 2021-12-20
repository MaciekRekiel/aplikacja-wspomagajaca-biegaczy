import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  reverseGeocodeAsync,
  getCurrentPositionAsync,
  Accuracy,
} from "expo-location";
import { LinearGradient } from "expo-linear-gradient";

import { Context as LocationContext } from "../context/LocationContext";
import { Context as AuthContext } from "../context/AuthContext";
import CustomBackground from "../components/mainFlow/CustomBackground";
import SearchBar from "../components/mainFlow/SearchBar";
import serverInstance from "../apis/server";
import { colorsMain } from "../styles/colors";

const EventsScreen = ({ navigation }) => {
  const {
    state: { token, user },
  } = useContext(AuthContext);
  const {
    state: { permissions, currentLocation },
  } = useContext(LocationContext);

  if (!user) {
    return null;
  }

  const [recommended, setRecommended] = useState([]);
  const [alreadyIn, setAlreadyIn] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const searchForRecommended = async (currentLocation) => {
    let location, response;
    if (!currentLocation) {
      response = await getCurrentPositionAsync({
        accuracy: Accuracy.BestForNavigation,
      });
      location = {
        latitude: response.coords.latitude,
        longitude: response.coords.longitude,
      };
    } else {
      location = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      };
    }
    response = await reverseGeocodeAsync(location);
    const query = {
      city: response[0].city,
    };
    try {
      response = await serverInstance.get("/events", {
        params: {
          ...query,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error.response.data);
    }
    setRecommended([...response.data]);
    // > 0
    // NIE DZIALA TO... "INVALID DATA"
    // if (user.events.length) {
    //   try {
    //     response = await serverInstance.get("/events/user", {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     });
    //     console.log(response.data[0].name);
    //   } catch (error) {
    //     console.log("here");
    //     console.log(error.response.data);
    //   }
    // }
    if (user.events.length) {
      await user.events.forEach(async (event) => {
        try {
          response = await serverInstance.get(`/events/${event}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setAlreadyIn([...alreadyIn, response.data]);
        } catch (error) {
          console.log(error.response.date);
        }
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    if (permissions) {
      searchForRecommended(currentLocation);
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <CustomBackground safeAreaSecured justifyContent="center">
        <ActivityIndicator size={64} color={colorsMain.secondary} />
      </CustomBackground>
    );
  }

  const renderRecommended = () => {
    let content = (
      <Text style={styles.headerCaption}>
        There isn't any upcoming events in your area...
      </Text>
    );

    if (recommended.length) {
      const renderItems = recommended.map((item) => {
        if (user.events.length) {
          if (user.events.includes(item._id)) {
            return;
          }
        }
        return (
          <TouchableOpacity
            onPress={() => {
              console.log("pressed");
              navigation.navigate("EventDetailsEvents", {
                item,
                from: "Events",
                token,
                userEvents: user.events,
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
      });
      // Remove nulls

      const newRenderItems = renderItems.filter((item) => item);
      if (newRenderItems.length) {
        content = (
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
        <Text style={styles.header}>Recommended</Text>
        {content}
      </LinearGradient>
    );
  };

  const renderMyEvents = () => {
    let content = (
      <Text style={styles.headerCaption}>
        You don't take part in any event...
      </Text>
    );

    if (alreadyIn.length) {
      const renderItems = alreadyIn.map((item) => {
        return (
          <TouchableOpacity
            onPress={() => {
              console.log("pressed");
              navigation.navigate("EventDetailsEvents", {
                item,
                from: "Events",
                token,
                userEvents: user.events,
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
      });

      content = (
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
        <Text style={styles.header}>My Events</Text>
        {content}
      </LinearGradient>
    );
  };

  return (
    <CustomBackground safeAreaSecured justifyContent="flex-start">
      <SearchBar
        term={searchTerm}
        setTerm={setSearchTerm}
        token={token}
        userEvents={user.events}
      />
      {renderMyEvents()}
      {renderRecommended()}
    </CustomBackground>
  );
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

export default EventsScreen;
