import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ManualFormPage.css";
import axiosInstance from "../../api/axiosInstance";


const ManualFormPage = () => {
  const [formData, setFormData] = useState({
    candidateName: "",
    endClient: "",
    customClient: "", // For manual client input
    position: "",
    customPosition: "", // For manual position input
    location: "",
    panel: "",
    dateTime: "",
    round: 1,
    status: "Selected",
    manualQuestions: "",
  });

  const [clients, setClients] = useState({});
  const [positions, setPositions] = useState([]);
  const [loadingClients, setLoadingClients] = useState(true);

  // Fetch client data on component mount
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axiosInstance.get("https://recruitment-intelligence.appzlogic.in/api/company/");
        setClients(response.data);
      } catch (error) {
        console.error("Error fetching clients:", error);
      } finally {
        setLoadingClients(false);
      }
    };

    fetchClients();
  }, []);

  // Update positions based on the selected client
  useEffect(() => {
    if (formData.endClient && formData.endClient !== "Other" && clients[formData.endClient]) {
      // If a client is selected and it's not "Other", show positions for that client
      const data = clients[formData.endClient];
      setPositions(data[0]?.[0] || []);
    } else {
      // If no client is selected or "Other" is selected, show all positions
      const allPositions = [];
      Object.values(clients).forEach((entry) => {
        allPositions.push(...(entry[0]?.[0] || []));
      });
      const uniquePositions = [...new Set(allPositions)]; // Remove duplicates
      setPositions(uniquePositions);
    }
  }, [formData.endClient, clients]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validation for string-only fields
    if (["candidateName", "location", "panel", "customClient", "customPosition"].includes(name)) {
      const stringRegex = /^[a-zA-Z\s]*$/; // Allow only alphabetic characters and spaces
      if (!stringRegex.test(value)) {
        return; // Ignore invalid input
      }
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      endClient: formData.endClient === "Other" ? formData.customClient : formData.endClient,
      position: formData.position === "Other" ? formData.customPosition : formData.position,
    };
    console.log("Form submitted:", finalData);
    // Add your form submission logic here
  };

  return (
    <div className="form-page-container">
  <h2 className="form-modal-title">Add Interview Questions</h2>
  <form className="interview-form-grid" onSubmit={handleSubmit}>
    {/* Candidate Name */}
    <div className="form-row">
      <label className="form-label required">Candidate Name</label>
      <input
        type="text"
        name="candidateName"
        value={formData.candidateName}
        onChange={handleChange}
        required
      />
    </div>

    {/* Client Dropdown */}
    <div className="form-row">
      <label className="form-label required">Client</label>
      <select
        name="endClient"
        value={formData.endClient}
        onChange={handleChange}
        required
      >
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
        <option value="Other">Other</option>
      </select>
    </div>

    {/* Custom Client Input */}
    {formData.endClient === "Other" && (
      <div className="form-row">
        <label className="form-label">Custom Client</label>
        <input
          type="text"
          name="customClient"
          value={formData.customClient}
          onChange={handleChange}
          required
        />
      </div>
    )}

    {/* Position Dropdown */}
    <div className="form-row">
      <label className="form-label required">Position</label>
      <select
        name="position"
        value={formData.position}
        onChange={handleChange}
        required
      >
        <option value="">Select Position</option>
        {positions.map((position) => (
          <option key={position} value={position}>
            {position}
          </option>
        ))}
        <option value="Other">Other</option>
      </select>
    </div>

    {/* Custom Position Input */}
    {formData.position === "Other" && (
      <div className="form-row">
        <label className="form-label">Custom Position</label>
        <input
          type="text"
          name="customPosition"
          value={formData.customPosition}
          onChange={handleChange}
          required
        />
      </div>
    )}

    {/* Location */}
    <div className="form-row">
      <label className="form-label">Location</label>
      <input
        type="text"
        name="location"
        value={formData.location}
        onChange={handleChange}
      />
    </div>

    {/* Panel */}
    <div className="form-row">
      <label className="form-label required">Panel</label>
      <input
        type="text"
        name="panel"
        value={formData.panel}
        onChange={handleChange}
        required
      />
      <small className="panel-subtext">*Panel names should be separated by a comma</small>
    </div>

    {/* Date */}
    <div className="form-row">
      <label className="form-label required">Date</label>
      <input
        type="datetime-local"
        name="dateTime"
        value={formData.dateTime}
        onChange={handleChange}
        required
      />
    </div>

    {/* Round */}
    <div className="form-row">
      <label className="form-label">Round</label>
      <select
        name="round"
        value={formData.round}
        onChange={handleChange}
        required
      >
        {[1, 2, 3, 4, 5].map((round) => (
          <option key={round} value={round}>
            {round}
          </option>
        ))}
      </select>
    </div>

    {/* Status */}
    <div className="form-row">
      <label className="form-label">Status</label>
      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        required
      >
        <option value="Selected">Selected</option>
        <option value="Rejected">Rejected</option>
        <option value="On Hold">On Hold</option>
        <option value="Awaiting">Awaiting</option>
      </select>
    </div>

    {/* Manual Questions */}
    <div className="form-row full-width">
      <label className="form-label required">Manual Questions</label>
      <textarea
        name="manualQuestions"
        value={formData.manualQuestions}
        onChange={handleChange}
        required
        rows="5"
      ></textarea>
    </div>

    <div className="form-actions full-width">
      <button type="submit">Submit</button>
    </div>
  </form>
</div>

  );
};

export default ManualFormPage;