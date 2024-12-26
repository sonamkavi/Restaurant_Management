import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = ({ fetchDashboardData, dashboardData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFetchDashboardData = async () => {
    setIsLoading(true);
    setError(""); // Reset error on new fetch

    try {
      await fetchDashboardData();
      // Navigate after data is fetched successfully
      navigate("/details");
    } catch (err) {
      setError("Failed to fetch dashboard data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard</h2>

      {/* Button for fetching data */}
      <div className="fetch-button-container">
        <button
          className={`fetch-button ${isLoading ? "loading" : ""}`}
          onClick={handleFetchDashboardData}
          disabled={isLoading}>
          {isLoading ? "Loading..." : "Fetch Dashboard Data"}
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="error-message">{error}</p>}

      {/* Display dashboard data when available */}
      {dashboardData ? (
        <div className="dashboard-info">
          <div className="dashboard-info-item">
            <strong>Total Restaurants:</strong> {dashboardData.totalRestaurants}
          </div>
          <div className="dashboard-info-item">
            <strong>Active Restaurants:</strong>{" "}
            {dashboardData.activeRestaurants}
          </div>
          <div className="dashboard-info-item">
            <strong>Inactive Restaurants:</strong>{" "}
            {dashboardData.inactiveRestaurants}
          </div>
          <div className="dashboard-info-item">
            <strong>Total Revenue:</strong> ${dashboardData.totalRevenue}
          </div>
        </div>
      ) : (
        // Show no data message if no dashboard data is present
        !isLoading &&
        !error && (
          <p className="no-data-message">
            No data available. Please fetch the dashboard data.
          </p>
        )
      )}
    </div>
  );
};

export default Dashboard;
