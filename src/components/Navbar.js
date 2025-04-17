import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Navbar.css";
import logo from "../components/images/images-2-removebg-preview 1.png"; // Ensure the path is correct

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout){
      localStorage.removeItem("token"); // Remove the token from local storage
      localStorage.removeItem("userId"); // Remove the userId from local storage
      navigate("/"); // Redirect to the login page
      return; // If user confirms, proceed with logout

    } // If user cancels, do nothing

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
