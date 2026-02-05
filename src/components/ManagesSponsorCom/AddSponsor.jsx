import React, { useState } from "react";
import toast from "react-hot-toast";
import SponsorModel from "./SponsorModel";
import axiosSecure from "../../lib/axiosSecure";

const AddSponsor = ({ setShowAddModal, refreshSponsors }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    type: "company",
    category: "gold",
    image: null,
    logo: null,
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
      image: null,
      logo: null,
      description: "",
      website: "",
      sponsorSince: new Date().getFullYear().toString(),
      contribution: "",
    });
  };

  const handleSubmitAdd = async () => {
    if (!formData.name || !formData.description) {
      toast.error("Required fields missing");
      return;
    }

    setIsProcessing(true);

    try {
      const fd = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (value) fd.append(key, value);
      });

      const { data } = await axiosSecure.post("/sponsor", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(data);
      
      // toast.success("Sponsor added successfully 🚀");
      refreshSponsors?.();
      setShowAddModal(false);
      resetForm();
    } catch (error) {
      console.error(error)
      toast.error("Failed to add sponsor");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-6 z-50">
      <div className="bg-[#161616] rounded-xl border border-gray-800 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-800 flex justify-between">
          <h2 className="text-2xl font-bold">Add Sponsor</h2>
          <button onClick={() => setShowAddModal(false)}>✕</button>
        </div>

        <div className="p-6">
          <SponsorModel
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmitAdd}
            isProcessing={isProcessing}
          />
        </div>
      </div>
    </div>
  );
};

export default AddSponsor;