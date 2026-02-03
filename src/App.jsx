import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Pages/Layout";
import Dashboard from "./Pages/Dashboard";
import Tournaments from "./Pages/Winner";
import Settings from "./Pages/Settings";
import Login from "./Pages/Login";
import Cards from "./components/Cards";
import Winner from "./Pages/Winner";
import Register from "./Pages/Register";
import AddRaffleCard from "./Pages/AddRaffles";
import EditRaffleCard from "./components/EditRaffle";
import WinnerHistory from "./Pages/WinnerHistory";
import SpinnerControlPanel from "./Pages/SpinnerControlPanel";
import SpinningHistoryPage from "./Pages/SpinningHistoryPage";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import WithdrawlRequest from './Pages/WithdrawlRequest';
import ManageAdmins from "./Pages/ManageAdmins";
import CheckCredit from "./Pages/CheckCredit";
import ManageSponsor from "./Pages/ManageSponsor";
import UserManagement from "./Pages/UserManagement";
import WinnerSelection from "./Pages/WinnerSelection";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />

        {/* Protected dashboard routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="cards" element={<Cards />} />
            <Route path="add-raffle" element={<AddRaffleCard />} />
            <Route path="spinner-control-panel" element={<SpinnerControlPanel />} />
            <Route path="spinner-history" element={<SpinningHistoryPage />} />
            <Route path="edit-raffle/:id" element={<EditRaffleCard />} />
            <Route path="winner" element={<Tournaments />} />
            <Route path="winner-selection" element={<WinnerSelection />} />
            <Route path="winner-history" element={<WinnerHistory />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="payments" element={<Winner />} />
            <Route path="settings" element={<Settings />} />
            <Route path="withdraw-request" element={<WithdrawlRequest />} />
            <Route path="manage-admin" element={<ManageAdmins />} />
            <Route path="manage-user-credit" element={<CheckCredit />} />
            <Route path="manage-sponsor" element={<ManageSponsor />} />
        

            <Route path="*" element={
              <div className="flex items-center justify-center min-h-screen bg-black text-white">
                <div className="text-center">
                  <h1 className="text-6xl font-bold mb-4">404</h1>
                  <p className="text-xl mb-6">Oops! Page not found.</p>
                  <a
                    href="/"
                    className="px-6 py-3 bg-yellow-500 text-black font-bold rounded hover:bg-yellow-600 transition"
                  >
                    Go Home
                  </a>
                </div>
              </div>
            } />

          </Route>

            <Route path="*" element={
              <div className="flex items-center justify-center min-h-screen bg-black text-white">
                <div className="text-center">
                  <h1 className="text-6xl font-bold mb-4">404</h1>
                  <p className="text-xl mb-6">Oops! Page not found.</p>
                  <a
                    href="/"
                    className="px-6 py-3 bg-yellow-500 text-black font-bold rounded hover:bg-yellow-600 transition"
                  >
                    Go Home
                  </a>
                </div>
              </div>
            } />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
