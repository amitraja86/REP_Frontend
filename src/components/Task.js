// src/components/AddTaskCard.jsx
import React, { useState } from "react";
import "./styles/Task.css";

const AddTaskCard = ({ onAddTask }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignee: "",
    assignedBy: "",
    duration: ""
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask({ ...formData, status: "To Do" });
    setFormData({
      title: "",
      description: "",
      assignee: "",
      assignedBy: "",
      duration: ""
    });
    setShowModal(false);
  };

  return (
    <>
      <div className="add-task-card">
        <button className="add-btn" onClick={() => setShowModal(true)}>
          + Add Task
        </button>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add New Task</h2>
            <form className="task-form" onSubmit={handleSubmit}>
              <input name="title" placeholder="Task Title" value={formData.title} onChange={handleChange} required />
              <input name="description" placeholder="Task Description" value={formData.description} onChange={handleChange} required />
              <input name="assignee" placeholder="Assigned To" value={formData.assignee} onChange={handleChange} required />
              <input name="assignedBy" placeholder="Assigned By" value={formData.assignedBy} onChange={handleChange} required />
              <input name="duration" placeholder="Time Duration (e.g., 3 days)" value={formData.duration} onChange={handleChange} required />
              <div className="form-buttons">
                <button type="submit">Add Task</button>
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddTaskCard;
