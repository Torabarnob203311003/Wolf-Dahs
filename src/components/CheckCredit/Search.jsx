
const Search = ({ searchQuery, setSearchQuery, setCurrentPage }) => {
  return <div className="mb-6 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name, email..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-[#161616] border border-gray-800 rounded-lg px-4 py-3 pl-12 text-white placeholder-gray-500 focus:outline-none focus:border-[#E7B20E] focus:ring-2 focus:ring-[#E7B20E]/20 transition"
            />
            <svg
              className="w-5 h-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>;
};

export default Search;
