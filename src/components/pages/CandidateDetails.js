import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance'; 
import { useParams } from 'react-router-dom';

const CandidateDetails = () => {
  const { email } = useParams(); // Email from route
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCandidateDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.get(
          'http://127.0.0.1:8000/api/v2/candidate/all-candidate-tracker/',
          {
            params: { email },
            headers: {
              Authorization: `Bearer ${token}`,
              token,
            },
          }
        );

        const matched = response.data.find(
          (c) => c.Email_ID.toLowerCase() === email.toLowerCase()
        );

        if (matched) {
          setCandidate(matched);
        } else {
          setCandidate(null);
        }
      } catch (error) {
        console.error('Error fetching candidate details:', error);
        setCandidate(null);
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    fetchCandidateDetails();
  }, [email]);

  return (
    <div className="candidate-detail-container">
      {loading ? (
        <p>Loading...</p>
      ) : candidate ? (
        <div className="candidate-detail">
          <h2>Candidate Details: {candidate.Candidate_Name}</h2>
          <table>
          <tbody>
              <tr><td>Email</td><td>{candidate.Email_ID}</td></tr>
              <tr><td>Phone</td><td>{candidate.Contact_No}</td></tr>
              <tr><td>Client</td><td>{candidate.Client}</td></tr>
              <tr><td>Position</td><td>{candidate.Position}</td></tr>
              <tr><td>Interviewer</td><td>{candidate.Interviewer}</td></tr>
              <tr><td>Video Link</td><td><a href={candidate.Video_Link} target="_blank" rel="noreferrer">{candidate.Video_Link}</a></td></tr>
              <tr><td>LinkedIn URL</td><td><a href={candidate.Linkedin_URL} target="_blank" rel="noreferrer">{candidate.Linkedin_URL}</a></td></tr>
              <tr><td>Total Experience</td><td>{candidate.TE}</td></tr>
              <tr><td>Current CTC</td><td>{candidate.CTC}</td></tr>
              <tr><td>Expected CTC</td><td>{candidate.Expected_CTC}</td></tr>
              <tr><td>Notice Period</td><td>{candidate.notice_period}</td></tr>
              <tr><td>Serving Notice Period</td><td>{candidate.serving_notice_period ? "Yes" : "No"}</td></tr>
              <tr><td>Last Working Day</td><td>{candidate.last_working_day}</td></tr>
              <tr><td>Feedback</td><td>{candidate.Feedback}</td></tr>
              <tr><td>Aman Feedback</td><td>{candidate.Aman_Feedback}</td></tr>
              <tr><td>Dhawal Feedback</td><td>{candidate.Dhawal_Feedback}</td></tr>
              <tr><td>Nimit Feedback</td><td>{candidate.Nimit_Feedback}</td></tr>
              <tr><td>Second Round Video Link</td><td>{candidate.Second_Round_Video_Link}</td></tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p>No candidate data available for "{email}".</p>
      )}
    </div>
  );
};

export default CandidateDetails;
