import { useState } from 'react';
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
    onCancel = () => { },
    inputRequired = false,
    inputPlaceholder = "Type to confirm",
    requiredInputValue = ""
}) => {
    const [inputValue, setInputValue] = useState('');

    if (!isOpen) return null;

    const isConfirmDisabled = inputRequired
        ? inputValue !== requiredInputValue || isLoading
        : isLoading;

    const handleConfirm = () => {
        if (inputRequired && inputValue !== requiredInputValue) {
            return;
        }
        onConfirm();
    };

    const handleCancel = () => {
        setInputValue('');
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

                    {/* Input Field (if required) */}
                    {inputRequired && (
                        <div className="mb-6">
                            <label className="block text-sm text-gray-400 mb-2">
                                {requiredInputValue ? `Type "${requiredInputValue}" to confirm` : "Confirm by typing"}
                            </label>
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder={inputPlaceholder}
                                className="w-full bg-[#121212] border border-gray-600 rounded px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition"
                                autoFocus
                            />
                            {requiredInputValue && (
                                <p className={`text-sm mt-2 ${inputValue === requiredInputValue
                                        ? 'text-green-500'
                                        : 'text-gray-500'
                                    }`}>
                                    {inputValue === requiredInputValue
                                        ? '✓ Ready to confirm'
                                        : `${requiredInputValue.length - inputValue.length} characters to match`}
                                </p>
                            )}
                        </div>
                    )}

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
                            onClick={handleConfirm}
                            disabled={isConfirmDisabled}
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