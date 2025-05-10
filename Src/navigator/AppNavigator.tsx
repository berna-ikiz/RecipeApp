import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import DetailScreen from "../screens/DetailScreen";
import SearchScreen from "../screens/SearchScreen";
import LikeScreen from "../screens/LikesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import AlphabetListScreen from "../screens/AlphabetListScreen";
import AreaListScreen from "../screens/AreaListScreen";

export type RootStackParamList = {
  HomeMain: undefined;
  Detail: { mealId: string };
  CategoryMeals: { category: string };
  AlphabetListScreen: undefined;
  AreaListScreen: undefined;
  search:undefined;
  likes:undefined;
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="HomeMain"
      component={HomeScreen}
      options={{ title: "Home" }}
    />
    <Stack.Screen
      name="Detail"
      component={DetailScreen}
      options={{ title: "Meal Detail" }}
    />
    <Stack.Screen
      name="CategoryMeals"
      component={CategoryMealsScreen}
      options={{ title: "Recipes" }}
    />
    <Stack.Screen
      name="AlphabetListScreen"
      component={AlphabetListScreen}
      options={{ title: "Recipes" }}
    />
    <Stack.Screen
      name="AreaListScreen"
      component={AreaListScreen}
      options={{ title: "Recipes" }}
    />
  </Stack.Navigator>
);

const SearchStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="search" component={SearchScreen} />
    <Stack.Screen
      name="Detail"
      component={DetailScreen}
      options={{ title: "Meal Detail" }}
    />
  </Stack.Navigator>
);


const LikesStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="likes" component={LikeScreen} />
    <Stack.Screen
      name="Detail"
      component={DetailScreen}
      options={{ title: "Meal Detail" }}
    />
  </Stack.Navigator>
);


const AppNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Search"
        component={SearchStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Likes"
        component={LikesStack}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
