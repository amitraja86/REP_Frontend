import React, { useEffect, useState } from "react";
import { FiDownload, FiCopy } from "react-icons/fi";
import { saveAs } from "file-saver";
import axios from "axios";
import htmlDocx from "html-docx-js/dist/html-docx";
import "../styles/CommonQuestions.css";
import axiosInstance from "../api/axiosInstance"; 
import { API_URL } from "../config/apiConfig"; 

// ... (imports remain the same)

const CommonQuestionsPage = () => {
  const [clients, setClients] = useState({});
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  const [selectedPanel, setSelectedPanel] = useState("");
  const [positions, setPositions] = useState([]);
  const [panels, setPanels] = useState([]);
  const [commonQuestions, setCommonQuestions] = useState([]);
  const [commonError, setCommonError] = useState("");
  const [showCommonPopup, setShowCommonPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingClients, setLoadingClients] = useState(true);
  const [loadingPositions, setLoadingPositions] = useState(true);
  const [loadingPanels, setLoadingPanels] = useState(true);
  const [showWarning, setShowWarning] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get(`${API_URL}/company/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            token: token,
          },
        });
        setClients(response.data);
      } catch (err) {
        console.error("Failed to fetch clients and positions", err);
      } finally {
        setLoadingClients(false);
        setLoadingPositions(false);
        setLoadingPanels(false);
      }
    };

    fetchClients();
  }, [token]);

  useEffect(() => {
    if (!selectedClient) {
      const allPositions = [];
      const allPanels = [];
      Object.values(clients).forEach((entry) => {
        allPositions.push(...(entry[0]?.[0] || []));
        allPanels.push(...(entry[1]?.[0] || []));
      });

      setPositions([...new Set(allPositions)]);
      setPanels([...new Set(allPanels)]);
    } else {
      const data = clients[selectedClient];
      setPositions(data[0]?.[0] || []);
      setPanels(data[1]?.[0] || []);
    }
  }, [selectedClient, clients]);

  const handleClientChange = (e) => {
    setSelectedClient(e.target.value);
    setSelectedPosition(""); // Clear position when client changes
  };

  const handleFetchCommonQuestions = async () => {
    setCommonError("");
    setCommonQuestions([]);

    if (!selectedClient || !selectedPosition) {
      setShowWarning(true);
      return;
    }

    setLoading(true);

    try {
      const res = await axiosInstance.get(
        `/get_common_question/?company_name=${selectedClient}&position_name=${selectedPosition}&panel_name=${selectedPanel}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            token: token,
          },
        }
      );

      setCommonQuestions(res.data.questions);
      setShowCommonPopup(true);
    } catch (err) {
      const errorMsg = err.response?.data?.detail || "Failed to fetch";
      setCommonError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyToClipboard = () => {
    const text = commonQuestions.join("\n");
    navigator.clipboard.writeText(text);
    alert("Questions copied to clipboard!");
  };

  const handleDownloadWord = () => {
    const htmlContent = `
          <html>
            <head><meta charset="utf-8"></head>
            <body>
              <h2>Common Interview Questions</h2>
              <ul>
                ${commonQuestions.map((q) => `<li>${q}</li>`).join("")}
              </ul>
            </body>
          </html>
        `;

    const blob = htmlDocx.asBlob(htmlContent);

    // Generate filename including client and position name
    const fileName =
      `CommonQuestions_${selectedClient}_${selectedPosition}.docx`.replace(
        /\s+/g,
        "_"
      );

    saveAs(blob, fileName);
  };

  const clearFilters = () => {
    setSelectedClient("");
    setSelectedPosition("");
    setSelectedPanel("");
  };

  return (
    <div className="common-question-page">
      <h2>Get Common Interview Questions</h2>
      <p>
        Select a client and position to retrieve the most commonly asked
        interview questions.
      </p>

      <div className="dropdown-row">
        <select value={selectedClient} onChange={handleClientChange}>
          <option value="">Select Client</option>
          {loadingClients ? (
            <option>Loading clients...</option>
          ) : (
            Object.keys(clients).map((client) => (
              <option key={client} value={client}>
                {client}
              </option>
            ))
          )}
        </select>

        <select
          value={selectedPosition}
          onChange={(e) => setSelectedPosition(e.target.value)}
        >
          <option value="">Select Position</option>
          {loadingPositions ? (
            <option>Loading positions...</option>
          ) : (
            positions.map((pos) => (
              <option key={pos} value={pos}>
                {pos}
              </option>
            ))
          )}
        </select>

        <button
          onClick={handleFetchCommonQuestions}
          disabled={loading}
          className={`fetch-btn ${loading ? "disabled" : ""}`}
        >
          {loading ? <span className="spinner"></span> : "Get Questions"}
        </button>

        <button onClick={clearFilters} className="clear-button">
          Clear Filters
        </button>
      </div>

      {commonError && <p className="error-text">{commonError}</p>}

      {showCommonPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <div className="popup-actions fixed-actions">
              <button onClick={handleCopyToClipboard}>
                <FiCopy /> Copy
              </button>
              <button onClick={handleDownloadWord}>
                <FiDownload /> Download
              </button>
              <button onClick={() => setShowCommonPopup(false)}>Close</button>
            </div>
            <h4>Common Questions</h4>
            <div className="question-list scrollable-list">
              {commonQuestions.map((q, i) => (
                <div className="question-card" key={i}>
                  <span className="question-number">{i + 1}.</span>
                  <span className="question-text">{q}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {showWarning && (
        <div className="popup-overlay">
          <div className="popup-box warning-box">
            <h4>Missing Selection</h4>
            <p>Please select both a Client and a Position to proceed.</p>
            <button onClick={() => setShowWarning(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommonQuestionsPage;
