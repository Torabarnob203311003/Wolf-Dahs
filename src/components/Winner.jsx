// import React, { useEffect, useState } from "react";
// import { Search, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
// import axiosSecure from "../lib/axiosSecure";

// function Winner() {
//   const [cards, setCards] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');

//   const getStatusColor = (status) => {
//     return status === true
//       ? 'bg-green-600 text-white'
//       : 'bg-red-600 text-white';
//   };

//   const handleView = (id) => {
//     console.log(id);
//     window.location.href = `/winner-selection?raffleId=${id}`
//   }

//   async function fetchRaffles() {
//     try {
//       const response = await axiosSecure.get('/raffles/get-all-raffle');
//       setCards(response.data.data);
//       console.log(response.data.data);

//     } catch (err) {
//       console.log(err);
//     }
//   }

//   useEffect(() => {
//     fetchRaffles();
//   }, [])

//   return (
//     <div className="bg-black min-h-screen text-white">
//       <div style={{ backgroundColor: '#282727' }} className="mx-4 my-4">
//         {/* Header with blue border */}
//         <div className="p-6 border-b-2 border-blue-500">
//           <div className="flex items-center justify-between">
//             <h1 className="text-xl font-medium text-white">Winner Selection Management</h1>
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
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="border-b border-gray-700">
//                 <th className="text-left py-4 px-6 font-medium text-gray-300 text-sm">NO</th>
//                 <th className="text-left py-4 px-6 font-medium text-gray-300 text-sm">Card name</th>
//                 <th className="text-left py-4 px-6 font-medium text-gray-300 text-sm">Prize amount</th>
//                 <th className="text-left py-4 px-6 font-medium text-gray-300 text-sm">Total ticket limit</th>
//                 <th className="text-left py-4 px-6 font-medium text-gray-300 text-sm">User ticket limit</th>
//                 <th className="text-left py-4 px-6 font-medium text-gray-300 text-sm">Ticket Sold</th>
//                 <th className="text-left py-4 px-6 font-medium text-gray-300 text-sm">Status</th>
//                 <th className="text-left py-4 px-6 font-medium text-gray-300 text-sm">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {cards.map((card, index) => (
//                 <tr key={card._id} className="border-b border-gray-700 hover:bg-gray-800/30">
//                   <td className="py-4 px-6 text-gray-300 text-sm">{index + 1}</td>
//                   <td className="py-4 px-6">
//                     <div className="flex items-center gap-3">
//                       <img
//                         src={card.thumbnail}
//                         alt={card.title}
//                         className="w-10 h-10 rounded object-cover"
//                       />
//                       <span className="text-white text-sm font-medium">{card.title}</span>
//                     </div>
//                   </td>
//                   <td className="py-4 px-6 text-gray-300 text-sm">{card.price}</td>
//                   <td className="py-4 px-6 text-gray-300 text-sm">{card.totalTicket}</td>
//                   <td className="py-4 px-6 text-gray-300 text-sm">{card.perUserTicketLimit}</td>
//                   <td className="py-4 px-6 text-gray-300 text-sm">{card.ticketSold}</td>
//                   <td className="py-4 px-6">
//                     <span className={`inline-flex items-center px-3 py-1 rounded text-xs font-medium ${getStatusColor(card.status)}`}>
//                       {card.status === true ? 'Active' : 'Inactive'}
//                     </span>
//                   </td>
//                   <td className="py-4 px-6">
//                     <button onClick={() => handleView(card._id)} className="bg-sky-200 hover:bg-blue-700 hover:text-white text-blue-800 px-4 py-1.5 rounded text-sm font-medium transition-colors">
//                       View Details
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination with blue border */}
//         <div className="flex items-center justify-between p-6 border-t-2 border-blue-500">
//           <div className="flex items-center gap-2">
//             <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-600 rounded transition-colors">
//               <ChevronLeft className="w-4 h-4" />
//             </button>
//             <button className="px-3 py-1 bg-yellow-400 text-black rounded text-sm font-medium">
//               1
//             </button>
//             <button className="px-3 py-1 text-gray-300 hover:text-white hover:bg-gray-600 rounded text-sm">
//               2
//             </button>
//             <button className="px-3 py-1 text-gray-300 hover:text-white hover:bg-gray-600 rounded text-sm">
//               3
//             </button>
//             <span className="px-2 text-gray-400">...</span>
//             <button className="px-3 py-1 text-gray-300 hover:text-white hover:bg-gray-600 rounded text-sm">
//               440
//             </button>
//             <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-600 rounded transition-colors">
//               <ChevronRight className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Winner;


import React, { useEffect, useState } from "react";
import { Search, ChevronLeft, ChevronRight, Trophy, Ticket, DollarSign, Users } from 'lucide-react';
import axiosSecure from "../lib/axiosSecure";
import { ScaleLoader } from "react-spinners";

