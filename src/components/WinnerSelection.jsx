import { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import axiosSecure from '../lib/axiosSecure';

const WinnerSelection = () => {
    const [raffleId, setRaffleId] = useState('');
    const [raffle, setRaffle] = useState(null);
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const itemsPerPage = 5;

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('raffleId');

        if (id) {
            setRaffleId(id);
            fetchRaffleData(id);
        }
    }, []);

    const fetchRaffleData = async (id) => {
        try {
            setLoading(true);
            const response = await axiosSecure.get(`/raffles/get-raffles-details/${id}`);

            if (response.data.success && response.data.data) {
                setRaffle(response.data.data.RaffleDetails);

                // Transform users data from the API response
                const usersData = response.data.data.Users.map((user, index) => ({
                    id: user.userId,
                    name: user.name || 'N/A',
                    email: user.email || 'N/A',
                    tracks: user.ticketCount,
                    ticketId: `#${String(index + 1).padStart(6, '0')}`,
                    ticketCount: user.ticketCount
                }));

                setUsers(usersData);
                setError(null);
            }
        } catch (err) {
            console.error('Error fetching raffle:', err);
            setError('Failed to fetch raffle data');
        } finally {
            setLoading(false);
        }
    };

    const handleSelectWinner = async (userId) => {
        try {
            const response = await axiosSecure.post('/winners/select-winner', {
                raffleId,
                userId
            });

            if (response.data.success) {
                alert('Winner selected successfully!');
                // Optionally refresh or navigate back
                window.location.href = '/winner-management';
            }
        } catch (err) {
            console.error('Error selecting winner:', err);
            alert(err.response?.data?.message || 'Failed to select winner');
        }
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentUsers = filteredUsers.slice(startIndex, endIndex);

    const ticketsSold = raffle?.ticketSold || 0;
    const totalTickets = raffle?.totalTicket || 1000;
    const progressPercentage = (ticketsSold / totalTickets) * 100;
    const allTicketsSold = ticketsSold >= totalTickets;

    return (
        <div className="min-h-screen bg-black text-white p-3">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="flex items-center gap-2 text-gray-400 mb-2">
                        <span>Winner Selection Management</span>
                        <span>›</span>
                        <span>View Details</span>
                    </div>
                    <h1 className="text-3xl font-bold">Winner Selection</h1>
                    <p className="text-gray-400 mt-2">
                        Select winners for the current raffle. Ensure all tickets are sold before proceeding.
                    </p>
                </div>
                <button
                    onClick={() => window.location.href = '/winner-management'}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded flex items-center gap-2 transition"
                >
                    <ArrowLeft size={18} />
                    Back
                </button>
            </div>

            {/* Ticket Sales Progress Section */}
            <div className="bg-[#282727] rounded-lg p-6 mb-8 border border-gray-700">
                <div className="mb-4">
                    <h2 className="text-lg font-semibold text-white mb-2">
                        {raffle?.title || 'Loading...'}
                    </h2>
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex-1 mr-4">
                            <div className="w-full bg-gray-700 rounded-full h-3 relative">
                                <div
                                    className="bg-gradient-to-r from-orange-400 to-orange-600 h-3 rounded-full transition-all duration-300"
                                    style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                                />
                                <div
                                    className="absolute top-1/2 transform -translate-y-1/2 w-5 h-5 bg-orange-500 rounded-full border-2 border-white shadow-lg"
                                    style={{ left: `${Math.min(progressPercentage, 100)}%`, marginLeft: '-10px' }}
                                />
                            </div>
                        </div>
                        <span className="bg-gray-700 px-4 py-1 rounded text-sm font-medium text-white whitespace-nowrap">
                            {ticketsSold}/{totalTickets} Tickets Sold
                        </span>
                    </div>
                    <p className="text-sm text-gray-400 mt-2">
                        {allTicketsSold
                            ? '✓ All tickets have been sold! You can now select a winner.'
                            : `${totalTickets - ticketsSold} tickets remaining`
                        }
                    </p>
                </div>

                {/* Select Winner Button - Disabled State */}
                {/* {!allTicketsSold && (
                    <div className="text-center mt-6">
                        <button
                            disabled
                            className="bg-gray-600 text-gray-400 cursor-not-allowed opacity-50 px-8 py-2 rounded-lg font-medium"
                        >
                            Select Winner (Disabled)
                        </button>
                        <p className="text-gray-400 text-sm mt-2">
                            Button will be enabled when all {totalTickets} tickets are sold.
                        </p>
                    </div>
                )} */}
                {/* Select Winner Button */}
                <div className="text-center mt-6">
                    <button
                        disabled={!allTicketsSold}
                        onClick={() => {
                            if (allTicketsSold) {
                                // Select a random winner from the users list
                                const randomIndex = Math.floor(Math.random() * users.length);
                                const randomWinner = users[randomIndex];

                                if (window.confirm(`Select ${randomWinner.name} as the winner?`)) {
                                    handleSelectWinner(randomWinner.id);
                                }
                            }
                        }}
                        className={`px-8 py-2 rounded-lg font-medium transition ${allTicketsSold
                                ? 'bg-orange-500 hover:bg-orange-600 text-white cursor-pointer'
                                : 'bg-gray-600 text-gray-400 cursor-not-allowed opacity-50'
                            }`}
                    >
                        {allTicketsSold ? 'Select Random Winner' : 'Select Winner (Disabled)'}
                    </button>
                    <p className="text-gray-400 text-sm mt-2">
                        {allTicketsSold
                            ? 'Click to randomly select a winner from all participants'
                            : `Button will be enabled when all ${totalTickets} tickets are sold.`
                        }
                    </p>
                </div>

            </div>

            {/* Users List Section */}
            <div className="bg-[#282727] rounded-lg border border-gray-700">
                {/* Section Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-700">
                    <h2 className="text-lg font-medium text-white">
                        Users List ({users.length} total users)
                    </h2>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search by name or email"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1); // Reset to first page on search
                            }}
                            className="bg-[#3C3C3C] border border-gray-600 rounded px-3 py-2 pl-10 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 w-64"
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="p-12 text-center text-gray-400">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mb-4"></div>
                        <p>Loading users...</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="p-12 text-center">
                        <p className="text-red-500 mb-4">{error}</p>
                        <button
                            onClick={() => raffleId && fetchRaffleData(raffleId)}
                            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
                        >
                            Retry
                        </button>
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && users.length === 0 && (
                    <div className="p-12 text-center text-gray-400">
                        <p>No users found for this raffle.</p>
                    </div>
                )}

                {/* No Search Results */}
                {!loading && !error && users.length > 0 && filteredUsers.length === 0 && (
                    <div className="p-12 text-center text-gray-400">
                        <p>No users found matching "{searchTerm}"</p>
                    </div>
                )}

                {/* Table */}
                {!loading && !error && filteredUsers.length > 0 && (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-700">
                                    <th className="text-left py-4 px-6 font-medium text-gray-300 text-sm">NO</th>
                                    <th className="text-left py-4 px-6 font-medium text-gray-300 text-sm">Name</th>
                                    <th className="text-left py-4 px-6 font-medium text-gray-300 text-sm">Email</th>
                                    <th className="text-left py-4 px-6 font-medium text-gray-300 text-sm">Tickets</th>
                                    <th className="text-left py-4 px-6 font-medium text-gray-300 text-sm">Ticket ID</th>
                                    <th className="text-left py-4 px-6 font-medium text-gray-300 text-sm">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentUsers.map((user, index) => (
                                    <tr key={user.id} className="border-b border-gray-700 hover:bg-gray-800/30 transition">
                                        <td className="py-4 px-6 text-gray-300 text-sm">{startIndex + index + 1}</td>
                                        <td className="py-4 px-6 text-white text-sm font-medium">{user.name}</td>
                                        <td className="py-4 px-6 text-gray-300 text-sm">{user.email}</td>
                                        <td className="py-4 px-6 text-gray-300 text-sm">
                                            <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded text-xs font-medium">
                                                {user.tracks} tickets
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-gray-300 text-sm font-mono">{user.ticketId}</td>
                                        <td className="py-4 px-6">
                                            <button onClick={handleSelectWinner} className={`px-4 py-2 rounded text-sm font-medium transition bg-orange-500 hover:bg-orange-600 text-white cursor-pointer`}>
                                                Select Winner
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Pagination */}
                {!loading && !error && filteredUsers.length > 0 && (
                    <div className="flex items-center justify-between p-6 border-t border-gray-700">
                        <p className="text-sm text-gray-400">
                            Showing {startIndex + 1} to {Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length} users
                        </p>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                                className="p-2 text-gray-400 hover:text-white rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
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
                                            : 'text-gray-400 hover:text-white hover:bg-gray-700'
                                            }`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}

                            <button
                                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                disabled={currentPage === totalPages}
                                className="p-2 text-gray-400 hover:text-white rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WinnerSelection;