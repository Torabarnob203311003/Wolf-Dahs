import { useState, useEffect } from "react";
import { Search, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import axiosSecure from "../lib/axiosSecure";
import { ScaleLoader } from "react-spinners";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Delete Modal States
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const itemsPerPage = 10;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axiosSecure.get('/users/get-all-users');

      if (response.data.success && response.data.data) {
        const transformedUsers = response.data.data.map((user, index) => ({
          id: user._id,
          name: user.userName,
          email: user.email,
          tracks: 0,
          ticketId: `#${String(index + 1).padStart(6, '0')}`,
          status: user.isVerified ? 'Confirmed' : 'Pending',
          isBlocked: user.isBlocked,
          isDeleted: user.isDeleted
        }));

        setUsers(transformedUsers);
        setError(null);
      }
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteButtonClick = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;

    setIsDeleting(true);
    try {
      await axiosSecure.put(`/users/delete-user/${userToDelete.id}`);

      console.log('User deleted:', userToDelete.name);

      setUsers(users.filter(user => user.id !== userToDelete.id));

      setShowDeleteModal(false);
      setUserToDelete(null);

      alert('User deleted successfully!');
    } catch (err) {
      console.error('Error deleting user:', err);
      alert('Failed to delete user. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  const getStatusColor = (status) => {
    return status === 'Confirmed'
      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
      : 'bg-red-500/20 text-red-400 border border-red-500/30';
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-white text-2xl font-bold mb-1">User Management</h1>
        <p className="text-gray-400 text-sm">View and manage all registered users</p>
      </div>
      
      <div className="rounded-lg border border-gray-800" style={{ backgroundColor: '#1a1a1a' }}>
        <div className="p-6 border-b border-gray-800">
          {/* Search Bar */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-400">
              Total Users: <span className="text-white font-medium">{filteredUsers.length}</span>
            </div>
            <div className="relative">
              <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-[#121212] border border-gray-800 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/50 text-sm w-80 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="p-12 flex flex-col items-center justify-center">
            <ScaleLoader
              color='#facc15'
              loading={loading}
              cssOverride={{ display: "block", margin: "0 auto" }}
              size={150}
              aria-label="Loading Spinner"
            />
            <p className="text-gray-400 text-sm mt-4">Loading users...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-12 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-500/20 mb-4">
              <span className="text-red-400 text-xl">⚠</span>
            </div>
            <p className="text-red-400 font-medium">{error}</p>
            <button 
              onClick={fetchUsers}
              className="mt-4 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Table */}
        {!loading && !error && (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left py-4 px-6 font-semibold text-gray-400 text-xs uppercase tracking-wider">No</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-400 text-xs uppercase tracking-wider">Name</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-400 text-xs uppercase tracking-wider">Email</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-400 text-xs uppercase tracking-wider">Tracks</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-400 text-xs uppercase tracking-wider">Ticket ID</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-400 text-xs uppercase tracking-wider">Status</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-400 text-xs uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="py-12 text-center text-gray-500">
                        No users found
                      </td>
                    </tr>
                  ) : (
                    currentUsers.map((user, index) => (
                      <tr key={user.id} className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors">
                        <td className="py-4 px-6 text-gray-400 text-sm">{startIndex + index + 1}</td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-black font-semibold text-sm">
                              {user.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-white font-medium text-sm">{user.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-gray-400 text-sm">{user.email}</td>
                        <td className="py-4 px-6 text-gray-300 text-sm font-medium">{user.tracks}</td>
                        <td className="py-4 px-6 text-gray-400 text-sm font-mono">{user.ticketId}</td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <button
                            onClick={() => handleDeleteButtonClick(user)}
                            className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                            title="Delete user"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between p-6 border-t border-gray-800">
                <div className="text-sm text-gray-400">
                  Showing <span className="text-white font-medium">{startIndex + 1}</span> to{' '}
                  <span className="text-white font-medium">{Math.min(endIndex, filteredUsers.length)}</span> of{' '}
                  <span className="text-white font-medium">{filteredUsers.length}</span> users
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`min-w-[36px] h-9 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === i + 1
                          ? 'bg-yellow-500 text-black'
                          : 'text-gray-400 hover:text-white hover:bg-gray-800'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  {totalPages > 5 && (
                    <>
                      <span className="px-2 text-gray-600">...</span>
                      <button
                        onClick={() => setCurrentPage(totalPages)}
                        className={`min-w-[36px] h-9 rounded-lg text-sm font-medium transition-colors ${
                          currentPage === totalPages
                            ? 'bg-yellow-500 text-black'
                            : 'text-gray-400 hover:text-white hover:bg-gray-800'
                        }`}
                      >
                        {totalPages}
                      </button>
                    </>
                  )}

                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        title="Delete User?"
        description={`Are you sure you want to permanently delete the user "${userToDelete?.name}"? This action cannot be undone.`}
        confirmText="Delete User"
        cancelText="Cancel"
        isLoading={isDeleting}
        isDangerous={true}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}

export default UserManagement;