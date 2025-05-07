import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import React from "react";
import { useFavourites } from "../stores/FavouritesContext";

const LikesScreen = ({ navigation }) => {
  const { favourites, removeFavourite } = useFavourites();

  if (favourites.length === 0) {
    return (
      <View style={{ padding: 16 }}>
        <Text>There is no any favourites.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favourites}
      keyExtractor={(item) => item.idMeal}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate("Detail", { mealId: item.idMeal })}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{flexDirection:"row", alignItems:"center"}}>
              <Image
                source={{ uri: item.strMealThumb }}
                style={{ width: 42, height: 42, marginRight: 16 }}
              />
              <View>
                <Text>{item.strMeal}</Text>
              </View>
            </View>
            <Button title="Sil" onPress={() => removeFavourite(item.idMeal)} />
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default LikesScreen;

const styles = StyleSheet.create({});
