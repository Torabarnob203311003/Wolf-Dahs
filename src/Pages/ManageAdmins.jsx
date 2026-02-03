import { useState, useMemo, useEffect } from 'react';
import { Loader2, Mail, Phone, Shield, Award, Ban, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import axiosSecure from '../lib/axiosSecure';

const ManageAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
//   const [selectedAdmin, setSelectedAdmin] = useState(null);
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [actionLoading, setActionLoading] = useState(false);

  // Get current user role from localStorage or auth context
  const currentUserRole = localStorage.getItem('userRole') || 'superadmin'; // TODO: Replace with actual auth
  const isSuperAdmin = currentUserRole === 'superadmin';

  const itemsPerPage = 10;

  // TODO: API IMPLEMENTATION - Fetch admins
  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const response = await axiosSecure.get('/users/get-all-admin');
      if (response.data.success) {
        setAdmins(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching admins:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // Get initials and gradient color for avatar
  const getAvatarGradient = (name) => {
    const colors = [
      'from-blue-500 to-cyan-500',
      'from-purple-500 to-pink-500',
      'from-green-500 to-emerald-500',
      'from-yellow-500 to-orange-500',
      'from-red-500 to-rose-500',
      'from-indigo-500 to-blue-500',
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Search and filter
  const filteredAdmins = useMemo(() => {
    return admins.filter(admin => 
      admin.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.phoneNumber.includes(searchTerm)
    );
  }, [admins, searchTerm]);

  // Pagination
  const paginatedAdmins = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAdmins.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAdmins, currentPage]);

  const totalPages = Math.ceil(filteredAdmins.length / itemsPerPage);

  // Stats
  const stats = useMemo(() => ({
    total: admins.length,
    active: admins.filter(a => !a.isBlocked && !a.isDeleted).length,
    blocked: admins.filter(a => a.isBlocked).length,
    verified: admins.filter(a => a.isVerified).length,
  }), [admins]);

  // TODO: API IMPLEMENTATION - Verify admin (Super Admin Only)
  const handleVerifyAdmin = async (adminId) => {
    if (!isSuperAdmin) {
      toast.error('Only Super Admins can verify administrators');
      return;
    }
    
    try {
      setActionLoading(true);
      const response = await axiosSecure.patch(`/users/update-admin/${adminId}`, { isVerified: !admins.find(a => a._id === adminId).isVerified });
      if (response.data.success) {
        await fetchAdmins();
        toast.success('Admin verified successfully');
      }
    } catch (error) {
      console.error('Error verifying admin:', error);
      toast.success('Failed to verify admin');
    } finally {
      setActionLoading(false);
    }
    
    // Demo: Toggle verify state
    // setAdmins(prev => prev.map(a => 
    //   a._id === adminId ? { ...a, isVerified: !a.isVerified } : a
    // ));
  };

  // TODO: API IMPLEMENTATION - Block admin (Super Admin Only)
  const handleBlockAdmin = async (adminId) => {
    if (!isSuperAdmin) {
      toast.error('Only Super Admins can block/unblock administrators');
      return;
    }
    
    try {
      setActionLoading(true);
      const response = await axiosSecure.patch(`/users/update-admin/${adminId}`, { isBlocked: !admins.find(a => a._id === adminId).isBlocked });
      if (response.data.success) {
        await fetchAdmins();
        toast.success('Admin blocked successfully');
      }
    } catch (error) {
      console.error('Error blocking admin:', error);
      toast.success('Failed to block admin');
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin text-yellow-500 mx-auto mb-4" size={48} />
          <p className="text-gray-400">Loading admins...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Manage Admins</h1>
            <p className="text-gray-400">View and manage administrator accounts</p>
          </div>
          
          {/* Role Badge */}
          <div className={`px-4 py-2 rounded-lg ${
            isSuperAdmin 
              ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black' 
              : 'bg-gray-700 text-gray-300'
          } font-semibold text-sm`}>
            {isSuperAdmin ? '🔑 Super Admin' : '👤 Admin (View Only)'}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#161616] rounded-xl p-6 border border-gray-800 hover:border-yellow-500/30 transition">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="text-yellow-500" size={20} />
            <p className="text-gray-400 text-sm">Total Admins</p>
          </div>
          <p className="text-3xl font-bold">{stats.total}</p>
        </div>

        <div className="bg-[#161616] rounded-xl p-6 border border-gray-800 hover:border-green-500/30 transition">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="text-green-500" size={20} />
            <p className="text-gray-400 text-sm">Active</p>
          </div>
          <p className="text-3xl font-bold text-green-400">{stats.active}</p>
        </div>

        <div className="bg-[#161616] rounded-xl p-6 border border-gray-800 hover:border-red-500/30 transition">
          <div className="flex items-center gap-3 mb-2">
            <Ban className="text-red-500" size={20} />
            <p className="text-gray-400 text-sm">Blocked</p>
          </div>
          <p className="text-3xl font-bold text-red-400">{stats.blocked}</p>
        </div>

        <div className="bg-[#161616] rounded-xl p-6 border border-gray-800 hover:border-blue-500/30 transition">
          <div className="flex items-center gap-3 mb-2">
            <Award className="text-blue-500" size={20} />
            <p className="text-gray-400 text-sm">Verified</p>
          </div>
          <p className="text-3xl font-bold text-blue-400">{stats.verified}</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#161616] rounded-xl border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800 bg-[#1a1a1a]">
                <th className="text-gray-400 py-4 px-6 text-left text-xs uppercase tracking-wider">Admin</th>
                <th className="text-gray-400 py-4 px-6 text-left text-xs uppercase tracking-wider">Contact</th>
                <th className="text-gray-400 py-4 px-6 text-left text-xs uppercase tracking-wider">Status</th>
                <th className="text-gray-400 py-4 px-6 text-left text-xs uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedAdmins.map((admin) => (
                <tr key={admin._id} className="border-b border-gray-800 hover:bg-[#1f1f1f] transition">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getAvatarGradient(admin.userName)} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                        {getInitials(admin.userName)}
                      </div>
                      <div>
                        <p className="font-semibold">{admin.userName}</p>
                        <p className="text-xs text-gray-400">ID: {admin._id.slice(-8)}</p>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail size={14} className="text-gray-500" />
                        <span className="text-gray-300">{admin.email}</span>
                      </div>
                      {admin.phoneNumber && (
                        <div className="flex items-center gap-2 text-sm">
                          <Phone size={14} className="text-gray-500" />
                          <span className="text-gray-300">{admin.phoneNumber}</span>
                        </div>
                      )}
                    </div>
                  </td>

                  <td className="py-4 px-6">
                    <div className="flex flex-col gap-2">
                      {admin.isVerified ? (
                        <span className="bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2 py-1 rounded text-xs font-semibold inline-flex items-center gap-1 w-fit">
                          ✓ Verified
                        </span>
                      ) : (
                        <span className="bg-gray-500/20 text-gray-400 border border-gray-500/30 px-2 py-1 rounded text-xs font-semibold w-fit">
                          Not Verified
                        </span>
                      )}
                      
                      {admin.isBlocked ? (
                        <span className="bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-1 rounded text-xs font-semibold inline-flex items-center gap-1 w-fit">
                          <Ban size={12} /> Blocked
                        </span>
                      ) : (
                        <span className="bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-1 rounded text-xs font-semibold w-fit">
                          Active
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="py-4 px-6">
                    {isSuperAdmin ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleVerifyAdmin(admin._id)}
                          className={`px-3 py-2 rounded-lg transition font-medium text-sm flex items-center gap-2 ${
                            admin.isVerified 
                              ? 'bg-gray-500 hover:bg-gray-600 text-white' 
                              : 'bg-purple-500 hover:bg-purple-600 text-white'
                          }`}
                          title={admin.isVerified ? 'Unverify Admin' : 'Verify Admin'}
                        >
                          <Award size={16} />
                          {admin.isVerified ? 'Unverify' : 'Verify'}
                        </button>
                        
                        <button
                          onClick={() => handleBlockAdmin(admin._id)}
                          className={`px-3 py-2 rounded-lg transition font-medium text-sm flex items-center gap-2 ${
                            admin.isBlocked 
                              ? 'bg-green-500 hover:bg-green-600 text-white' 
                              : 'bg-yellow-500 hover:bg-yellow-600 text-black'
                          }`}
                          title={admin.isBlocked ? 'Unblock Admin' : 'Block Admin'}
                        >
                          <Ban size={16} />
                          {admin.isBlocked ? 'Unblock' : 'Block'}
                        </button>
                        
                        {/* <button
                          onClick={() => handleDeleteAdmin(admin._id)}
                          className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition font-medium text-sm flex items-center gap-2"
                          title="Delete Admin"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button> */}
                      </div>
                    ) : (
                      <div className="text-gray-500 text-sm italic">
                        View Only
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {paginatedAdmins.length === 0 && (
          <div className="text-center py-12">
            <Shield className="mx-auto mb-3 text-gray-600" size={48} />
            <p className="text-gray-400">No admins found</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-800 bg-[#1a1a1a]">
            <div className="text-sm text-gray-400">
              Page {currentPage} of {totalPages} ({filteredAdmins.length} total admins)
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      
    </div>
  );
};

export default ManageAdmins;