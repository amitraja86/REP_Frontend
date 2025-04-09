// import React, { useState } from "react";
// import "../components/styles/Form.css";

// const Form = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <>
//       <button onClick={() => setIsOpen(true)}>ADD DETAILS</button>

//       {isOpen && (
//         <div className="modal">
//           <div className="modal-content">
//             <span className="close" onClick={() => setIsOpen(false)}>
//               &times;
//             </span>
//             <h2>Candidate Interview Form</h2>
//             <form>
//               <div className="form-group">
//               <label>Candidate Name</label>
//         <input type="text" name="candidateName"   required />
        
//         <label>End Client</label>
//         <input type="text" name="endClient"   required />
        
//         <label>Position</label>
//         <input type="text" name="position"   required />
        
//         <label>Location</label>
//         <input type="text" name="location"   required />
        
//         <label>Panel</label>
//         <input type="text" name="panel"   required />
        
//         <label>Date</label>
//         <input type="date" name="date"   required />
        
//         <label>Duration</label>
//         <input type="time" name="duration"   required />
        
//         <label>Round</label>
//         <input type="number" name="round"   required />
        
//         <label>Status</label>
//         <input type="text" name="status"   required />
        
//         <label>Question Set (Upload File)</label>
//         <input type="file" name="questionSet"  accept=".csv, .xls, .xlsx, .pdf" />
        
//         <textarea name="manualQuestions" placeholder="Enter questions manually..."></textarea>
//               </div>
//               <div className="form-actions">
//                 <button type="button" onClick={() => setIsOpen(false)}>
//                   Cancel
//                 </button>
//                 <button type="submit">Submit</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Form;

import React, { useState } from "react";
import "../components/styles/Form.css";

const Form = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectionOpen, setSelectionOpen] = useState(false);
  const [inputType, setInputType] = useState(""); // 'manual' or 'csv'
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
    questionSet: null,
    manualQuestions: "",
  });

  // Reset form data
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
      questionSet: null,
      manualQuestions: "",
    });
    setInputType(""); 
  };

  // Open selection popup
  const handleOpenSelection = () => {
    setSelectionOpen(true);
    setIsOpen(false);
    resetForm();
  };

  // Handles input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handles file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "text/csv") {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setFormData((prevData) => ({
          ...prevData,
          questionSet: file, // Store as Base64
        }));
      };
    } else {
      alert("Please upload a valid CSV file.");
    }
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const apiUrl =
      inputType === "manual"
        ? "http://127.0.0.1:8000/add_questions/"
        : "http://127.0.0.1:8000/add_question_by_csv/";

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

        let body;

        if (inputType === "manual") {
          body = JSON.stringify({
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
        } else {
          body = new FormData();
          body.append("csv_file", formData.questionSet); // Append the file to FormData
        }

        try {
          const response = await fetch(apiUrl, {
            method: "POST",
            headers: inputType === "manual"
              ? {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`,
                  "token": token, 
                }
              : {
                  "Authorization": `Bearer ${token}`,
                  "token":token // No "Content-Type" for FormData
                },
            body: body,
          });

      if (response.ok) {
        setShowSuccessPopup(true);
        setTimeout(() => setShowSuccessPopup(false), 3000);
        setIsOpen(false);
        resetForm();
      } else {
        alert("Failed to submit form");
      }
    } catch (error) {
      alert("Error submitting form");
    }
  };

  return (
    <>
      <button onClick={handleOpenSelection} className="open-form-button">
        ADD DETAILS
      </button>

      {selectionOpen && (
        <div className="modal-overlays">
          <div className="modal-contents">
            <span className="close-button" onClick={() => setSelectionOpen(false)}>
              &times;
            </span>
            <h2>Select Input Method</h2>
            <button onClick={() => { setInputType("manual"); setSelectionOpen(false); setIsOpen(true); }}>
              Enter Manually
            </button>
            <button onClick={() => { setInputType("csv"); setSelectionOpen(false); setIsOpen(true); }}>
              Upload CSV File
            </button>
          </div>
        </div>
      )}

      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close-button" onClick={() => setIsOpen(false)}>
              &times;
            </span>
            <h2>{inputType === "manual" ? "Add Interview Questions" : "Upload CSV File"}</h2>
            <form className="data-form" onSubmit={handleSubmit}>
              {inputType === "manual" && (
                <>
                  <div className="form-group">
                    <label>Candidate Name</label>
                    <input type="text" name="candidateName" value={formData.candidateName} onChange={handleChange} required />

                    <label>Client</label>
                    <input type="text" name="endClient" value={formData.endClient} onChange={handleChange} required />

                    <label>Position</label>
                    <input type="text" name="position" value={formData.position} onChange={handleChange} required />

                    <label>Country/City</label>
                    <input type="text" name="location" value={formData.location} onChange={handleChange} />

                    <label>Panel</label>
                    <input type="text" name="panel" value={formData.panel} onChange={handleChange} required />

                    <label>Date</label>
                    <input type="datetime-local" name="dateTime" value={formData.dateTime} onChange={handleChange} />

                    <label>Round</label>
                    <input type="number" name="round" value={formData.round} onChange={handleChange} />

                    <label>Status</label>
                    <select name="status" value={formData.status} onChange={handleChange}>
                      <option value="Pass">Pass</option>
                      <option value="Reject">Reject</option>
                    </select>

                    <label>Manual Questions</label>
                    <textarea name="manualQuestions" value={formData.manualQuestions} onChange={handleChange} placeholder="Enter questions manually..."></textarea>
                  </div>
                </>
              )}

              {inputType === "csv" && (
                <>
                  <div className="form-group">
                    <label>Upload CSV File</label>
                    <input type="file" name="questionSet" accept=".csv" onChange={handleFileChange} required />
                  </div>
                </>
              )}

              <div className="form-actions">
                <button type="button" className="cancel-button" onClick={() => setIsOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-button">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}

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
    </>
  );
};

export default Form;


