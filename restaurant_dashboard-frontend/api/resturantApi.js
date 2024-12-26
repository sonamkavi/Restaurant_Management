import axios from "axios";

// API instance with base URL
const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// POST request to create a restaurant
export const createRestaurant = async (restaurantData) => {
  try {
    await api.post("/restaurant", restaurantData);
  } catch (error) {
    throw error;
  }
};

// POST request for login
export const login = async (loginData) => {
  try {
    const response = await api.post("/auth/login", loginData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// GET request for fetching dashboard data
export const fetchDashboardData = async () => {
  try {
    const response = await api.get("/restaurant/dashboard");
    return response.data;
  } catch (error) {
    throw error;
  }
};
