import { useState, useEffect } from "react";
import { X, Trophy, Mail, User } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import axiosSecure from "../lib/axiosSecure";

const AnnounceWinner = ({ isOpen, onClose }) => {
  const [searchParams] = useSearchParams();
  const raffleId = searchParams.get('raffleId');
  
  const [formData, setFormData] = useState({
    name: "",
    email: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({ name: "", email: "" });
      setErrors({});
    }
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Winner name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    } else if (formData.name.length > 100) {
      newErrors.name = "Name must be less than 100 characters";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Winner email is required";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    } else if (formData.email.length > 100) {
      newErrors.email = "Email must be less than 100 characters";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate raffleId
    if (!raffleId) {
      toast.error('Raffle ID is missing. Please try again.', {
        style: {
          borderRadius: '30px',
          background: '#EF4444',
          color: '#fff',
          fontSize: '18px',
        },
      });
      return;
    }

    // Validate form
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      // Prepare data for API
      const winnerData = {
        raffleId: raffleId,
        name: formData.name.trim(),
        email: formData.email.trim()
      };

      // Console log the data
      console.log('Winner Data:', winnerData);
      const token = localStorage.getItem('token');

      // TODO: API implementation here
      const response = await axiosSecure.post('/winner/menual-winner', winnerData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log("from select menual winner", response);
      
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast.success('Winner announced successfully!', {
        style: {
          borderRadius: '30px',
          background: '#10B981',
          color: '#fff',
          fontSize: '18px',
        },
      });

      // Close modal and refresh page
      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 1000);

    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to announce winner. Please try again.";
      
      toast.error(errorMessage, {
        style: {
          borderRadius: '30px',
          background: '#EF4444',
          color: '#fff',
          fontSize: '18px',
        },
      });
      
      setErrors({ submit: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && !loading) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <Toaster position="top-center" />
      
      {/* Modal Backdrop */}
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}
        onClick={handleBackdropClick}
      >
        {/* Modal Container */}
        <div 
          className="w-full max-w-md bg-[#272828] rounded-lg shadow-2xl relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            disabled={loading}
            className="absolute top-4 right-4 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ color: "#999999" }}
            onMouseEnter={(e) => !loading && (e.currentTarget.style.color = "#FAFAFA")}
            onMouseLeave={(e) => e.currentTarget.style.color = "#999999"}
            aria-label="Close modal"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Modal Content */}
          <div className="p-6">
            {/* Header */}
            <div className="mb-6 flex items-center gap-3">
              <div 
                className="p-2 rounded-lg"
                style={{ backgroundColor: "#FF9933" }}
              >
                <Trophy className="h-6 w-6" style={{ color: "#FAFAFA" }} />
              </div>
              <div>
                <h2 className="text-2xl font-bold" style={{ color: "#FAFAFA" }}>
                  Announce Winner
                </h2>
                <p className="text-sm" style={{ color: "#999999" }}>
                  Enter winner details below
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2" style={{ color: "#FAFAFA" }}>
                  Winner Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2" style={{ color: "#999999" }} />
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter winner's full name"
                    disabled={loading}
                    autoComplete="name"
                    className="w-full pl-10 pr-4 py-2 rounded-md border outline-none focus:ring-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: "#ffffff",
                      borderColor: errors.name ? "#EB5757" : "#404040",
                      color: "#000000",
                    }}
                    aria-invalid={errors.name ? "true" : "false"}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                </div>
                {errors.name && (
                  <p id="name-error" className="mt-1 text-sm" style={{ color: "#EB5757" }} role="alert">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: "#FAFAFA" }}>
                  Winner Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2" style={{ color: "#999999" }} />
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="winner@example.com"
                    disabled={loading}
                    autoComplete="email"
                    className="w-full pl-10 pr-4 py-2 rounded-md border outline-none focus:ring-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: "#ffffff",
                      borderColor: errors.email ? "#EB5757" : "#404040",
                      color: "#000000",
                    }}
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                </div>
                {errors.email && (
                  <p id="email-error" className="mt-1 text-sm" style={{ color: "#EB5757" }} role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Raffle ID Display (Hidden info for user) */}
              {raffleId && (
                <div className="text-xs" style={{ color: "#999999" }}>
                  Raffle ID: {raffleId}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={loading}
                  className="flex-1 py-2 rounded-md font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: "#404040",
                    color: "#FAFAFA"
                  }}
                  onMouseEnter={(e) => !loading && (e.currentTarget.style.opacity = "0.9")}
                  onMouseLeave={(e) => !loading && (e.currentTarget.style.opacity = "1")}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-2 rounded-md font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: "#FF9933",
                    color: "#FAFAFA"
                  }}
                  onMouseEnter={(e) => !loading && (e.currentTarget.style.opacity = "0.9")}
                  onMouseLeave={(e) => !loading && (e.currentTarget.style.opacity = "1")}
                >
                  {loading ? 'Announcing...' : 'Announce Winner'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnnounceWinner;