import toast from "react-hot-toast";
import axiosSecure from "../../lib/axiosSecure";

const DeleteSponsor = ({
  selectedSponsor,
  sponsors,
  setSelectedSponsor,
  setSponsors,
  setShowDeleteModal,
  setIsProcessing,
  isProcessing
}) => {
 
  const handleDelete = async () => {
    setIsProcessing(true);
    
    try {
      const response = await axiosSecure.delete(`/sponsor/${selectedSponsor._id}`);
      console.log(response);
      
      setSponsors(sponsors.filter((s) => s.id !== selectedSponsor.id));

      // toast.success("Sponsor deleted successfully!");
      setShowDeleteModal(false);
      setSelectedSponsor(null);
    } catch (error) {
      console.error(
        "❌ Error deleting sponsor:",
        error.response?.data || error.message,
      );
      toast.error("Failed to delete sponsor");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center p-6 z-50"
      onClick={() => setShowDeleteModal(false)}
    >
      <div
        className="bg-[#161616] rounded-xl border border-gray-800 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-center mb-2">Delete Sponsor</h3>
          <p className="text-gray-400 text-center mb-6">
            Are you sure you want to delete{" "}
            <span className="font-bold text-white">{selectedSponsor.name}</span>
            ? This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="flex-1 px-4 py-3 bg-[#1f1f1f] hover:bg-[#2a2a2a] border border-gray-700 rounded-lg font-medium transition"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={isProcessing}
              className={`flex-1 px-4 py-3 rounded-lg font-bold transition ${
                isProcessing
                  ? "bg-gray-700 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600 text-white"
              }`}
            >
              {isProcessing ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteSponsor;
