import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function CreateIssue() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createdById, setCreatedById] = useState("");
  const [assignedToId, setAssignedToId] = useState("");
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    API.get("/users")
      .then((res) => {
        setUsers(res.data);

        if (res.data.length > 0) {
          setCreatedById(String(res.data[0].id));
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newIssue = {
      title,
      description,
      createdById: Number(createdById),
      assignedToId: assignedToId ? Number(assignedToId) : null
    };

    API.post("/issues", newIssue)
      .then(() => {
        window.alert("Issue Created!");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        window.alert("Unable to create issue. Check the creator and assignee IDs.");
      });
  };

  return (
    <div className="container">
      <h1>Create Issue</h1>

      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />

        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

        <label>Created By</label>
        <select value={createdById} onChange={(e) => setCreatedById(e.target.value)} required>
          <option value="">Select creator</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name} ({user.email})
            </option>
          ))}
        </select>

        <label>Assign To</label>
        <select value={assignedToId} onChange={(e) => setAssignedToId(e.target.value)}>
          <option value="">Unassigned</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name} ({user.email})
            </option>
          ))}
        </select>

        <button className="btn" type="submit">Create Issue</button>
      </form>
    </div>
  );
}

export default CreateIssue;