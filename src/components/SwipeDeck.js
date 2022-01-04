import React from "react";
import { ScrollView } from "react-native";

import StatsDeckItem from "./mainFlow/StatsDeckItem";

const SwipeDeck = ({ stats }) => {
  const renderSwipeItems = () => {
    return stats.map((stat) => {
      return <StatsDeckItem key={stat._id} stat={stat} />;
    });
  };

  return (
    <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
      {renderSwipeItems()}
    </ScrollView>
  );
};

export default SwipeDeck;
