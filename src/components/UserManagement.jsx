// import React, { useState } from "react";
// import { Search, Eye, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

// function UserManagement() {
//   const [users, setUsers] = useState([
//     {
//       id: 1,
//       name: 'Savannah Nguyen',
//       email: 'billiander@example.com',
//       tracks: 30,
//       ticketId: '#000095',
//       status: 'Confirmed'
//     },
//     {
//       id: 2,
//       name: 'Annette Black',
//       email: 'michael.mitc@example.com',
//       tracks: 20,
//       ticketId: '#087423',
//       status: 'Pending'
//     },
//     {
//       id: 3,
//       name: 'Cody Fisher',
//       email: 'felicia.reid@example.com',
//       tracks: 30,
//       ticketId: '#006468',
//       status: 'Confirmed'
//     },
//     {
//       id: 4,
//       name: 'Brooklyn Simmons',
//       email: 'tim.jennings@example.com',
//       tracks: 20,
//       ticketId: '#0000684',
//       status: 'Pending'
//     },
//     {
//       id: 5,
//       name: 'Ralph Edwards',
//       email: 'sara.cruz@example.com',
//       tracks: 10,
//       ticketId: '#006548',
//       status: 'Confirmed'
//     },
//     {
//       id: 6,
//       name: 'Courtney Henry',
//       email: 'jackson@example.com',
//       tracks: 20,
//       ticketId: '#001548',
//       status: 'Pending'
//     },
//     {
//       id: 7,
//       name: 'Bessie Cooper',
//       email: 'dolores@example.com',
//       tracks: 18,
//       ticketId: '#000463',
//       status: 'Confirmed'
//     },
//     {
//       id: 8,
//       name: 'Esther Howard',
//       email: 'curtis.weaver@example.com',
//       tracks: 34,
//       ticketId: '#086956',
//       status: 'Pending'
//     },
//     {
//       id: 9,
//       name: 'Eleanor Pena',
//       email: 'tanya.hill@example.com',
//       tracks: 18,
//       ticketId: '#003454',
//       status: 'Confirmed'
//     },
//     {
//       id: 10,
//       name: 'Cameron Williamson',
//       email: 'nevaeh.simmons@example.com',
//       tracks: 18,
//       ticketId: '#006563',
//       status: 'Pending'
//     }
//   ]);

//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState('');

//   const handleDelete = (userId) => {
//     setUsers(users.filter(user => user.id !== userId));
//   };

//   const handleView = (userId) => {
//     console.log('View user:', userId);
//   };

//   const getStatusColor = (status) => {
//     return status === 'Confirmed' 
//       ? 'bg-green-100 text-green-800' 
//       : 'bg-red-100 text-red-800';
//   };

//   return (
//     <div className="bg-black min-h-screen text-white">
//       <div style={{backgroundColor: '#282727'}} className="rounded-lg mx-4 my-4">
//         {/* Header */}
//         <div className="p-6 border-b border-gray-700">
//           <div className="flex items-center justify-between">
//             <h1 className="text-xl font-medium text-white">Users List</h1>
//             <div className="relative">
//               <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
//               <input
//                 type="text"
//                 placeholder="Search"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="bg-black border border-gray-600 rounded-md pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 text-sm"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Table */}
//         <div style={{backgroundColor: '#282727'}} className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="border-b border-gray-700">
//                 <th className="text-left py-4 px-6 font-medium text-gray-300 text-sm">NO</th>
//                 <th className="text-left py-4 px-6 font-medium text-gray-300 text-sm">Name</th>
//                 <th className="text-left py-4 px-6 font-medium text-gray-300 text-sm">Email</th>
//                 <th className="text-left py-4 px-6 font-medium text-gray-300 text-sm">Tracks</th>
//                 <th className="text-left py-4 px-6 font-medium text-gray-300 text-sm">Ticket ID</th>
//                 <th className="text-left py-4 px-6 font-medium text-gray-300 text-sm">Status</th>
//                 <th className="text-left py-4 px-6 font-medium text-gray-300 text-sm">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map((user, index) => (
//                 <tr key={user.id} className="border-b border-gray-700 hover:bg-gray-800/30">
//                   <td className="py-4 px-6 text-gray-300 text-sm">{index + 1}</td>
//                   <td className="py-4 px-6 text-white text-sm font-medium">{user.name}</td>
//                   <td className="py-4 px-6 text-gray-300 text-sm">{user.email}</td>
//                   <td className="py-4 px-6 text-gray-300 text-sm">{user.tracks}</td>
//                   <td className="py-4 px-6 text-gray-300 text-sm">{user.ticketId}</td>
//                   <td className="py-4 px-6">
//                     <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
//                       {user.status}
//                     </span>
//                   </td>
//                   <td className="py-4 px-6">
//                     <div className="flex items-center gap-2">
//                       <button
//                         onClick={() => handleView(user.id)}
//                         className="p-2 text-yellow-400 hover:text-yellow-300 hover:bg-black rounded-lg transition-colors"
//                         title="View user"
//                       >
//                         <Eye className="w-4 h-4" />
//                       </button>
//                       <button
//                         onClick={() => handleDelete(user.id)}
//                         className="p-2 text-red-400 hover:text-red-300 hover:bg-black rounded-lg transition-colors"
//                         title="Delete user"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         <div className="flex items-center justify-between p-6 border-t border-gray-700">
//           <div className="flex items-center gap-2">
//             <button className="p-2 text-gray-400 hover:text-white hover:bg-black rounded transition-colors">
//               <ChevronLeft className="w-4 h-4" />
//             </button>
//             <button className="px-3 py-1 bg-yellow-400 text-black rounded text-sm font-medium">
//               1
//             </button>
//             <button className="px-3 py-1 text-gray-300 hover:text-white hover:bg-black rounded text-sm">
//               2
//             </button>
//             <button className="px-3 py-1 text-gray-300 hover:text-white hover:bg-black rounded text-sm">
//               3
//             </button>
//             <span className="px-2 text-gray-400">...</span>
//             <button className="px-3 py-1 text-gray-300 hover:text-white hover:bg-black rounded text-sm">
//               440
//             </button>
//             <button className="p-2 text-gray-400 hover:text-white hover:bg-black rounded transition-colors">
//               <ChevronRight className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UserManagement;


