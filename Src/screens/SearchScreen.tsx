import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { Meal } from "../types/mealTypes";
import { fetchMealsBySearch } from "../api/api";

const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState("");
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const searchMeals = async () => {
    if (!query.trim()) return;
    setLoading(true);
    const result = await fetchMealsBySearch(query);
    setMeals(result);
    setLoading(false);
    setSearched(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Meals</Text>
      <TextInput
        placeholder="Search meal..."
        value={query}
        onChangeText={setQuery}
        editable={!loading}
        onSubmitEditing={searchMeals}
        style={styles.input}
      />

      {loading && (
        <ActivityIndicator style={{ marginTop: 16 }} size="large" color="#FF784F" />
      )}

      {!loading && searched && meals.length === 0 && (
        <Text style={styles.noResultsText}>No results found...</Text>
      )}

      <FlatList
        data={meals}
        keyExtractor={(item) => item.idMeal}
        contentContainerStyle={styles.resultsList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.resultItem}
            onPress={() => navigation.navigate("Detail", { mealId: item.idMeal })}
          >
            <Image source={{ uri: item.strMealThumb }} style={styles.thumbnail} />
            <Text style={styles.mealName}>{item.strMeal}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FF784F",
    marginBottom: 12,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  noResultsText: {
    textAlign: "center",
    marginTop: 20,
    color: "#999",
    fontSize: 16,
  },
  resultsList: {
    marginTop: 16,
    paddingBottom: 16,
  },
  resultItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  mealName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
});
