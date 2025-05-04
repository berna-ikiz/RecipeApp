import {
  View,
  Text,
  Button,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { fetchCategories } from "../api/api";
import { FlatList } from "react-native-gesture-handler";

export type Category = {
  idCategory: string,
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
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
    <View style={styles.container}>
      <Text style={styles.titleText}>Categories</Text>
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
            <View style={styles.itemContainer}>
              <Image
                source={{ uri: item.strCategoryThumb }}
                style={styles.image}
              />
              <Text style={styles.categoryText}>{item.strCategory}</Text>
            </View>
          </TouchableOpacity>
        )}
        style={styles.flatList}
      />
    </View>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff0bf',
    padding: 10,
  },
  titleText: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: '#FF7F50',
  },
  flatList: {
    marginBottom: 20,
  },
  itemContainer: {
    backgroundColor: '#fff8df',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  categoryText: {
    fontSize: 18,
    fontWeight: "600",
    color: '#FF7F50',
  },
});
