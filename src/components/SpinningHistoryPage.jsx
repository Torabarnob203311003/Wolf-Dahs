import React, { useState } from 'react';
import { Search, Filter, Download, Calendar, Trophy, DollarSign, User } from 'lucide-react';

const SpinningHistoryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPrize, setFilterPrize] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Sample spinning history data
  const spinHistory = [
    {
      id: 1,
      userId: "USR001",
      userName: "John Doe",
      userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face&auto=format",
      prize: "Jackpot",
      prizeValue: 5000,
      spinDate: "2025-10-26 14:30:22",
      ip: "192.168.1.1"
    },
    {
      id: 2,
      userId: "USR002",
      userName: "Sarah Smith",
      userAvatar: "https://images.unsplash.com/photo-1494790108755-2616c927aba5?w=32&h=32&fit=crop&crop=face&auto=format",
      prize: "$50",
      prizeValue: 50,
      spinDate: "2025-10-26 13:15:10",
      ip: "192.168.1.2"
    },
    {
      id: 3,
      userId: "USR003",
      userName: "Michael Johnson",
      userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face&auto=format",
      prize: "$25",
      prizeValue: 25,
      spinDate: "2025-10-26 12:45:33",
      ip: "192.168.1.3"
    },
    {
      id: 4,
      userId: "USR004",
      userName: "Emily Brown",
      userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face&auto=format",
      prize: "$5",
      prizeValue: 5,
      spinDate: "2025-10-26 11:20:15",
      ip: "192.168.1.4"
    },
    {
      id: 5,
      userId: "USR005",
      userName: "David Wilson",
      userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face&auto=format",
      prize: "$2",
      prizeValue: 2,
      spinDate: "2025-10-26 10:55:48",
      ip: "192.168.1.5"
    },
    {
      id: 6,
      userId: "USR006",
      userName: "Lisa Anderson",
      userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=32&h=32&fit=crop&crop=face&auto=format",
      prize: "$1",
      prizeValue: 1,
      spinDate: "2025-10-26 09:30:22",
      ip: "192.168.1.6"
    },
    {
      id: 7,
      userId: "USR007",
      userName: "James Taylor",
      userAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=32&h=32&fit=crop&crop=face&auto=format",
      prize: "Zero",
      prizeValue: 0,
      spinDate: "2025-10-26 08:15:10",
      ip: "192.168.1.7"
    },
    {
      id: 8,
      userId: "USR008",
      userName: "Maria Garcia",
      userAvatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=32&h=32&fit=crop&crop=face&auto=format",
      prize: "0",
      prizeValue: 0,
      spinDate: "2025-10-25 22:45:33",
      ip: "192.168.1.8"
    },
    {
      id: 9,
      userId: "USR009",
      userName: "Robert Martinez",
      userAvatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=32&h=32&fit=crop&crop=face&auto=format",
      prize: "$25",
      prizeValue: 25,
      spinDate: "2025-10-25 21:20:15",
      ip: "192.168.1.9"
    },
    {
      id: 10,
      userId: "USR010",
      userName: "Jennifer Lee",
      userAvatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=32&h=32&fit=crop&crop=face&auto=format",
      prize: "$5",
      prizeValue: 5,
      spinDate: "2025-10-25 20:10:48",
      ip: "192.168.1.10"
    },
    {
      id: 11,
      userId: "USR011",
      userName: "Chris Davis",
      userAvatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=32&h=32&fit=crop&crop=face&auto=format",
      prize: "$2",
      prizeValue: 2,
      spinDate: "2025-10-25 19:30:22",
      ip: "192.168.1.11"
    },
    {
      id: 12,
      userId: "USR012",
      userName: "Amanda White",
      userAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=32&h=32&fit=crop&crop=face&auto=format",
      prize: "$50",
      prizeValue: 50,
      spinDate: "2025-10-25 18:15:10",
      ip: "192.168.1.12"
    }
  ];

  // Statistics
  const stats = {
    totalSpins: spinHistory.length,
    totalWinnings: spinHistory.reduce((sum, spin) => sum + spin.prizeValue, 0),
    jackpotWins: spinHistory.filter(spin => spin.prize === 'Jackpot').length,
    uniqueUsers: new Set(spinHistory.map(spin => spin.userId)).size
  };

  // Filtering
  const filteredHistory = spinHistory.filter(spin => {
    const matchesSearch = spin.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         spin.userId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrize = filterPrize === 'all' || spin.prize === filterPrize;
    return matchesSearch && matchesPrize;
  });

  // Pagination
  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedHistory = filteredHistory.slice(startIndex, startIndex + itemsPerPage);

  const getPrizeBadgeColor = (prize) => {
    if (prize === 'Jackpot') return 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white';
    if (prize === '$50') return 'bg-yellow-500 text-white';
    if (prize === '$25') return 'bg-blue-500 text-white';
    if (prize === '$5') return 'bg-purple-500 text-white';
    if (prize === '$2' || prize === '$1') return 'bg-green-500 text-white';
    return 'bg-gray-600 text-white';
  };

  const handleExport = () => {
    console.log('Exporting data...');
    alert('Export functionality would download CSV/Excel file');
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] p-6">
      <div className="">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-white text-2xl font-bold mb-2">Spinning History</h1>
          <p className="text-gray-400 text-sm">View and manage all lucky wheel spin records</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-[#1c1c1c] rounded-lg p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs mb-1">Total Spins</p>
                <p className="text-white text-2xl font-bold">{stats.totalSpins}</p>
              </div>
              <div className="bg-blue-500 rounded-lg p-2">
                <Trophy className="text-white" size={20} />
              </div>
            </div>
          </div>

          <div className="bg-[#1c1c1c] rounded-lg p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs mb-1">Total Winnings</p>
                <p className="text-white text-2xl font-bold">${stats.totalWinnings}</p>
              </div>
              <div className="bg-green-500 rounded-lg p-2">
                <DollarSign className="text-white" size={20} />
              </div>
            </div>
          </div>

          <div className="bg-[#1c1c1c] rounded-lg p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs mb-1">Jackpot Wins</p>
                <p className="text-white text-2xl font-bold">{stats.jackpotWins}</p>
              </div>
              <div className="bg-yellow-500 rounded-lg p-2">
                <Trophy className="text-white" size={20} />
              </div>
            </div>
          </div>

          <div className="bg-[#1c1c1c] rounded-lg p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs mb-1">Unique Users</p>
                <p className="text-white text-2xl font-bold">{stats.uniqueUsers}</p>
              </div>
              <div className="bg-purple-500 rounded-lg p-2">
                <User className="text-white" size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-[#1c1c1c] rounded-lg p-5 shadow-lg mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <label className="text-gray-400 text-xs block mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                <input
                  type="text"
                  placeholder="Search by user name or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-[#0f0f0f] text-white text-sm pl-10 pr-4 py-2 rounded border border-gray-700 focus:border-blue-500 focus:outline-none w-full"
                />
              </div>
            </div>

            {/* Filter by Prize */}
            <div>
              <label className="text-gray-400 text-xs block mb-2">Prize Type</label>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                <select
                  value={filterPrize}
                  onChange={(e) => setFilterPrize(e.target.value)}
                  className="bg-[#0f0f0f] text-white text-sm pl-10 pr-4 py-2 rounded border border-gray-700 focus:border-blue-500 focus:outline-none w-full appearance-none"
                >
                  <option value="all">All Prizes</option>
                  <option value="Jackpot">Jackpot</option>
                  <option value="$50">$50</option>
                  <option value="$25">$25</option>
                  <option value="$5">$5</option>
                  <option value="$2">$2</option>
                  <option value="$1">$1</option>
                  <option value="Zero">Zero</option>
                  <option value="0">0</option>
                </select>
              </div>
            </div>

             
          </div>
        </div>

        {/* History Table */}
        <div className="bg-[#1c1c1c] rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800 bg-[#161616]">
                  <th className="text-gray-400 text-left py-3 px-4 font-medium text-xs">ID</th>
                  <th className="text-gray-400 text-left py-3 px-4 font-medium text-xs">USER</th>
                  <th className="text-gray-400 text-left py-3 px-4 font-medium text-xs">USER ID</th>
                  <th className="text-gray-400 text-left py-3 px-4 font-medium text-xs">PRIZE</th>
                  <th className="text-gray-400 text-left py-3 px-4 font-medium text-xs">VALUE</th>
                  <th className="text-gray-400 text-left py-3 px-4 font-medium text-xs">DATE & TIME</th>
                  <th className="text-gray-400 text-left py-3 px-4 font-medium text-xs">IP ADDRESS</th>
                </tr>
              </thead>
              <tbody>
                {paginatedHistory.map((spin, idx) => (
                  <tr 
                    key={spin.id}
                    className={`${idx !== paginatedHistory.length - 1 ? 'border-b border-gray-800' : ''} hover:bg-[#252525] transition-colors`}
                  >
                    <td className="py-3 px-4">
                      <span className="text-white text-xs">#{spin.id}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <img 
                          src={spin.userAvatar} 
                          alt={spin.userName}
                          className="w-7 h-7 rounded-full object-cover"
                        />
                        <span className="text-white text-xs">{spin.userName}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-gray-400 text-xs font-mono">{spin.userId}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`${getPrizeBadgeColor(spin.prize)} px-3 py-1 rounded-full text-xs font-semibold inline-block`}>
                        {spin.prize}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-xs font-semibold ${spin.prizeValue > 0 ? 'text-green-400' : 'text-gray-500'}`}>
                        ${spin.prizeValue}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-white text-xs">{spin.spinDate}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-gray-400 text-xs font-mono">{spin.ip}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-[#161616] px-5 py-4 border-t border-gray-800 flex items-center justify-between">
            <div className="text-gray-400 text-xs">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredHistory.length)} of {filteredHistory.length} entries
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="bg-[#0f0f0f] text-white px-3 py-1.5 rounded text-xs hover:bg-[#2a2a2a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              <div className="flex gap-1">
                {[...Array(totalPages)].map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(idx + 1)}
                    className={`px-3 py-1.5 rounded text-xs transition-colors ${
                      currentPage === idx + 1 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-[#0f0f0f] text-white hover:bg-[#2a2a2a]'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="bg-[#0f0f0f] text-white px-3 py-1.5 rounded text-xs hover:bg-[#2a2a2a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpinningHistoryPage;