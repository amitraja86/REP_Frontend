import React, { useEffect, useState } from "react";
import { FiDownload, FiCopy } from "react-icons/fi";
import { saveAs } from "file-saver";
// import axios from "axios";
import htmlDocx from "html-docx-js/dist/html-docx";
import "../styles/CommonQuestions.css";
import axiosInstance from "../../api/axiosInstance"; // Adjust the import path as necessary

const CommonQuestionsPage = () => {
  const [clients, setClients] = useState({});
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  const [selectedPanel, setSelectedPanel] = useState(""); // ← NEW
  const [positions, setPositions] = useState([]);
  const [panels, setPanels] = useState([]); // ← NEW
  const [commonQuestions, setCommonQuestions] = useState([]);
  const [commonError, setCommonError] = useState("");
  const [showCommonPopup, setShowCommonPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingClients, setLoadingClients] = useState(true);
  const [loadingPositions, setLoadingPositions] = useState(true);
  const [loadingPanels, setLoadingPanels] = useState(true); 
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axiosInstance.get("http://127.0.0.1:8000/api/v2/company/", {
          headers: {
            Authorization: `Bearer ${token}`,
            token: token,
          },
        });
        setClients(response.data);
      } catch (err) {
        console.error("Failed to fetch clients and positions", err);
      }finally {
            setLoadingClients(false);
            setLoadingPositions(false);
            setLoadingPanels(false);
        }
    };

    fetchClients();
  }, [token]);

  useEffect(() => {
    // If no client is selected, show all positions and panels
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
      // Filter positions and panels based on selected client
      const data = clients[selectedClient];
      setPositions(data[0]?.[0] || []);
      setPanels(data[1]?.[0] || []);
    }
  }, [selectedClient, clients]);

  const handleFetchCommonQuestions = async () => {
    setCommonError("");
    setCommonQuestions([]);

    if (!selectedClient || !selectedPosition) {
      setCommonError("Please select both Client and Position.");
      return;
    }
    setLoading(true);

    try {
      const res = await axiosInstance.get(
        `http://127.0.0.1:8000/api/v2/get_common_question/?company_name=${selectedClient}&position_name=${selectedPosition}&panel_name=${selectedPanel}`,
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
            ${commonQuestions.map(q => `<li>${q}</li>`).join("")}
          </ul>
        </body>
      </html>
    `;

    const blob = htmlDocx.asBlob(htmlContent);
    saveAs(blob, "CommonQuestions.docx");
  };

  return (
    <div className="common-question-page">
      <h2>Get Common Interview Questions</h2>
      <p>
        Select a client and position to retrieve the most commonly asked interview questions.
      </p>

      <div className="dropdown-row">
        <select value={selectedClient} onChange={(e) => setSelectedClient(e.target.value)}>
          <option value="">Select Client</option>
          {loadingClients ? (
            <option>Loading clients...</option>
            ) : (
          Object.keys(clients).map((client) => (
            <option key={client} value={client}>
              {client}
            </option>
          )))}
        </select>

        <select value={selectedPosition} onChange={(e) => setSelectedPosition(e.target.value)}>
          <option value="">Select Position</option>
          {loadingPositions ? (
            <option>Loading positions...</option>
          ) : (
            positions.map((pos) => (
              <option key={pos} value={pos}>
                {pos}
              </option>
            )))}
     
        </select>

        {/* NEW Panel Dropdown */}
        <select value={selectedPanel} onChange={(e) => setSelectedPanel(e.target.value)}>
          <option value="">Select Panel</option>
          {loadingPanels ? (
            <option>Loading panels...</option>
          ) : (
           panels.map((panel) => (
            <option key={panel} value={panel}>
              {panel}
            </option>
          )))}
        </select>

        <button
          onClick={handleFetchCommonQuestions}
          disabled={loading}
          className={`fetch-btn ${loading ? "disabled" : ""}`}
        >
          {loading ? <span className="spinner"></span> : "Get Questions"}
        </button>
      </div>

      {commonError && <p className="error-text">{commonError}</p>}

      {showCommonPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h4>Common Questions</h4>
            <ul>
              {commonQuestions.map((q, i) => (
                <li key={i}>{q}</li>
              ))}
            </ul>
            <div className="popup-actions">
              <button onClick={handleCopyToClipboard}>
                <FiCopy /> Copy
              </button>
              <button onClick={handleDownloadWord}>
                <FiDownload /> Download
              </button>
              <button onClick={() => setShowCommonPopup(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommonQuestionsPage;
