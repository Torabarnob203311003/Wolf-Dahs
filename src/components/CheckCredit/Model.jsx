import { useEffect, useState } from "react";
import axiosSecure from "../../lib/axiosSecure";

const Model = ({ selectedUser, setSelectedUser, getStatusBadge }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTransaction = async (userId) => {
    try {
      setLoading(true);
      const res = await axiosSecure.get("/payment-history", {
        params: { userId },
      });

      setTransactions(res?.data?.data || []);
    } catch (err) {
      console.error(err);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedUser?._id) {
      fetchTransaction(selectedUser._id);
    }
  }, [selectedUser]);

  if (!selectedUser) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center p-6 z-50"
      onClick={() => setSelectedUser(null)}
    >
      <div
        className="bg-[#161616] rounded-xl border border-gray-800 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div>
            <h2 className="text-2xl font-bold">{selectedUser.userName}</h2>
            <p className="text-gray-400 text-sm mt-1">
              User ID: {selectedUser._id}
            </p>
          </div>
          <button
            onClick={() => setSelectedUser(null)}
            className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Balance */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#1f1f1f] rounded-lg p-4 border border-gray-800">
              <p className="text-gray-400 text-xs">Credits</p>
              <p className="text-2xl font-bold text-[#E7B20E]">
                £{Number(selectedUser.credit || 0).toFixed(2)}
              </p>
              <p className="text-gray-400 text-xs mt-2">Reward Points</p>
              <p className="text-lg font-bold">{selectedUser.rewardPoint} pts</p>
            </div>

            <div className="bg-[#1f1f1f] rounded-lg p-4 border border-gray-800">
              <p className="text-gray-400 text-xs">Email</p>
              <p className="text-sm break-all">{selectedUser.email}</p>
              <p className="text-gray-400 text-xs mt-2">Phone</p>
              <p className="text-sm">{selectedUser.phoneNumber}</p>
            </div>
          </div>

          {/* Transaction History */}
          <div className="bg-[#1f1f1f] rounded-lg p-4 border border-gray-800">
            <h3 className="text-sm font-medium text-gray-400 mb-3">
              Payment History (Stripe Payments)
            </h3>

            {loading ? (
              <p className="text-gray-500 text-sm text-center py-4">
                Loading transactions...
              </p>
            ) : transactions.length > 0 ? (
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {transactions.map((txn) => (
                  <div
                    key={txn._id}
                    className="bg-[#0f0f0f] rounded p-3 border border-gray-800"
                  >
                    <p className="text-xs text-gray-400 font-mono">
                      DB ID: {txn._id}
                    </p>

                    <p className="text-sm text-white mt-1">
                      Stripe Payment ID
                    </p>
                    <p className="text-xs text-[#E7B20E] font-mono break-all">
                      {txn.payment_id}
                    </p>

                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(txn.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm text-center py-4">
                No payments found
              </p>
            )}
          </div>

          {/* Account Meta */}
          <div className="bg-[#1f1f1f] rounded-lg p-4 border border-gray-800 grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-gray-400">Age</p>
              <p>{selectedUser.age}</p>
            </div>
            <div>
              <p className="text-gray-400">Currency</p>
              <p>{selectedUser.currency}</p>
            </div>
            <div>
              <p className="text-gray-400">Role</p>
              <p className="capitalize">{selectedUser.role}</p>
            </div>
            <div>
              <p className="text-gray-400">Status</p>
              <span
                className={`${getStatusBadge(
                  selectedUser.isBlocked
                )} px-2 py-0.5 rounded text-xs font-bold`}
              >
                {selectedUser.isBlocked ? "Blocked" : "Active"}
              </span>
            </div>
            <div>
              <p className="text-gray-400">Joined</p>
              <p>{new Date(selectedUser.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-gray-400">Updated</p>
              <p>{new Date(selectedUser.updatedAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Model;
