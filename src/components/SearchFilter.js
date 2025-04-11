// import React, { useState } from "react";
// import { FaSearch } from "react-icons/fa";
// import "./styles/SearchFilter.css";
// import filterIcon from "../components/images/filter.png";

// const SearchFilter = () => {
//   const [showDropdown, setShowDropdown] = useState(false);

//   const toggleDropdown = () => {
//     setShowDropdown(!showDropdown);
//   };

//   return (
//     <div className="search">
//       <div className="search-bar">
//         <button className="filter-btn" onClick={toggleDropdown}>
//           <img src={filterIcon} alt="Filter" className="filter-icon" />
//         </button>
//         <input type="text" className="search-box" placeholder="Search..." />
//         <button className="search-btn">
//           <FaSearch />
//         </button>
//       </div>
      
//       {showDropdown && (
//         <div className="filter-dropdown">
//           <ul>
//             <li>Candidates</li>
//             <li>Positions</li>
//             <li>Clients</li>
//             <li>Skills</li>
//             <li>Location</li>
//             <li>Status</li>
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchFilter;



// import React, { useState } from "react";
// import { FaSearch } from "react-icons/fa";
// import "./styles/SearchFilter.css";
// import filterIcon from "../components/images/filter.png";

// const SearchFilter = () => {
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [selectedFilters, setSelectedFilters] = useState([]);
//   const [expandedFilters, setExpandedFilters] = useState({});

//   const toggleDropdown = () => {
//     setShowDropdown(!showDropdown);
//   };

//   const toggleFilter = (filter) => {
//     if (selectedFilters.includes(filter)) {
//       setSelectedFilters(selectedFilters.filter((item) => item !== filter));
//     } else {
//       setSelectedFilters([...selectedFilters, filter]);
//     }
//   };

//   const toggleSubFilters = (filter) => {
//     setExpandedFilters((prev) => ({
//       ...prev,
//       [filter]: !prev[filter],
//     }));
//   };

//   return (
//     <div className="search">
//       <div className="search-bar">
//         <button className="filter-btn" onClick={toggleDropdown}>
//           <img src={filterIcon} alt="Filter" className="filter-icon" />
//         </button>
//         <input type="text" className="search-box" placeholder="Search..." />
//         <button className="search-btn">
//           <FaSearch />
//         </button>
//       </div>

//       {showDropdown && (
//         <div className="filter-dropdown">
//           <ul>
//             <li onClick={() => toggleSubFilters("Candidates")}>Candidates</li>
//             {expandedFilters["Candidates"] && (
//               <ul className="sub-filters">
//                 <li onClick={() => toggleFilter("ID")}>ID</li>
//                 <li onClick={() => toggleFilter("Name")}>Name</li>
//               </ul>
//             )}
//             <li onClick={() => toggleFilter("Positions")}>Positions</li>
//             <li onClick={() => toggleFilter("Clients")}>Clients</li>
//             <li onClick={() => toggleFilter("Skills")}>Skills</li>
//             <li onClick={() => toggleFilter("Location")}>Location</li>
//             <li onClick={() => toggleFilter("Status")}>Status</li>
//           </ul>
//         </div>
//       )}

//       {selectedFilters.length > 0 && (
//         <div className="selected-filters">
//           <strong>Selected Filters:</strong> {selectedFilters.join(", ")}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchFilter;


// -----------------------------------------------------------------------------------------------


// import React, { useState } from "react";
// import { FaSearch } from "react-icons/fa";
// import "./styles/SearchFilter.css";
// import filterIcon from "../components/images/filter.png";

// const SearchFilter = () => {
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [selectedFilters, setSelectedFilters] = useState({});
//   const [expandedFilters, setExpandedFilters] = useState({});

//   const toggleDropdown = () => {
//     setShowDropdown(!showDropdown);
//   };

//   const handleFilterChange = (filter) => {
//     setSelectedFilters((prev) => ({
//       ...prev,
//       [filter]: !prev[filter],
//     }));
//   };

//   const toggleSubFilters = (filter) => {
//     setExpandedFilters((prev) => ({
//       ...prev,
//       [filter]: !prev[filter],
//     }));
//   };

//   return (
//     <div className="search">
//       <div className="search-bar">
//         <button className="filter-btn" onClick={toggleDropdown}>
//           <img src={filterIcon} alt="Filter" className="filter-icon" />
//         </button>
//         <input type="text" className="search-box" placeholder="Search..." />
//         <button className="search-btn">
//           <FaSearch />
//         </button>
//       </div>

