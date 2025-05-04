import { View, Text, ScrollView, Image, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { fetchMealDetail } from "../api/api";

export type Meal = {
  idMeal: string;
  strMeal: string;
  strMealAlternate: string | null;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string;
  strSource: string | null;
  strImageSource: string | null;
  strCreativeCommonsConfirmed: string | null;
  dateModified: string | null;

  strIngredient1?: string;
  strIngredient2?: string;
  strIngredient3?: string;
  strIngredient4?: string;
  strIngredient5?: string;
  strIngredient6?: string;
  strIngredient7?: string;
  strIngredient8?: string;
  strIngredient9?: string;
  strIngredient10?: string;
  strIngredient11?: string;
  strIngredient12?: string;
  strIngredient13?: string;
  strIngredient14?: string;
  strIngredient15?: string;
  strIngredient16?: string;
  strIngredient17?: string;
  strIngredient18?: string;
  strIngredient19?: string;
  strIngredient20?: string;

  strMeasure1?: string;
  strMeasure2?: string;
  strMeasure3?: string;
  strMeasure4?: string;
  strMeasure5?: string;
  strMeasure6?: string;
  strMeasure7?: string;
  strMeasure8?: string;
  strMeasure9?: string;
  strMeasure10?: string;
  strMeasure11?: string;
  strMeasure12?: string;
  strMeasure13?: string;
  strMeasure14?: string;
  strMeasure15?: string;
  strMeasure16?: string;
  strMeasure17?: string;
  strMeasure18?: string;
  strMeasure19?: string;
  strMeasure20?: string;
};

const DetailScreen = ({ route }) => {
  const { mealId } = route.params;
  const [meal, setMeal] = useState<Meal | null>(null);
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
