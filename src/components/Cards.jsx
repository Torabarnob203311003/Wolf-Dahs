import { useEffect, useState } from 'react';
import { Search, Edit, Trash2, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import axiosSecure from '../lib/axiosSecure';
import { ClipLoader, ScaleLoader } from "react-spinners";
import DeleteConfirmationModal from './DeleteConfirmationModal';

const ManageRaffleCards = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [raffleCards, setRaffleCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const itemsPerPage = 10;

  // STEP 1: When user clicks delete button
  const handleDeleteButtonClick = (card) => {
    setCardToDelete(card);
    setShowDeleteModal(true);
  };

  // STEP 2: When user confirms deletion in modal
  const handleConfirmDelete = async () => {
    if (!cardToDelete) return;

    setIsDeleting(true);
    try {
      // Make API call to delete
      const response = await axiosSecure.delete(
        `raffles/delete-raffles/${cardToDelete._id}`
      );

      console.log('Card deleted:', response.data);

      // Remove card from local state
      setRaffleCards(
        raffleCards.filter(card => card._id !== cardToDelete._id)
      );

      // Close modal
      setShowDeleteModal(false);
      setCardToDelete(null);

      alert('Card deleted successfully!');
    } catch (error) {
      console.error('Delete failed:', error);
      alert('Failed to delete card. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  // STEP 3: When user cancels deletion
  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setCardToDelete(null);
  };

  useEffect(() => {
    fetchRaffleCards();
  }, []);

  const fetchRaffleCards = async () => {
    try {
      setLoading(true);
      const response = await axiosSecure.get('raffles/get-all-raffle');
      console.log(response.data);

      if (response.data.success && response.data.data) {
        // Transform API data to match table structure
        const transformedData = response.data.data.map((raffle, index) => ({
          id: index + 1,
          _id: raffle._id,
          cardName: raffle.title,
          avatar: raffle.thumbnail,
          prizeAmount: raffle.price,
          totalTicketLimit: raffle.totalTicket,
          userTicketLimit: raffle.perUserTicketLimit,
          ticketSold: raffle.ticketSold,
          status: raffle.status ? 'Open' : 'Closed'
        }));

        setRaffleCards(transformedData);
        setError(null);
      }
    } catch (err) {
      console.error('Error fetching raffle cards:', err);
      setError('Failed to fetch raffle cards');
    } finally {
      setLoading(false);
    }
  };

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

  // Filter and paginate
  const filteredCards = raffleCards.filter(card =>
    card.cardName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCards.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCards = filteredCards.slice(startIndex, endIndex);

  return (
   <div className="min-h-screen bg-[#0d0d0d] p-6">
      <div>
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-white text-2xl font-bold mb-1">Manage Raffle Cards</h1>
            <p className="text-gray-400 text-sm">Create and manage your raffle card inventory</p>
          </div>
          <button 
            onClick={() => window.location.href = '/add-raffle'} 
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-lg"
          >
            <Plus size={18} />
            Add New Card
          </button>
        </div>

        {/* Main Content Card */}
        <div className="bg-[#1c1c1c] rounded-lg shadow-lg overflow-hidden">
          {/* Search Bar */}
          <div className="p-5 border-b border-gray-800">
            <div className="flex justify-between items-center">
              <h2 className="text-white text-lg font-semibold">Existing Cards</h2>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                <input
                  type="text"
                  placeholder="Search cards..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-[#0f0f0f] text-white text-sm pl-10 pr-4 py-2 rounded-lg border border-gray-700 focus:border-orange-500 focus:outline-none w-full"
                />
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
              <p className="text-gray-400 mt-4">Loading cards...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="p-12 text-center">
              <p className="text-red-400">{error}</p>
            </div>
          )}

          {/* Table */}
          {!loading && !error && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#161616] border-b border-gray-800">
                    <th className="text-gray-400 text-left py-3 px-4 font-medium text-xs">NO</th>
                    <th className="text-gray-400 text-left py-3 px-4 font-medium text-xs">CARD NAME</th>
                    <th className="text-gray-400 text-left py-3 px-4 font-medium text-xs">TICKET PRIZE</th>
                    <th className="text-gray-400 text-left py-3 px-4 font-medium text-xs">TOTAL TICKET</th>
                    <th className="text-gray-400 text-left py-3 px-4 font-medium text-xs">USER LIMIT</th>
                    <th className="text-gray-400 text-left py-3 px-4 font-medium text-xs">TICKET SOLD</th>
                    <th className="text-gray-400 text-left py-3 px-4 font-medium text-xs">STATUS</th>
                    <th className="text-gray-400 text-left py-3 px-4 font-medium text-xs">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCards.map((card, idx) => (
                    <tr 
                      key={card._id} 
                      className={`${idx !== currentCards.length - 1 ? 'border-b border-gray-800' : ''} hover:bg-[#252525] transition-colors`}
                    >
                      <td className="py-3 px-4">
                        <span className="text-white text-xs">{card.id}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={card.avatar}
                            alt={card.cardName}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <span className="text-white text-sm font-medium">{card.cardName}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-green-400 text-sm font-semibold">${card.prizeAmount}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-white text-sm">{card.totalTicketLimit.toLocaleString()}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-white text-sm">{card.userTicketLimit}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="text-white text-sm">{card.ticketSold}</span>
                          <span className="text-gray-500 text-xs">/ {card.totalTicketLimit}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        {getStatusBadge(card.status)}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => window.location.href = `/edit-raffle/${card._id}`} 
                            className="bg-yellow-500 hover:bg-yellow-600 p-2 rounded-lg transition-colors"
                            title="Edit card"
                          >
                            <Edit className="text-white" size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteButtonClick(card)}
                            className="bg-red-600 hover:bg-red-700 p-2 rounded-lg transition-colors"
                            title="Delete card"
                          >
                            <Trash2 className="text-white" size={16} />
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
          {!loading && !error && filteredCards.length > 0 && (
            <div className="bg-[#161616] px-5 py-4 border-t border-gray-800 flex items-center justify-between">
              {/* <div className="text-gray-400 text-xs">
                Showing {startIndex + 1} to {Math.min(startIndex + cardsPerPage, filteredCards.length)} of {filteredCards.length} cards
              </div> */}
              <div className="flex gap-2 items-center">
                <button
                  className="bg-[#0f0f0f] text-white px-3 py-1.5 rounded text-xs hover:bg-[#2a2a2a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft size={14} />
                  Previous
                </button>

                <div className="flex gap-1">
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => (
                    <button
                      key={i + 1}
                      className={`px-3 py-1.5 rounded text-xs transition-colors ${
                        currentPage === i + 1
                          ? 'bg-orange-500 text-white'
                          : 'bg-[#0f0f0f] text-white hover:bg-[#2a2a2a]'
                      }`}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  ))}
                  {totalPages > 5 && (
                    <>
                      <span className="text-gray-400 px-2 flex items-center">...</span>
                      <button
                        className={`px-3 py-1.5 rounded text-xs transition-colors ${
                          currentPage === totalPages
                            ? 'bg-orange-500 text-white'
                            : 'bg-[#0f0f0f] text-white hover:bg-[#2a2a2a]'
                        }`}
                        onClick={() => setCurrentPage(totalPages)}
                      >
                        {totalPages}
                      </button>
                    </>
                  )}
                </div>

                <button
                  className="bg-[#0f0f0f] text-white px-3 py-1.5 rounded text-xs hover:bg-[#2a2a2a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && filteredCards.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-gray-400 mb-4">No cards found matching your search.</p>
              <button 
                onClick={() => setSearchTerm('')}
                className="text-orange-500 hover:text-orange-600 text-sm"
              >
                Clear search
              </button>
            </div>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-[#1c1c1c] rounded-lg p-6 max-w-md w-full shadow-2xl">
              <h3 className="text-white text-xl font-bold mb-2">Delete Raffle Card?</h3>
              <p className="text-gray-400 text-sm mb-6">
                Are you sure you want to permanently delete "<span className="text-white font-semibold">{cardToDelete?.cardName}</span>"? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleCancelDelete}
                  disabled={isDeleting}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  disabled={isDeleting}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-colors disabled:opacity-50"
                >
                  {isDeleting ? 'Deleting...' : 'Delete Card'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageRaffleCards;