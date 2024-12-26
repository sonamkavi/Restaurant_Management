const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/User");
require("dotenv").config();

// Setup email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Generate OTP and send it to user's email
const sendOTP = (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP for Restaurant Dashboard",
    text: `Your OTP is: ${otp}`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

// Register user
exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
    const otpExpiration = new Date(Date.now() + 5 * 60 * 1000); // OTP expires in 5 minutes

    user = new User({ email, password, otp, otpExpiration });

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    sendOTP(email, otp);

    res.status(201).json({ msg: "User registered, OTP sent to email" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Login user and verify OTP
exports.login = async (req, res) => {
  const { email, password, otp } = req.body;
  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Verify OTP
    if (user.otp !== otp || new Date() > user.otpExpiration) {
      return res.status(400).json({ msg: "Invalid or expired OTP" });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid password" });
    }

    // Create JWT token
    const payload = {
      userId: user._id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
