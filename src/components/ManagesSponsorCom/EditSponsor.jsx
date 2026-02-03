import React from "react";
import SponsorModel from "./SponsorModel";
import toast from "react-hot-toast";

const EditSponsor = ({
  formData,
  sponsors,
  setSponsors,
  setShowEditModal,
  selectedSponsor,
  setSelectedSponsor,
  setIsProcessing,
  resetForm,
}) => {
  const handleSubmitEdit = async () => {
    if (
      !formData.name ||
      !formData.logo ||
      !formData.description ||
      !formData.website ||
      !formData.contribution
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsProcessing(true);

    try {
      // API call: await axiosSecure.patch(`/sponsors/${selectedSponsor.id}`, formData);

      setSponsors(
        sponsors.map((s) =>
          s.id === selectedSponsor.id ? { ...formData, id: s.id } : s,
        ),
      );

      toast.success("Sponsor updated successfully!");
      setShowEditModal(false);
      setSelectedSponsor(null);
      resetForm();
    } catch (error) {
      console.error(
        "❌ Error updating sponsor:",
        error.response?.data || error.message,
      );
      toast.error("Failed to update sponsor");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center p-6 z-50"
      onClick={() => setShowEditModal(false)}
    >
      <div
        className="bg-[#161616] rounded-xl border border-gray-800 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-2xl font-bold">Edit Sponsor</h2>
          <button
            onClick={() => setShowEditModal(false)}
            className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center"
          >
            ✕
          </button>
        </div>
        <div className="p-6">
          <SponsorModel
            formData={selectedSponsor}
            setFormData={setSelectedSponsor}
            resetForm={resetForm}
            onSubmit={handleSubmitEdit}
            submitText="Save Changes"
          />
        </div>
      </div>
    </div>
  );
};

export default EditSponsor;
