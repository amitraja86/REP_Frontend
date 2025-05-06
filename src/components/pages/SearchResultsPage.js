import React, { useEffect, useState } from "react";
import { FiDownload, FiCopy, FiEdit2, FiSave } from "react-icons/fi";
import "../styles/SearchResultsPage.css";
import { Document, Packer, Paragraph, TextRun } from "docx";


const SearchResultsPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [copiedRow, setCopiedRow] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [editedRow, setEditedRow] = useState({});
  const [updateMessage, setUpdateMessage] = useState("");
  const [showClientColumn, setShowClientColumn] = useState(false);
  const [showPositionColumn, setShowPositionColumn] = useState(false);
  const [filters, setFilters] = useState({
    Position: "",
    Client: "",
    Panel: "",
  });
  const [searchQuery, setSearchQuery] = useState("");

   


  useEffect(() => {
    const data = localStorage.getItem("searchResults");
    const storedFilters = JSON.parse(localStorage.getItem("searchFilters") || "{}");

    const normalizedFilters = {
      Client: storedFilters.client || "",
      Position: storedFilters.position || "",
      Panel: storedFilters.panel || "",
    };

    setFilters(normalizedFilters);

    const onlyClient = normalizedFilters.Client && !normalizedFilters.Position;
    const onlyPosition = normalizedFilters.Position && !normalizedFilters.Client;

    if (onlyClient) {
      setShowPositionColumn(true);
    } else if (onlyPosition) {
      setShowClientColumn(true);
    } else if (!normalizedFilters.Client && !normalizedFilters.Position) {
      setShowClientColumn(true);
      setShowPositionColumn(true);
    }

    if (data) {
      setSearchResults(JSON.parse(data));
    }
  }, []);

  const handleDownload = async (rowData) => {
    const filename = `Position_${rowData.Positions.replace(/\s/g, "_")}.docx`;

    const formattedQuestions = rowData.question.split("\n").map((line, i) =>
      new Paragraph({
        children: [new TextRun({ text: `${i + 1}. ${line}`, break: 1 })],
      })
    );

    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [new TextRun({ text: "Questions:", bold: true })],
            }),
            ...formattedQuestions,
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditedRow({ ...searchResults[index] });
  };

  const handleInputChange = (field, value) => {
    setEditedRow((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdate = async (row) => {
    const question_id = row.ID;
    if (!question_id) return;

    const updatePayload = {
      Candidate_name: row.Candidate_name,
      L1_Client: row.L1_Client,
      End_Client: row.End_Client,
      Positions: row.designation,
      Location: row.Location,
      Source_type: row.Source_type,
      Country: row.Country,
      Interview_start_time: row.Interview_starttime,
      Round: row.Round,
      Status: row.Status,
      question: row.question,
      designation: row.Positions,
    };

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v2/update_question/?quesiton_id=${question_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          token: localStorage.getItem("token") || "",
        },
        body: JSON.stringify(updatePayload),
      });

      if (!response.ok) throw new Error("Failed to update");

      const updatedResults = [...searchResults];
      updatedResults[editIndex] = row;
      setSearchResults(updatedResults);
      setEditIndex(null);
      setUpdateMessage("Update Successful!");
      setTimeout(() => setUpdateMessage(""), 3000);
    } catch (err) {
      console.error("Update error:", err);
      setUpdateMessage("Update Failed!");
      setTimeout(() => setUpdateMessage(""), 3000);
    }
  };

  const filteredResults = searchResults.filter((row) =>
    row.Candidate_name.toLowerCase().includes(searchQuery.toLowerCase())&&
    row.Status.toLowerCase().includes(searchQuery.toLowerCase()) 
  );

  

  return (
    <div className="overlay">
      <div className="results-modal">
        {/* Search Bar */}
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Search by Candidate Name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-bar"
          />
        </div>

              {/* Filters */}
        {Object.keys(filters).length > 0 && (
          <div className="filters-display">
            <strong>Selected Filters:</strong>
            <ul>
              {filters.Client && <li><strong>Client:</strong> {filters.Client}</li>}
              {filters.Position && <li><strong>Position:</strong> {filters.Position}</li>}
              {filters.Panel && <li><strong>Panel:</strong> {filters.Panel}</li>}
            </ul>
          </div>
        )}

        {/* Table */}
        <div className="table-container">
          {updateMessage && <div className="update-popup">{updateMessage}</div>}
          <table>
            <thead>
              <tr>
                <th>Candidate Name</th>
                {showClientColumn && <th>Client</th>}
                {showPositionColumn && <th>Position</th>}
                <th>Country</th>
                <th>Round</th>
                <th>Date</th>
                <th>Status</th>
                <th>Questions</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredResults.map((row, index) => {
                const isEditing = index === editIndex;
                const dateTime = new Date(row.Interview_starttime);
                const date = dateTime.toLocaleDateString();
                const time = dateTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

                return (
                  <tr key={index}>
                    <td>
                      {isEditing ? (
                        <input
                          value={editedRow.Candidate_name}
                          onChange={(e) => handleInputChange("Candidate_name", e.target.value)}
                        />
                      ) : (
                        row.Candidate_name
                      )}
                    </td>
                    {showClientColumn && (
                      <td>
                        {isEditing ? (
                          <input
                            value={editedRow.L1_Client}
                            onChange={(e) => handleInputChange("L1_Client", e.target.value)}
                          />
                        ) : (
                          row.L1_Client
                        )}
                      </td>
                    )}
                    {showPositionColumn && (
                      <td>
                        {isEditing ? (
                          <input
                            value={editedRow.Positions}
                            onChange={(e) => handleInputChange("Positions", e.target.value)}
                          />
                        ) : (
                          row.Positions
                        )}
                      </td>
                    )}
                    <td>
                      {isEditing ? (
                        <input
                          value={editedRow.Country}
                          onChange={(e) => handleInputChange("Country", e.target.value)}
                        />
                      ) : (
                        row.Country
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                        <input
                          value={editedRow.Round}
                          onChange={(e) => handleInputChange("Round", e.target.value)}
                        />
                      ) : (
                        row.Round
                      )}
                    </td>
                    <td>
                      <div>{date}</div>
                      <div>{time}</div>
                    </td>
                    <td>
                      {isEditing ? (
                        <input
                          value={editedRow.Status}
                          onChange={(e) => handleInputChange("Status", e.target.value)}
                        />
                      ) : (
                        row.Status
                      )}
                    </td>
                    <td className="question-cell">
                      {isEditing ? (
                        <textarea
                          className="question-edit-box"
                          value={editedRow.question}
                          onChange={(e) => handleInputChange("question", e.target.value)}
                        />
                      ) : (
                        <div className="question-scroll">
                          <div className="question-list">
                            {row.question.split("\n").map((line, i) => (
                              <p key={i}>{line}</p>
                            ))}
                          </div>
                          <button
                            className="copy-btn"
                            onClick={() => {
                              navigator.clipboard.writeText(row.question);
                              setCopiedRow(index);
                              setTimeout(() => setCopiedRow(null), 2000);
                            }}
                            title="Copy All Questions"
                          >
                            <FiCopy size={18} />
                          </button>
                        </div>
                      )}
                    </td>
                    <td>
                      <button
                        className="download-btn"
                        onClick={() => handleDownload(row)}
                        title="Download Word"
                      >
                        <FiDownload size={18} />
                      </button>
                      <button
                        className="edit-btn"
                        onClick={() =>
                          isEditing
                            ? handleUpdate({ ...editedRow, ID: row.ID })
                            : handleEditClick(index)
                        }
                        title={isEditing ? "Save" : "Edit"}
                      >
                        {isEditing ? <FiSave size={18} /> : <FiEdit2 size={18} />}
                      </button>
                    </td>
                  </tr>   
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;
