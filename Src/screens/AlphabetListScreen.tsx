import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Meal } from "../types/mealTypes";
import { fetchAllMealsByFirstLetter } from "../api/api";

const AlphabetListScreen = ({ navigation }) => {
  const letters = "ABCDEFGHIJKLMNOPRQSTUVWXYZ".split("");
  const [selectedLetter, setSelectedLetter] = useState("A");
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);

  const getMealsByLetter = async (letter: string) => {
    setSelectedLetter(letter);
    setLoading(true);
    const results = await fetchAllMealsByFirstLetter(letter.toLowerCase());
    setMeals(results);
    setLoading(false);
  };

  useEffect(() => {
    getMealsByLetter("A");
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.letterScroll}
      >
        {letters.map((letter) => (
          <TouchableOpacity
            key={letter}
            style={[
              styles.letterButton,
              letter === selectedLetter && styles.selectedLetterButton,
            ]}
            onPress={() => getMealsByLetter(letter)}
          >
            <Text style={[
              styles.letterText,
              letter === selectedLetter && styles.selectedLetterText,
            ]}>{letter}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
   
      {loading && <ActivityIndicator size="large" color="#FF784F" />}

      {!loading && meals.length === 0 && (
        <Text style={styles.emptyText}>
          There are no meals starting with "{selectedLetter}"
        </Text>
      )}

      {!loading && (
        <FlatList
          data={meals}
          contentContainerStyle={styles.mealList}
          keyExtractor={(item) => item.idMeal}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.mealCard}
              onPress={() =>
                navigation.navigate("Detail", { mealId: item.idMeal })
              }
            >
              <Image
                source={{ uri: item.strMealThumb }}
                style={styles.mealImage}
              />
              <Text style={styles.mealText}>{item.strMeal}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
 
  letterScroll: {
    gap: 8,
    paddingBottom: 8,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  letterButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "coral",
    shadowColor: "#003f5c",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  selectedLetterButton: {
    backgroundColor: "#444",
    shadowColor: "#003f5c",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 3,
  },
  letterText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  selectedLetterText: {
    color: "#FFDAB9",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 16,
    fontSize: 16,
    color: "#444",
  },
  mealText: {
    fontSize: 18,
    color: "#333",
  },
  mealList: {
    paddingTop: 16,
    gap: 16,
    marginHorizontal:14

  },
  mealCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    alignItems: "center",
    padding: 10,
    marginBottom: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  mealImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  mealTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#222",
  },
});

export default AlphabetListScreen;
