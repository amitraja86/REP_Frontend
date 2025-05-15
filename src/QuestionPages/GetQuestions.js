import React, { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import Swal from "sweetalert2";
import "../styles/SearchFilter.css";
import axiosInstance from "../api/axiosInstance";
import API from "../api/api";

const SearchFilter = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    position: "",
    client: "",
    panel: "",
  });

  const [positions, setPositions] = useState([]);
  const [clients, setClients] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingClients, setLoadingClients] = useState(true);
  const [loadingPositions, setLoadingPositions] = useState(true);
  const [, setError] = useState("");

  const dropdownRef = useRef(null);
  const token = localStorage.getItem("token");

  // useEffect(() => {
  //   const fetchClientData = async () => {
  //     try {
  //       const res = await axiosInstance.get("/company/", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //           token: token,
  //         },
  //       });
  //       setClients(res.data);
  //     } catch (error) {
  //       console.error("Error fetching client data:", error);
  //     } finally {
  //       setLoadingClients(false);
  //       setLoadingPositions(false);
  //     }
  //   };
  //   fetchClientData();
  // }, [token]);

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const data = await API.fetchClients();
        setClients(data);
      } catch (error) {
        console.error("Error fetching client data:", error);
      } finally {
        setLoadingClients(false);
        setLoadingPositions(false);
      }
    };
    fetchClientData();
  }, []);

  useEffect(() => {
    const allPositions = [];
    if (selectedFilters.client && clients[selectedFilters.client]) {
      const data = clients[selectedFilters.client];
      setPositions(data[0]?.[0] || []);
    } else {
      Object.values(clients).forEach((entry) => {
        allPositions.push(...(entry[0]?.[0] || []));
      });
      setPositions([...new Set(allPositions)]);
    }
  }, [selectedFilters.client, clients]);

  const handleSelectFilter = (filter, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filter]: value,
    }));
  };

  const handleSearch = async () => {
    if (
      !selectedFilters.position &&
      !selectedFilters.client &&
      !selectedFilters.panel
    ) {
      Swal.fire({
        icon: "warning",
        title: "No Filters Selected",
        text: "Please select at least one filter!",
      });
      return;
    }

    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams();
      if (selectedFilters.position)
        params.append("position", selectedFilters.position);
      if (selectedFilters.client)
        params.append("company_name", selectedFilters.client);
      if (selectedFilters.panel)
        params.append("panel_name", selectedFilters.panel);

      const response = await axiosInstance.get(
        `/question/?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            token: token,
          },
        }
      );

      if (response.data.details.length === 0) {
        Swal.fire({
          icon: "info",
          title: "No Data Found",
          text: "No questions matched the selected filters.",
        });
        setError("No results found.");
      } else {
        localStorage.setItem(
          "searchResults",
          JSON.stringify(response.data.details)
        );
        localStorage.setItem("searchFilters", JSON.stringify(selectedFilters));
        window.open("/search-results", "_blank");
      }
    } catch (error) {
      console.error("Search error:", error.response?.data || error.message);
      setError("Search failed! Please try again.");
      Swal.fire({
        icon: "error",
        title: "Search Failed",
        text: "An error occurred while searching. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={dropdownRef} className="search">
      <div className="search-bar">
        <div className="filter-tabs">
          <h3 className="card-title">Search Questions</h3>
          <div className="filter-group">
            <label>Client</label>
            <div className="select-wrapper">
              <select
                value={selectedFilters.client}
                onChange={(e) =>
                  setSelectedFilters({
                    ...selectedFilters,
                    client: e.target.value,
                  })
                }
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
              </select>
              {selectedFilters.client && (
                <button
                  className="clear-btn"
                  onClick={() => handleSelectFilter("client", "")}
                >
                  <AiOutlineClose />
                </button>
              )}
            </div>

            <label>Position</label>
            <div className="select-wrapper">
              <select
                value={selectedFilters.position}
                onChange={(e) => handleSelectFilter("position", e.target.value)}
              >
                <option value="">Select Position</option>
                {loadingPositions ? (
                  <option>Loading positions...</option>
                ) : (
                  positions.map((pos) => (
                    <option key={pos} value={pos}>
                      {pos}
                    </option>
                  ))
                )}
              </select>
              {selectedFilters.position && (
                <button
                  className="clear-btn"
                  onClick={() => handleSelectFilter("position", "")}
                >
                  <AiOutlineClose />
                </button>
              )}
            </div>

            <button
              className="clear-all-btn"
              onClick={() =>
                setSelectedFilters({ position: "", client: "", panel: "" })
              }
            >
              <AiOutlineClose />
            </button>

            <button className="search-btn" onClick={handleSearch}>
              <FaSearch />
            </button>
          </div>
        </div>
      </div>

      {loading && (
        <div className="loading-spinner-container">
          <div className="spinner" />
          <span className="loading-text">Loading...</span>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
