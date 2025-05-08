import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { fetchCategories } from "./src/api/api";
import { FavouritesProvider } from "./src/stores/FavouritesContext";
import SampleScreen from "./src/screens/SampleScreen";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigator/AppNavigator";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const App = () => {
  useEffect(() => {
    const getCategories = async () => {
      const categories = await fetchCategories();
    };
    getCategories();
  }, []);

  return (
    <FavouritesProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </GestureHandlerRootView>
    </FavouritesProvider>
  );
};

export default App;
