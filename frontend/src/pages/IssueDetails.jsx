import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

function IssueDetails({ issues, setIssues }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [issue, setIssue] = useState(() => issues.find((currentIssue) => currentIssue.id === Number(id)) ?? null);

  useEffect(() => {
    if (issue) {
      return;
    }

    API.get(`/issues/${id}`)
      .then((res) => setIssue(res.data))
      .catch(() => setIssue(null));
  }, [id, issue]);

  if (!issue) return <h2>Issue not found</h2>;

  const updateStatus = (status) => {
    API.put(`/issues/${issue.id}`, {
      title: issue.title,
      description: issue.description,
      assignedToId: issue.assignedToId ?? null,
      status
    })
      .then(() => {
        setIssue((currentIssue) => (currentIssue ? { ...currentIssue, status } : currentIssue));
        setIssues(
          issues.map((currentIssue) =>
            currentIssue.id === issue.id ? { ...currentIssue, status } : currentIssue
          )
        );
        window.alert("Status updated");
      })
      .catch((err) => {
        console.log(err);
        window.alert("Unable to update the issue status.");
      });
  };

  const deleteIssue = () => {
    API.delete(`/issues/${issue.id}`)
      .then(() => {
        setIssues(issues.filter((i) => i.id !== issue.id));
        window.alert("Issue deleted");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        window.alert("Unable to delete this issue. Resolve it first.");
      });
  };

  return (
    <div className="container">
      <h1>{issue.title}</h1>

      <div className="card">
        <p><strong>Description:</strong> {issue.description}</p>
        <p><strong>Status:</strong> {issue.status}</p>
        <p><strong>Created by:</strong> {issue.createdByName ?? issue.createdById}</p>
        <p><strong>Assigned to:</strong> {issue.assignedToName ?? "Unassigned"}</p>

        <button className="btn" onClick={() => updateStatus("OPEN")}>Open</button>
        <button className="btn" onClick={() => updateStatus("IN_PROGRESS")}>In Progress</button>
        <button className="btn" onClick={() => updateStatus("RESOLVED")}>Resolved</button>

        <button
          className="btn"
          style={{ background: "red", marginTop: "10px" }}
          onClick={deleteIssue}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default IssueDetails;