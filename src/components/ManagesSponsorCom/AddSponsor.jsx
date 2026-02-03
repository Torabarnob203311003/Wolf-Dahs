/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import toast from "react-hot-toast";
import SponsorModel from "./SponsorModel";

const AddSponsor = ({
  formData,
  setFormData,
  resetForm,
  sponsors,
  setSponsors,
  setShowAddModal,
}) => {
  // const [showAddModal, setShowAddModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // const resetForm = () => {
  //   setFormData({
  //     name: "",
  //     type: "company",
  //     category: "gold",
  //     logo: "",
  //     description: "",
  //     website: "",
  //     sponsorSince: new Date().getFullYear().toString(),
  //     contribution: "",
  //   });
  // };

  const handleSubmitAdd = async () => {
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
      // API call: await axiosSecure.post('/sponsors', formData);

      const newSponsor = {
        ...formData,
        id: sponsors.length + 1,
      };
      setSponsors([...sponsors, newSponsor]);

      toast.success("Sponsor added successfully!");
      setShowAddModal(false);
      resetForm();
    } catch (error) {
      console.error(
        "❌ Error adding sponsor:",
        error.response?.data || error.message,
      );

      toast.error("Failed to add sponsor");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center p-6 z-50"
      onClick={() => setShowAddModal(false)}
    >
      <div
        className="bg-[#161616] rounded-xl border border-gray-800 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-2xl font-bold">Add New Sponsor</h2>
          <button
            onClick={() => setShowAddModal(false)}
            className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center"
          >
            ✕
          </button>
        </div>
        <div className="p-6">
          <SponsorModel
            onSubmit={handleSubmitAdd}
            submitText="Add Sponsor"
            formData={formData}
            setFormData={setFormData}
            resetForm={resetForm}
            sponsors={sponsors}
            setSponsors={setSponsors}
            setShowAddModal={setShowAddModal}
          />
        </div>
      </div>
    </div>
  );
};

export default AddSponsor;
