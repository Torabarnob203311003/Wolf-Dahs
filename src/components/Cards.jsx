import { useEffect, useState } from 'react';
import { Search, Edit, Trash2, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import axiosSecure from '../lib/axiosSecure';
import { ClipLoader, ScaleLoader } from "react-spinners";

const ManageRaffleCards = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [raffleCards, setRaffleCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const itemsPerPage = 10;

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
    <div className=" min-h-screen p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-white text-2xl font-semibold">Manage Raffle Cards</h1>
        <button onClick={() => window.location.href = '/add-raffle'} className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
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
              className="bg-[#3C3C3C] text-white px-4 py-2 pl-4 pr-10 rounded-lg border border-gray-600 focus:outline-none focus:border-orange-500 w-64"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="p-6 text-center text-white">
            <ScaleLoader
              color='#FF9933'
              loading={loading}
              cssOverride={{ display: "block", margin: "0 auto", borderColor: "orange" }}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
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
                {currentCards.map((card) => (
                  <tr key={card._id} className="border-b border-gray-700 hover:bg-gray-750 transition-colors">
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
                        <button onClick={() => window.location.href = `/edit-raffle/${card._id}`} className="bg-yellow-500 hover:bg-yellow-600 p-2 rounded-lg transition-colors">
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
        )}

        {/* Pagination */}
        {!loading && !error && (
          <div className="flex justify-between items-center p-6 border-t border-gray-600">
            <button
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={16} />
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => (
                <button
                  key={i + 1}
                  className={`px-3 py-1 rounded ${currentPage === i + 1
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-400 hover:text-white'
                    }`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              {totalPages > 5 && (
                <>
                  <span className="text-gray-400 px-2">...</span>
                  <button
                    className={`px-3 py-1 rounded ${currentPage === totalPages
                      ? 'bg-orange-500 text-white'
                      : 'text-gray-400 hover:text-white'
                      }`}
                    onClick={() => setCurrentPage(totalPages)}
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </div>
            <button
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageRaffleCards;