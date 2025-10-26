import { Outlet, NavLink } from 'react-router-dom'
import { LayoutDashboard, CreditCard, Users, Ticket, Settings, HistoryIcon, Power, LoaderPinwheel } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

function Layout() {
  const {logout} = useAuth();

  const handleLogout = () =>{
    logout();
    window.location = '/login';
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}      
      <aside className="w-64 bg-[#1C1C1C] border-r border-t border-[#282727] p-2 flex flex-col fixed top-0 left-0 h-screen z-20">
        <div className="flex items-center justify-center mb-8">
          <img src="/logo.svg" alt="Logo" className="h-16 w-16" />
        </div>

        <nav className="flex flex-col gap-3">
          <NavLink to="/" end className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-base transition-colors ${isActive
              ? 'bg-[#E28B27] text-white'
              : 'text-[#E3E6EA] hover:bg-[#E28B27] hover:text-white'
            }`
          }>
            <LayoutDashboard className="w-5 h-5" />
            Dashboards
          </NavLink>

          <NavLink to="/cards" className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-base transition-colors ${isActive
              ? 'bg-[#E28B27] text-white'
              : 'text-[#E3E6EA] hover:bg-[#E28B27] hover:text-white'
            }`
          }>
            <CreditCard className="w-5 h-5" />
            Cards Management
          </NavLink>

          <NavLink to="/spinner-control-panel" className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-base transition-colors ${isActive
              ? 'bg-[#E28B27] text-white'
              : 'text-[#E3E6EA] hover:bg-[#E28B27] hover:text-white'
            }`
          }>
            <LoaderPinwheel className="w-5 h-5" />
            Spinner Control Panel
          </NavLink>
          
          <NavLink to="/spinner-history" className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-base transition-colors ${isActive
              ? 'bg-[#E28B27] text-white'
              : 'text-[#E3E6EA] hover:bg-[#E28B27] hover:text-white'
            }`
          }>
            <LoaderPinwheel className="w-5 h-5" />
            Spinning History 
          </NavLink>

          <NavLink to="/users" className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-base transition-colors ${isActive
              ? 'bg-[#E28B27] text-white'
              : 'text-[#E3E6EA] hover:bg-[#E28B27] hover:text-white'
            }`
          }>
            <Users className="w-5 h-5" />
            Users Management
          </NavLink>

          <NavLink to="/winner" className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-base transition-colors ${isActive
              ? 'bg-[#E28B27] text-white'
              : 'text-[#E3E6EA] hover:bg-[#E28B27] hover:text-white'
            }`
          }>
            <Ticket className="w-5 h-5" />
            Winner Selection
          </NavLink>

          <NavLink to="/winner-history" className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-base transition-colors ${isActive
              ? 'bg-[#E28B27] text-white'
              : 'text-[#E3E6EA] hover:bg-[#E28B27] hover:text-white'
            }`
          }>
            <HistoryIcon className="w-5 h-5" />
            Winner History
          </NavLink>

          <NavLink to="/settings" className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-base transition-colors ${isActive
              ? 'bg-[#E28B27] text-white'
              : 'text-[#E3E6EA] hover:bg-[#E28B27] hover:text-white'
            }`
          }>
            <Settings className="w-5 h-5" />
            Settings
          </NavLink>

         <div onClick={handleLogout} className='flex items-center gap-2 px-4 mr-3 text-white font-semibold hover:bg-[#E28B27] cursor-pointer py-3 rounded-lg'>
            <Power className="w-5 h-5 mr-1" />
            Sign Out
          </div>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Header */}
        <header className="bg-[#1C1C1C] shadow p-8 flex items-center justify-end pr-10 fixed top-0 left-64 right-0 z-10">
          <div className="flex items-center gap-4">
            {/* Bell icon */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-8 text-[#E28B27]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.933 23.933 0 0 1-5.714 0M6.5 10c0-3.038 2.462-5.5 5.5-5.5s5.5 2.462 5.5 5.5c0 2.386.416 4.042 1.09 5.184a.563.563 0 0 1-.49.816H5.9a.563.563 0 0 1-.49-.816C6.084 14.042 6.5 12.386 6.5 10z" />
            </svg>
            {/* User profile image */}
            <img src="/vite.svg" alt="User" className="h-8 w-8 rounded-full border" />
            <span className="text-white font-semibold">Halid</span>
          </div>
        </header>
        {/* Page content */}
        <main
          className="flex-1 p-6 bg-[#0d0d0d] overflow-auto text-white"
          style={{
            marginTop: '80px',
            height: 'calc(100vh - 80px)',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <style>
            {`
              main::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
