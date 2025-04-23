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

import React, { useState } from "react";
import Navbar from "./Navbar";
import SideBar from "./SideBar";
import SearchFilter from "./GetQuestions";
import Form from "./AddQuestions";
import CandidateTracker from "./CandidateTracker";
import "../components/styles/Home.css";

const Home = () => {
  const [activeComponent, setActiveComponent] = useState('searchFilter'); // Store active component state
  const [loading, setLoading] = useState(false);

  // Render active component based on the state
  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'searchFilter':
        return <SearchFilter setLoading={setLoading} />;
      case 'form':
        return <Form />;
      case 'candidateTracker':
        return <CandidateTracker setLoading={setLoading} />;
      default:
        return <SearchFilter setLoading={setLoading} />;
    }
  };

  return (
    <div className="home-container">
      <Navbar />

      {/* Show overlay when loading is true */}
      {loading && (
        <div className="loading-screen-overlay">
          <div className="spinner" />
          <span className="loading-text">Loading...</span>
        </div>
      )}

      <div className="main-content">
        {/* Sidebar */}
        <SideBar setActiveComponent={setActiveComponent} />

        <div className="content">
          {renderActiveComponent()} {/* Render the active component */}
        </div>
      </div>
    </div>
  );
};

export default Home;
