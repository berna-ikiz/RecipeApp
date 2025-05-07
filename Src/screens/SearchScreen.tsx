import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Meal } from "../types/mealTypes";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { fetchMealsBySearch } from "../api/api";

const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState("");
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const searchMeals = async () => {
    if(!query) {
      return;
    }
    setLoading(true);
    const result = await fetchMealsBySearch(query);
    setMeals(result);
    setLoading(false);
    setSearched(true);
  };

  return (
    <View style={{ padding: 16 }}>
      <TextInput
        placeholder="Search meal..."
        value={query}
        onChangeText={(text) => setQuery(text)}
        editable={!loading}
        onSubmitEditing={searchMeals}
        style={{
          borderWidth: 1,
          borderColor: "gray",
          borderRadius: 8,
          padding: 16,
          margin: 16,
        }}
      ></TextInput>
      {loading && <ActivityIndicator size={"large"} color={"#FF784F"} />}
      {!loading && searched && meals.length === 0 && (
        <Text>No results found...</Text>
      )}
      <FlatList
        data={meals}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Detail", { mealId: item.idMeal })
            }
          >
            <View style={{flexDirection:"row",alignItems:"center",paddingVertical:8}}>
              <Image
                source={{ uri: item.strMealThumb }}
                style={{ width: 42, height: 42, marginRight: 16 }}
              ></Image>
              <Text>{item.strMeal}</Text>
            </View>
          </TouchableOpacity>
        )}
      ></FlatList>
    </View>
  );
};

export default SearchScreen;
