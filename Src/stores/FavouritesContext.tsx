import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { doc, setDoc, getDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

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

  const loadFavouritesFromFireStore = async (): Promise<Meal[]> => {
    const docSnap = await getDoc(doc(db, "favourites"));
    return docSnap.exists() ? docSnap.data().favourites : [];
  };

  const saveFavouritesToFireStore = async (favourites: Meal[]) => {
    await setDoc(doc(collection(db, "favourites")), { favourites });
  };
  const addFavourite = async (meal: Meal) => {
    setFavourites((prev) => [...prev, meal]);
  };

  const removeFavourite = (id: string) => {
    setFavourites((prev) => prev.filter((meal) => meal.idMeal !== id));
  };

  useEffect(() => {
    loadFavouritesFromFireStore().then((data) => setFavourites(data));
  }, []);

  useEffect(() => {
    saveFavouritesToFireStore(favourites);
  }, [favourites]);

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
