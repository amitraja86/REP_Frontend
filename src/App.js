import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import SearchFilter from "./components/GetQuestions";
import SearchResultsPage from "./components/pages/SearchResultsPage";
import Form from "./components/AddQuestions";
import ManualFormPage from "./components/pages/ManualFormPage";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Reports from "./components/pages/Reports";
import CandidateTracker from "./components/CandidateTracker";
import AddCandidateForm from "./components/pages/AddCandidateForm";
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
        <Route path="/add-questions" element={<ManualFormPage />} />
        <Route path="/candidatetracker" element={<CandidateTracker/>} />
        <Route path="/add-candidate" element={<AddCandidateForm />} />
        <Route path="/reports" element={<Reports/>} />
        
      </Routes>  
    </>
  );
}


export default App;
