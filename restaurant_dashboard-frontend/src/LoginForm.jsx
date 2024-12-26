import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

const LoginForm = () => {
  const [emailOrMobile, setEmailOrMobile] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(""); // Reset error message

    try {
      // Simulate server request for login
      setTimeout(() => {
        if (emailOrMobile && password) {
          alert("Logged in successfully!");
          setIsLoading(false);
          navigate("/dashboard"); // Navigate to Dashboard
        } else {
          setErrorMessage("Invalid credentials. Please try again.");
          setIsLoading(false);
        }
      }, 1000);
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  const handleSendOtp = () => {
    if (!emailOrMobile) {
      setErrorMessage("Please enter a valid email or mobile number.");
      return;
    }

    setIsOtpSent(true);
    alert("OTP has been sent to your email/mobile.");
  };

  return (
    <div className="login-form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-container">
          <input
            type="text"
            name="emailOrMobile"
            value={emailOrMobile}
            onChange={(e) => setEmailOrMobile(e.target.value)}
            placeholder="Email or Mobile Number"
            required
            className="input-field"
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="input-field"
          />
        </div>

        {/* OTP Input */}
        {isOtpSent && (
          <div className="input-container">
            <input
              type="text"
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              required
              className="input-field"
            />
          </div>
        )}

        {/* Error Message */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="buttons-container">
          <button
            type="button"
            onClick={handleSendOtp}
            disabled={isLoading}
            className="otp-button">
            {isLoading ? "Sending OTP..." : "Send OTP"}
          </button>
          <button type="submit" disabled={isLoading} className="login-button">
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