//       {showDropdown && (
//         <div className="filter-dropdown">
//           <ul>
//             <li>
//               <input
//                 type="checkbox"
//                 checked={!!selectedFilters["Positions"]}
//                 onChange={() => handleFilterChange("Positions")}
//               />
//               Positions
//             </li>
//             <li>
//               <input
//                 type="checkbox"
//                 checked={!!selectedFilters["Clients"]}
//                 onChange={() => handleFilterChange("Clients")}
//               />
//               Clients
//             </li>
//             <li>
//               <input
//                 type="checkbox"
//                 checked={!!selectedFilters["Skills"]}
//                 onChange={() => handleFilterChange("Skills")}
//               />
//               Panel
//             </li>
//           </ul>
//         </div>
//       )}

//       {Object.keys(selectedFilters).length > 0 && (
//         <div className="selected-filters">
//           <strong>Selected Filters:</strong> {Object.keys(selectedFilters).filter(key => selectedFilters[key]).join(", ")}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchFilter;


//...........................................................................................

// import React, { useState } from "react";
// import { FaSearch } from "react-icons/fa";
// import "./styles/SearchFilter.css";
// import filterIcon from "../components/images/filter.png";

// const SearchFilter = () => {
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [selectedFilters, setSelectedFilters] = useState([]); // Track multiple selected filters
//   const [searchTerm, setSearchTerm] = useState(""); // Track search input

//   const toggleDropdown = () => {
//     setShowDropdown(!showDropdown);
//   };

//   const handleFilterChange = (filter) => {
//     setSelectedFilters((prev) =>
//       prev.includes(filter)
//         ? prev.filter((item) => item !== filter) // Remove if already selected
//         : [...prev, filter] // Add if not selected
//     );
//   };

//   const handleSearch = async() => {
//     if (selectedFilters.length === 0) {
//       alert("Please select at least one filter before searching!");
//       return;
//     }

//     try{
//       console.log()
//       const response = await axios.get(`https://recruitment-intelligence.appzlogic.in/api/question/?company_name=${encodeURIComponent(client)}&position=${encodeURIComponent(position)}&panel_name=${encodeURIComponent(panel)}
// `)
//       console.log("Search successful:", response.data);
//       alert("Search successful!");
//     }
//     catch (error) {
//       console.log(error); }

//     // API Call Placeholder
//     console.log(`Searching by ${selectedFilters.join(", ")} for: ${searchTerm}`);

//     // Example: Make an API call here
//     // fetch(`/api/search?filters=${selectedFilters.join(",")}&query=${searchTerm}`)
//     //   .then(response => response.json())
//     //   .then(data => console.log(data));
//   };

//   return (
//     <div className="search">
//       <div className="search-bar">
//         <button className="filter-btn" onClick={toggleDropdown}>
//           <img src={filterIcon} alt="Filter" className="filter-icon" />
//         </button>
//         <input
//           type="text"
//           className="search-box"
//           placeholder={
//             selectedFilters.length > 0
//               ? `Search by ${selectedFilters.join(", ")}`
//               : "Select filter(s) first"
//           }
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           disabled={selectedFilters.length === 0} // Disable search if no filter is selected
//         />
//         <button className="search-btn" onClick={handleSearch}>
//           <FaSearch />
//         </button>
//       </div>

//       {showDropdown && (
//         <div className="filter-dropdown">
//           <ul>
//             {["Positions", "Clients", "Panel"].map((filter) => (
//               <li key={filter}>
                
//                 {filter}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {selectedFilters.length > 0 && (
//         <div className="selected-filters">
//           <strong>Selected Filters:</strong> {selectedFilters.join(", ")}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchFilter;

//...................................................................................................................

// import React, { useState, useEffect } from "react";
// import { FaSearch } from "react-icons/fa";
// import "./styles/SearchFilter.css";
// import filterIcon from "../components/images/filter.png";
// import axios from "axios";




// const SearchFilter = () => {
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [selectedFilters, setSelectedFilters] = useState([]); // Store multiple filters
//   const [searchTerm, setSearchTerm] = useState(""); // Store search input
//   const [filters, setFilters] = useState({
//     position: '',
//     company: '',
//     panel: '',
//   });

  

//   // useEffect(() => {
//   //   axios.get('https://recruitment-intelligence.appzlogic.in/api/positions/')
//   //   .then(response => setPositions(response.data))
//   //   .catch(error => console.log(error));
  
//   //   axios.get('https://recruitment-intelligence.appzlogic.in/api/company/')
//   //       .then(response => setCompanies(response.data))
//   //       .catch(error => console.log(error));
    
//   //   axios.get('https://recruitment-intelligence.appzlogic.in/api/panel/')
//   //       .then(response => setPanel(response.data))
//   //       .catch(error => console.log(error));    
//   // }, [filters]);
  
//   // useEffect(() => {
//   //   const { position, company, panel } = filters;
//   //   axios.get('https://recruitment-intelligence.appzlogic.in/api/question/', {
//   //     params: { position, company_name: company, panel_name: panel }
//   //   })
//   //   .then(response => setSearchResults(response.data.details))
//   //   .catch(error => console.log(error));
//   // }, [filters]);

