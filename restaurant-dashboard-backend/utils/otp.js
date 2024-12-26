const nodemailer = require("nodemailer");

// Generate a random 6-digit OTP
function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send OTP to email
async function sendOtpToEmail(email, otp) {
  const transporter = nodemailer.createTransport({
    service: "gmail", // or your preferred email provider
    auth: {
      user: process.env.EMAIL, // your email
      pass: process.env.EMAIL_PASSWORD, // your email password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is: ${otp}`,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { generateOtp, sendOtpToEmail };
