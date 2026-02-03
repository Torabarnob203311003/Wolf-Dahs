const Model = ({
  selectedUser,
  setSelectedUser,
  getStatusBadge,
}) => {
  const getTransactionStatusColor = (status) => {
    switch (status) {
      case "succeeded":
        return "text-green-400";
      case "pending":
        return "text-yellow-400";
      case "failed":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center p-6 z-50"
      onClick={() => setSelectedUser(null)}
    >
      <div
        className="bg-[#161616] rounded-xl border border-gray-800 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div>
            <h2 className="text-2xl font-bold">{selectedUser.userName}</h2>
            <p className="text-gray-400 text-sm mt-1">
              User ID: {selectedUser._id}
            </p>
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
              <h3 className="text-sm font-medium text-gray-400 mb-3">
                Account Balance
              </h3>
              <div className="space-y-2">
                <div>
                  <p className="text-gray-400 text-xs">Credits</p>
                  <p className="text-2xl font-bold text-[#E7B20E]">
                    £{selectedUser.credit}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Reward Points</p>
                  <p className="text-xl font-bold">
                    {selectedUser.rewardPoint} pts
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#1f1f1f] rounded-lg p-4 border border-gray-800">
              <h3 className="text-sm font-medium text-gray-400 mb-3">
                Contact Info
              </h3>
              <div className="space-y-2">
                <div>
                  <p className="text-gray-400 text-xs">Email</p>
                  <p className="text-sm font-medium break-all">
                    {selectedUser.email}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Phone</p>
                  <p className="text-sm font-medium">
                    {selectedUser.phoneNumber}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Last Transaction */}
          {selectedUser.lastTransaction && (
            <div className="bg-[#1f1f1f] rounded-lg p-4 border border-gray-800">
              <h3 className="text-sm font-medium text-gray-400 mb-3">
                Last Transaction
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Transaction ID</span>
                  <span className="font-mono text-sm">
                    {selectedUser.lastTransaction.id}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Amount</span>
                  <span className="font-bold text-[#E7B20E]">
                    £{selectedUser.lastTransaction.amount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Status</span>
                  <span
                    className={`font-medium ${getTransactionStatusColor(selectedUser.lastTransaction.status)}`}
                  >
                    {selectedUser.lastTransaction.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Date</span>
                  <span className="text-sm">
                    {new Date(
                      selectedUser.lastTransaction.date,
                    ).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Transaction History */}
          <div className="bg-[#1f1f1f] rounded-lg p-4 border border-gray-800">
            <h3 className="text-sm font-medium text-gray-400 mb-3">
              Transaction History
            </h3>
            {selectedUser.transactions.length > 0 ? (
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {selectedUser.transactions.map((txn) => (
                  <div
                    key={txn.id}
                    className="bg-[#0f0f0f] rounded p-3 border border-gray-800"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-mono text-xs text-gray-400">
                        {txn.id}
                      </span>
                      <span
                        className={`text-sm font-bold ${getTransactionStatusColor(txn.status)}`}
                      >
                        £{txn.amount.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-500">
                        {txn.type.replace("_", " ")}
                      </span>
                      <span className="text-gray-500">
                        {new Date(txn.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm text-center py-4">
                No transaction history
              </p>
            )}
          </div>

          {/* Account Details */}
          <div className="bg-[#1f1f1f] rounded-lg p-4 border border-gray-800">
            <h3 className="text-sm font-medium text-gray-400 mb-3">
              Account Details
            </h3>
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
                <span
                  className={`${getStatusBadge(selectedUser.isBlocked)} px-2 py-0.5 rounded text-xs font-bold uppercase`}
                >
                  {selectedUser.isBlocked ? "Blocked" : "Active"}
                </span>
              </div>
              <div>
                <p className="text-gray-400">Joined</p>
                <p className="font-medium text-xs">
                  {new Date(selectedUser.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-gray-400">Last Updated</p>
                <p className="font-medium text-xs">
                  {new Date(selectedUser.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Model;
