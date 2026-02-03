import React, { useState } from "react";

// eslint-disable-next-line no-unused-vars
const Header = ({showAddModal, setShowAddModal}) => {
  
  // eslint-disable-next-line no-unused-vars
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
  
  const handleAdd = () => {
    resetForm();
    setShowAddModal(true);
  };
  
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Sponsor Management</h1>
        <p className="text-gray-400">Manage sponsors and partnerships</p>
      </div>
      <button
        onClick={handleAdd}
        className="px-6 py-3 bg-[#E7B20E] hover:bg-[#e9b005] text-black rounded-lg font-bold transition shadow-lg shadow-[#E7B20E]/25 flex items-center gap-2"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
        Add New Sponsor
      </button>
    </div>
  );
};

export default Header;
