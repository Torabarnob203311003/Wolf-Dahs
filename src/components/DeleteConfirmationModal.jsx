import { AlertTriangle } from 'lucide-react';

const DeleteConfirmationModal = ({
    isOpen = false,
    title = "Delete Item",
    description = "Are you sure you want to delete this item? This action cannot be undone.",
    confirmText = "Delete",
    cancelText = "Cancel",
    isLoading = false,
    isDangerous = true,
    onConfirm = () => { },
    onCancel = () => { }
}) => {
    if (!isOpen) return null;

    const handleCancel = () => {
        onCancel();
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={handleCancel}
            />

            {/* Modal */}
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                <div className="bg-[#282727] rounded-lg p-8 max-w-md w-full">
                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                        <div className={`p-4 rounded-full ${isDangerous ? 'bg-red-900/20' : 'bg-yellow-900/20'}`}>
                            <AlertTriangle
                                size={32}
                                className={isDangerous ? 'text-red-500' : 'text-yellow-500'}
                            />
                        </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-bold text-white text-center mb-3">
                        {title}
                    </h2>

                    {/* Description */}
                    <p className="text-gray-300 text-center mb-6 leading-relaxed">
                        {description}
                    </p>

                    {/* Buttons */}
                    <div className="flex gap-3 justify-center">
                        <button
                            onClick={handleCancel}
                            disabled={isLoading}
                            className="flex-1 px-4 py-2 bg-[#121212] hover:bg-gray-700 text-white rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {cancelText}
                        </button>
                        <button
                            onClick={onConfirm}
                            disabled={isLoading}
                            className={`flex-1 px-4 py-2 rounded transition disabled:opacity-50 disabled:cursor-not-allowed ${isDangerous
                                ? 'bg-red-600 hover:bg-red-700 text-white'
                                : 'bg-orange-500 hover:bg-orange-600 text-white'
                                }`}
                        >
                            {isLoading ? 'Deleting...' : confirmText}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DeleteConfirmationModal;