import React, { useState } from "react";
import SponsorModel from "./SponsorModel";
import toast from "react-hot-toast";
import axiosSecure from "../../lib/axiosSecure";

const EditSponsor = ({
  // eslint-disable-next-line no-unused-vars
  sponsors,
  setSponsors,
  setShowEditModal,
  selectedSponsor,
  setSelectedSponsor,
  resetForm,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmitEdit = async () => {
    if (!selectedSponsor?.name || !selectedSponsor?.description) {
      toast.error("Required fields missing");
      return;
    }

    setIsProcessing(true);

    try {
      const fd = new FormData();

      // Only append fields that exist (PATCH semantics)
      Object.entries(selectedSponsor).forEach(([key, value]) => {
        if (value instanceof File || typeof value === "string") {
          fd.append(key, value);
        }
      });

      const { data } = await axiosSecure.patch(
        `/sponsor/${selectedSponsor._id}`, // or .id based on backend
        fd,
        { headers: { "Content-Type": "multipart/form-data" } },
      );

      // Update UI with fresh DB result
      setSponsors((prev) =>
        prev.map((s) => (s._id === data.data._id ? data.data : s)),
      );

      toast.success("Sponsor updated successfully 🚀");
      setShowEditModal(false);
      setSelectedSponsor(null);
      resetForm();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update sponsor");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-6 z-50">
      <div
        className="bg-[#161616] rounded-xl border border-gray-800 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-2xl font-bold">Edit Sponsor</h2>
          <button onClick={() => setShowEditModal(false)}>✕</button>
        </div>

        <div className="p-6">
          <SponsorModel 
            formData={selectedSponsor}
            setFormData={setSelectedSponsor}
            onSubmit={handleSubmitEdit}
            submitText={isProcessing ? "Saving..." : "Save Changes"}
            isProcessing={isProcessing}
          />
        </div>
      </div>
    </div>
  );
};

export default EditSponsor;
