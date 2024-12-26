const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Database connection (replace with your actual DB config)
const connectDB = require("./config/db");

// Import the Restaurant model
const Restaurant = require("./models/Restaurant");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // To parse incoming JSON data

// Route for creating a restaurant
app.post("/api/restaurant", async (req, res) => {
  try {
    const {
      name,
      ownerName,
      mobile,
      whatsapp,
      email,
      gst,
      address,
      doj,
      doe,
      password,
      logo,
      branches,
      status,
      subscriptionPlan,
      revenue,
    } = req.body;

    // Check if all required fields are provided
    if (
      !name ||
      !ownerName ||
      !mobile ||
      !whatsapp ||
      !email ||
      !address ||
      !doj ||
      !doe ||
      !password ||
      !branches ||
      !status ||
      !subscriptionPlan
    ) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    // Create a new restaurant document
    const newRestaurant = new Restaurant({
      name,
      ownerName,
      mobile,
      whatsapp,
      email,
      gst,
      address,
      doj,
      doe,
      password,
      logo,
      branches,
      status,
      subscriptionPlan,
      revenue,
    });

    // Save the restaurant data to MongoDB
    await newRestaurant.save();

    // Return the saved restaurant as a response
    return res.status(201).json(newRestaurant);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

// Route for the login functionality (authentication)
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "testuser@example.com" && password === "password123") {
    return res.status(200).json({ message: "OTP sent to your email" });
  }

  return res.status(400).json({ message: "Invalid credentials" });
});

// Route for dashboard data (restaurant overview)
app.get("/api/restaurant/dashboard", (req, res) => {
  const dashboardData = {
    totalRestaurants: 10,
    activeRestaurants: 8,
    inactiveRestaurants: 2,
    totalRevenue: 50000,
  };

  return res.status(200).json(dashboardData);
});

// Start the server and listen on the specified port
const PORT = process.env.PORT || 5000; // Use the environment variable or default to port 5000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app; // Export for testing purposes
