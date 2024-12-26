const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Assuming you have a User model
const { generateOtp, sendOtpToEmail } = require("../utils/otp"); // Import OTP utility

const router = express.Router();

// Route for login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Validate if the email exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // Compare the entered password with the hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // Generate OTP and send it
  const otp = generateOtp();
  await sendOtpToEmail(email, otp);

  // Store OTP in the database temporarily (to validate later)
  user.otp = otp;
  await user.save();

  res.status(200).json({ message: "OTP sent to your email" });
});

// Route for OTP verification
router.post("/verify-otp", async (req, res) => {
  const { email, otpEntered } = req.body;

  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  // Verify if the OTP entered is correct
  if (user.otp !== otpEntered) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  // OTP is valid, create a JWT token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  // Clear OTP from the database (for security)
  user.otp = null;
  await user.save();

  res.status(200).json({ message: "Login successful", token });
});

module.exports = router;
