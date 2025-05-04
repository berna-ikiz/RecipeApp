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
import {Meal} from "../types/mealTypes";
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
      <ActivityIndicator size={"large"} color={"tomato"}></ActivityIndicator>
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
          <View style={{flexDirection:"row", padding:16, alignItems:"center"}}>
            <Image
              source={{ uri: item.strMealThumb }}
              style={{
                width: 42,
                height: 42,
                marginRight:12,
              }}
            />
            <Text style={{ fontSize: 16 }}>{item.strMeal}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default CategoryMealsScreen;

const styles = StyleSheet.create({});