//   const toggleDropdown = () => {
//     setShowDropdown(!showDropdown);
//   };

//   const handleFilterChange = (filter) => {
//     setSelectedFilters((prevFilters) =>
//       prevFilters.includes(filter)
//         ? prevFilters.filter((f) => f !== filter) // Remove filter if already selected
//         : [...prevFilters, filter] // Add filter if not selected
//     );
//   };

//   const handleSearch = async () => {
//     if (selectedFilters.length === 0) {
//       alert("Please select at least one filter before searching!");
//       return;
//     }
//     try {
//       const response = await axios.get(
//         `https://recruitment-intelligence.appzlogic.in/api/question/?company_name=${encodeURIComponent(company)}&position=${encodeURIComponent(position)}&panel_name=${encodeURIComponent(panel)}`)
//       console.log("Search successful:", response.data);
//       alert("Search successful!");
//       } catch (error) {
      
//     }

//     console.log(`Searching ${selectedFilters.join(", ")} for: ${searchTerm}`);

//   };

//   return (
//     <div className="search">
//       <div className="search-bar">
//         <button className="filter-btn" onClick={toggleDropdown}>
//           <img src={filterIcon} alt="Filter" className="filter-icon" />
//         </button>
//         <input
//           type="text"
//           className="search-box"
//           placeholder={selectedFilters.length > 0 ? `Search by ${selectedFilters.join(", ")}` : "Select filters first"}
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           disabled={selectedFilters.length === 0} 
//         />
//         <button className="search-btn" onClick={handleSearch} disabled={selectedFilters.length === 0}>
//           <FaSearch />
//         </button>
//       </div>

//       {showDropdown && (
//         <div className="filter-dropdown">
//           <ul>
//             {filters.map((filter) => (
//               <li key={filter}>
//                 <input
//                   type="checkbox"
//                   checked={selectedFilters.includes(filter)}
//                   onChange={() => handleFilterChange(filter)}
//                 />
//                 {filter}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

     
//     </div>
//   );
// };

// export default SearchFilter;

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

