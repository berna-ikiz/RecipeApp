import axios from "axios";

const API_URL = "https://www.themealdb.com/api/json/v1/1/";

export const fetchCategories = async () => {
  try {
    console.log('here')
    const response = await axios.get(`${API_URL}categories.php`);
    console.log(response)
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
export default API_URL;
