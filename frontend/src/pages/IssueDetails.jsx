import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";

function IssueDetails({ issues, setIssues }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const issue = issues.find((i) => i.id === Number(id));
  if (!issue) return <h2>Issue not found</h2>;

  const updateStatus = (status) => {
    API.put(`/issues/${issue.id}`, { ...issue, status })
      .then(() => {
        setIssues(
          issues.map((i) =>
            i.id === issue.id ? { ...i, status } : i
          )
        );
        toast.success("Status updated");
      });
  };

  const deleteIssue = () => {
    API.delete(`/issues/${issue.id}`)
      .then(() => {
        setIssues(issues.filter((i) => i.id !== issue.id));
        toast.success("Issue deleted");
        navigate("/");
      });
  };

  return (
    <div className="container">
      <h1>{issue.title}</h1>

      <div className="card">
        <p><strong>Description:</strong> {issue.description}</p>
        <p><strong>Status:</strong> {issue.status}</p>
        <p><strong>Assigned to:</strong> {issue.assignedTo}</p>

        <button className="btn" onClick={() => updateStatus("OPEN")}>Open</button>
        <button className="btn" onClick={() => updateStatus("IN PROGRESS")}>In Progress</button>
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