import { useState, useEffect } from "react";
import { Search, Eye, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import axiosSecure from "../lib/axiosSecure";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleDelete = async (userId) => {
    try {
      // Optional: Add API call to delete user from backend
      // await axiosSecure.delete(`/users/${userId}`);
      setUsers(users.filter(user => user.id !== userId));
    } catch (err) {
      console.error('Error deleting user:', err);
      setError('Failed to delete user');
    }
  };

  const handleView = (userId) => {
    console.log('View user:', userId);
  };

  const getStatusColor = (status) => {
    return status === 'Confirmed'
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800';
  };

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  return (
    <div className="bg-black min-h-screen text-white">
      <div style={{ backgroundColor: '#282727' }} className="rounded-lg mx-4 my-4">
        {/* Header */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-medium text-white">Users List</h1>
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-black border border-gray-600 rounded-md pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="p-6 text-center text-gray-400">
            <p>Loading users...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-6 text-center text-red-500">
            <p>{error}</p>
          </div>
        )}

        {/* Table */}
        {!loading && !error && (
          <div style={{ backgroundColor: '#282727' }} className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-4 px-6 font-medium text-gray-300 text-sm">NO</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-300 text-sm">Name</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-300 text-sm">Email</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-300 text-sm">Tracks</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-300 text-sm">Ticket ID</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-300 text-sm">Status</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-300 text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user, index) => (
                  <tr key={user.id} className="border-b border-gray-700 hover:bg-gray-800/30">
                    <td className="py-4 px-6 text-gray-300 text-sm">{startIndex + index + 1}</td>
                    <td className="py-4 px-6 text-white text-sm font-medium">{user.name}</td>
                    <td className="py-4 px-6 text-gray-300 text-sm">{user.email}</td>
                    <td className="py-4 px-6 text-gray-300 text-sm">{user.tracks}</td>
                    <td className="py-4 px-6 text-gray-300 text-sm">{user.ticketId}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleView(user.id)}
                          className="p-2 text-yellow-400 hover:text-yellow-300 hover:bg-black rounded-lg transition-colors"
                          title="View user"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="p-2 text-red-400 hover:text-red-300 hover:bg-black rounded-lg transition-colors"
                          title="Delete user"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && (
          <div className="flex items-center justify-between p-6 border-t border-gray-700">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 text-gray-400 hover:text-white hover:bg-black rounded transition-colors disabled:opacity-50"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded text-sm font-medium ${currentPage === i + 1
                    ? 'bg-yellow-400 text-black'
                    : 'text-gray-300 hover:text-white hover:bg-black'
                    }`}
                >
                  {i + 1}
                </button>
              ))}

              {totalPages > 5 && (
                <>
                  <span className="px-2 text-gray-400">...</span>
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    className={`px-3 py-1 rounded text-sm font-medium ${currentPage === totalPages
                      ? 'bg-yellow-400 text-black'
                      : 'text-gray-300 hover:text-white hover:bg-black'
                      }`}
                  >
                    {totalPages}
                  </button>
                </>
              )}

              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2 text-gray-400 hover:text-white hover:bg-black rounded transition-colors disabled:opacity-50"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserManagement;