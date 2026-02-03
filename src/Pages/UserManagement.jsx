import { useState, useEffect } from "react";
import { Search, Trash2, ChevronLeft, ChevronRight, CheckCircle, XCircle } from 'lucide-react';
import axiosSecure from "../lib/axiosSecure";
import { ScaleLoader } from "react-spinners";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import DistributeCoinsModal from "../components/DistributeCoinsModal";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  // const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);



  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const itemsPerPage = 10;

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

const fetchUsers = async (page = 1) => {
  try {
    setLoading(true);
    const response = await axiosSecure.get(`/users/get-all-users?page=${page}&limit=${itemsPerPage}`);

    if (response.data.success && response.data.data) {
      const transformedUsers = response.data.data.map((user) => ({
        id: user._id,
        name: user.userName,
        email: user.email,
        age: user.age,
        tracks: 0,
        ticketId: user._id,
        status: user.isVerified ? 'Confirmed' : 'Pending',
        isBlocked: user.isBlocked,
        isDeleted: user.isDeleted
      }));

      setUsers(transformedUsers);

      if (response.data.meta) {
        setTotalPages(response.data.meta.totalPages);
        setTotalUsers(response.data.meta.total);
      }

      setError(null);
    }
    } catch (err) {
    console.error('Error fetching users:', err);
    setError('Failed to fetch users');
  } finally {
    setLoading(false);
  }
};

const handleVerify = async (user) => {
  try {
    const res = await axiosSecure.patch(`/users/verify-user/${user.id}`, 
      {
        isVerified: true
      }
    );

    if (res.data.success) {
      toast.success(`${user.name} is now verified`);
      fetchUsers(currentPage);
    }
  } catch (err) {
    console.error(err);
    toast.error("Failed to verify user");
  }
};

