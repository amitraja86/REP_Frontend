import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardWelcome from "./DashboardWelcome";
import SearchFilter from "../QuestionPages/GetQuestions";
import Form from "../QuestionPages/AddQuestions";
import CandidateTracker from "../CandidatePages/CandidateTracker";
import CommonQuestionsPage from "../QuestionPages/CommonQuestions";
import AddTaskCard from "./Task";
import ReportPage from "./Reports";
// import logo from "";
import "../styles/Home.css";
import Swal from "sweetalert2";

const Home = () => {
  const navigate = useNavigate();
  const DEFAULT_COMPONENT = "dashboardWelcome";
  const [activeComponent, setActiveComponent] = useState(DEFAULT_COMPONENT);
  const [loading, setLoading] = useState(false);

  // Show popup and redirect to login

  const showSessionExpiredAndRedirect = () => {
    Swal.fire({
      icon: "warning",
      title: "Session Expired",
      text: "Redirecting to login...",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didClose: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        navigate("/");
      },
    });
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
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your session.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        navigate("/");
      }
    });
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
      case "report":
        return <ReportPage />;
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
      case "report":
        return "report-bg";
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
            src="/assets/images/images-2-removebg-preview 1.png"
            alt="Appzlogic Logo"
            className="nav-logo"
            onClick={handleLogoClick}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className="nav-center">
          <ul className="nav-links">
            <li onClick={() => handleNavClick("searchFilter")}>
              Get Questions
            </li>
            <li onClick={() => handleNavClick("form")}>Add Questions</li>
            <li onClick={() => handleNavClick("commonQuestions")}>
              Common Questions
            </li>
            <li onClick={() => handleNavClick("candidateTracker")}>
              Candidate Tracker
            </li>
            <li onClick={() => handleNavClick("addTaskCard")}>Add Task</li>
            <li onClick={() => handleNavClick("report")}>Reports</li>
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
