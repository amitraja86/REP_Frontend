import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import SearchFilter from "./components/SearchFilter";
import SearchResultsPage from "./components/SearchResultsPage";
import Form from "./components/Form";
import ManualFormPage from "./components/ManualFormPage";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Reports from "./components/Reports";
// import FrontPage from "./components/FrontPage";


function App() {
  return (
    // <div className="app-container">
     
    //   <Navbar />
    //   <SearchFilter />
    //   <Form/> 
    // </div>

    <>
      <Routes>
        {/* <Route path="/" element={<FrontPage/>} /> */}
        <Route path="/" element={<Login/>} />
        <Route path="/Home" element={<Home/>} />
        <Route path="/navbar" element={<Navbar/>} />
        <Route path="/searchfilter" element={<SearchFilter/>} />
        <Route path="/search-results" element={<SearchResultsPage/>} />
        <Route path="/form" element={<Form/>} />
        <Route path="/manual-form" element={<ManualFormPage/>} />
        <Route path="/reports" element={<Reports/>} />
        
      </Routes>  
    </>
  );
}


export default App;
