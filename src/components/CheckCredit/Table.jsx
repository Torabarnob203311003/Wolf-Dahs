const Table = ({
  paginatedUsers,
  currentPage,
  totalPages,
  handlePageChange,
  getStatusBadge,
  setSelectedUser,
  filteredUsers,
}) => {
  return (
    <div className="bg-[#161616] rounded-xl border border-gray-800 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800 bg-[#1a1a1a]">
              <th className="text-gray-400 py-4 px-6 text-left text-xs uppercase tracking-wider">
                User
              </th>
              <th className="text-gray-400 py-4 px-6 text-left text-xs uppercase tracking-wider">
                Contact
              </th>
              <th className="text-gray-400 py-4 px-6 text-left text-xs uppercase tracking-wider">
                Credits
              </th>
              <th className="text-gray-400 py-4 px-6 text-left text-xs uppercase tracking-wider">
                Last Transaction
              </th>
              <th className="text-gray-400 py-4 px-6 text-left text-xs uppercase tracking-wider">
                Status
              </th>
              <th className="text-gray-400 py-4 px-6 text-left text-xs uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user) => (
              <tr
                key={user._id}
                className="border-b border-gray-800 hover:bg-[#1f1f1f] transition"
              >
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
                    <p className="text-sm text-gray-400">
                      {user.rewardPoint} pts
                    </p>
                  </div>
                </td>
                <td className="py-4 px-6">
                  {user.lastTransaction ? (
                    <div>
                      <p className="text-sm font-medium">
                        £{user.lastTransaction.amount.toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(
                          user.lastTransaction.date,
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No transactions</p>
                  )}
                </td>
                <td className="py-4 px-6">
                  <span
                    className={`${getStatusBadge(user.isBlocked)} px-3 py-1 rounded-full text-xs font-bold uppercase`}
                  >
                    {user.isBlocked ? "Blocked" : "Active"}
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
            Page {currentPage} of {totalPages} ({filteredUsers.length} total
            users)
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                currentPage === 1
                  ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                  : "bg-[#E7B20E] text-black hover:bg-[#e9b005]"
              }`}
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                currentPage === totalPages
                  ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                  : "bg-[#E7B20E] text-black hover:bg-[#e9b005]"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
