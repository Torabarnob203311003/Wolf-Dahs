const SponsorModel = ({ formData, setFormData, onSubmit, isProcessing }) => {
  return (
    <div className="space-y-4">
      {/* Name Input */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Sponsor Name *
        </label>
        <input
          type="text"
          placeholder="Enter sponsor name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full bg-[#1f1f1f] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#E7B20E] focus:ring-2 focus:ring-[#E7B20E]/20 transition"
        />
      </div>

      {/* Type and Category Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Type *
          </label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full bg-[#1f1f1f] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#E7B20E] focus:ring-2 focus:ring-[#E7B20E]/20 transition appearance-none cursor-pointer"
          >
            <option value="company">🏢 Company</option>
            <option value="individual">👤 Individual</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Category *
          </label>
          <select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="w-full bg-[#1f1f1f] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#E7B20E] focus:ring-2 focus:ring-[#E7B20E]/20 transition appearance-none cursor-pointer"
          >
            <option value="platinum">💎 Platinum</option>
            <option value="gold">🥇 Gold</option>
            <option value="silver">🥈 Silver</option>
          </select>
        </div>
      </div>

      {/* Sponsor Since */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Sponsor Since *
        </label>
        <input
          type="text"
          placeholder="e.g., 2024"
          value={formData.sponsorSince}
          onChange={(e) =>
            setFormData({ ...formData, sponsorSince: e.target.value })
          }
          className="w-full bg-[#1f1f1f] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#E7B20E] focus:ring-2 focus:ring-[#E7B20E]/20 transition"
        />
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Banner Image *
        </label>
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.files[0] })
            }
            className="hidden"
            id="imageUpload"
          />
          <label
            htmlFor="imageUpload"
            className="flex items-center justify-center w-full bg-[#1f1f1f] border-2 border-dashed border-gray-700 rounded-lg px-4 py-6 cursor-pointer hover:border-[#E7B20E] hover:bg-[#1f1f1f]/80 transition group"
          >
            <div className="text-center">
              <svg
                className="w-10 h-10 mx-auto mb-2 text-gray-500 group-hover:text-[#E7B20E] transition"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-sm text-gray-400 group-hover:text-gray-300 transition">
                {formData.image
                  ? formData.image.name
                  : "Click to upload banner image"}
              </p>
              <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
            </div>
          </label>
        </div>
      </div>

      {/* Logo Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Logo *
        </label>
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setFormData({ ...formData, logo: e.target.files[0] })
            }
            className="hidden"
            id="logoUpload"
          />
          <label
            htmlFor="logoUpload"
            className="flex items-center justify-center w-full bg-[#1f1f1f] border-2 border-dashed border-gray-700 rounded-lg px-4 py-6 cursor-pointer hover:border-[#E7B20E] hover:bg-[#1f1f1f]/80 transition group"
          >
            <div className="text-center">
              <svg
                className="w-10 h-10 mx-auto mb-2 text-gray-500 group-hover:text-[#E7B20E] transition"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p className="text-sm text-gray-400 group-hover:text-gray-300 transition">
                {formData.logo ? formData.logo.name : "Click to upload logo"}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Recommended: Square logo, PNG with transparent background
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* Website */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Website URL *
        </label>
        <div className="relative">
          <input
            type="url"
            placeholder="https://example.com"
            value={formData.website}
            onChange={(e) =>
              setFormData({ ...formData, website: e.target.value })
            }
            className="w-full bg-[#1f1f1f] border border-gray-700 rounded-lg px-4 py-3 pl-10 text-white placeholder-gray-500 focus:outline-none focus:border-[#E7B20E] focus:ring-2 focus:ring-[#E7B20E]/20 transition"
          />
          <svg
            className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
            />
          </svg>
        </div>
      </div>

      {/* Contribution */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Contribution *
        </label>
        <input
          type="text"
          placeholder="e.g., Major Tournament Sponsor"
          value={formData.contribution}
          onChange={(e) =>
            setFormData({ ...formData, contribution: e.target.value })
          }
          className="w-full bg-[#1f1f1f] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#E7B20E] focus:ring-2 focus:ring-[#E7B20E]/20 transition"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Description *
        </label>
        <textarea
          rows={5}
          placeholder="Write a detailed description about the sponsor, their contributions, and partnership goals..."
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full bg-[#1f1f1f] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#E7B20E] focus:ring-2 focus:ring-[#E7B20E]/20 transition resize-none"
        />
        <div className="flex justify-between items-center mt-1">
          <p className="text-xs text-gray-500">
            Provide a comprehensive overview of the sponsor
          </p>
          <p className="text-xs text-gray-500">
            {formData.description?.length || 0} characters
          </p>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          onClick={onSubmit}
          disabled={isProcessing}
          className={`w-full py-4 rounded-lg font-bold text-black transition shadow-lg flex items-center justify-center gap-2 ${
            isProcessing
              ? "bg-gray-700 cursor-not-allowed text-gray-400"
              : "bg-[#E7B20E] hover:bg-[#e9b005] shadow-[#E7B20E]/25"
          }`}
        >
          {isProcessing ? (
            <>
              <svg
                className="animate-spin h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Uploading...
            </>
          ) : (
            <>
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
              Save Changes
            </>
          )}
        </button>
      </div>

      {/* Info Box */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <svg
            className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <p className="text-blue-400 font-medium text-sm">Important</p>
            <p className="text-blue-400/80 text-sm mt-1">
              All fields marked with * are required. Make sure images are high
              quality and meet the recommended specifications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SponsorModel;
