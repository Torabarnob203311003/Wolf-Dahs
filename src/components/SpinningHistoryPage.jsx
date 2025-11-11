import React, { useEffect, useState } from 'react';
import { Search, Filter, Trophy, DollarSign } from 'lucide-react';
import { ScaleLoader } from 'react-spinners';
import axiosSecure from '../lib/axiosSecure';

const SpinningHistoryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPrize, setFilterPrize] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [overviewStats, setOverviewStats] = useState(null);
  const [spinHistory, setSpinHistory] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const itemsPerPage = 10; // can also be dynamic if your API supports it

  // Fetch API with backend pagination
  const fetchSpinHistoryOverview = async (page = 1) => {
    try {
      setLoading(true);
      const response = await axiosSecure.get('/spinner/spinning-history-overview', {
        params: {
          page,
          limit: itemsPerPage,
          searchTerm,
          reward: filterPrize !== 'all' ? filterPrize : undefined
        },
      });

      const resData = response.data.data;
      
      const spins = resData.data.map((spin) => ({
        ...spin,
        prize: spin.reward,
        prizeValue: spin.value || 0,
        spinDate: new Date(spin.date).toLocaleString(),
        id: spin._id,
      }));

      setSpinHistory(spins);
      setOverviewStats(resData.totals);
      setTotalPages(resData.meta.totalPages);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch on mount and whenever page, searchTerm, or filterPrize changes
  useEffect(() => {
    fetchSpinHistoryOverview(currentPage);
  }, [currentPage, searchTerm, filterPrize]);

  const getPrizeBadgeColor = (prize) => {
    if (prize === 'Jackpot') return 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white';
    if (prize === '$50') return 'bg-yellow-500 text-white';
    if (prize === '$25') return 'bg-blue-500 text-white';
    if (prize === '$5') return 'bg-purple-500 text-white';
    if (prize === '$2' || prize === '$1') return 'bg-green-500 text-white';
    return 'bg-gray-600 text-white';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0d0d0d]">
        <ScaleLoader color="#36d7b7" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-white text-2xl font-bold mb-2">Spinning History</h1>
        <p className="text-gray-400 text-sm">View and manage all lucky wheel spin records</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-[#1c1c1c] rounded-lg p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-xs mb-1">Total Spins</p>
              <p className="text-white text-2xl font-bold">{overviewStats?.totalSpins || 0}</p>
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
              <p className="text-white text-2xl font-bold">${overviewStats?.totalWinning || 0}</p>
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
              <p className="text-white text-2xl font-bold">{overviewStats?.totalJackpot || 0}</p>
            </div>
            <div className="bg-yellow-500 rounded-lg p-2">
              <Trophy className="text-white" size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[#1c1c1c] rounded-lg p-5 shadow-lg mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label className="text-gray-400 text-xs block mb-2">Search</label>
            <input
              type="text"
              placeholder="Search by user ID..."
              value={searchTerm}
              onChange={(e) => {
                setCurrentPage(1); // reset page on search
                setSearchTerm(e.target.value);
              }}
              className="bg-[#0f0f0f] text-white text-sm pl-3 pr-4 py-2 rounded border border-gray-700 focus:border-blue-500 focus:outline-none w-full"
            />
          </div>

          <div>
            <label className="text-gray-400 text-xs block mb-2">Prize Type</label>
            <select
              value={filterPrize}
              onChange={(e) => {
                setCurrentPage(1); // reset page on filter change
                setFilterPrize(e.target.value);
              }}
              className="bg-[#0f0f0f] text-white text-sm pl-3 pr-4 py-2 rounded border border-gray-700 focus:border-blue-500 focus:outline-none w-full appearance-none"
            >
              <option value="all">All Prizes</option>
              <option value="Jackpot">Jackpot</option>
              <option value="$50">$50</option>
              <option value="$25">$25</option>
              <option value="$5">$5</option>
              <option value="$2">$2</option>
              <option value="$1">$1</option>
              <option value="0">0</option>
            </select>
          </div>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-[#1c1c1c] rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800 bg-[#161616]">
                <th className="text-gray-400 text-left py-3 px-4 text-xs">ID</th>
                <th className="text-gray-400 text-left py-3 px-4 text-xs">USER NAME</th>
                <th className="text-gray-400 text-left py-3 px-4 text-xs">EMAIL</th>
                <th className="text-gray-400 text-left py-3 px-4 text-xs">PRIZE</th>
                <th className="text-gray-400 text-left py-3 px-4 text-xs">VALUE</th>
                <th className="text-gray-400 text-left py-3 px-4 text-xs">DATE & TIME</th>
              </tr>
            </thead>
            <tbody>
              {spinHistory.map((spin) => (
                <tr key={spin.id} className="border-b border-gray-800 hover:bg-[#252525] transition-colors">
                  <td className="py-3 px-4 text-white text-xs">{spin.id}</td>
                  <td className="py-3 px-4 text-gray-400 text-xs font-mono">{spin.userName}</td>
                  <td className="py-3 px-4 text-gray-400 text-xs font-mono">{spin.email}</td>
                  <td className="py-3 px-4">
                    <span className={`${getPrizeBadgeColor(spin.prize)} px-3 py-1 rounded-full text-xs font-semibold inline-block`}>
                      {spin.prize}
                    </span>
                  </td>
                  <td className={`py-3 px-4 text-xs font-semibold ${spin.prizeValue > 0 ? 'text-green-400' : 'text-gray-500'}`}>
                    ${spin.prizeValue}
                  </td>
                  <td className="py-3 px-4 text-white text-xs">{spin.spinDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-[#161616] px-5 py-4 border-t border-gray-800 flex items-center justify-between">
          <div className="text-gray-400 text-xs">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="bg-[#0f0f0f] text-white px-3 py-1.5 rounded text-xs hover:bg-[#2a2a2a] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`px-3 py-1.5 rounded text-xs transition-colors ${currentPage === idx + 1 ? 'bg-blue-600 text-white' : 'bg-[#0f0f0f] text-white hover:bg-[#2a2a2a]'}`}
              >
                {idx + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="bg-[#0f0f0f] text-white px-3 py-1.5 rounded text-xs hover:bg-[#2a2a2a] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpinningHistoryPage;
