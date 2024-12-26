import axios from "axios";
import React, { useState } from "react";
import "./RestaurantForm.css";

const RestaurantForm = () => {
  const [restaurantData, setRestaurantData] = useState({
    name: "",
    ownerName: "",
    mobile: "",
    whatsapp: "",
    email: "",
    gst: "",
    address: "",
    doj: "",
    doe: "",
    password: "",
    logo: null, // Store the logo file
    branches: "",
    status: "active", // Default value
    subscriptionPlan: "Basic", // Default value
    revenue: "",
  });

  const [error, setError] = useState(""); // For error messages
  const [isLoading, setIsLoading] = useState(false); // To handle loading state

  // Handle changes in input fields (text fields)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRestaurantData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file input change (for the logo)
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setRestaurantData((prevData) => ({
      ...prevData,
      [name]: files[0], // Store the first selected file
    }));
  };

  // Validate form before submitting
  const validateForm = () => {
    const requiredFields = [
      "name",
      "ownerName",
      "mobile",
      "whatsapp",
      "email",
      "address",
      "doj",
      "doe",
      "password",
      "branches",
    ];
    const missingFields = requiredFields.filter(
      (field) => !restaurantData[field]
    );
    return missingFields;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any required fields are missing
    const missingFields = validateForm();
    if (missingFields.length > 0) {
      setError(
        `Please fill in the following fields: ${missingFields.join(", ")}`
      );
      return;
    }

    setError(""); // Clear any previous errors
    setIsLoading(true);

    try {
      const formData = new FormData();
      // Append all fields to formData
      Object.keys(restaurantData).forEach((key) => {
        formData.append(key, restaurantData[key]);
      });

      // Send the POST request with the formData
      await axios.post("http://localhost:5000/api/restaurant", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Restaurant created successfully!");
      // Reset form fields after successful submission
      resetForm();
    } catch (error) {
      console.error("Error creating restaurant:", error);
      setError("Error creating restaurant. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Reset the form after successful submission
  const resetForm = () => {
    setRestaurantData({
      name: "",
      ownerName: "",
      mobile: "",
      whatsapp: "",
      email: "",
      gst: "",
      address: "",
      doj: "",
      doe: "",
      password: "",
      logo: null,
      branches: "",
      status: "active",
      subscriptionPlan: "Basic",
      revenue: "",
    });
  };

  return (
    <div className="form-container">
      <h2> Restaurant Form</h2>

      {/* Display error message if any */}
      {error && <p className="error-message">{error}</p>}

      {/* Restaurant Form */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Restaurant Name</label>
          <input
            type="text"
            name="name"
            value={restaurantData.name}
            onChange={handleInputChange}
            placeholder="Restaurant Name"
            required
          />
        </div>

        <div className="form-group">
          <label>Owner Name</label>
          <input
            type="text"
            name="ownerName"
            value={restaurantData.ownerName}
            onChange={handleInputChange}
            placeholder="Owner Name"
            required
          />
        </div>

        <div className="form-group">
          <label>Mobile</label>
          <input
            type="text"
            name="mobile"
            value={restaurantData.mobile}
            onChange={handleInputChange}
            placeholder="Mobile"
            required
          />
        </div>

        <div className="form-group">
          <label>WhatsApp</label>
          <input
            type="text"
            name="whatsapp"
            value={restaurantData.whatsapp}
            onChange={handleInputChange}
            placeholder="WhatsApp"
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={restaurantData.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
          />
        </div>

        <div className="form-group">
          <label>GST</label>
          <input
            type="text"
            name="gst"
            value={restaurantData.gst}
            onChange={handleInputChange}
            placeholder="GST"
          />
        </div>

        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={restaurantData.address}
            onChange={handleInputChange}
            placeholder="Address"
            required
          />
        </div>

        <div className="form-group">
          <label>Date of Joining</label>
          <input
            type="date"
            name="doj"
            value={restaurantData.doj}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Date of Establishment</label>
          <input
            type="date"
            name="doe"
            value={restaurantData.doe}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={restaurantData.password}
            onChange={handleInputChange}
            placeholder="Password"
            required
          />
        </div>

        <div className="form-group">
          <label>Branches</label>
          <input
            type="number"
            name="branches"
            value={restaurantData.branches}
            onChange={handleInputChange}
            placeholder="Branches"
            required
          />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select
            name="status"
            value={restaurantData.status}
            onChange={handleInputChange}
            required>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="form-group">
          <label>Subscription Plan</label>
          <select
            name="subscriptionPlan"
            value={restaurantData.subscriptionPlan}
            onChange={handleInputChange}
            required>
            <option value="Basic">Basic</option>
            <option value="Premium">Premium</option>
          </select>
        </div>

        <div className="form-group">
          <label>Revenue</label>
          <input
            type="number"
            name="revenue"
            value={restaurantData.revenue}
            onChange={handleInputChange}
            placeholder="Revenue"
          />
        </div>

        <div className="form-group">
          <label>Logo</label>
          <input
            type="file"
            name="logo"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default RestaurantForm;
