import { useState, useMemo, useEffect } from 'react';
import { Loader2, DollarSign, Clock, CheckCircle, XCircle } from 'lucide-react';
import axiosSecure from '../lib/axiosSecure';

const WithdrawalRequest = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [withdrawalRequests, setWithdrawalRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const itemsPerPage = 10;

  // Fetch withdrawal requests
  const fetchWithdrawals = async () => {
    try {
      setLoading(true);
      const response = await axiosSecure.get('/withdrawal');
        console.log(response.data);
        
      if (response.data.success) {
        setWithdrawalRequests(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching withdrawals:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  // Filter options
  const filterOptions = useMemo(() => [
    { value: 'all', label: 'All Requests', count: withdrawalRequests.length },
    { value: 'pending', label: 'Pending', count: withdrawalRequests.filter(r => r.status === 'pending').length },
    { value: 'processing', label: 'Processing', count: withdrawalRequests.filter(r => r.status === 'processing').length },
    { value: 'approved', label: 'Approved', count: withdrawalRequests.filter(r => r.status === 'approved').length },
    { value: 'rejected', label: 'Rejected', count: withdrawalRequests.filter(r => r.status === 'rejected').length },
  ], [withdrawalRequests]);

  // Compute filtered data
  const filteredRequests = useMemo(() => {
    if (selectedFilter === 'all') return withdrawalRequests;
    return withdrawalRequests.filter(request => request.status === selectedFilter);
  }, [selectedFilter, withdrawalRequests]);

  const paginatedRequests = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredRequests.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredRequests, currentPage]);

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

  // Stats
  const stats = useMemo(() => {
    const totalRequests = withdrawalRequests.length;
    const pendingCount = withdrawalRequests.filter(r => r.status === 'pending').length;
    const totalAmount = withdrawalRequests.reduce((sum, r) => sum + (r.valueUSD || r.amount), 0);
    const approvedAmount = withdrawalRequests
      .filter(r => r.status === 'approved')
      .reduce((sum, r) => sum + (r.valueUSD || r.amount), 0);

    return { totalRequests, pendingCount, totalAmount, approvedAmount };
  }, [withdrawalRequests]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30';
      case 'processing':
        return 'bg-blue-500/20 text-blue-400 border border-blue-500/30';
      case 'approved':
        return 'bg-green-500/20 text-green-400 border border-green-500/30';
      case 'rejected':
        return 'bg-red-500/20 text-red-400 border border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border border-gray-500/30';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock size={14} />;
      case 'processing':
        return <Loader2 size={14} className="animate-spin" />;
      case 'approved':
        return <CheckCircle size={14} />;
      case 'rejected':
        return <XCircle size={14} />;
      default:
        return null;
    }
  };

  const getMethodIcon = (method) => {
    const methodLower = method?.toLowerCase() || '';
    if (methodLower.includes('paypal')) return '💳';
    if (methodLower.includes('bank')) return '🏦';
    if (methodLower.includes('crypto')) return '₿';
    return '💰';
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleAction = async (requestId, action) => {
    try {
      setActionLoading(true);
      
      const endpoint = action === 'Approve' 
        ? `/withdrawal/${requestId}/approve` 
        : `/withdrawal/${requestId}/reject`;
      
      const response = await axiosSecure.patch(endpoint);
      
      if (response.data.success) {
        // Refresh the list
        await fetchWithdrawals();
        setSelectedRequest(null);
        alert(`Request ${action.toLowerCase()}d successfully!`);
      }
    } catch (error) {
      console.error(`Error ${action.toLowerCase()}ing request:`, error);
      alert(`Failed to ${action.toLowerCase()} request. Please try again.`);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin text-yellow-500 mx-auto mb-4" size={48} />
          <p className="text-gray-400">Loading withdrawal requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-6">
      <div>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Withdrawal Requests</h1>
          <p className="text-gray-400">Manage and process user withdrawal requests</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#161616] rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="text-gray-400" size={20} />
              <p className="text-gray-400 text-sm">Total Requests</p>
            </div>
            <p className="text-2xl font-bold">{stats.totalRequests}</p>
          </div>
          <div className="bg-[#161616] rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="text-yellow-500" size={20} />
              <p className="text-gray-400 text-sm">Pending Review</p>
            </div>
            <p className="text-2xl font-bold text-[#FACC15]">{stats.pendingCount}</p>
          </div>
          {/* <div className="bg-[#161616] rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="text-white" size={20} />
              <p className="text-gray-400 text-sm">Total Amount</p>
            </div>
            <p className="text-2xl font-bold text-white">${stats.totalAmount.toLocaleString()}</p>
          </div>
          <div className="bg-[#161616] rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="text-green-400" size={20} />
              <p className="text-gray-400 text-sm">Approved Amount</p>
            </div>
            <p className="text-2xl font-bold text-green-400">${stats.approvedAmount.toLocaleString()}</p>
          </div> */}
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap gap-2 bg-[#161616] rounded-lg p-2 border border-gray-800 mb-6">
          {filterOptions.map(option => (
            <button
              key={option.value}
              onClick={() => {
                setSelectedFilter(option.value);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 text-sm rounded-md transition-all flex items-center gap-2 ${
                selectedFilter === option.value
                  ? 'bg-[#FACC15] text-black font-semibold shadow-lg shadow-[#FACC15]/25'
                  : 'text-gray-400 hover:text-white hover:bg-[#1f1f1f]'
              }`}
            >
              {option.label}
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                selectedFilter === option.value ? 'bg-black/20' : 'bg-gray-700'
              }`}>
                {option.count}
              </span>
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-[#161616] rounded-xl border border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800 bg-[#1a1a1a]">
                  <th className="text-gray-400 py-4 px-6 text-left text-xs uppercase tracking-wider">User</th>
                  <th className="text-gray-400 py-4 px-6 text-left text-xs uppercase tracking-wider">Amount</th>
                  <th className="text-gray-400 py-4 px-6 text-left text-xs uppercase tracking-wider">Method</th>
                  <th className="text-gray-400 py-4 px-6 text-left text-xs uppercase tracking-wider">Status</th>
                  <th className="text-gray-400 py-4 px-6 text-left text-xs uppercase tracking-wider">Date</th>
                  <th className="text-gray-400 py-4 px-6 text-left text-xs uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedRequests.map(request => (
                  <tr key={request._id} className="border-b border-gray-800 hover:bg-[#1f1f1f] transition">
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-medium">{request.userName || request.userId?.userName || 'N/A'}</p>
                        <p className="text-sm text-gray-400">{request.payoutDetails.emailOrAccountId || request.userId?.email || 'N/A'}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-bold text-[#FACC15]">${request.rewardPoint || request.amount}</p>
                        {/* <p className="text-sm text-gray-400">{(request.amount || 0).toLocaleString()} pts</p> */}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{getMethodIcon(request.payoutMethod)}</span>
                        <span className="text-sm">{request.payoutMethod || 'N/A'}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`${getStatusColor(request.status)} px-3 py-1.5 rounded-full text-xs font-bold uppercase inline-flex items-center gap-1`}>
                        {getStatusIcon(request.status)}
                        {request.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-400 text-sm">
                      {new Date(request.requestDate || request.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => setSelectedRequest(request)}
                        className="px-3 py-1.5 bg-[#FACC15] hover:bg-yellow-400 text-black rounded-md text-sm font-medium transition"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty state */}
          {paginatedRequests.length === 0 && (
            <div className="text-center py-10 text-gray-400">
              <DollarSign className="mx-auto mb-3 text-gray-600" size={48} />
              <p>No withdrawal requests found for this filter.</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-800 bg-[#1a1a1a]">
              <div className="text-sm text-gray-400">
                Page {currentPage} of {totalPages} ({filteredRequests.length} total requests)
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                    currentPage === 1
                      ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                      : 'bg-[#FACC15] text-black hover:bg-yellow-400'
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
                      : 'bg-[#FACC15] text-black hover:bg-yellow-400'
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-6 z-50" onClick={() => setSelectedRequest(null)}>
          <div className="bg-[#161616] rounded-xl border border-gray-800 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <div>
                <h2 className="text-2xl font-bold">Withdrawal Request Details</h2>
                <p className="text-gray-400 text-sm mt-1">Request ID: {selectedRequest._id}</p>
              </div>
              <button
                onClick={() => setSelectedRequest(null)}
                className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Status Badge */}
              <div className="flex items-center justify-between">
                <span className={`${getStatusColor(selectedRequest.status)} px-4 py-2 rounded-full text-sm font-bold uppercase inline-flex items-center gap-2`}>
                  {getStatusIcon(selectedRequest.status)}
                  {selectedRequest.status}
                </span>
                <div className="text-right">
                  <p className="text-gray-400 text-sm">Requested</p>
                  <p className="font-medium">{new Date(selectedRequest.requestDate || selectedRequest.createdAt).toLocaleString()}</p>
                </div>
              </div>

              {/* User Info */}
              <div className="bg-[#1f1f1f] rounded-lg p-4 border border-gray-800">
                <h3 className="text-sm font-medium text-gray-400 mb-3">User Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Name:</span>
                    <span className="font-medium">{selectedRequest.userName || selectedRequest.userId?.userName || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Email:</span>
                    <span className="font-medium">{selectedRequest.userEmail || selectedRequest.userId?.email || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">User ID:</span>
                    <span className="font-medium text-gray-500">{selectedRequest.userId?._id || selectedRequest.userId}</span>
                  </div>
                </div>
              </div>

              {/* Amount Info */}
              <div className="bg-[#1f1f1f] rounded-lg p-4 border border-gray-800">
                <h3 className="text-sm font-medium text-gray-400 mb-3">Amount Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Reward Points:</span>
                    <span className="font-bold">{(selectedRequest.amount || 0).toLocaleString()} pts</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">USD Value:</span>
                    <span className="font-bold text-[#FACC15]">${selectedRequest.valueUSD || selectedRequest.amount}</span>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-[#1f1f1f] rounded-lg p-4 border border-gray-800">
                <h3 className="text-sm font-medium text-gray-400 mb-3">Payment Method</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getMethodIcon(selectedRequest.method)}</span>
                    <div>
                      <p className="font-medium">{selectedRequest.method || 'N/A'}</p>
                      <p className="text-sm text-gray-400 break-all">{selectedRequest.accountDetails || 'No details provided'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Processing Info */}
              {selectedRequest.processedDate && (
                <div className="bg-[#1f1f1f] rounded-lg p-4 border border-gray-800">
                  <h3 className="text-sm font-medium text-gray-400 mb-3">Processing Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Processed Date:</span>
                      <span className="font-medium">{new Date(selectedRequest.processedDate).toLocaleString()}</span>
                    </div>
                    {selectedRequest.notes && (
                      <div>
                        <span className="text-gray-400 block mb-1">Notes:</span>
                        <p className="text-sm bg-[#0f0f0f] p-3 rounded border border-gray-800">{selectedRequest.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              {selectedRequest.status === 'pending' && (
                <div className="flex gap-3 pt-4 border-t border-gray-800">
                  <button
                    onClick={() => handleAction(selectedRequest._id, 'Approve')}
                    disabled={actionLoading}
                    className="flex-1 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {actionLoading ? <Loader2 className="animate-spin" size={18} /> : <CheckCircle size={18} />}
                    Approve Request
                  </button>
                  <button
                    onClick={() => handleAction(selectedRequest._id, 'Reject')}
                    disabled={actionLoading}
                    className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {actionLoading ? <Loader2 className="animate-spin" size={18} /> : <XCircle size={18} />}
                    Reject Request
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WithdrawalRequest;