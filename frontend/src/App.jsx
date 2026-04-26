import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import CreateIssue from "./pages/CreateIssue";
import IssueDetails from "./pages/IssueDetails";

function App() {
  const [issues, setIssues] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard issues={issues} setIssues={setIssues} />} />
        <Route path="/create" element={<CreateIssue />} />
        <Route path="/issue/:id" element={<IssueDetails issues={issues} setIssues={setIssues} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;