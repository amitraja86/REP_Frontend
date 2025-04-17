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
import SearchFilter from "./SearchFilter";
import Form from "./Form";
import "../components/styles/Home.css";

const Home = () => {
  const [loading, setLoading] = useState(false); // ✅ create loading state

  return (
    <div className="home-container">
      <Navbar />

      {/* ✅ Show overlay when loading is true */}
      {loading && (
        <div className="loading-screen-overlay">
          <div className="spinner" />
          <span className="loading-text">Loading...</span>
        </div>
      )}

      <div className="content">
        <SearchFilter setLoading={setLoading} /> {/* ✅ pass as prop */}
        <Form />
      </div>
    </div>
  );
};

export default Home;
