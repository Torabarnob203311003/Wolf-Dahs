import { useRef, useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import axiosSecure from '../lib/axiosSecure';
import JoditEditor from 'jodit-react';
import { useParams } from 'react-router-dom';

const editorConfig = {
    readonly: false,
    height: 400,
    toolbar: true,
    toolbarButtonSize: 'middle',
    buttons: [
        'bold',
        'italic',
        'underline',
        'strikethrough',
        '|',
        'ul',
        'ol',
        '|',
        'align',
        '|',
        'link',
        '|',
        'undo',
        'redo',
        '|',
        'source'
    ],
    uploader: {
        insertImageAsBase64URI: true
    }
};

const EditRaffleCard = ({ onBack = () => { } }) => {
    const params = useParams();
    let cardId = params.id
    const editor = useRef(null);
    const [formData, setFormData] = useState({
        image: null,
        imageFile: null,
        title: '',
        amount: '',
        ticketLimit: '',
        userTicketLimit: '',
        details: ''
    });

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState('');

    // Fetch card data on mount
    useEffect(() => {
        const fetchCardData = async () => {
            try {
                setFetching(true);
                const response = await axiosSecure.get(`/raffles/get-single-raffle/${cardId}`);
                const card = response.data.data;

                setFormData({
                    image: card.thumbnail || null,
                    imageFile: null,
                    title: card.title || '',
                    amount: card.price || '',
                    ticketLimit: card.totalTicket || '',
                    userTicketLimit: card.perUserTicketLimit || '',
                    details: card.details || ''
                });
            } catch (err) {
                setError('Failed to load card data');
                console.error(err);
            } finally {
                setFetching(false);
            }
        };

        if (cardId) {
            fetchCardData();
        }
    }, [cardId]);

    const handleEditorChange = (content) => {
        setFormData(prev => ({
            ...prev,
            details: content
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 100 * 1024 * 1024) {
                setError('Image size must be less than 100MB');
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    image: reader.result,
                    imageFile: file
                }));
            };
            reader.readAsDataURL(file);
            setError('');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        if (!formData.title.trim()) {
            setError('Please enter a card title');
            return false;
        }
        if (!formData.amount || parseFloat(formData.amount) <= 0) {
            setError('Please enter a valid amount');
            return false;
        }
        if (!formData.ticketLimit) {
            setError('Please select a ticket limit');
            return false;
        }
        if (!formData.userTicketLimit) {
            setError('Please select a user ticket limit');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);
        setError('');

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('title', formData.title);
            formDataToSend.append('price', formData.amount);
            formDataToSend.append('totalTicket', formData.ticketLimit);
            formDataToSend.append('perUserTicketLimit', formData.userTicketLimit);
            formDataToSend.append('details', formData.details);

            if (formData.imageFile) {
                formDataToSend.append('thumbnail', formData.imageFile);
            }

            await updateRaffleCard(formDataToSend);

            onBack();
        } catch (err) {
            setError(err.message || 'Failed to update raffle card');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setError('');
        onBack();
    };

    const updateRaffleCard = async (formDataToSend) => {
        try {
            console.log('Updating raffle card...');
            const response = await axiosSecure.put(
                `/raffles/update-raffles/${cardId}`,
                formDataToSend,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            console.log('✅ Card updated successfully!');
            console.log('Response:', response.data);
            return response.data;

        } catch (error) {
            console.error('❌ Error updating raffle card:', error.response?.data || error.message);
            throw error;
        }
    };

    if (fetching) {
        return (
            <div className="min-h-screen bg-[#000000] text-white flex items-center justify-center">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#000000] text-white">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <span onClick={() => window.location.href = '/cards'} className="text-gray-400 cursor-pointer">Manage Raffle Cards</span>
                    <span className="text-gray-400">›</span>
                    <span className="text-white">Edit Card</span>
                </div>
                <button
                    onClick={() => window.location.href = '/cards'}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded flex items-center gap-2 transition"
                >
                    <ArrowLeft size={18} />
                    Back
                </button>
            </div>

            {/* Form Container */}
            <div className="bg-[#282727] rounded-lg p-8">
                <h1 className="text-2xl font-bold mb-8">Edit Card</h1>

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 bg-red-900 border border-red-700 rounded text-red-100">
                        {error}
                    </div>
                )}

                {/* Image Upload Section */}
                <div className="mb-8 pb-8 border-b border-gray-700">
                    <p className="text-gray-300 text-sm mb-4">Please upload square image, size less than 100MB</p>
                    <div className="flex items-center gap-4">
                        {/* Image Preview */}
                        <div className="w-20 h-20 bg-gray-700 rounded border border-gray-600 flex items-center justify-center overflow-hidden flex-shrink-0">
                            {formData.image ? (
                                <img
                                    src={formData.image}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                    }}
                                />
                            ) : (
                                <div className="text-4xl">🖼️</div>
                            )}
                        </div>

                        {/* File Input */}
                        <div>
                            <div className="block">
                                <button
                                    type="button"
                                    onClick={() => document.getElementById('image-input').click()}
                                    className="border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-4 py-2 rounded transition"
                                >
                                    Choose File
                                </button>
                            </div>
                            <input
                                id="image-input"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                            <p className="text-gray-400 text-sm mt-2">
                                {formData.imageFile ? formData.imageFile.name : 'No File Chosen'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Title and Amount */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Title</label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Enter Card title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="w-full bg-[#121212] border border-gray-600 rounded px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Ticket Price ($)</label>
                        <input
                            type="number"
                            name="amount"
                            placeholder="Enter card amount"
                            value={formData.amount}
                            onChange={handleInputChange}
                            step="0.01"
                            min="0"
                            className="w-full bg-[#121212] border border-gray-600 rounded px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition"
                        />
                    </div>
                </div>

                {/* Ticket Limits */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Total Ticket</label>
                        <input
                            type="number"
                            name="ticketLimit"
                            placeholder="Enter total ticket limit"
                            value={formData.ticketLimit}
                            onChange={handleInputChange}
                            step="1"
                            min="0"
                            className="w-full bg-[#121212] border border-gray-600 rounded px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">User Ticket Limit</label>
                        <input
                            type="number"
                            name="userTicketLimit"
                            placeholder="Enter user ticket limit"
                            value={formData.userTicketLimit}
                            onChange={handleInputChange}
                            step="1"
                            min="0"
                            className="w-full bg-[#121212] border border-gray-600 rounded px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition"
                        />
                    </div>
                </div>

                {/* Jodit Dark Theme Styles */}
                <style>{`
                    .jodit-wrapper {
                        --color-border: #404040;
                        --color-icon: #ffffff;
                        --color-text-secondary: #888888;
                    }
                    
                    .jodit-container {
                        background-color: #121212 !important;
                        border: 1px solid #404040 !important;
                        border-radius: 0.375rem;
                    }
                    
                    .jodit-wysiwyg {
                        background-color: #121212 !important;
                        color: #ffffff !important;
                        border: 1px solid #404040 !important;
                        min-height: 300px !important;
                    }
                    
                    .jodit-toolbar {
                        background-color: #1a1a1a !important;
                        border-bottom: 1px solid #404040 !important;
                    }
                    
                    .jodit-toolbar-button {
                        color: #ffffff !important;
                    }
                    
                    .jodit-toolbar-button:hover {
                        background-color: #404040 !important;
                    }
                    
                    .jodit-toolbar-button.jodit-toolbar-button--active {
                        background-color: #ff8c42 !important;
                    }
                `}</style>

                {/* Jodit Editor for Details */}
                <div className="mb-8">
                    <label className="block text-sm font-medium mb-2">Details</label>
                    <div className="jodit-wrapper">
                        <JoditEditor
                            ref={editor}
                            value={formData.details}
                            config={editorConfig}
                            onChange={handleEditorChange}
                        />
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="px-6 py-2 bg-[#121212] hover:bg-gray-600 text-white rounded transition"
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded transition disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? 'Saving Changes...' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditRaffleCard;