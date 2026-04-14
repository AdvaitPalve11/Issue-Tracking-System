import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [issues, setIssues] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setIssues([
      { id: 1, title: "Login Bug", status: "OPEN", assignedTo: "Rahul" },
      { id: 2, title: "UI Issue", status: "IN PROGRESS", assignedTo: "Priya" }
    ]);
  }, []);

  const getStatusClass = (status) => {
    if (status === "OPEN") return "status-open";
    if (status === "IN PROGRESS") return "status-progress";
    return "status-resolved";
  };

  return (
    <div className="container">
      <div className="header">
        <h1>🚀 Issue Tracker</h1>
        <button className="btn" onClick={() => navigate("/create")}>
          + New Issue
        </button>
      </div>

      {issues.map((issue) => (
        <div key={issue.id} className="card">
          <h3>{issue.title}</h3>
          <p className={getStatusClass(issue.status)}>● {issue.status}</p>
          <p className="assigned">Assigned to: {issue.assignedTo}</p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;