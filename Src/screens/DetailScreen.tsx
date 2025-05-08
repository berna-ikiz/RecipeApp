import { View, Text, ScrollView, Image, ActivityIndicator, StyleSheet, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { fetchMealDetail } from "../api/api";
import { MealDetails } from "../types/mealTypes";
import { RootStackParamList } from "../navigator/AppNavigator";
import { RouteProp } from "@react-navigation/native";
import { useFavourites } from "../stores/FavouritesContext";

type DetailScreenRouteProp = RouteProp<RootStackParamList, "Detail">;
type Props = {
  route: DetailScreenRouteProp;
};

const DetailScreen = ({ route }: Props) => {
  const { mealId } = route.params;
  const [meal, setMeal] = useState<MealDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const {favourites,addFavourite,removeFavourite} = useFavourites();
  const isFavourite = favourites.some(item=> item.idMeal === meal?.idMeal);
  
  useEffect(() => {
    const getMeal = async () => {
      const data = await fetchMealDetail(mealId);
      setMeal(data);
      setLoading(false);
    };
    getMeal();
  }, []);

  if (loading || !meal) {
    return <ActivityIndicator size={"large"} color={"#FF784F"} />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: meal.strMealThumb }}
        style={styles.image}
      />
      <Button title={isFavourite ? "Favorilerden Çıkart" : "Favorilere Ekle"} onPress={() => isFavourite ? removeFavourite(meal.idMeal) : addFavourite(meal) }></Button>
      <Text style={styles.title}>{meal.strMeal}</Text>
      <Text style={styles.category}>Category: {meal.strCategory}</Text>
      <Text style={styles.area}>Area: {meal.strArea}</Text>
      <Text style={styles.ingredientsTitle}>Ingredients</Text>
      {Array.from({ length: 20 }).map((_, index) => {
        const ingredient = meal[`strIngredient${index + 1}`];
        const measure = meal[`strMeasure${index + 1}`];

        if (ingredient && ingredient.trim()) {
          return (
            <Text key={index} style={styles.ingredient}>
              - {ingredient} {measure ? `(${measure})` : null}
            </Text>
          );
        }
      })}
      <Text style={styles.instructionsTitle}>Instructions:</Text>
      <Text style={styles.instructions}>{meal.strInstructions}</Text>
    </ScrollView>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 16,
    color: '#FF7F50', 
  },
  category: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 16,
    color: '#003f5c', 
  },
  area: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
    color: '#003f5c', 
  },
  ingredientsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: '#FF7F50', 
  },
  ingredient: {
    fontSize: 18,
    fontWeight: "500",
    color: '#476066', 
  },
  instructionsTitle: {
    fontSize: 18,
    marginTop: 16,
    fontWeight: "bold",
    color: '#D94F4F', 
  },
  instructions: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: "500",
    color: '#476066', 
    textAlign: 'justify',
  },
});
