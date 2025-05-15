import React from "react";
import "../styles/DashboardWelcome.css";

const DashboardWelcome = () => {
  return (
    <div className="welcome-wrapper">
      <div className="welcome-text">
        <h2>Welcome to Recruitment Intelligence Platform</h2>
        <p>
          Effortlessly manage candidates and questions. Use the top menu to
          navigate through the system.
        </p>
      </div>
      <div className="welcome-image-container">
        <img
          src="/assets/images/Interview img.jpg"
          alt="Welcome"
          className="welcome-image"
        />
      </div>
    </div>
  );
};

export default DashboardWelcome;
