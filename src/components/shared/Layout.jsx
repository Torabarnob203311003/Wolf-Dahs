import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import { LayoutDashboard, CreditCard, Users, Ticket, Settings } from 'lucide-react';

function Layout() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-[#282727] border-r border-t border-[#282727] p-4 flex flex-col fixed top-0 left-0 h-screen z-20">
        <div className="flex items-center ps-14 gap-0">
          <img src="/logo.svg" alt="Logo" className="h-18 w-18" />
        </div>
        <br />
        <nav className="flex flex-col gap-8 mt-8">
          <NavLink to="/" end className={({ isActive }) =>
            `flex items-center gap-4 p-4 rounded-xl font-semibold text-lg transition-colors ${
              isActive
                ? 'bg-[#E28B27] text-white'
                : 'text-[#E3E6EA] hover:bg-[#E28B27] hover:text-white'
            }`
          }>
            <LayoutDashboard className="w-7 h-7" />
            Dashboards
          </NavLink>
          <NavLink to="/cards" className={({ isActive }) =>
            `flex items-center gap-4 p-4 rounded-xl font-semibold text-lg transition-colors ${
              isActive
                ? 'bg-[#E28B27] text-white'
                : 'text-[#E3E6EA] hover:bg-[#E28B27] hover:text-white'
            }`
          }>
            <CreditCard className="w-7 h-7" />
            Cards Management
          </NavLink>
          <NavLink to="/users" className={({ isActive }) =>
            `flex items-center gap-4 p-4 rounded-xl font-semibold text-lg transition-colors ${
              isActive
                ? 'bg-[#E28B27] text-white'
                : 'text-[#E3E6EA] hover:bg-[#E28B27] hover:text-white'
            }`
          }>
            <Users className="w-7 h-7" />
            Users Management
          </NavLink>
          <NavLink to="/winner" className={({ isActive }) =>
            `flex items-center gap-4 p-4 rounded-xl font-semibold text-lg transition-colors ${
              isActive
                ? 'bg-[#E28B27] text-white'
                : 'text-[#E3E6EA] hover:bg-[#E28B27] hover:text-white'
            }`
          }>
            <Ticket className="w-7 h-7" />
            Winner Selection
          </NavLink>
          <NavLink to="/settings" className={({ isActive }) =>
            `flex items-center gap-4 p-4 rounded-xl font-semibold text-lg transition-colors ${
              isActive
                ? 'bg-[#E28B27] text-white'
                : 'text-[#E3E6EA] hover:bg-[#E28B27] hover:text-white'
            }`
          }>
            <Settings className="w-7 h-7" />
            Settings
          </NavLink>
        </nav>
      </aside>
      {/* Main content */}
      <div className="flex-1 flex flex-col pb-24 ml-64">
        {/* Header */}
        <header className="bg-[#282727] shadow p-8 flex items-center justify-end pr-10 fixed top-0 left-64 right-0 z-10">
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
          className="flex-1 p-6 bg-[#000] overflow-auto text-white"
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
