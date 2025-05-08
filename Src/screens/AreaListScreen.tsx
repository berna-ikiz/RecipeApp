import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Area, Meal } from "../types/mealTypes";
import { fetchAreas, fetchMealsByAreas } from "../api/api";

const AreaListScreen = ({ navigation }) => {
  const [areas, setAreas] = useState<Area[]>([]);
  const [selectedArea, setSelectedArea] = useState("American");
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);

  const loadAreas = async () => {
    const data = await fetchAreas();
    setAreas(data);
  };

  const loadMealsByArea = async (area: string) => {
    setSelectedArea(area);
    setLoading(true);
    const data = await fetchMealsByAreas(area);
    setMeals(data);
    setLoading(false);
  };

  useEffect(() => {
    loadAreas();
    loadMealsByArea("American");
  }, []);

  return (
    <View>
      <Text>Choose Country</Text>
      <FlatList
        horizontal
        contentContainerStyle={{ gap: 16 }}
        data={areas}
        keyExtractor={(item) => item.strArea}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => loadMealsByArea(item.strArea)}>
            <Text
              style={{
                fontSize: 16,
                color: selectedArea === item.strArea ? "gray" : "coral",
              }}
            >
              {item.strArea}
            </Text>
          </TouchableOpacity>
        )}
      />
      {loading && <ActivityIndicator size={"large"} color={"#FF784F"} />}
      {!loading && meals.length === 0 && (
        <Text>There is no meals starting with this {selectedArea}</Text>
      )}
      <FlatList
        data={meals}
        keyExtractor={(item) => item.idMeal}
        contentContainerStyle={{ paddingTop: 8, gap: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
            onPress={() =>
              navigation.navigate("Detail", { mealId: item.idMeal })
            }
          >
            <Image
              source={{ uri: item.strMealThumb }}
              style={{ width: 50, height: 50 }}
            ></Image>
            <Text>{item.strMeal}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default AreaListScreen;
