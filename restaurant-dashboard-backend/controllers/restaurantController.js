const Restaurant = require("../models/Restaurant");

// Create a new restaurant
exports.createRestaurant = async (req, res) => {
  const {
    name,
    ownerName,
    mobileNumber,
    email,
    address,
    dateOfJoining,
    dateOfExpiry,
    password,
    logo,
    numberOfBranches,
    subscriptionPlan,
  } = req.body;

  try {
    let restaurant = new Restaurant({
      name,
      ownerName,
      mobileNumber,
      email,
      address,
      dateOfJoining,
      dateOfExpiry,
      password,
      logo,
      numberOfBranches,
      subscriptionPlan,
    });

    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get all restaurants
exports.getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get dashboard summary (Aggregated data)
exports.getDashboardSummary = async (req, res) => {
  try {
    const totalRestaurants = await Restaurant.countDocuments();
    const activeRestaurants = await Restaurant.countDocuments({
      status: "Active",
    });
    const inactiveRestaurants = await Restaurant.countDocuments({
      status: "Inactive",
    });
    const totalRevenue = await Restaurant.aggregate([
      { $group: { _id: null, totalAmount: { $sum: "$revenue" } } },
    ]);

    res.json({
      totalRestaurants,
      activeRestaurants,
      inactiveRestaurants,
      totalRevenue: totalRevenue[0]?.totalAmount || 0,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