function Winner() {
  const [cards, setCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const itemsPerPage = 10;

  const getStatusColor = (status) => {
    return status === true
      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
      : 'bg-red-500/20 text-red-400 border border-red-500/30';
  };

  const handleView = (id) => {
    window.location.href = `/winner-selection?raffleId=${id}`;
  };

  async function fetchRaffles() {
    try {
      setLoading(true);
      const response = await axiosSecure.get('/raffles/get-all-raffle');
      setCards(response.data.data);
      setError(null);
    } catch (err) {
      console.log(err);
      setError('Failed to fetch raffles');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRaffles();
  }, []);

  const filteredCards = cards.filter(card =>
    card.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCards.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCards = filteredCards.slice(startIndex, endIndex);

  // Calculate total stats
  const totalPrizeAmount = cards.reduce((sum, card) => sum + (card.price || 0), 0);
  const totalTicketsSold = cards.reduce((sum, card) => sum + (card.ticketSold || 0), 0);
  const activeRaffles = cards.filter(card => card.status === true).length;

  return (
    <div className="min-h-screen p-6" >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Winner Selection Management</h1>
        <p className="text-gray-400">Manage and view all raffles for winner selection</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Total Raffles</p>
              <p className="text-2xl font-bold text-white">{cards.length}</p>
            </div>
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </div>

        <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Active Raffles</p>
              <p className="text-2xl font-bold text-white">{activeRaffles}</p>
            </div>
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Total Prize Pool</p>
              <p className="text-2xl font-bold text-white">${totalPrizeAmount.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Tickets Sold</p>
              <p className="text-2xl font-bold text-white">{totalTicketsSold.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Ticket className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg">
        {/* Header Section */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Raffles List</h2>
              <p className="text-sm text-gray-400">
                Showing {filteredCards.length} of {cards.length} raffles
              </p>
            </div>
            <div className="relative">
              <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by raffle name..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
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
            <p className="text-gray-400 text-sm mt-4">Loading raffles...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-12 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-500/20 mb-4">
              <span className="text-red-400 text-xl">⚠</span>
            </div>
            <p className="text-red-400 font-medium mb-4">{error}</p>
            <button 
              onClick={fetchRaffles}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm transition-colors"
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
                    <th className="text-left py-4 px-6 font-semibold text-gray-400 text-xs uppercase tracking-wider">Raffle</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-400 text-xs uppercase tracking-wider">Prize Amount</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-400 text-xs uppercase tracking-wider">Total Tickets</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-400 text-xs uppercase tracking-wider">Per User Limit</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-400 text-xs uppercase tracking-wider">Tickets Sold</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-400 text-xs uppercase tracking-wider">Status</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-400 text-xs uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCards.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="py-12 text-center text-gray-500">
                        {searchTerm ? `No raffles found matching "${searchTerm}"` : 'No raffles available'}
                      </td>
                    </tr>
                  ) : (
                    currentCards.map((card, index) => (
                      <tr key={card._id} className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors">
                        <td className="py-4 px-6 text-gray-400 text-sm">{startIndex + index + 1}</td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <img
                              src={card.thumbnail}
                              alt={card.title}
                              className="w-12 h-12 rounded-lg object-cover border border-gray-700"
                            />
                            <div>
                              <span className="text-white font-medium text-sm block">{card.title}</span>
                              <span className="text-gray-500 text-xs">ID: {card._id.slice(-8)}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-1.5 text-yellow-400 font-semibold text-sm">
                            <DollarSign className="w-4 h-4" />
                            {card.price.toLocaleString()}
                          </div>
                        </td>
                        <td className="py-4 px-6 text-gray-300 text-sm font-medium">{card.totalTicket.toLocaleString()}</td>
                        <td className="py-4 px-6 text-gray-400 text-sm">{card.perUserTicketLimit}</td>
                        <td className="py-4 px-6">
                          <div className="flex flex-col gap-1">
                            <span className="text-white font-medium text-sm">{card.ticketSold.toLocaleString()}</span>
                            <div className="w-full bg-gray-800 rounded-full h-1.5">
                              <div
                                className="bg-yellow-500 h-1.5 rounded-full transition-all"
                                style={{ width: `${Math.min((card.ticketSold / card.totalTicket) * 100, 100)}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(card.status)}`}>
                            <span className={`w-1.5 h-1.5 rounded-full mr-2 ${card.status ? 'bg-green-400' : 'bg-red-400'}`}></span>
                            {card.status === true ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <button 
                            onClick={() => handleView(card._id)} 
                            className="bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center gap-2"
                          >
                            <Trophy className="w-4 h-4" />
                            Select Winner
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
                  <span className="text-white font-medium">{Math.min(endIndex, filteredCards.length)}</span> of{' '}
                  <span className="text-white font-medium">{filteredCards.length}</span> raffles
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
    </div>
  );
}

export default Winner;