import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
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
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Explore by Area</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.areaList}
        data={areas}
        keyExtractor={(item) => item.strArea}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.areaButton,
              selectedArea === item.strArea && styles.selectedAreaButton,
            ]}
            onPress={() => loadMealsByArea(item.strArea)}
          >
            <Text
              style={[
                styles.areaText,
                selectedArea === item.strArea && styles.selectedAreaText,
              ]}
            >
              {item.strArea}
            </Text>
          </TouchableOpacity>
        )}
      />

      {loading && (
        <ActivityIndicator size="large" color="#FF784F" style={{ marginTop: 20 }} />
      )}

      {!loading && meals.length === 0 && (
        <Text style={styles.emptyText}>No meals found in {selectedArea}</Text>
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
              <View style={styles.mealInfo}>
                <Text style={styles.mealTitle}>{item.strMeal}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  heading: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 16,
    color: "#333",
    textAlign: "center",
  },
  areaList: {
    gap: 12,
    marginHorizontal:5
  },
  areaButton: {
    backgroundColor: "coral",
    padding:10,
    borderRadius: 10,
  },
  selectedAreaButton: {
    backgroundColor: "#444",
  },
  areaText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "500",
  },
  selectedAreaText: {
    color: "#FFDAB9",
  },
  mealList: {
    paddingTop: 10,
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
  mealInfo: {
    flex: 1,
  },
  mealTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#222",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#999",
  },
});

export default AreaListScreen;
