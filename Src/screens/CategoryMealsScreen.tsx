import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { fetchMealsByCategory } from "../api/api";
import { FlatList } from "react-native-gesture-handler";
import { Meal } from "../types/mealTypes";
import { RootStackParamList } from "../navigator/AppNavigator";
import { NavigationProp, RouteProp } from "@react-navigation/native";

type Props = {
  route: RouteProp<RootStackParamList, "CategoryMeals">;
  navigation: NavigationProp<RootStackParamList, "CategoryMeals">;
};

const CategoryMealsScreen = ({ route, navigation }: Props) => {
  const { category } = route.params;
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMeals = async () => {
      const data = await fetchMealsByCategory(category);
      setMeals(data);
      console.log(JSON.stringify(data, null, 2));
      setLoading(false);
    };
    getMeals();
  }, []);

  if (loading) {
    return (
      <ActivityIndicator size={"large"} color={"#FF784F"} />
    );
  }

  return (
    <FlatList
      data={meals}
      keyExtractor={(item) => item.idMeal}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate("Detail", { mealId: item.idMeal })}
        >
          <View style={styles.itemContainer}>
            <Image
              source={{ uri: item.strMealThumb }}
              style={styles.image}
            />
            <Text style={styles.mealText} numberOfLines={1} ellipsizeMode="tail">{item.strMeal}</Text>
          </View>
        </TouchableOpacity>
      )}
      contentContainerStyle={styles.listContainer}
    />
  );
};

export default CategoryMealsScreen;

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
    backgroundColor: '#fff0bf',
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: '#fff8df',
    borderRadius: 10,
    shadowColor: '#B0A990',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    marginVertical: 8,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  mealText: {
    fontSize: 18,
    color: '#FF7F50',
    fontWeight: '600',
    maxWidth: 300 
  },
});
