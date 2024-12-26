import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Restaurant Dashboard</h1>
        <div className="flex space-x-4">
          <Link to="/" className="text-white hover:underline">
            Login
          </Link>
          <Link to="/dashboard" className="text-white hover:underline">
            Dashboard
          </Link>
          <Link
            to="/register-restaurant"
            className="text-white hover:underline">
            Register Restaurant
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
