import { useState, useMemo, useEffect } from "react";
import Header from "../components/ManagesSponsorCom/Header";
import Stats from "../components/ManagesSponsorCom/Stats";
// import SponsorModel from "../components/ManagesSponsorCom/SponsorModel";
import AddSponsor from "../components/ManagesSponsorCom/AddSponsor";
import DeleteSponsor from "../components/ManagesSponsorCom/DeleteSponsor";
import EditSponsor from "../components/ManagesSponsorCom/EditSponsor";
import axiosSecure from "../lib/axiosSecure";

const ManageSponsor = () => {
  const [sponsors, setSponsors] = useState([
    {
      id: 1,
      name: "Tech Corp Solutions",
      type: "company",
      category: "platinum",
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=400&h=400&fit=crop",
      description:
        "Leading technology partner providing cutting-edge solutions for competitive gaming. We believe in empowering the next generation of esports professionals.",
      website: "https://techcorp.example.com",
      sponsorSince: "2023",
      contribution: "Major Tournament Sponsor",
    },
    {
      id: 2,
      name: 'John "ProGamer" Smith',
      type: "individual",
      category: "gold",
      logo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
      description:
        "Professional esports athlete and community supporter. Dedicated to helping aspiring players achieve their dreams through mentorship and financial support.",
      website: "https://progamer.example.com",
      sponsorSince: "2024",
      contribution: "Player Development Fund",
    },
    {
      id: 3,
      name: "Gaming Gear Pro",
      type: "company",
      category: "platinum",
      logo: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=400&fit=crop",
      description:
        "Premium gaming equipment manufacturer. Our partnership ensures all players have access to world-class gaming peripherals and hardware.",
      website: "https://gaminggear.example.com",
      sponsorSince: "2022",
      contribution: "Equipment & Hardware Partner",
    },
  ]);

  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSponsor, setSelectedSponsor] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    type: "company",
    category: "gold",
    logo: "",
    description: "",
    website: "",
    sponsorSince: new Date().getFullYear().toString(),
    contribution: "",
  });

  const filterOptions = [
    { value: "all", label: "All Sponsors", count: sponsors.length },
    {
      value: "platinum",
      label: "Platinum",
      count: sponsors.filter((s) => s.category === "platinum").length,
    },
    {
      value: "gold",
      label: "Gold",
      count: sponsors.filter((s) => s.category === "gold").length,
    },
    {
      value: "silver",
      label: "Silver",
      count: sponsors.filter((s) => s.category === "silver").length,
    },
    {
      value: "company",
      label: "Companies",
      count: sponsors.filter((s) => s.type === "company").length,
    },
    {
      value: "individual",
      label: "Individuals",
      count: sponsors.filter((s) => s.type === "individual").length,
    },
  ];

  const filteredSponsors = useMemo(() => {
    let filtered = sponsors;

    if (selectedFilter !== "all") {
      if (["platinum", "gold", "silver"].includes(selectedFilter)) {
        filtered = filtered.filter((s) => s.category === selectedFilter);
      } else if (["company", "individual"].includes(selectedFilter)) {
        filtered = filtered.filter((s) => s.type === selectedFilter);
      }
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (s) =>
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.contribution.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    return filtered;
  }, [sponsors, selectedFilter, searchQuery]);

  const stats = useMemo(
    () => ({
      total: sponsors.length,
      platinum: sponsors.filter((s) => s.category === "platinum").length,
      gold: sponsors.filter((s) => s.category === "gold").length,
      silver: sponsors.filter((s) => s.category === "silver").length,
    }),
    [sponsors],
  );

  const getCategoryBadge = (category) => {
    switch (category) {
      case "platinum":
        return "bg-gradient-to-r from-gray-400 to-gray-200 text-gray-900";
      case "gold":
        return "bg-gradient-to-r from-[#a8820f] to-[#E7B20E] text-black";
      case "silver":
        return "bg-gradient-to-r from-gray-500 to-gray-400 text-white";
      default:
        return "bg-gray-700 text-white";
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      type: "company",
      category: "gold",
      logo: "",
      description: "",
      website: "",
      sponsorSince: new Date().getFullYear().toString(),
      contribution: "",
    });
  };

  const handleEdit = (sponsor) => {
    setSelectedSponsor(sponsor);
    setFormData({ ...sponsor });
    setShowEditModal(true);
  };

  const handleDeleteClick = (sponsor) => {
    setSelectedSponsor(sponsor);
    setShowDeleteModal(true);
  };

  const fetchSponsors = async () =>{
    const response = await axiosSecure.get('/sponsors');
    setSponsors(response.data.data);
  }

  useEffect(()=>{
    fetchSponsors();
  }, [])

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-6">
      <div>
        <Header showAddModal={showAddModal} setShowAddModal={setShowAddModal} />

        <Stats stats={stats} />

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search sponsors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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

          <div className="flex flex-wrap gap-2 bg-[#161616] rounded-lg p-2 border border-gray-800">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedFilter(option.value)}
                className={`px-4 py-2 text-sm rounded-md transition-all flex items-center gap-2 ${
                  selectedFilter === option.value
                    ? "bg-[#E7B20E] text-black font-semibold shadow-lg shadow-[#E7B20E]/25"
                    : "text-gray-400 hover:text-white hover:bg-[#1f1f1f]"
                }`}
              >
                {option.label}
                <span
                  className={`px-2 py-0.5 rounded-full text-xs ${
                    selectedFilter === option.value
                      ? "bg-black/20"
                      : "bg-gray-700"
                  }`}
                >
                  {option.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Sponsors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSponsors.map((sponsor) => (
            <div
              key={sponsor.id}
              className="bg-[#161616] rounded-xl border border-gray-800 hover:border-[#E7B20E]/50 transition-all overflow-hidden"
            >
              <div className="relative h-40 bg-gradient-to-br from-[#1f1f1f] to-[#161616] flex items-center justify-center">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#E7B20E]/30">
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="absolute top-3 right-3">
                  <span
                    className={`${getCategoryBadge(sponsor.category)} px-3 py-1 rounded-full text-xs font-bold uppercase`}
                  >
                    {sponsor.category}
                  </span>
                </div>

                <div className="absolute top-3 left-3">
                  <span className="bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full text-xs">
                    {sponsor.type === "company" ? "🏢" : "👤"}
                  </span>
                </div>
              </div>

              <div className="p-4 space-y-3">
                <h3 className="text-lg font-bold truncate">{sponsor.name}</h3>
                <p className="text-xs text-gray-400">
                  Since {sponsor.sponsorSince}
                </p>
                <div className="bg-[#E7B20E]/10 border border-[#E7B20E]/30 px-2 py-1 rounded text-xs text-[#E7B20E]">
                  {sponsor.contribution}
                </div>
                <p className="text-sm text-gray-300 line-clamp-2">
                  {sponsor.description}
                </p>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => handleEdit(sponsor)}
                    className="flex-1 px-3 py-2 bg-[#E7B20E] hover:bg-[#e9b005] text-black rounded-lg text-sm font-medium transition flex items-center justify-center gap-1"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(sponsor)}
                    className="flex-1 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 rounded-lg text-sm font-medium transition flex items-center justify-center gap-1"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredSponsors.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-4 bg-[#161616] rounded-full flex items-center justify-center border border-gray-800">
              <svg
                className="w-12 h-12 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <p className="text-gray-400 text-lg">No sponsors found</p>
          </div>
        )}
      </div>

      {showAddModal && (
        <AddSponsor
          formData={formData}
          setFormData={setFormData}
          resetForm={resetForm}
          sponsors={sponsors}
          setSponsors={setSponsors}
          setShowAddModal={setShowAddModal} 
        />
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <EditSponsor
          formData={formData}
          sponsors={sponsors}
          setSponsors={setSponsors}
          setShowEditModal={setShowEditModal}
          selectedSponsor={selectedSponsor}
          setSelectedSponsor={setSelectedSponsor}
          setIsProcessing={setIsProcessing}
          resetForm={resetForm}
        />
      )}

      {/* Delete Modal */}
      {showDeleteModal && selectedSponsor && (
        <DeleteSponsor
          setShowDeleteModal={setShowDeleteModal}
          setIsProcessing={setIsProcessing}
          isProcessing={isProcessing}
          selectedSponsor={selectedSponsor}
          sponsors={sponsors}
          setSelectedSponsor={setSelectedSponsor}
          setSponsors={setSponsors}
        />
      )}
    </div>
  );
};

export default ManageSponsor;
