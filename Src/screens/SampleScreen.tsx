import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Meal, useFavourites } from "../stores/FavouritesContext";

const SampleScreen = () => {
  const { favourites, addFavourite, removeFavourite } = useFavourites();

  const sampleMeal: Meal = {
    idMeal: "123",
    strMeal: "Chicken Curry",
    strMealThumb: "https://www.themealdb.com/images/media/meals/1520084413.jpg",
  };

  return (
    <SafeAreaView>
      <Text>Favori Yemekleri: {favourites.length}</Text>
      <Button title="Add" onPress={()=>addFavourite(sampleMeal)}/>
      <Button title="Remove" onPress={()=>removeFavourite(sampleMeal.idMeal)}/>
    </SafeAreaView>
  );
};

export default SampleScreen;

const styles = StyleSheet.create({});
