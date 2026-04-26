import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateIssue() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newIssue = {
      title,
      description,
      assignedTo,
      status: "OPEN"
    };

    console.log(newIssue);
    alert("Issue Created!");

    navigate("/");
  };

  return (
    <div className="container">
      <h1> Create New Issue</h1>

      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label>Assign To</label>
        <input
          type="text"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          required
        />

        <button className="btn" type="submit">
          Create Issue
        </button>
      </form>
    </div>
  );
}

export default CreateIssue;