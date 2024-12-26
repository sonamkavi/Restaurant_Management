const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    ownerName: { type: String, required: true },
    mobile: { type: String, required: true },
    whatsapp: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    gst: { type: String },
    address: { type: String, required: true },
    doj: { type: Date, required: true },
    doe: { type: Date, required: true },
    password: { type: String, required: true },
    logo: { type: String },
    branches: { type: Number, required: true },
    status: { type: String, enum: ["active", "inactive"], required: true },
    subscriptionPlan: {
      type: String,
      enum: ["Basic", "Premium"],
      required: true,
    },
    revenue: { type: Number, default: 0 }, // Add revenue field
  },
  { timestamps: true }
);

module.exports = mongoose.model("Restaurant", restaurantSchema);
