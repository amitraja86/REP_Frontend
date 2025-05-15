import React, { useState, useEffect } from "react";
// import axios from 'axios';
import "../styles/ViewCandidate.css"; // Adjust if needed
import axiosInstance from "../api/axiosInstance"; // Adjust the import path as necessary

const ViewCandidate = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [page, setPage] = useState(1); // Pagination page state
  const [submitted, setSubmitted] = useState(false);

  // Fetch candidates from API
  const fetchCandidates = async (pageNumber = 1) => {
    setLoading(true);
    setSubmitted(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get(
        "/candidate/all-candidate-tracker/",
        {
          params: { email: email || "", page: pageNumber, limit: 10 }, // Pass email and pagination params
          headers: {
            Authorization: `Bearer ${token}`,
            token,
          },
        }
      );

      if (response.data) {
        setCandidates(response.data); // Set the candidates directly from the response
      } else {
        setCandidates([]);
      }
    } catch (error) {
      console.error("Error fetching candidates:", error);
      setCandidates([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch candidates whenever the page changes
  useEffect(() => {
    fetchCandidates(page);
  }, [page]);

  // Search candidates based on email
  const handleSearch = () => {
    setPage(1); // Reset to page 1 on new search
    fetchCandidates(1);
  };

  // Handle candidate click to open a new tab with candidate details
  const handleCandidateClick = (candidate) => {
    if (candidate.Email_ID) {
      const url = `/candidate-detail/${candidate.Email_ID}`;
      window.open(url, "_blank");
    } else {
      console.error("Candidate Email_ID not found.");
    }
  };

  return (
    <div className="view-container">
      <h1 className="title">Candidate Tracker</h1>

      {/* Search Box */}
      <div className="search-box">
        <input
          type="email"
          placeholder="Enter candidate email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="email-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>

      {/* Loading or No Candidates */}
      {loading ? (
        <p className="loading">Loading...</p>
      ) : candidates.length === 0 && submitted ? (
        <p className="empty-message">No candidates found for {email}</p>
      ) : (
        <div className="card-container">
          {candidates.map((candidate, index) => (
            <div
              className="candidate-card"
              key={index}
              onClick={() => handleCandidateClick(candidate)} // Handle candidate click
            >
              <h2 className="candidate-name">
                Candidate: {candidate.Candidate_Name}
              </h2>
              <table>
                <tbody>
                  <tr>
                    <td className="field-label">Email</td>
                    <td className="field-value">{candidate.Email_ID}</td>
                  </tr>
                  <tr>
                    <td className="field-label">Phone</td>
                    <td className="field-value">{candidate.Contact_No}</td>
                  </tr>
                  <tr>
                    <td className="field-label">Status</td>
                    <td className="field-value">{candidate.Status}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {candidates.length > 0 && (
        <div className="pagination">
          <button
            onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <span>Page {page}</span>
          <button
            onClick={() => setPage((prevPage) => prevPage + 1)}
            disabled={candidates.length < 10} // Assuming 10 candidates per page
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ViewCandidate;
