import React, { useEffect, useState } from "react";
import { FiDownload } from "react-icons/fi"; // <-- Import Download Icon
import "./styles/SearchResultsPage.css"; // Ensure the path is correct
import { FiCopy } from "react-icons/fi"; // <-- Import Copy Icon
// import { FiEdit } from "react-icons/fi"; // Add this import at the top of the file

const SearchResultsPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [copiedRow, setCopiedRow] = useState(null);
//   const [editIndex, setEditIndex] = useState(null);
// const [editedRow, setEditedRow] = useState({});


  useEffect(() => {
    const data = localStorage.getItem("searchResults");
    if (data) {
      const parsedData = JSON.parse(data);
      setSearchResults(parsedData);
    }
  }, []);

  const handleDownload = (rowData) => {
    const filename = `Candidate_${rowData.Candidate_name.replace(/\s/g, "_")}.csv`;
    const headers = [
      "Candidate Name", "Client", "End Client", "Position",
      "Interview Panel", "Round", "Date", "Questions"
    ];

    const formattedPanel = String(rowData.Interview_Panel)
      .split(",")
      .map((line, i) => `${i + 1}. ${line}`)
      .join(" ");

    const formattedQuestions = rowData.question
      .split("\n")
      .map((line, i) => `${i + 1}. ${line}`)
      .join("; ");

    const values = [
      rowData.Candidate_name,
      rowData.L1_Client,
      rowData.End_Client,
      rowData.Positions,
      formattedPanel,
      rowData.Round,
      rowData.Interview_starttime,
      formattedQuestions
    ];

    const csvData = [headers, values].map((row) => row.join(",")).join("\n");

    const blob = new Blob([csvData], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadAll = () => {
    const headers = [
      "Candidate Name", "Client", "End Client", "Position",
      "Interview Panel", "Round", "Date", "Questions"
    ];

    const rows = searchResults.map((row) => {
      const formattedPanel = String(row.Interview_Panel)
        .split(",")
        .map((line, i) => `${i + 1}. ${line}`)
        .join(" ");

      const formattedQuestions = row.question
        .split("\n")
        .map((line, i) => `${i + 1}. ${line}`)
        .join("; ");

      return [
        row.Candidate_name,
        row.L1_Client,
        row.End_Client,
        row.Positions,
        formattedPanel,
        row.Round,
        row.Interview_starttime,
        formattedQuestions
      ];
    });

    const csvData = [headers, ...rows].map((row) => row.join(",")).join("\n");

    const blob = new Blob([csvData], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "All_Candidates.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="overlay">
      <div className="results-modal">
        <div className="table-container">

          {searchResults.length > 0 && (
            <button className="download-all-btn" onClick={handleDownloadAll} style={{ marginBottom: "10px" }}>
              <FiDownload size={18} /> Download All
            </button>
          )}

          <table>
            <thead>
              <tr>
                <th>Candidate Name</th>
                <th>Client</th>
                <th>End Client</th>
                <th>Position</th>
                <th>Interview Panel</th>
                <th>Round</th>
                <th>Date</th>
                <th>Questions</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((results, index) => (
                <tr key={index}>
                  <td>{results.Candidate_name}</td>
                  <td>{results.L1_Client}</td>
                  <td>{results.End_Client}</td>
                  <td>{results.Positions}</td>
                  <td>
                    <ol>
                      {String(results.Interview_Panel).split(",").map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                    </ol>
                  </td>
                  <td>{results.Round}</td>
                  <td>{results.Interview_starttime}</td>
                  <td className="question-cell">
                    <div className="question-scroll">
                      <div className="question-list">
                        {results.question.split("\n").map((line, i) => (
                          <p key={i}>{line}</p>
                        ))}
                      </div>
                    </div>
                    <button
                      className="copy-btn"
                      onClick={() => {
                        navigator.clipboard.writeText(results.question);
                        setCopiedRow(index);
                        setTimeout(() => setCopiedRow(null), 2000);
                      }}
                      title="Copy All Questions"
                    >
                      <FiCopy size={18} />
                    </button>
                    {copiedRow === index && <span className="copied-text">Copied!</span>}
                  </td>
                  <td>
                    <button className="download-btn" onClick={() => handleDownload(results)} title="Download CSV">
                      <FiDownload size={18} />
                    </button>
                    {/* <button className="edit-btn" title="Edit">
                      <FiEdit size={18} />
                    </button> */}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;
