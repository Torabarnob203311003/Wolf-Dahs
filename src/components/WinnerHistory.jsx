import { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight, Trophy, Calendar, User, Ticket } from 'lucide-react';
import axiosSecure from '../lib/axiosSecure';

const WinnerHistory = () => {
    const [winners, setWinners] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const itemsPerPage = 10;

    useEffect(() => {
        fetchWinnerHistory();
    }, []);

    const fetchWinnerHistory = async () => {
        try {
            setLoading(true);
            const response = await axiosSecure.get('/winner/winner-history');

            if (response.data.success) {
                setWinners(response.data.data);
                setError(null);
            }
        } catch (err) {
            console.error('Error fetching winner history:', err);
            setError('Failed to fetch winner history');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const filteredWinners = winners.filter(winner => {
        const searchLower = searchTerm.toLowerCase();
        return (
            winner.userId?.userName?.toLowerCase().includes(searchLower) ||
            winner.userId?.email?.toLowerCase().includes(searchLower) ||
            winner.raffleId?.title?.toLowerCase().includes(searchLower)
        );
    });

    const totalPages = Math.ceil(filteredWinners.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentWinners = filteredWinners.slice(startIndex, endIndex);

    return (
        <div className="min-h-screen text-white p-6">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-2 text-gray-400 mb-2">
                    <span>Winner Management</span>
                    <span>›</span>
                    <span>History</span>
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold flex items-center gap-3">
                            <Trophy className="text-yellow-500" size={32} />
                            Winner History
                        </h1>
                        <p className="text-gray-400 mt-2">
                            View all past raffle winners and their details
                        </p>
                    </div>
                    <div className="bg-orange-500/20 border border-orange-500 rounded-lg px-4 py-2">
                        <p className="text-orange-400 text-sm">Total Winners</p>
                        <p className="text-2xl font-bold text-orange-500">{winners.length}</p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="bg-[#1a1a1a] rounded-lg border border-gray-800">
                {/* Search Bar */}
                <div className="flex justify-between items-center p-6 border-b border-gray-800">
                    <h2 className="text-lg font-medium text-white">
                        All Winners ({filteredWinners.length})
                    </h2>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search by username, email, or raffle..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="bg-[#2a2a2a] border border-gray-700 rounded-lg px-4 py-2 pl-10 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 w-80"
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="p-12 text-center text-gray-400">
                        <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500 mb-4"></div>
                        <p>Loading winner history...</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="p-12 text-center">
                        <p className="text-red-500 mb-4">{error}</p>
                        <button
                            onClick={fetchWinnerHistory}
                            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition"
                        >
                            Retry
                        </button>
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && winners.length === 0 && (
                    <div className="p-12 text-center text-gray-400">
                        <Trophy className="mx-auto mb-4 text-gray-600" size={48} />
                        <p className="text-xl mb-2">No Winners Yet</p>
                        <p className="text-sm">Winners will appear here once raffles are completed</p>
                    </div>
                )}

                {/* No Search Results */}
                {!loading && !error && winners.length > 0 && filteredWinners.length === 0 && (
                    <div className="p-12 text-center text-gray-400">
                        <Search className="mx-auto mb-4 text-gray-600" size={48} />
                        <p className="text-xl mb-2">No Results Found</p>
                        <p className="text-sm">No winners found matching "{searchTerm}"</p>
                    </div>
                )}

                {/* Table */}
                {!loading && !error && filteredWinners.length > 0 && (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-800 bg-[#2a2a2a]">
                                        <th className="text-left py-4 px-6 font-medium text-gray-300 text-sm">NO</th>
                                        <th className="text-left py-4 px-6 font-medium text-gray-300 text-sm">Raffle Title</th>
                                        <th className="text-left py-4 px-6 font-medium text-gray-300 text-sm">Winner</th>
                                        <th className="text-left py-4 px-6 font-medium text-gray-300 text-sm">Email</th>
                                        <th className="text-left py-4 px-6 font-medium text-gray-300 text-sm">Ticket Info</th>
                                        <th className="text-left py-4 px-6 font-medium text-gray-300 text-sm">Price</th>
                                        <th className="text-left py-4 px-6 font-medium text-gray-300 text-sm">Won Date</th>
                                        <th className="text-left py-4 px-6 font-medium text-gray-300 text-sm">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentWinners.map((winner, index) => (
                                        <tr
                                            key={winner._id}
                                            className="border-b border-gray-800 hover:bg-[#2a2a2a]/50 transition"
                                        >
                                            <td className="py-4 px-6 text-gray-300 text-sm">
                                                {startIndex + index + 1}
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-2">
                                                    <Trophy className="text-yellow-500" size={16} />
                                                    <span className="text-white font-medium text-sm">
                                                        {winner.raffleId?.title || 'N/A'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-2">
                                                    <User className="text-blue-400" size={16} />
                                                    <span className="text-white text-sm">
                                                        {winner.userId?.userName || 'N/A'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-gray-300 text-sm">
                                                {winner.userId?.email || 'N/A'}
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-2">
                                                    <Ticket className="text-green-400" size={16} />
                                                    <div>
                                                        <p className="text-white text-sm font-medium">
                                                            #{winner.winningTicketId?.ticketNumber || 'N/A'}
                                                        </p>
                                                        <p className="text-gray-500 text-xs">
                                                            {winner.raffleId?.ticketSold || 0}/{winner.raffleId?.totalTicket || 0} sold
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="text-orange-400 font-semibold text-sm">
                                                    £{winner.raffleId?.price || 0}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="text-purple-400" size={16} />
                                                    <span className="text-gray-300 text-sm">
                                                        {formatDate(winner.createdAt)}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${winner.raffleId?.status === false
                                                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                                        : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                                                    }`}>
                                                    {winner.raffleId?.status === false ? 'Completed' : 'Active'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="flex items-center justify-between p-6 border-t border-gray-800">
                            <p className="text-sm text-gray-400">
                                Showing {startIndex + 1} to {Math.min(endIndex, filteredWinners.length)} of {filteredWinners.length} winners
                            </p>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                    disabled={currentPage === 1}
                                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronLeft size={18} />
                                </button>

                                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                                    let pageNum;
                                    if (totalPages <= 5) {
                                        pageNum = i + 1;
                                    } else if (currentPage <= 3) {
                                        pageNum = i + 1;
                                    } else if (currentPage >= totalPages - 2) {
                                        pageNum = totalPages - 4 + i;
                                    } else {
                                        pageNum = currentPage - 2 + i;
                                    }

                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => setCurrentPage(pageNum)}
                                            className={`px-3 py-1 rounded text-sm transition ${currentPage === pageNum
                                                    ? 'bg-orange-500 text-white'
                                                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                                                }`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}

                                <button
                                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                    disabled={currentPage === totalPages}
                                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default WinnerHistory;