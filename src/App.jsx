import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/shared/Layout";
import Dashboard from "./components/Dashboard";
import Organizers from "./components/Organizers";
import Tournaments from "./components/Winner";
import UserManagement from "./components/UserManagement";
import Insights from "./components/Insights";
import Settings from "./components/Settings";
import Login from "./components/Login";
import Cards from "./components/Cards";
import Winner from "./components/Winner";
import Register from "./components/Register";

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes outside layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        
        {/* Routes with layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="cards" element={<Cards />} />
          <Route path="" element={<Organizers />} />
          <Route path="winner" element={<Tournaments />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="payments" element={<Winner />} />
          <Route path="insights" element={<Insights />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
