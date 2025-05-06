// import React from "react";
// import Navbar from "../components/Navbar";
// import Form from "../components/Form";
// import SearchFilter from "../components/SearchFilter";
// import "./styles/Home.css"; 

// const Home = () => {
//   return (
//     <div className="home-container">
//       <Navbar />
//       <SearchFilter />
//       <Form />
//     </div>
//   );
// };

// export default Home;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardWelcome from "./DashboardWelcome";
import SearchFilter from "./GetQuestions";
import Form from "./AddQuestions";
import CandidateTracker from "./CandidateTracker";
import CommonQuestionsPage from "./pages/CommonQuestions";
import AddTaskCard from "./Task";
import logo from "../components/images/images-2-removebg-preview 1.png";
import "../components/styles/Home.css";

const Home = () => {
  const navigate = useNavigate();
  const DEFAULT_COMPONENT = "dashboardWelcome";
  const [activeComponent, setActiveComponent] = useState(DEFAULT_COMPONENT);
  const [loading, setLoading] = useState(false);

  // Show popup and redirect to login
  const showSessionExpiredAndRedirect = () => {
    const popup = document.createElement("div");
    popup.innerText = "Session expired. Redirecting to login...";
    Object.assign(popup.style, {
      position: "fixed",
      top: "20px",
      right: "20px",
      backgroundColor: "#f44336",
      color: "#fff",
      padding: "12px 24px",
      borderRadius: "6px",
      boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
      zIndex: 9999,
      fontSize: "16px",
    });
    document.body.appendChild(popup);

    setTimeout(() => {
      popup.remove();
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      navigate("/");
    }, 3000);
  };

  const isTokenValid = () => {
    const token = localStorage.getItem("token");
    return Boolean(token);
  };

  useEffect(() => {
    if (!isTokenValid()) {
      showSessionExpiredAndRedirect();
    }
  }, [navigate]);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      navigate("/");
    }
  };

  const handleLogoClick = () => {
    if (!isTokenValid()) {
      showSessionExpiredAndRedirect();
      return;
    }
    setActiveComponent(DEFAULT_COMPONENT);
  };

  const handleNavClick = (componentName) => {
    if (!isTokenValid()) {
      showSessionExpiredAndRedirect();
      return;
    }
    setActiveComponent(componentName);
  };

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "dashboardWelcome":
        return <DashboardWelcome />;
      case "searchFilter":
        return <SearchFilter setLoading={setLoading} />;
      case "form":
        return <Form />;
      case "commonQuestions":
        return <CommonQuestionsPage />;
      case "candidateTracker":
        return <CandidateTracker setLoading={setLoading} />;
      case "addTaskCard":
        return <AddTaskCard />;
      default:
        return <DashboardWelcome />;
    }
  };

  const getBackgroundClass = () => {
    switch (activeComponent) {
      case "searchFilter":
        return "search-filter-bg";
      case "form":
        return "form-bg";
      case "candidateTracker":
        return "candidate-tracker-bg";
      case "commonQuestions":
        return "common-questions-bg";
      case "addTaskCard":
        return "add-task-card-bg";
      case "dashboardWelcome":
      default:
        return "dashboard-welcome-bg";
    }
  };

  return (
    <div className={`home-container ${getBackgroundClass()}`}>
      <div className="top-nav">
        <div className="nav-left">
          <img
            src={logo}
            alt="Appzlogic Logo"
            className="nav-logo"
            onClick={handleLogoClick}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className="nav-center">
          <ul className="nav-links">
            <li onClick={() => handleNavClick("searchFilter")}>Get Questions</li>
            <li onClick={() => handleNavClick("form")}>Add Questions</li>
            <li onClick={() => handleNavClick("commonQuestions")}>Common Questions</li>
            <li onClick={() => handleNavClick("candidateTracker")}>Candidate Tracker</li>
            <li onClick={() => handleNavClick("addTaskCard")}>Add Task</li>
          </ul>
        </div>
        <div className="nav-right">
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {loading && (
        <div className="loading-screen-overlay">
          <div className="spinner" />
          <span className="loading-text">Loading...</span>
        </div>
      )}

      <div className="content-container">{renderActiveComponent()}</div>
    </div>
  );
};

export default Home;
