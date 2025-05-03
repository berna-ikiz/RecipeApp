import { View, Text } from "react-native";
import React from "react";

const DetailScreen = ({ route }) => {
  const params = route.params;
  return (
    <View>
      <Text>Yemek Id: {params.mealId}</Text>
    </View>
  );
};

export default DetailScreen;
