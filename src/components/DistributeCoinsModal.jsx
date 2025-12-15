import { useState, useEffect, useMemo } from 'react';
import { X, Search, Loader2, Coins, CheckCircle, Users, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import axiosSecure from '../lib/axiosSecure';

const DistributeCoinsModal = ({ isOpen, onClose, onSuccess }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [distributing, setDistributing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [coinAmount, setCoinAmount] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectAll, setSelectAll] = useState(false);

  // TODO: API IMPLEMENTATION - Fetch users
  const fetchUsers = async (page = 1, search = '') => {
    try {
      setLoading(true);
      const response = await axiosSecure.get(`/users/get-all-users?page=${page}&searchTerm=${search}`);

      if (response.data.success) {
        setUsers(response.data.data);

        setTotalPages(response.data.meta.totalPages);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchUsers(currentPage, searchTerm);
    }
  }, [isOpen, currentPage]);

  // Debounced search
  useEffect(() => {
    if (!isOpen) return;
    
    const timer = setTimeout(() => {
      setCurrentPage(1);
      fetchUsers(1, searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Filter users based on search (client-side backup)
  const filteredUsers = useMemo(() => {
    if (!searchTerm) return users;
    
    const search = searchTerm.toLowerCase();
    return users.filter(user => 
      user.userName.toLowerCase().includes(search) ||
      user.email.toLowerCase().includes(search) ||
      user.phoneNumber.includes(search)
    );
  }, [users, searchTerm]);

  // Handle select all toggle
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(user => user._id));
    }
    setSelectAll(!selectAll);
  };

  // Handle individual user selection
  const handleUserSelect = (userId) => {
    setSelectedUsers(prev => {
      if (prev.includes(userId)) {
        return prev.filter(id => id !== userId);
      } else {
        return [...prev, userId];
      }
    });
  };

  // TODO: API IMPLEMENTATION - Distribute coins
  const handleDistribute = async () => {
    if (!coinAmount || parseFloat(coinAmount) <= 0) {
      toast.error('Please enter a valid coin amount');
      return;
    }

    if (selectedUsers.length === 0) {
      toast.error('Please select at least one user');
      return;
    }

    try {
      setDistributing(true);

      // TODO: Replace with your actual API endpoint
      const response = await axiosSecure.post('/top-up/distribute-credits', {
        userIds: selectedUsers,
        amount: parseFloat(coinAmount)
      });
      console.log(response);
      
      // Demo: Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast.success(`Successfully distributed ${coinAmount} coins to ${selectedUsers.length} user(s)!`);
      
      // Reset form
      setSelectedUsers([]);
      setCoinAmount('');
      setSelectAll(false);
      
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Distribution error:', error);
      toast.error(error.response?.data?.message || 'Failed to distribute coins');
    } finally {
      setDistributing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#161616] rounded-xl border border-gray-800 max-w-4xl w-full shadow-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-b border-yellow-500/30 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full p-3">
                <Coins className="text-black" size={24} />
              </div>
              <div>
                <h2 className="text-white text-2xl font-bold">Distribute Free Coins</h2>
                <p className="text-gray-400 text-sm">Select users and enter coin amount</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition"
            >
              <X className="text-white" size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Coin Amount Input */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-lg p-5 border border-gray-700">
            <label className="text-white text-sm font-semibold mb-3 block">
              Coin Amount per User
            </label>
            <div className="flex items-center gap-3">
              <Coins className="text-yellow-500" size={24} />
              <input
                type="number"
                min="1"
                value={coinAmount}
                onChange={(e) => setCoinAmount(e.target.value)}
                placeholder="Enter amount (e.g., 100)"
                className="flex-1 bg-black text-white text-xl font-bold px-4 py-3 rounded-lg border border-gray-700 focus:border-yellow-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Search and Select All */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
              <input
                type="text"
                placeholder="Search by name, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-black text-white pl-11 pr-4 py-3 rounded-lg border border-gray-700 focus:border-yellow-500 focus:outline-none"
              />
            </div>
            
            <button
              onClick={handleSelectAll}
              disabled={loading || filteredUsers.length === 0}
              className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                selectAll
                  ? 'bg-yellow-500 text-black hover:bg-yellow-400'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <Users size={20} />
              {selectAll ? 'Deselect All' : 'Select All'}
            </button>
          </div>

          {/* Selected Count */}
          {selectedUsers.length > 0 && (
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="text-blue-400" size={20} />
                <span className="text-blue-400 font-medium">
                  {selectedUsers.length} user{selectedUsers.length !== 1 ? 's' : ''} selected
                </span>
              </div>
              {coinAmount && (
                <span className="text-white font-bold">
                  Total: <span className="text-yellow-500">{selectedUsers.length * parseFloat(coinAmount || 0)}</span> coins
                </span>
              )}
            </div>
          )}

          {/* Users List */}
          <div className="bg-gray-900/50 rounded-lg border border-gray-700">
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <Users size={18} />
                Users ({filteredUsers.length})
              </h3>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="animate-spin text-yellow-500" size={32} />
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <AlertCircle className="text-gray-600 mb-3" size={48} />
                <p className="text-gray-400">No users found</p>
              </div>
            ) : (
              <div className="max-h-96 overflow-y-auto">
                {filteredUsers.map((user) => (
                  <label
                    key={user._id}
                    className="flex items-center gap-4 p-4 hover:bg-gray-800/50 cursor-pointer border-b border-gray-800 last:border-b-0 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user._id)}
                      onChange={() => handleUserSelect(user._id)}
                      className="w-5 h-5 rounded border-gray-600 text-yellow-500 focus:ring-yellow-500 focus:ring-offset-0 cursor-pointer"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center text-black font-bold flex-shrink-0">
                          {user.userName.charAt(0).toUpperCase()}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium truncate">{user.userName}</p>
                          <p className="text-gray-400 text-sm truncate">{user.email}</p>
                        </div>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <p className="text-yellow-500 font-bold">{user.credit}</p>
                      <p className="text-gray-500 text-xs">Current</p>
                    </div>

                    {user.isVerified && (
                      <div className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs font-semibold">
                        ✓ Verified
                      </div>
                    )}
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1 || loading}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition"
              >
                Previous
              </button>
              <span className="text-gray-400 text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages || loading}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition"
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-800 p-6 bg-[#1a1a1a]">
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onClose}
              disabled={distributing}
              className="flex-1 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-semibold transition disabled:opacity-50"
            >
              Cancel
            </button>
            
            <button
              onClick={handleDistribute}
              disabled={distributing || !coinAmount || selectedUsers.length === 0}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {distributing ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Distributing...
                </>
              ) : (
                <>
                  <Coins size={20} />
                  Distribute Coins
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistributeCoinsModal;