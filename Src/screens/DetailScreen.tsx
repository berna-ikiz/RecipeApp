import { View, Text, ScrollView, Image, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { fetchMealDetail } from "../api/api";
import {MealDetails} from "../types/mealTypes";
import { RootStackParamList } from "../navigator/AppNavigator";
import { RouteProp } from "@react-navigation/native";

type DetailScreenRouteProp = RouteProp<RootStackParamList, "Detail">;
type Props = {
  route: DetailScreenRouteProp;
};

const DetailScreen = ({ route }:Props) => {
  const { mealId } = route.params;
  const [meal, setMeal] = useState<MealDetails | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getMeal = async () => {
      const data = await fetchMealDetail(mealId);
      console.log(JSON.stringify(data, null, 2));
      setMeal(data);
      setLoading(false);
    };
    getMeal();
  }, []);

  if (loading || !meal) {
    return <ActivityIndicator size={"large"} color={"tomato"} />;
  }
  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Image
        source={{ uri: meal.strMealThumb }}
        style={{ width: "100%", height: 200, borderRadius: 12 }}
      />
      <Text style={{ fontSize: 22, fontWeight: "bold", marginTop: 16 }}>
        {meal.strMeal}
      </Text>
      <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 16 }}>
        Category: {meal.strCategory}
      </Text>
      <Text style={{ fontSize: 18, fontWeight: "600", marginVertical: 10 }}>
        Area: {meal.strArea}
      </Text>
      <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 10 }}>
        {meal.strMeal}
      </Text>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        Ingredients
      </Text>
      {Array.from({ length: 20 }).map((_, index) => {
        const ingredient = meal[`strIngredient${index + 1}`];
        const measure = meal[`strMeasure${index + 1}`];

        if (ingredient && ingredient.trim()) {
          return (
            <Text key={index} style={{ fontSize: 18, fontWeight: "400" }}>
              - {ingredient} {measure ? `(${measure})` : null}
            </Text>
          );
        }
      })}
      <Text style={{ fontSize: 18, marginTop: 16, fontWeight: "bold" }}>
        Instructions:
      </Text>
      <Text style={{ fontSize: 18, marginTop: 10, fontWeight: "400" }}>
        {meal.strInstructions}:
      </Text>
    </ScrollView>
  );
};

export default DetailScreen;
