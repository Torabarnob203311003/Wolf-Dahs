import React, { useState } from 'react';
import { Search, Edit, Trash2, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

const ManageRaffleCards = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  const raffleCards = [
    {
      id: 1,
      cardName: 'BM3 M3',
      avatar: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=40&h=40&fit=crop&auto=format',
      prizeAmount: 500,
      totalTicketLimit: 10000,
      userTicketLimit: 20,
      ticketSold: 50,
      status: 'Open'
    },
    {
      id: 2,
      cardName: 'Floyd Miles',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=40&h=40&fit=crop&auto=format',
      prizeAmount: 500,
      totalTicketLimit: 10000,
      userTicketLimit: 20,
      ticketSold: 100,
      status: 'Open'
    },
    {
      id: 3,
      cardName: 'Jane Cooper',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616c927aba5?w=40&h=40&fit=crop&auto=format',
      prizeAmount: 500,
      totalTicketLimit: 10000,
      userTicketLimit: 20,
      ticketSold: 10000,
      status: 'Closed'
    },
    {
      id: 4,
      cardName: 'Cody Fisher',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&auto=format',
      prizeAmount: 500,
      totalTicketLimit: 10000,
      userTicketLimit: 20,
      ticketSold: 245,
      status: 'Open'
    },
    {
      id: 5,
      cardName: 'Darrell Steward',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&auto=format',
      prizeAmount: 500,
      totalTicketLimit: 10000,
      userTicketLimit: 20,
      ticketSold: 700,
      status: 'Open'
    },
    {
      id: 6,
      cardName: 'Theresa Webb',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&auto=format',
      prizeAmount: 500,
      totalTicketLimit: 10000,
      userTicketLimit: 20,
      ticketSold: 1000,
      status: 'Closed'
    },
    {
      id: 7,
      cardName: 'Ronald Richards',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&auto=format',
      prizeAmount: 500,
      totalTicketLimit: 10000,
      userTicketLimit: 20,
      ticketSold: 10000,
      status: 'Closed'
    },
    {
      id: 8,
      cardName: 'Marvin McKinney',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&auto=format',
      prizeAmount: 500,
      totalTicketLimit: 10000,
      userTicketLimit: 20,
      ticketSold: 254,
      status: 'Open'
    },
    {
      id: 9,
      cardName: 'Guy Hawkins',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&auto=format',
      prizeAmount: 500,
      totalTicketLimit: 10000,
      userTicketLimit: 20,
      ticketSold: 956,
      status: 'Open'
    },
    {
      id: 10,
      cardName: 'Albert Flores',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&auto=format',
      prizeAmount: 500,
      totalTicketLimit: 10000,
      userTicketLimit: 20,
      ticketSold: 1000,
      status: 'Open'
    }
  ];

  const getStatusBadge = (status) => {
    if (status === 'Open') {
      return (
        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
          Open
        </span>
      );
    } else {
      return (
        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">
          Closed
        </span>
      );
    }
  };

  return (
    <div className=" min-h-screen p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-white text-2xl font-semibold">Manage Raffle Cards</h1>
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <Plus size={16} />
          Add New Card
        </button>
      </div>

      {/* Existing Cards Section */}
      <div className="bg-[#282727] border-[#8E8E8E]rounded-lg">
        {/* Section Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-600">
          <h2 className="text-white text-lg font-medium">Existing Cards</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-700 text-white px-4 py-2 pl-4 pr-10 rounded-lg border border-gray-600 focus:outline-none focus:border-orange-500 w-64"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="text-gray-400 text-left py-4 px-6 font-medium text-sm">NO</th>
                <th className="text-gray-400 text-left py-4 px-6 font-medium text-sm">Card name</th>
                <th className="text-gray-400 text-left py-4 px-6 font-medium text-sm">Prize amount</th>
                <th className="text-gray-400 text-left py-4 px-6 font-medium text-sm">Total ticket limit</th>
                <th className="text-gray-400 text-left py-4 px-6 font-medium text-sm">User ticket limit</th>
                <th className="text-gray-400 text-left py-4 px-6 font-medium text-sm">Ticket Sold</th>
                <th className="text-gray-400 text-left py-4 px-6 font-medium text-sm">Status</th>
                <th className="text-gray-400 text-left py-4 px-6 font-medium text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {raffleCards.map((card) => (
                <tr key={card.id} className="border-b border-gray-700 hover:bg-gray-750 transition-colors">
                  <td className="py-4 px-6">
                    <span className="text-white text-sm">{card.id}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img 
                        src={card.avatar} 
                        alt={card.cardName}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <span className="text-white text-sm font-medium">{card.cardName}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-white text-sm">${card.prizeAmount}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-white text-sm">{card.totalTicketLimit.toLocaleString()}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-white text-sm">{card.userTicketLimit}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-white text-sm">{card.ticketSold}</span>
                  </td>
                  <td className="py-4 px-6">
                    {getStatusBadge(card.status)}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button className="bg-yellow-500 hover:bg-yellow-600 p-2 rounded-lg transition-colors">
                        <Edit className="text-white" size={16} />
                      </button>
                      <button className="bg-red-500 hover:bg-red-600 p-2 rounded-lg transition-colors">
                        <Trash2 className="text-white" size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center p-6 border-t border-gray-600">
          <button 
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          >
            <ChevronLeft size={16} />
          </button>
          
          <div className="flex items-center gap-2">
            <button 
              className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setCurrentPage(1)}
            >
              1
            </button>
            <button 
              className="px-3 py-1 rounded text-gray-400 hover:text-white"
              onClick={() => setCurrentPage(2)}
            >
              2
            </button>
            <button 
              className="px-3 py-1 rounded text-gray-400 hover:text-white"
              onClick={() => setCurrentPage(3)}
            >
              3
            </button>
            <span className="text-gray-400 px-2">...</span>
            <button 
              className="px-3 py-1 rounded text-gray-400 hover:text-white"
              onClick={() => setCurrentPage(440)}
            >
              440
            </button>
          </div>

          <button 
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageRaffleCards;