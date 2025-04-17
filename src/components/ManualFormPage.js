import React, { useState } from "react";
// import "../components/styles/Form.css";
import "../components/styles/ManualFormPage.css"; // Import your CSS file for styling

const ManualForm = () => {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const [formData, setFormData] = useState({
    candidateName: "",
    endClient: "",
    position: "",
    location: "",
    panel: "",
    dateTime: "",
    round: 1,
    status: "pass",
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
      status: "pass",
      manualQuestions: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
//   const handleCSVUpload = (e) => {
//     const file = e.target.files[0];
//     if (file && file.type === "text/csv") {
//       Papa.parse(file, {
//         header: true,
//         skipEmptyLines: true,
//         complete: function (results) {
//           const data = results.data[0]; // Take first row for simplicity
  
//           setFormData((prev) => ({
//             ...prev,
//             candidateName: data.candidateName || "",
//             endClient: data.endClient || "",
//             position: data.position || "",
//             location: data.location || "",
//             panel: data.panel || "",
//             dateTime: data.dateTime || "",
//             round: data.round || 1,
//             status: data.status || "pass",
//             manualQuestions: data.manualQuestions || "",
//           }));
//         }
//       });
//     } else {
//       alert("Please upload a valid CSV file.");
//     }
//   };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

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
    });

    try {
      const response = await fetch(
        "https://recruitment-intelligence.appzlogic.in/api/add_questions/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            token: token,
          },
          body: body,
        }
      );

      if (response.ok) {
        setShowSuccessPopup(true);
        setTimeout(() => setShowSuccessPopup(false), 3000);
        resetForm();
      } else {
        alert("Failed to submit form");
      }
    } catch (error) {
      alert("Error submitting form");
    }
  };

  return (
    <div className="form-page-container">
      <h2 className="form-modal-title">Add Interview Questions</h2>
      <form className="interview-form" onSubmit={handleSubmit}>
        <div className="form-section">
          <div className="form-group">
            <div className="form-label">Candidate Name
            <span className="required-asterisk">*</span>
            </div>
            <input type="text" name="candidateName" value={formData.candidateName} onChange={handleChange} required />
          </div>
  
          <div className="form-group">
            <div className="form-label">Client
            <span className="required-asterisk">*</span>
            </div>
            <input type="text" name="endClient" value={formData.endClient} onChange={handleChange} required />
          </div>
  
          <div className="form-group">
            <div className="form-label">Position
            <span className="required-asterisk">*</span>
            </div>
            <input type="text" name="position" value={formData.position} onChange={handleChange} required />
          </div>
  
          <div className="form-group">
            <div className="form-label">Country/City</div>
            <input type="text" name="location" value={formData.location} onChange={handleChange} />
          </div>
  
          <div className="form-group">
            <div className="form-label">Panel
            <span className="required-asterisk">*</span>
            </div>
            <input type="text" name="panel" value={formData.panel} onChange={handleChange} required />
          </div>
  
          <div className="form-group">
            <div className="form-label">Date</div>
            <input type="datetime-local" name="dateTime" value={formData.dateTime} onChange={handleChange} />
          </div>
  
          <div className="form-group">
            <div className="form-label">Round</div>
            <input type="number" name="round" value={formData.round} onChange={handleChange} />
          </div>
  
          <div className="form-group">
            <div className="form-label">Status</div>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="Selected">Selected</option>
              <option value="Reject">Rejected</option>
              <option value="On Hold">On Hold</option>
              <option value="Waiting">Awaiting</option>
            </select>
          </div>
  
          <div className="form-group">
            <div className="form-label">Manual Questions
            <span className="required-asterisk">*</span>
            </div>
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
  
        {/* <div className="form-actions">
          <button type="submit" className="form-submit-button">Submit</button>
        </div>
      </form>
    </div>
  ); */}
   
  

        <div className="form-actions">
        {/* <label htmlFor="csv-upload" className="form-submit-button" style={{ cursor: "pointer", marginBottom: "1rem" }}>
    Upload CSV to Fill Form
  </label>
  <input
    id="csv-upload"
    type="file"
    accept=".csv"
    onChange={handleCSVUpload}
    style={{ display: "none" }}
  /> */}
          <button type="submit" className="form-submit-button">Submit</button>
        </div>
      </form>

      {showSuccessPopup && (
        <div className="success-popup-overlay">
          <div className="success-popup">
            <span className="close-button" onClick={() => setShowSuccessPopup(false)}>
              &times;
            </span>
            <p>Data added successfully!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManualForm;
