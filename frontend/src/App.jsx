import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CreateIssue from "./pages/CreateIssue";
import ServerConnectionUI from "./ServerConnectionUI";

function App() {
  return (
    <ServerConnectionUI>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create" element={<CreateIssue />} />
        </Routes>
      </BrowserRouter>
    </ServerConnectionUI>
  );
}

export default App;