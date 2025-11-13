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
import AddRaffleCard from "./components/AddRaffles";
import EditRaffleCard from "./components/EditRaffle";
import WinnerSelection from "./components/WinnerSelection";
import WinnerHistory from "./components/WinnerHistory";
import SpinnerControlPanel from "./components/SpinnerControlPanel";
import SpinningHistoryPage from "./components/SpinningHistoryPage";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import WithdrawlRequest from './components/WithdrawlRequest';

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
            <Route path="organizers" element={<Organizers />} />
            <Route path="winner" element={<Tournaments />} />
            <Route path="winner-selection" element={<WinnerSelection />} />
            <Route path="winner-history" element={<WinnerHistory />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="payments" element={<Winner />} />
            <Route path="insights" element={<Insights />} />
            <Route path="settings" element={<Settings />} />
           <Route path="withdraw-request" element={<WithdrawlRequest />} />


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
