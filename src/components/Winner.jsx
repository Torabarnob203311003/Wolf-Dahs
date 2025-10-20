import React, { useEffect, useState } from "react";
import { Search, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import axiosSecure from "../lib/axiosSecure";

function Winner() {
  const [cards, setCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status) => {
    return status === true
      ? 'bg-green-600 text-white'
      : 'bg-red-600 text-white';
  };

  const handleView = (id) => {
    console.log(id);
    window.location.href = `/winner-selection?raffleId=${id}`
  }

  async function fetchRaffles() {
    try {
      const response = await axiosSecure.get('/raffles/get-all-raffle');
      setCards(response.data.data);
      console.log(response.data.data);

    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchRaffles();
  }, [])

  return (
    <div className="bg-black min-h-screen text-white">
      <div style={{ backgroundColor: '#282727' }} className="mx-4 my-4">
        {/* Header with blue border */}
        <div className="p-6 border-b-2 border-blue-500">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-medium text-white">Winner Selection Management</h1>
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

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-4 px-6 font-medium text-gray-300 text-sm">NO</th>
                <th className="text-left py-4 px-6 font-medium text-gray-300 text-sm">Card name</th>
                <th className="text-left py-4 px-6 font-medium text-gray-300 text-sm">Prize amount</th>
                <th className="text-left py-4 px-6 font-medium text-gray-300 text-sm">Total ticket limit</th>
                <th className="text-left py-4 px-6 font-medium text-gray-300 text-sm">User ticket limit</th>
                <th className="text-left py-4 px-6 font-medium text-gray-300 text-sm">Ticket Sold</th>
                <th className="text-left py-4 px-6 font-medium text-gray-300 text-sm">Status</th>
                <th className="text-left py-4 px-6 font-medium text-gray-300 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cards.map((card, index) => (
                <tr key={card._id} className="border-b border-gray-700 hover:bg-gray-800/30">
                  <td className="py-4 px-6 text-gray-300 text-sm">{index + 1}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={card.thumbnail}
                        alt={card.title}
                        className="w-10 h-10 rounded object-cover"
                      />
                      <span className="text-white text-sm font-medium">{card.title}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-300 text-sm">{card.price}</td>
                  <td className="py-4 px-6 text-gray-300 text-sm">{card.totalTicket}</td>
                  <td className="py-4 px-6 text-gray-300 text-sm">{card.perUserTicketLimit}</td>
                  <td className="py-4 px-6 text-gray-300 text-sm">{card.ticketSold}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-3 py-1 rounded text-xs font-medium ${getStatusColor(card.status)}`}>
                      {card.status === true ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button onClick={() => handleView(card._id)} className="bg-sky-200 hover:bg-blue-700 hover:text-white text-blue-800 px-4 py-1.5 rounded text-sm font-medium transition-colors">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination with blue border */}
        <div className="flex items-center justify-between p-6 border-t-2 border-blue-500">
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-600 rounded transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="px-3 py-1 bg-yellow-400 text-black rounded text-sm font-medium">
              1
            </button>
            <button className="px-3 py-1 text-gray-300 hover:text-white hover:bg-gray-600 rounded text-sm">
              2
            </button>
            <button className="px-3 py-1 text-gray-300 hover:text-white hover:bg-gray-600 rounded text-sm">
              3
            </button>
            <span className="px-2 text-gray-400">...</span>
            <button className="px-3 py-1 text-gray-300 hover:text-white hover:bg-gray-600 rounded text-sm">
              440
            </button>
            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-600 rounded transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Winner;