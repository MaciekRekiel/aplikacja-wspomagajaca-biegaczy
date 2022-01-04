import React, { useState, useEffect, useContext } from "react";
import { ActivityIndicator } from "react-native";

import { Context as LocationContext } from "../context/LocationContext";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as EventContext } from "../context/EventContext";
import CustomBackground from "../components/mainFlow/CustomBackground";
import SearchBar from "../components/mainFlow/SearchBar";
import EventsCard from "../components/mainFlow/EventsCard";
import { colorsMain } from "../styles/colors";

const EventsScreen = () => {
  const {
    state: { token, user },
  } = useContext(AuthContext);
  const {
    state: { permissions, currentLocation },
  } = useContext(LocationContext);
  const {
    state: { recommendedEvents, myEvents },
    searchForRecommended,
    searchForMyEvents,
  } = useContext(EventContext);

  if (!user) {
    return null;
  }

  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const initialSearch = async (currentLocation) => {
    await searchForRecommended(currentLocation);
    await searchForMyEvents();
    setLoading(false);
  };

  useEffect(() => {
    if (permissions) {
      initialSearch(currentLocation);
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
    if (user) {
      return (
        <EventsCard
          header="Recommended"
          caption="There isn't any upcoming events in your area..."
          items={recommendedEvents}
          from="Events"
          to="EventDetailsEvents"
          userEvents={user.events}
          type="recommended"
          token={token}
        />
      );
    }
  };

  const renderMyEvents = () => {
    if (user) {
      return (
        <EventsCard
          header="My Events"
          caption="You don't take part in any event..."
          items={myEvents}
          from="Events"
          to="EventDetailsEvents"
          userEvents={user.events}
          type="my_events"
          token={token}
        />
      );
    }
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

export default EventsScreen;
