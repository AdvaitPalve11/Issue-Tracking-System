import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../services/api";

function Dashboard({ issues, setIssues }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    API.get("/issues")
      .then((res) => setIssues(res.data))
      .catch((err) => console.log(err));
  }, []);

  const filteredIssues = issues.filter((issue) => {
    const matchesSearch = issue.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "ALL" || issue.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="container">
      <div className="header">
        <h1>🚀 Issue Tracker</h1>
        <button className="btn" onClick={() => navigate("/create")}>
          + New Issue
        </button>
      </div>

      <div style={{ margin: "15px 0" }}>
        <input
          placeholder="Search issues..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select onChange={(e) => setFilter(e.target.value)}>
          <option value="ALL">All</option>
          <option value="OPEN">Open</option>
          <option value="IN PROGRESS">In Progress</option>
          <option value="RESOLVED">Resolved</option>
        </select>
      </div>

      {filteredIssues.map((issue) => (
        <div
          key={issue.id}
          className="card"
          onClick={() => navigate(`/issue/${issue.id}`)}
        >
          <h3>{issue.title}</h3>
          <p>{issue.status}</p>
          <p>Assigned to: {issue.assignedTo}</p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;