import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import React from "react";
import { useFavourites } from "../stores/FavouritesContext";

const LikesScreen = ({ navigation }) => {
  const { favourites, removeFavourite } = useFavourites();

  if (favourites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>There are no favourites yet.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Favourites</Text>
      <FlatList
        data={favourites}
        keyExtractor={(item) => item.idMeal}
        contentContainerStyle={{ paddingBottom: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={()=> navigation.navigate("Detail", { mealId: item.idMeal })}
          >
            <View style={styles.row}>
              <Image source={{ uri: item.strMealThumb }} style={styles.image} />
              <View style={styles.info}>
                <Text style={styles.mealName}>{item.strMeal}</Text>
              </View>
            </View>
            <Pressable
              style={({ pressed }) => [
                styles.deleteButton,
                pressed && { opacity: 0.7 },
              ]}
              onPress={() => removeFavourite(item.idMeal)}
            >
              <Text style={styles.deleteText}>Remove</Text>
            </Pressable>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default LikesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    backgroundColor: "#FAFAFA",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF784F",
    textAlign: "center",
    marginBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  mealName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  deleteButton: {
    backgroundColor: "#FF6B6B",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
