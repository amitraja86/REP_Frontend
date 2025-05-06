import React from "react";
import welcomeImage from "./images/Interview img.jpg"; // Use your actual image path
import "./styles/DashboardWelcome.css"; // Add this new CSS file

const DashboardWelcome = () => {
  return (
    <div className="welcome-wrapper">
      <div className="welcome-text">
        <h2>Welcome to Recruitment Intelligence Platform</h2>
        <p>
          Effortlessly manage candidates and questions. Use the top menu to navigate through the system.
        </p>
      </div>
      <div className="welcome-image-container">
        <img src={welcomeImage} alt="Welcome" className="welcome-image" />
      </div>
    </div>
  );
};

export default DashboardWelcome;
