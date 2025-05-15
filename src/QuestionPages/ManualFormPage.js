import React, { useState, useEffect } from "react";
import "../styles/ManualFormPage.css";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../api/axiosInstance";
import Swal from "sweetalert2"; // ✅ Imported SweetAlert2
import { API_URL } from "../config/apiConfig"; 

const ManualForm = () => {
  const [clients, setClients] = useState({});
  const [positions, setPositions] = useState([]);
  const [loadingClients, setLoadingClients] = useState(true);

  const [formData, setFormData] = useState({
    candidateName: "",
    endClient: "",
    customClient: "",
    position: "",
    customPosition: "",
    location: "",
    panel: "",
    dateTime: "",
    round: 1,
    status: "Selected",
    manualQuestions: "",
  });

  const resetForm = () => {
    setFormData({
      candidateName: "",
      endClient: "",
      position: "",
      location: "",
      panel: "",
      dateTime: "",
      round: 1,
      status: "Selected",
      manualQuestions: "",
    });
  };

  useEffect(() => {
    const fetchClients = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token not found in localStorage");
        setLoadingClients(false);
        return;
      }

      try {
        const response = await axiosInstance.get("/company/", {
          headers: {
            token: token, // ✅ Add this line to include token in headers
          },
        });
        setClients(response.data);
      } catch (error) {
        console.error("Error fetching clients:", error);
      } finally {
        setLoadingClients(false);
      }
    };

    fetchClients();
  }, []);

  useEffect(() => {
    if (
      formData.endClient &&
      formData.endClient !== "Other" &&
      clients[formData.endClient]
    ) {
      const data = clients[formData.endClient];
      setPositions(data[0]?.[0] || []);
    } else {
      const allPositions = [];
      Object.values(clients).forEach((entry) => {
        allPositions.push(...(entry[0]?.[0] || []));
      });
      const uniquePositions = [...new Set(allPositions)];
      setPositions(uniquePositions);
    }
  }, [formData.endClient, clients]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (
      [
        "candidateName",
        "location",
        "panel",
        "customClient",
        "customPosition",
      ].includes(name)
    ) {
      const stringRegex = /^[a-zA-Z\s]*$/;
      if (!stringRegex.test(value)) {
        return;
      }
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getUserInfoFromToken = () => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      try {
        const decodedToken = jwtDecode(accessToken);
        return {
          user_id: decodedToken.user_id,
          email: decodedToken.email_id,
          name: decodedToken.name,
          role: decodedToken.role,
        };
      } catch (error) {
        console.error("Failed to decode token", error);
      }
    }
    return null;
  };

  const convertDateTime = (isoDateTime) => {
    if (!isoDateTime) return "";
    const dateObj = new Date(isoDateTime);
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const year = dateObj.getFullYear();
    const hours = String(dateObj.getHours()).padStart(2, "0");
    const minutes = String(dateObj.getMinutes()).padStart(2, "0");
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const userInfo = getUserInfoFromToken();

    if (!userInfo?.user_id) {
      Swal.fire({
        icon: "error",
        title: "Authentication Error",
        text: "Invalid or missing user token.",
      });
      return;
    }

    const body = JSON.stringify({
      question: formData.manualQuestions,
      Candidate_name: formData.candidateName,
      designation: formData.position,
      L1_Client: formData.endClient,
      End_Client: formData.endClient,
      Positions: 0,
      Country: formData.location,
      Interview_Panel: formData.panel,
      Interview_start_time: convertDateTime(formData.dateTime),
      duration: "30",
      Round: formData.round,
      Status: formData.status,
      user_id: userInfo.user_id,
    });

    try {
      const response = await fetch(`${API_URL}/add_questions/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          token: token,
        },
        body: body,
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Data added successfully!",
          timer: 3000,
          showConfirmButton: false,
        });
        resetForm();
      } else {
        const errorData = await response.json();
        Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text: errorData.detail || "Failed to submit form.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error submitting form: " + error.message,
      });
    }
  };

  return (
    <div className="form-page-container">
      <h2 className="form-modal-title">Add Interview Questions</h2>
      <form className="interview-form" onSubmit={handleSubmit}>
        <div className="form-section">
          <div className="form-group">
            <label>
              {" "}
              Candidate Name <span className="required-asterisk">*</span>
            </label>
            <input
              type="text"
              name="candidateName"
              value={formData.candidateName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Client Dropdown */}
          <div className="form-group">
            <label>
              Client <span className="required-asterisk">*</span>
            </label>
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
            <div className="form-group">
              <label>
                Custom Client <span className="required-asterisk">*</span>
              </label>
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
          <div className="form-group">
            <label>
              Position <span className="required-asterisk">*</span>
            </label>
            <select
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
            >
              <option value="">Select Position </option>
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
            <div className="form-group">
              <label>
                Custom Position <span className="required-asterisk">*</span>
              </label>
              <input
                type="text"
                name="customPosition"
                value={formData.customPosition}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>Country/City</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>
              Panel
              <span className="required-asterisk">*</span>
              <small className="panel-subtext">
                Panel names should be separated by a comma
              </small>
            </label>
            <input
              type="text"
              name="panel"
              value={formData.panel}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Date</label>
            <input
              type="datetime-local"
              name="dateTime"
              value={formData.dateTime}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Round</label>
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

          <div className="form-group">
            <label>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Selected">Selected</option>
              <option value="Reject">Rejected</option>
              <option value="On Hold">On Hold</option>
              <option value="Waiting">Awaiting</option>
            </select>
          </div>

          <div className="form-group">
            <label>
              Manual Questions <span className="required-asterisk">*</span>
            </label>
            <textarea
              name="manualQuestions"
              value={formData.manualQuestions}
              onChange={handleChange}
              required
              placeholder="Enter questions manually..."
              rows="5"
            ></textarea>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="form-submit-button">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManualForm;
