import { Outlet, NavLink } from 'react-router-dom'
import { LayoutDashboard, CreditCard, Users, Ticket, Settings, HistoryIcon, Power, LoaderPinwheel } from 'lucide-react';
import { Bell, ChevronDown, User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';

function Layout() {
  const {logout} = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications] = useState([
    { id: 1, title: 'New raffle ticket sold', time: '5 min ago', unread: true },
    { id: 2, title: 'Jackpot winner announced', time: '1 hour ago', unread: true },
    { id: 3, title: 'System maintenance scheduled', time: '2 hours ago', unread: false }
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;


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
        <header className="bg-[#1c1c1c] shadow-lg px-8 py-4 flex items-center justify-between fixed top-0 left-64 right-0 z-50">
      {/* Left side - can add breadcrumbs or page title here if needed */}
      <div className="flex-1">
        {/* Optional: Add breadcrumbs or search bar here */}
      </div>

      {/* Right side - Notifications & User Profile */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 hover:bg-[#2a2a2a] rounded-lg transition-colors"
          >
            <Bell className="w-6 h-6 text-orange-500" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setShowNotifications(false)}
              ></div>
              <div className="absolute right-0 mt-2 w-80 bg-[#1c1c1c] border border-gray-800 rounded-lg shadow-2xl z-20 overflow-hidden">
                <div className="p-4 border-b border-gray-800">
                  <h3 className="text-white font-semibold text-sm">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-gray-800 hover:bg-[#2a2a2a] transition-colors cursor-pointer ${
                        notification.unread ? 'bg-[#252525]' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {notification.unread && (
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-1.5 flex-shrink-0"></div>
                        )}
                        <div className="flex-1">
                          <p className="text-white text-sm">{notification.title}</p>
                          <p className="text-gray-400 text-xs mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-gray-800 text-center">
                  <button className="text-orange-500 hover:text-orange-600 text-xs font-medium">
                    View all notifications
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Divider */}
        <div className="w-px h-8 bg-gray-700"></div>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3 hover:bg-[#2a2a2a] rounded-lg px-3 py-2 transition-colors"
          >
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face&auto=format"
              alt="User"
              className="h-9 w-9 rounded-full border-2 border-gray-700 object-cover"
            />
            <div className="text-left hidden md:block">
              <p className="text-white font-semibold text-sm">Halid</p>
              <p className="text-gray-400 text-xs">Administrator</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>

          {/* User Menu Dropdown */}
          {showUserMenu && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setShowUserMenu(false)}
              ></div>
              <div className="absolute right-0 mt-2 w-56 bg-[#1c1c1c] border border-gray-800 rounded-lg shadow-2xl z-20 overflow-hidden">
                <div className="p-4 border-b border-gray-800">
                  <p className="text-white font-semibold text-sm">Halid</p>
                  <p className="text-gray-400 text-xs">admin@raffle.com</p>
                </div>
                <div className="py-2">
                  <button className="w-full px-4 py-2.5 text-left text-white hover:bg-[#2a2a2a] transition-colors flex items-center gap-3 text-sm">
                    <User size={16} className="text-gray-400" />
                    My Profile
                  </button>
                  <button className="w-full px-4 py-2.5 text-left text-white hover:bg-[#2a2a2a] transition-colors flex items-center gap-3 text-sm">
                    <Settings size={16} className="text-gray-400" />
                    Settings
                  </button>
                </div>
                <div className="border-t border-gray-800">
                  <button className="w-full px-4 py-2.5 text-left text-red-400 hover:bg-[#2a2a2a] transition-colors flex items-center gap-3 text-sm">
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
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
