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

import React from "react";
import Navbar from "./Navbar";
import SearchFilter from "./SearchFilter";
import Form from "./Form";
import "../components/styles/Home.css"; // CSS file for styling

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <div className="content">
        <SearchFilter />
        <Form />
        <div className="welcome-text">
          <h1>Transform Your Hiring with Recruitment Intelligence.</h1>
          <h3>Smart. Efficient. Insightful.</h3>
          <p className="line">Finding the right talent doesn’t have to be a challenge.<br/> Our Recruitment Intelligence streamlines the hiring process, <br/>helping businesses identify, engage, and onboard top candidates faster than ever.</p>  
        </div>
        
      </div>
    </div>
  );
};

export default Home;
