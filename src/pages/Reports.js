import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Legend,
  Tooltip,
} from "chart.js";
import "../styles/Reports.css";
import axiosInstance from "../api/axiosInstance";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Legend,
  Tooltip
);

const ReportPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [modalRecruiter, setModalRecruiter] = useState(null);

  const fetchData = async (filterType) => {
    setLoading(true);
    setErrorMsg("");
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMsg("Token not found. Please log in.");
        setLoading(false);
        return;
      }

      const finalFilter = filterType || "year";
      const queryParam = `?${finalFilter}=true`;

      const response = await axiosInstance.get(
        `/internal-dashboard/${queryParam}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            token: token,
          },
        }
      );

      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setErrorMsg("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const overallBarData = {
    labels: data.map((r) => r.username),
    datasets: [
      {
        label: "Awaiting",
        data: data.map((r) => r.status.Awaiting),
        backgroundColor: "#facc15",
      },
      {
        label: "Selected",
        data: data.map((r) => r.status.selected),
        backgroundColor: "#22c55e",
      },
      {
        label: "On Hold",
        data: data.map((r) => r.status["On Hold"]),
        backgroundColor: "#60a5fa",
      },
      {
        label: "Reject",
        data: data.map((r) => r.status.Reject),
        backgroundColor: "#ef4444",
      },
    ],
  };

  const detailBarData = modalRecruiter &&
    modalRecruiter !== "all" && {
      labels: ["Awaiting", "Selected", "On Hold", "Reject"],
      datasets: [
        {
          label: `${modalRecruiter.username}'s Status`,
          data: [
            modalRecruiter.status.Awaiting,
            modalRecruiter.status.selected,
            modalRecruiter.status["On Hold"],
            modalRecruiter.status.Reject,
          ],
          backgroundColor: ["#facc15", "#22c55e", "#60a5fa", "#ef4444"],
        },
      ],
    };

  const totalStatus = {
    Awaiting: 0,
    selected: 0,
    "On Hold": 0,
    Reject: 0,
  };

  data.forEach((r) => {
    totalStatus.Awaiting += r.status.Awaiting;
    totalStatus.selected += r.status.selected;
    totalStatus["On Hold"] += r.status["On Hold"];
    totalStatus.Reject += r.status.Reject;
  });

  const pieData = {
    labels: ["Awaiting", "Selected", "On Hold", "Reject"],
    datasets: [
      {
        data: [
          totalStatus.Awaiting,
          totalStatus.selected,
          totalStatus["On Hold"],
          totalStatus.Reject,
        ],
        backgroundColor: ["#facc15", "#22c55e", "#60a5fa", "#ef4444"],
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // We'll create a custom legend
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.parsed;
            return `${label}: ${value}`;
          },
        },
      },
    },
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: { mode: "index", intersect: false },
    },
    scales: { y: { beginAtZero: true } },
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Recruiter Report</h1>

      {loading ? (
        <div className="dashboard-loading">Loading...</div>
      ) : errorMsg ? (
        <div className="dashboard-error">{errorMsg}</div>
      ) : (
        <>
          <div className="show-all-btn-container">
            <button
              onClick={() => setModalRecruiter("all")}
              className="show-all-btn"
            >
              Show All Graph
            </button>
          </div>

          <div className="data-visual-section">
            <div className="table-wrapper">
              {/* <h2>Recruiter Details</h2> */}
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Role</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((r) => (
                    <tr key={r.id} onClick={() => setModalRecruiter(r)}>
                      <td>{r.id}</td>
                      <td>{r.username}</td>
                      <td>{r.role}</td>
                      <td>{r.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pie-chart-wrapper">
              <h3>Overall Status </h3>
              <div className="pie-and-legend">
                <div className="pie-container">
                  <Pie data={pieData} options={pieOptions} />
                </div>
                <div className="custom-legend">
                  {Object.entries(totalStatus).map(([status, value]) => {
                    const colorMap = {
                      Awaiting: "#facc15",
                      selected: "#22c55e",
                      "On Hold": "#60a5fa",
                      Reject: "#ef4444",
                    };
                    return (
                      <div className="legend-item" key={status}>
                        <span
                          className="legend-color"
                          style={{ backgroundColor: colorMap[status] }}
                        ></span>
                        <span className="legend-label">{status}</span>
                        <span className="legend-value">{value}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {modalRecruiter && (
            <div
              className="modal-overlay"
              onClick={() => setModalRecruiter(null)}
            >
              <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="modal-close"
                  onClick={() => setModalRecruiter(null)}
                >
                  ×
                </button>

                {modalRecruiter === "all" ? (
                  <>
                    <h3>All Recruiters Status</h3>
                    <Bar data={overallBarData} options={barOptions} />
                  </>
                ) : (
                  <>
                    <h3>Details: {modalRecruiter.username}</h3>
                    <p>
                      <strong>ID:</strong> {modalRecruiter.id}
                    </p>
                    <p>
                      <strong>Role:</strong> {modalRecruiter.role}
                    </p>
                    <p>
                      <strong>Email:</strong> {modalRecruiter.email}
                    </p>
                    <div className="detail-chart-container">
                      <Bar data={detailBarData} options={barOptions} />
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ReportPage;
