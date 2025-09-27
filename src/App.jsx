import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/shared/Layout";
import Dashboard from "./components/Dashboard";
import Products from "./components/Cards";
import Organizers from "./components/Organizers";
import Tournaments from "./components/Tournaments";
import UserManagement from "./components/UserManagement";
import Payments from "./components/Payments";
import Insights from "./components/Insights";
import Settings from "./components/Settings";
import Login from "./components/Login";
import Cards from "./components/Cards";

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes outside layout */}
        <Route path="/login" element={<Login />} />
        {/* Routes with layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="cards" element={<Cards />} />
          <Route path="users" element={<Organizers />} />
          <Route path="winner" element={<Tournaments />} />
          <Route path="settings" element={<UserManagement />} />
          <Route path="payments" element={<Payments />} />
          <Route path="insights" element={<Insights />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