const handleUnverify = async (user) => {
  try {
    const res = await axiosSecure.patch(`/users/verify-user/${user.id}`, {
      isVerified: false
    });

    if (res.data.success) {
      toast.success(`${user.name} has been unverified`);
      fetchUsers(currentPage);
    }
  } catch (err) {
    console.error(err);
    toast.error("Failed to unverify user");
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
      fetchUsers(currentPage);
      setShowDeleteModal(false);
      setUserToDelete(null);
      toast.success('User deleted successfully!');
    } catch (err) {
      console.error('Error deleting user:', err);
      toast.error('Failed to delete user. Please try again.');
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

  const startIndex = (currentPage - 1) * itemsPerPage;

  const getPaginationRange = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }

    let prev = 0;
    for (let i of range) {
      if (prev !== 0 && i - prev !== 1) {
        rangeWithDots.push('...');
      }
      rangeWithDots.push(i);
      prev = i;
    }

    return rangeWithDots;
  };

  return (
    <div className="p-6">

      <div className="flex items-start justify-between">
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-white text-2xl font-bold mb-1">User Management</h1>
          <p className="text-gray-400 text-sm">View and manage all registered users</p>
        </div>
        

      <div className="flex gap-4">
        <NavLink to={'/manage-user-credit'} className="font-semibold px-3 py-3 text-xs rounded-lg bg-yellow-500 hover:bg-yellow-600 text-black transition">
          Manage User Credits
        </NavLink>
        {/* DISTRIBUTE */}
        <button  className="font-semibold px-3 py-3 text-xs rounded-lg bg-yellow-500 hover:bg-yellow-600 text-black transition" onClick={() => setShowModal(true)}>
          Distribute Coins
        </button>
      </div>
      </div>

      <div className="rounded-lg border border-gray-800" style={{ backgroundColor: '#1a1a1a' }}>
        <div className="p-6 border-b border-gray-800">

          {/* SEARCH */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-400">
              Total Users: <span className="text-white font-medium">{totalUsers}</span>
            </div>
            {/* 
             */}
          </div>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="p-12 flex flex-col items-center justify-center">
            <ScaleLoader color="#facc15" />
            <p className="text-gray-400 text-sm mt-4">Loading users...</p>
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="p-12 text-center">
            <p className="text-red-400 font-medium">{error}</p>
            <button
              onClick={() => fetchUsers(currentPage)}
              className="mt-4 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* TABLE */}
        {!loading && !error && (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left py-4 px-6 text-gray-400 text-xs uppercase">No</th>
                    <th className="text-left py-4 px-6 text-gray-400 text-xs uppercase">Name</th>
                    <th className="text-left py-4 px-6 text-gray-400 text-xs uppercase">Email</th>
                    <th className="text-left py-4 px-6 text-gray-400 text-xs uppercase">Age</th>
                    <th className="text-left py-4 px-6 text-gray-400 text-xs uppercase">User ID</th>
                    <th className="text-left py-4 px-6 text-gray-400 text-xs uppercase">Status</th>
                    <th className="text-left py-4 px-6 text-gray-400 text-xs uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="py-12 text-center text-gray-500">No users found</td>
                    </tr>
                  ) : (
                    users.map((user, index) => (
                      <tr key={user.id} className="border-b border-gray-800 hover:bg-gray-900/50">
                        <td className="py-4 px-6 text-gray-400">{startIndex + index + 1}</td>

                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-black font-semibold text-sm">
                              {user.name[0].toUpperCase()}
                            </div>
                            <span className="text-white text-sm">{user.name}</span>
                          </div>
                        </td>

                        <td className="py-4 px-6 text-gray-400">{user.email}</td>
                        <td className="py-4 px-6 text-gray-400">{user.age ? user.age : 'N/A'}</td>
                        <td className="py-4 px-6 text-gray-400 font-mono">{user.ticketId}</td>

                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                            {user.status}
                          </span>
                        </td>

                        {/* ACTION BUTTONS */}
                        <td className="py-4 px-6 flex items-center gap-2">
                          {/* VERIFY / UNVERIFY BUTTON */}
                          {user.status === "Pending" ? (
                            <button
                              onClick={() => handleVerify(user)}
                              className="px-3 py-1.5 text-xs rounded-lg bg-green-600 hover:bg-green-700 text-white transition"
                            >
                              Verify
                            </button>
                          ) : (
                            <button
                              onClick={() => handleUnverify(user)}
                              className="px-3 py-1.5 text-xs rounded-lg bg-yellow-500 hover:bg-yellow-600 text-black transition"
                            >
                              Unverify
                            </button>
                          )}

                          {/* DELETE BUTTON */}
                          <button
                            onClick={() => handleDeleteButtonClick(user)}
                            className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
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

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between p-6 border-t border-gray-800">
                <div className="text-sm text-gray-400">
                  Showing <span className="text-white">{startIndex + 1}</span> to{' '}
                  <span className="text-white">{Math.min(startIndex + users.length, startIndex + itemsPerPage)}</span> of{' '}
                  <span className="text-white">{totalUsers}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="p-2 text-gray-400 hover:text-white rounded-lg disabled:opacity-30"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {getPaginationRange().map((page, index) =>
                    page === "..." ? (
                      <span key={index} className="px-2 text-gray-600">...</span>
                    ) : (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`min-w-[36px] h-9 rounded-lg text-sm font-medium ${
                          currentPage === page ? "bg-yellow-500 text-black" : "text-gray-400 hover:text-white hover:bg-gray-800"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}

                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 text-gray-400 hover:text-white rounded-lg disabled:opacity-30"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* DELETE MODAL */}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        title="Delete User?"
        description={`Are you sure you want to delete "${userToDelete?.name}"? This cannot be undone.`}
        confirmText="Delete User"
        cancelText="Cancel"
        isLoading={isDeleting}
        isDangerous={true}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

      <DistributeCoinsModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={() => {
          window.location.reload();
        }}
      />
    </div>
  );
}

export default UserManagement;