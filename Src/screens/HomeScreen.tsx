import {
  View,
  Text,
  Button,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { fetchCategories } from "../api/api";
import { FlatList } from "react-native-gesture-handler";

export type Category ={
  idCategory:string,
  strCategory:string;
  strCategoryThumb:string;
  strCategoryDescription:string;
}
const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
      setLoading(false);
    };
    getCategories();
  }, []);

  if (loading) {
    return <ActivityIndicator size={"large"} color={"tomato"} />;
  }

  return (
    <View>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          textAlign: "center",
          margin: 10,
        }}
      >
        Categories
      </Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.idCategory}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("CategoryMeals", {
                category: item.strCategory,
              })
            }
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 10,
              }}
            >
              <Image
                source={{ uri: item.strCategoryThumb }}
                style={{ width: 42, height: 42, margin: 10 }}
              />
              <Text>{item.strCategory}</Text>
            </View>
          </TouchableOpacity>
        )}
      ></FlatList>
      <Button
        title="Meal Details"
        onPress={() => navigation.navigate("Detail", { mealId: "1231" })}
      />
    </View>
  );
};

export default HomeScreen;
