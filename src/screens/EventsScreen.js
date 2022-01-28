import React, { useState, useEffect, useContext } from "react";
import { ActivityIndicator } from "react-native";

import { Context as LocationContext } from "../context/LocationContext";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as EventContext } from "../context/EventContext";
import { colorsMain } from "../styles/colors";
import CustomBackground from "../components/mainFlow/CustomBackground";
import SearchBar from "../components/mainFlow/SearchBar";
import EventsCard from "../components/mainFlow/EventsCard";

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

  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (permissions) {
      initialSearch(currentLocation);
    } else {
      setLoading(false);
    }
  }, []);

  if (!user) {
    return null;
  }

  const initialSearch = async (currentLocation) => {
    await searchForMyEvents();
    await searchForRecommended(currentLocation, myEvents);
    setLoading(false);
  };

  if (loading) {
    return (
      <CustomBackground safeAreaSecured justifyContent="center">
        <ActivityIndicator size={64} color={colorsMain.secondary} />
      </CustomBackground>
    );
  }

  const renderRecommended = () => {
    return (
      <EventsCard
        header="Recommended"
        caption="There isn't any upcoming events in your area..."
        from="Events"
        to="EventDetailsEvents"
        type="recommended"
        items={recommendedEvents}
        userEvents={user.events}
        token={token}
      />
    );
  };

  const renderMyEvents = () => {
    return (
      <EventsCard
        header="My Events"
        caption="You don't take part in any event..."
        from="Events"
        to="EventDetailsEvents"
        type="my_events"
        items={myEvents}
        userEvents={user.events}
        token={token}
      />
    );
  };

  return (
    <CustomBackground safeAreaSecured justifyContent="flex-start">
      <SearchBar term={searchTerm} setTerm={setSearchTerm} />
      {renderMyEvents()}
      {renderRecommended()}
    </CustomBackground>
  );
};

export default EventsScreen;