import React, { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import "./styles/SearchFilter.css";
import filterIcon from "../components/images/filter.png";

const SearchFilter = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const dropdownRef = useRef(null);

  const [selectedFilters, setSelectedFilters] = useState({
    position: "",
    client: "",
    panel: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copiedRow, setCopiedRow] = useState(null);

  const [positions, setPositions] = useState([]);
  const [clients, setClients] = useState([]);
  const [panels, setPanels] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const [subDropdowns, setSubDropdowns] = useState({
    position: false,
    client: false,
    panel: false,
  });

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const positionResponse = await axios.get("https://recruitment-intelligence.appzlogic.in/api/positions/");
        const clientResponse = await axios.get("https://recruitment-intelligence.appzlogic.in/api/company/");
        const panelResponse = await axios.get("https://recruitment-intelligence.appzlogic.in/api/panels/");

        setPositions(positionResponse.data);
        setClients(clientResponse.data);
        setPanels(panelResponse.data);
      } catch (error) {
        console.error("Error fetching filter data:", error);
      }
    };

    fetchFilters();
  }, []);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const toggleSubDropdown = (filter) => {
    setSubDropdowns((prev) => ({
      position: false,
      client: false,
      panel: false,
      [filter]: !prev[filter],
    }));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSubDropdowns({ position: false, client: false, panel: false });
        setShowDropdown(false);
        setFilteredSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectFilter = (filter, value) => {
    setSelectedFilters((prev) => ({ ...prev, [filter]: value }));
    const updatedSearchTerm = [
      filter === "position" ? value : selectedFilters.position,
      filter === "client" ? value : selectedFilters.client,
      filter === "panel" ? value : selectedFilters.panel,
    ]
      .filter(Boolean)
      .join(", ");
    setSearchTerm(updatedSearchTerm);
    setSubDropdowns((prev) => ({ ...prev, [filter]: false }));
  };

  const handleSearchTermChange = (e) => {
    const inputValue = e.target.value;
    setSearchTerm(inputValue);

    if (!inputValue.trim()) {
      setFilteredSuggestions([]);
      return;
    }

    const matchedPositions = positions.filter((pos) =>
      pos.toLowerCase().includes(inputValue.toLowerCase())
    );
    const matchedClients = clients.filter((client) =>
      client.toLowerCase().includes(inputValue.toLowerCase())
    );
    const matchedPanels = panels.filter((panel) =>
      panel.toLowerCase().includes(inputValue.toLowerCase())
    );

    setFilteredSuggestions([
      ...matchedPositions.map((pos) => ({ type: "position", value: pos })),
      ...matchedClients.map((client) => ({ type: "client", value: client })),
      ...matchedPanels.map((panel) => ({ type: "panel", value: panel })),
    ]);
  };

  const handleSelectSuggestion = (suggestion) => {
    handleSelectFilter(suggestion.type, suggestion.value);
    setSearchTerm(suggestion.value);
    setFilteredSuggestions([]);
  };

  const handleDownload = (rowData) => {
    const filename = `Candidate_${rowData.Candidate_name.replace(/\s/g, "_")}.csv`;
    const headers = [
      "Candidate Name",
      "Client",
      "End Client",
      "Position",
      "Interview Panel",
      "Date",
      "Questions"
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

  const handleSearch = async () => {
    if (!selectedFilters.position && !selectedFilters.client && !selectedFilters.panel) {
      alert("Please select at least one filter or enter a search term!");
      return;
    }

    setLoading(true);
    setShowDropdown(false);
    setSubDropdowns({ position: false, client: false, panel: false });
    setFilteredSuggestions([]);
    setError("");
    setSearchResults([]);

    try {
      const params = new URLSearchParams();
      if (selectedFilters.position) params.append("position", selectedFilters.position);
      if (selectedFilters.client) params.append("company_name", selectedFilters.client);
      if (selectedFilters.panel) params.append("panel_name", selectedFilters.panel);

      const token = localStorage.getItem("token");

      const response = await axios.get(`https://recruitment-intelligence.appzlogic.in/api/question/?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          token: token,
        },
      });

      if (response.data.details.length === 0) {
        setError("No results found.");
      } else {
        setSearchResults(response.data.details);
        setShowResults(true);
      }
    } catch (error) {
      console.error("Search error:", error.response?.data || error.message);
      setError("Search failed! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={dropdownRef} className="search">
      <div className="search-bar">
        <button className="filter-btn" onClick={toggleDropdown}>
          <img src={filterIcon} alt="Filter" className="filter-icon" />
        </button>

        <input
          type="text"
          className="search-box"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
        {searchTerm && (
          <button className="clear-btn" onClick={() => {
            setSearchTerm("");
            setSelectedFilters({ position: "", client: "", panel: "" });
            setSearchResults([]);
            setFilteredSuggestions([]);
            setShowResults(false);
            setError("");
          }}>X</button>
        )}
        <button className="search-btn" onClick={handleSearch}>
          <FaSearch />
        </button>
      </div>

      {filteredSuggestions.length > 0 && (
        <ul className="search-suggestions">
          {filteredSuggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSelectSuggestion(suggestion)}>
              <span className="suggestion-type">[{suggestion.type}]</span> {suggestion.value}
            </li>
          ))}
        </ul>
      )}

      {showDropdown && (
        <div className="filter-dropdown">
          <ul>
            {["position", "client", "panel"].map((filter) => (
              <li key={filter} onClick={() => toggleSubDropdown(filter)}>
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
                {subDropdowns[filter] && (
                  <ul className="sub-dropdown">
                    {(filter === "position" ? positions :
                      filter === "client" ? clients : panels
                    ).map((item) => (
                      <li key={item} onClick={() => handleSelectFilter(filter, item)}>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {loading && (
        <div className="loading-spinner-container">
          <div className="spinner"></div>
            <span className="loading-text">Loading...</span>
        </div>
      )}

      {showResults && (
        <div className="overlay">
          <div className="results-modal">
            <button className="close-modal-btn" onClick={() => setShowResults(false)}>×</button>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Candidate Name</th>
                    <th>Client</th>
                    <th>End Client</th>
                    <th>Position</th>
                    <th>Interview Panel</th>
                    <th>Date</th>
                    <th>Questions</th>
                    <th>Download</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map((result, index) => (
                    <tr key={index}>
                      <td>{result.Candidate_name}</td>
                      <td>{result.L1_Client}</td>
                      <td>{result.End_Client}</td>
                      <td>{result.Positions}</td>
                      <td>
                        <ol>{String(result.Interview_Panel).split(",").map((line, i) => <li key={i}>{line}</li>)}</ol>
                      </td>
                      <td>{result.Interview_starttime}</td>
                      <td className="question-cell">
                          <div className="question-scroll">
                              <ol className="question-list">
                                 {result.question.split("\n").map((line, i) => (
                                 <li key={i}>{line}</li>
                                 ))}
                             </ol>
                          </div>
                         <button className="copy-btn" onClick={() => {
                                 navigator.clipboard.writeText(result.question);
                                 setCopiedRow(index);
                                 setTimeout(() => setCopiedRow(null), 2000); // Reset 
                                }}
                                 title="Copy All Questions"
                        >📋 </button>
                        {copiedRow === index && (
                             <span className="copied-text">Copied!</span>
                        )}
                      </td>
                      <td><button onClick={() => handleDownload(result)}>Download</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
