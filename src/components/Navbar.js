import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Navbar.css";
import logo from "../components/images/images-2-removebg-preview 1.png"; // Ensure the path is correct

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any authentication tokens if stored
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    
    // Navigate back to login page
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Appzlogic Logo" className="navbar-logo" />
        <span className="navbar-title">Recruitment Intelligence Platform</span>
      </div>
      <div className="nav-links">
        <li onClick={() => navigate("/Home")}>Home</li>
        <li onClick={() => navigate("/Reports")}>Reports</li>
        <li className="logout-button" onClick={handleLogout}>Logout</li>
      </div>
    </div>
  );
};

export default Navbar;
