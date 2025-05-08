import axios from "axios";

const API_URL = "https://www.themealdb.com/api/json/v1/1/";

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}categories.php`);
    console.log(response);
    return response.data.categories;
  } catch (error) {
    console.error("Categories couldn't get. Error: ", error);
  }
};

export const fetchMealsByCategory = async (category: string) => {
  try {
    const response = await axios.get(`${API_URL}filter.php?c=${category}`);
    return response.data.meals;
  } catch (error) {
    console.error(
      `Couldn't get any meals from the ${category} category. Error:`,
      error
    );
  }
};

export const fetchMealDetail = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}lookup.php?i=${id}`);
    return response.data.meals?.[0];
  } catch (error) {
    console.error("Meals data couldn't get. Error:", error);
  }
};

export const fetchMealsBySearch = async (query: string) => {
  try {
    const response = await axios.get(`${API_URL}search.php?s=${query}`);
    return response.data.meals || [];
  } catch (error) {
    console.error("Searching error:", error);
    return [];
  }
};

export const fetchAllMealsByFirstLetter = async (letter: string) => {
  try {
    const response = await axios.get(`${API_URL}search.php?f=${letter}`);
    return response.data.meals || [];
  } catch (error) {
    console.log(`${letter} there is no meals.`, error);
    return [];
  }
};
export const fetchAreas = async () => {
  try {
    const response = await axios.get(`${API_URL}list.php?a=list`);
    return response.data.meals || [];
  } catch (error) {
    console.log("There is no areas.", error);
    return [];
  }
};

export const fetchMealsByAreas = async (area:string) => {
  try {
    const response = await axios.get(`${API_URL}filter.php?a=${area}`);
    return response.data.meals || [];
  } catch (error) {
    console.log("There is no meals on this area.", error);
    return [];
  }
};
export default API_URL;
