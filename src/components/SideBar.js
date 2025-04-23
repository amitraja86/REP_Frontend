// src/components/Sidebar.js
import React from 'react';

const Sidebar = ({ setActiveComponent }) => {
  return (
    <div className="sidebar">
      <ul>
        <li onClick={() => setActiveComponent('searchFilter')}>Get Questions</li>
        <li onClick={() => setActiveComponent('form')}>Add Questions</li>
        <li onClick={() => setActiveComponent('candidateTracker')}>Candidate Tracker</li>
      </ul>
    </div>
  );
};

export default Sidebar;
