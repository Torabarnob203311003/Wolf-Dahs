import { useState, useMemo } from 'react';

const CheckCredit = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  const itemsPerPage = 10;

  // Mock users data based on your API
  const users = [
    {
      _id: '6981e2d31462d395b85987b8',
      userName: 'Benillingworth',
      email: 'benillingworth@ymail.com',
      phoneNumber: '+447927725654',
      role: 'user',
      isBlocked: false,
      credit: 0,
      rewardPoint: 0,
      currency: 'GBP',
      age: '31',
      createdAt: '2026-02-03T11:58:11.685Z',
      updatedAt: '2026-02-03T12:02:41.895Z',
      lastTransaction: {
        id: 'pi_3QYtXNLkJqmrHhZp0r0RKVLg',
        amount: 50.00,
        status: 'succeeded',
        date: '2026-02-03T10:30:00.000Z',
        type: 'credit_purchase',
      },
      transactions: [
        { id: 'pi_3QYtXNLkJqmrHhZp0r0RKVLg', amount: 50.00, type: 'credit_purchase', status: 'succeeded', date: '2026-02-03T10:30:00.000Z' },
        { id: 'pi_3QYtXNLkJqmrHhZp0r0RKVLh', amount: 20.00, type: 'credit_purchase', status: 'succeeded', date: '2026-02-02T14:20:00.000Z' },
      ],
    },
    {
      _id: '6980e0fe30e5e600c1fb54e7',
      userName: 'BoroDave72',
      email: 'davidmark.g76.dg65@gmail.com',
      phoneNumber: '7912692500',
      role: 'user',
      isBlocked: false,
      credit: 0,
      rewardPoint: 0,
      currency: 'GBP',
      age: '53',
      createdAt: '2026-02-02T17:38:06.905Z',
      updatedAt: '2026-02-02T17:56:38.812Z',
      lastTransaction: null,
      transactions: [],
    },
    {
      _id: '697fc1e630e5e600c1fb5365',
      userName: 'RyanParker03',
      email: 'ryanjparker03@hotmail.com',
      phoneNumber: '7777357092',
      role: 'user',
      isBlocked: false,
      credit: 2,
      rewardPoint: 0,
      currency: 'GBP',
      age: '22',
      createdAt: '2026-02-01T21:13:10.307Z',
      updatedAt: '2026-02-01T21:18:21.629Z',
      lastTransaction: {
        id: 'pi_3QYtXNLkJqmrHhZp0r0RKVLi',
        amount: 10.00,
        status: 'succeeded',
        date: '2026-02-01T20:00:00.000Z',
        type: 'credit_purchase',
      },
      transactions: [
        { id: 'pi_3QYtXNLkJqmrHhZp0r0RKVLi', amount: 10.00, type: 'credit_purchase', status: 'succeeded', date: '2026-02-01T20:00:00.000Z' },
      ],
    },
    {
      _id: '697a62c430e5e600c1fb4c5b',
      userName: 'MK2GAZ',
      email: 'pallasaccess@gmail.com',
      phoneNumber: '+447752650606',
      role: 'user',
      isBlocked: false,
      credit: 80,
      rewardPoint: 0,
      currency: 'GBP',
      age: '38',
      createdAt: '2026-01-28T19:25:56.895Z',
      updatedAt: '2026-01-28T19:27:46.065Z',
      lastTransaction: {
        id: 'pi_3QYtXNLkJqmrHhZp0r0RKVLj',
        amount: 100.00,
        status: 'succeeded',
        date: '2026-01-28T19:00:00.000Z',
        type: 'credit_purchase',
      },
      transactions: [
        { id: 'pi_3QYtXNLkJqmrHhZp0r0RKVLj', amount: 100.00, type: 'credit_purchase', status: 'succeeded', date: '2026-01-28T19:00:00.000Z' },
        { id: 'pi_3QYtXNLkJqmrHhZp0r0RKVLk', amount: 50.00, type: 'credit_purchase', status: 'succeeded', date: '2026-01-27T15:00:00.000Z' },
      ],
    },
    {
      _id: '6979262330e5e600c1fb4b21',
      userName: 'Laura lawton',
      email: 'lawton.laura@icloud.com',
      phoneNumber: '7728808301',
      role: 'user',
      isBlocked: false,
      credit: 100,
      rewardPoint: 0,
      currency: 'GBP',
      age: '32',
      createdAt: '2026-01-27T20:54:59.197Z',
      updatedAt: '2026-01-27T21:39:31.375Z',
      lastTransaction: {
        id: 'pi_3QYtXNLkJqmrHhZp0r0RKVLl',
        amount: 100.00,
        status: 'succeeded',
        date: '2026-01-27T21:00:00.000Z',
        type: 'credit_purchase',
      },
      transactions: [
        { id: 'pi_3QYtXNLkJqmrHhZp0r0RKVLl', amount: 100.00, type: 'credit_purchase', status: 'succeeded', date: '2026-01-27T21:00:00.000Z' },
      ],
    },
  ];

  // Filter options
  const filterOptions = [
    { value: 'all', label: 'All Users', count: users.length },
    { value: 'active', label: 'Active', count: users.filter(u => !u.isBlocked).length },
    { value: 'blocked', label: 'Blocked', count: users.filter(u => u.isBlocked).length },
    { value: 'with_credits', label: 'Has Credits', count: users.filter(u => u.credit > 0).length },
  ];

  // Compute filtered data
  const filteredUsers = useMemo(() => {
    let filtered = users;

    // Apply status filter
    switch (selectedFilter) {
      case 'active':
        filtered = filtered.filter(u => !u.isBlocked);
        break;
      case 'blocked':
        filtered = filtered.filter(u => u.isBlocked);
        break;
      case 'with_credits':
        filtered = filtered.filter(u => u.credit > 0);
        break;
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(u =>
        u.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.phoneNumber.includes(searchQuery)
      );
    }

    return filtered;
  }, [selectedFilter, searchQuery]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredUsers, currentPage]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // Stats
  const stats = useMemo(() => {
    const totalUsers = users.length;
    const activeUsers = users.filter(u => !u.isBlocked).length;
    const totalCredits = users.reduce((sum, u) => sum + u.credit, 0);
    const totalRewardPoints = users.reduce((sum, u) => sum + u.rewardPoint, 0);

    return { totalUsers, activeUsers, totalCredits, totalRewardPoints };
  }, []);

  const getStatusBadge = (isBlocked) => {
    return isBlocked
      ? 'bg-red-500/20 text-red-400 border border-red-500/30'
      : 'bg-green-500/20 text-green-400 border border-green-500/30';
  };

  const getTransactionStatusColor = (status) => {
    switch (status) {
      case 'succeeded':
        return 'text-green-400';
      case 'pending':
        return 'text-yellow-400';
      case 'failed':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">User Management</h1>
          <p className="text-gray-400">Monitor user activity, transactions, and credits</p>
        </div>

       

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-[#161616] border border-gray-800 rounded-lg px-4 py-3 pl-12 text-white placeholder-gray-500 focus:outline-none focus:border-[#E7B20E] focus:ring-2 focus:ring-[#E7B20E]/20 transition"
            />
            <svg className="w-5 h-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Table */}
        <div className="bg-[#161616] rounded-xl border border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800 bg-[#1a1a1a]">
                  <th className="text-gray-400 py-4 px-6 text-left text-xs uppercase tracking-wider">User</th>
                  <th className="text-gray-400 py-4 px-6 text-left text-xs uppercase tracking-wider">Contact</th>
                  <th className="text-gray-400 py-4 px-6 text-left text-xs uppercase tracking-wider">Credits</th>
                  <th className="text-gray-400 py-4 px-6 text-left text-xs uppercase tracking-wider">Last Transaction</th>
                  <th className="text-gray-400 py-4 px-6 text-left text-xs uppercase tracking-wider">Status</th>
                  <th className="text-gray-400 py-4 px-6 text-left text-xs uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map(user => (
                  <tr key={user._id} className="border-b border-gray-800 hover:bg-[#1f1f1f] transition">
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-medium">{user.userName}</p>
                        <p className="text-sm text-gray-400">Age: {user.age}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <p className="text-sm">{user.email}</p>
                        <p className="text-sm text-gray-400">{user.phoneNumber}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-bold text-[#E7B20E]">£{user.credit}</p>
                        <p className="text-sm text-gray-400">{user.rewardPoint} pts</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      {user.lastTransaction ? (
                        <div>
                          <p className="text-sm font-medium">£{user.lastTransaction.amount.toFixed(2)}</p>
                          <p className="text-xs text-gray-400">{new Date(user.lastTransaction.date).toLocaleDateString()}</p>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">No transactions</p>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`${getStatusBadge(user.isBlocked)} px-3 py-1 rounded-full text-xs font-bold uppercase`}>
                        {user.isBlocked ? 'Blocked' : 'Active'}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="px-3 py-1.5 bg-[#E7B20E] hover:bg-[#e9b005] text-black rounded-md text-sm font-medium transition"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty state */}
          {paginatedUsers.length === 0 && (
            <div className="text-center py-10 text-gray-400">
              No users found matching your criteria.
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-800 bg-[#1a1a1a]">
              <div className="text-sm text-gray-400">
                Page {currentPage} of {totalPages} ({filteredUsers.length} total users)
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                    currentPage === 1
                      ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                      : 'bg-[#E7B20E] text-black hover:bg-[#e9b005]'
                  }`}
                >
                  Previous
                </button>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                    currentPage === totalPages
                      ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                      : 'bg-[#E7B20E] text-black hover:bg-[#e9b005]'
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* User Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-6 z-50" onClick={() => setSelectedUser(null)}>
          <div className="bg-[#161616] rounded-xl border border-gray-800 max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <div>
                <h2 className="text-2xl font-bold">{selectedUser.userName}</h2>
                <p className="text-gray-400 text-sm mt-1">User ID: {selectedUser._id}</p>
              </div>
              <button
                onClick={() => setSelectedUser(null)}
                className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* User Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#1f1f1f] rounded-lg p-4 border border-gray-800">
                  <h3 className="text-sm font-medium text-gray-400 mb-3">Account Balance</h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-gray-400 text-xs">Credits</p>
                      <p className="text-2xl font-bold text-[#E7B20E]">£{selectedUser.credit}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Reward Points</p>
                      <p className="text-xl font-bold">{selectedUser.rewardPoint} pts</p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#1f1f1f] rounded-lg p-4 border border-gray-800">
                  <h3 className="text-sm font-medium text-gray-400 mb-3">Contact Info</h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-gray-400 text-xs">Email</p>
                      <p className="text-sm font-medium break-all">{selectedUser.email}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Phone</p>
                      <p className="text-sm font-medium">{selectedUser.phoneNumber}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Last Transaction */}
              {selectedUser.lastTransaction && (
                <div className="bg-[#1f1f1f] rounded-lg p-4 border border-gray-800">
                  <h3 className="text-sm font-medium text-gray-400 mb-3">Last Transaction</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-sm">Transaction ID</span>
                      <span className="font-mono text-sm">{selectedUser.lastTransaction.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-sm">Amount</span>
                      <span className="font-bold text-[#E7B20E]">£{selectedUser.lastTransaction.amount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-sm">Status</span>
                      <span className={`font-medium ${getTransactionStatusColor(selectedUser.lastTransaction.status)}`}>
                        {selectedUser.lastTransaction.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-sm">Date</span>
                      <span className="text-sm">{new Date(selectedUser.lastTransaction.date).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Transaction History */}
              <div className="bg-[#1f1f1f] rounded-lg p-4 border border-gray-800">
                <h3 className="text-sm font-medium text-gray-400 mb-3">Transaction History</h3>
                {selectedUser.transactions.length > 0 ? (
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {selectedUser.transactions.map((txn) => (
                      <div key={txn.id} className="bg-[#0f0f0f] rounded p-3 border border-gray-800">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-mono text-xs text-gray-400">{txn.id}</span>
                          <span className={`text-sm font-bold ${getTransactionStatusColor(txn.status)}`}>
                            £{txn.amount.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-500">{txn.type.replace('_', ' ')}</span>
                          <span className="text-gray-500">{new Date(txn.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm text-center py-4">No transaction history</p>
                )}
              </div>

              {/* Account Details */}
              <div className="bg-[#1f1f1f] rounded-lg p-4 border border-gray-800">
                <h3 className="text-sm font-medium text-gray-400 mb-3">Account Details</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-400">Age</p>
                    <p className="font-medium">{selectedUser.age} years</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Currency</p>
                    <p className="font-medium">{selectedUser.currency}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Role</p>
                    <p className="font-medium capitalize">{selectedUser.role}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Status</p>
                    <span className={`${getStatusBadge(selectedUser.isBlocked)} px-2 py-0.5 rounded text-xs font-bold uppercase`}>
                      {selectedUser.isBlocked ? 'Blocked' : 'Active'}
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-400">Joined</p>
                    <p className="font-medium text-xs">{new Date(selectedUser.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Last Updated</p>
                    <p className="font-medium text-xs">{new Date(selectedUser.updatedAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckCredit;