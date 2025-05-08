import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Meal } from "../types/mealTypes";
import { fetchAllMealsByFirstLetter } from "../api/api";
import { FlatList } from "react-native-gesture-handler";

const AlphabetListScreen = ({ navigation }) => {
  const letters = "ABCDEFGHIJKLMNOPRQSTUVWXYZ".split("");
  const [selectedLetter, setSelectedLetter] = useState("A");
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);

  const getMealsByLetter = async (letter: string) => {
    setSelectedLetter(letter);
    setLoading(true);
    const results = await fetchAllMealsByFirstLetter(
      letter.toLocaleLowerCase()
    );
    setMeals(results);
    setLoading(false);
  };

  useEffect(() => {
    getMealsByLetter("A");
  }, []);
  return (
    <View style={{ padding: 16, gap: 24 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator
        contentContainerStyle={{ gap: 8 }}
      >
        {letters.map((letter) => (
          <TouchableOpacity
            style={{
              backgroundColor: letter === selectedLetter ? "gray" : "coral",
              padding: 8,
              borderRadius: 8,
            }}
            onPress={() => getMealsByLetter(letter)}
          >
            <Text style={{ color: "white", fontSize: 18 }}>{letter}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {loading && <ActivityIndicator size={"large"} color={"#FF784F"} />}
      {!loading && meals.length === 0 && (
        <Text>There is no meals starting with this {selectedLetter}</Text>
      )}
      <FlatList
        data={meals}
        contentContainerStyle={{ gap: 8 }}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={() =>
              navigation.navigate("Detail", { mealId: item.idMeal })
            }
          >
            <Image
              source={{ uri: item.strMealThumb }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 8,
                marginRight: 10,
              }}
            ></Image>
            <Text style={{ fontSize: 16 }}>{item.strMeal}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default AlphabetListScreen;
