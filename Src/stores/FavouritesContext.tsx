import { createContext, ReactNode, useContext, useState } from "react";

export type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};
type FavouritesContextType = {
  favourites: Meal[];
  addFavourite: (meal: Meal) => void;
  removeFavourite: (id: string) => void;
};
const FavouritesContext = createContext<FavouritesContextType | undefined>(
  undefined
);

export const FavouritesProvider = ({ children }: { children: ReactNode }) => {
  const [favourites, setFavourites] = useState<Meal[]>([]);
  const addFavourite = (meal: Meal) => {
    setFavourites((prev) => [...prev, meal]);
  };

  const removeFavourite = (id: string) => {
    setFavourites((prev) => prev.filter((meal) => meal.idMeal !== id));
  };

  return (
    <FavouritesContext.Provider
      value={{ favourites, addFavourite, removeFavourite }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => {
  const context = useContext(FavouritesContext);
  if (!context) {
    throw new Error("useFavourites hook use with FavouritesProvider.");
  }
  return context;
};
