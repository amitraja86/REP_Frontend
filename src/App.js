import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import SearchFilter from "./QuestionPages/GetQuestions";
import SearchResultsPage from "./QuestionPages/SearchResultsPage";
import Form from "./QuestionPages/AddQuestions";
import ManualFormPage from "./QuestionPages/ManualFormPage";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import CandidateTracker from "./CandidatePages/CandidateTracker";
import AddCandidateForm from "./CandidatePages/AddCandidateForm";
import ViewCandidate from "./CandidatePages/ViewCandidate";
import CandidateDetails from "./CandidatePages/CandidateDetails";
import CommonQuestionsPage from "./QuestionPages/CommonQuestions";
import ReportPage from "./pages/Reports";
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
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/searchfilter" element={<SearchFilter />} />
        <Route path="/search-results" element={<SearchResultsPage />} />
        <Route path="/form" element={<Form />} />
        <Route path="/manual-form" element={<ManualFormPage />} />
        <Route path="/candidatetracker" element={<CandidateTracker />} />
        <Route path="/add-candidate" element={<AddCandidateForm />} />
        <Route path="/view-records" element={<ViewCandidate />} />
        <Route path="/candidate-detail/:email" element={<CandidateDetails />} />
        <Route path="/reports" element={<ReportPage />} />
        <Route path="/common-questions" element={<CommonQuestionsPage />} />
      </Routes>
    </>
  );
}

export default App;
