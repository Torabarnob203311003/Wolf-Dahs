/* eslint-disable no-unused-vars */
import { useState } from "react";

const SponsorModel = ({
  onSubmit,
  submitText,
  formData,
  setFormData,
  resetForm,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Name *
          </label>
          <input
            type="text"
            value={formData?.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-[#1f1f1f] border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#E7B20E] focus:ring-2 focus:ring-[#E7B20E]/20"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Type *
          </label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full bg-[#1f1f1f] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#E7B20E] focus:ring-2 focus:ring-[#E7B20E]/20"
          >
            <option value="company">Company</option>
            <option value="individual">Individual</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Category *
          </label>
          <select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="w-full bg-[#1f1f1f] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#E7B20E] focus:ring-2 focus:ring-[#E7B20E]/20"
          >
            <option value="platinum">Platinum</option>
            <option value="gold">Gold</option>
            <option value="silver">Silver</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Sponsor Since *
          </label>
          <input
            type="text"
            value={formData.sponsorSince}
            onChange={(e) =>
              setFormData({ ...formData, sponsorSince: e.target.value })
            }
            className="w-full bg-[#1f1f1f] border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#E7B20E] focus:ring-2 focus:ring-[#E7B20E]/20"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Logo URL *
        </label>
        <input
          type="url"
          value={formData.logo}
          onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
          placeholder="https://example.com/logo.jpg"
          className="w-full bg-[#1f1f1f] border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#E7B20E] focus:ring-2 focus:ring-[#E7B20E]/20"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Contribution *
        </label>
        <input
          type="text"
          value={formData.contribution}
          onChange={(e) =>
            setFormData({ ...formData, contribution: e.target.value })
          }
          placeholder="e.g., Major Tournament Sponsor"
          className="w-full bg-[#1f1f1f] border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#E7B20E] focus:ring-2 focus:ring-[#E7B20E]/20"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Website *
        </label>
        <input
          type="url"
          value={formData.website}
          onChange={(e) =>
            setFormData({ ...formData, website: e.target.value })
          }
          placeholder="https://example.com"
          className="w-full bg-[#1f1f1f] border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#E7B20E] focus:ring-2 focus:ring-[#E7B20E]/20"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Description *
        </label>
        <textarea
          rows={4}
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Write a brief description about the sponsor..."
          className="w-full bg-[#1f1f1f] border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#E7B20E] focus:ring-2 focus:ring-[#E7B20E]/20 resize-none"
        />
      </div>

      <div className="flex gap-3 pt-4">
        <button
          onClick={() => {
            setShowAddModal(false);
            setShowEditModal(false);
            resetForm();
          }}
          className="flex-1 px-4 py-3 bg-[#1f1f1f] hover:bg-[#2a2a2a] border border-gray-700 rounded-lg font-medium transition"
        >
          Cancel
        </button>
        <button
          onClick={onSubmit}
          disabled={isProcessing}
          className={`flex-1 px-4 py-3 rounded-lg font-bold transition ${
            isProcessing
              ? "bg-gray-700 cursor-not-allowed"
              : "bg-[#E7B20E] hover:bg-[#e9b005] text-black shadow-lg shadow-[#E7B20E]/25"
          }`}
        >
          {isProcessing ? "Processing..." : submitText}
        </button>
      </div>
    </div>
  );
};

export default SponsorModel;
