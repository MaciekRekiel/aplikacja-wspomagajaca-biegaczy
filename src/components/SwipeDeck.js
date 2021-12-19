import React from "react";
import { ScrollView } from "react-native";

import StatsDeckItem from "./mainFlow/StatsDeckItem";

const SwipeDeck = ({ stats }) => {
  const renderSwipeItems = () => {
    return stats.map((stat) => {
      return (
        <StatsDeckItem
          key={stat._id}
          id={stat._id}
          date={stat.date.slice(0, 10)}
          distance={stat.distance}
          totalTime={stat.totalTime}
          calories={stat.caloriesBurned}
          route={stat.route}
        />
      );
    });
  };

  return (
    <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
      {renderSwipeItems()}
    </ScrollView>
  );
};

export default SwipeDeck;
