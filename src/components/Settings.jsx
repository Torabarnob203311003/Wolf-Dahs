
import { useState, useRef, useEffect } from 'react';
import { ChevronRight, Edit, Eye, EyeOff } from 'lucide-react';
import axiosSecure from '../lib/axiosSecure';
import placeholderImage from "/placeholder.jpg"

function SettingsProfile() {
  const [activeTab, setActiveTab] = useState('Basic');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(placeholderImage);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const fileInputRef = useRef(null);

  // password reset states
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const userId = "68f68aef0ad7e0cb33639559";

  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    country: '',
    city: '',
    province: '',
    gender: '',
    bio: '',
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Fetch user data on component mount
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const response = await axiosSecure.get(`/users/get-single-profile/${userId}`);
      
      if (response.data.success) {
        const user = response.data.data;
        setUserData(user);
        
        // Populate form with existing data
        setFormData({
          displayName: user.userName || '',
          email: user.email || '',
          country: user.country || '',
          city: user.city || '',
          province: user.province || '',
          gender: user.gender || '',
          bio: user.bio || '',
        });

        // Set profile image if exists
        if (user.photoUrl) {
          setProfileImage(user.photoUrl);
        }
        console.log(user);
        
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      // Don't show error alert on initial load
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      // Validate file size (max 20MB)
      if (file.size > 20 * 1024 * 1024) {
        alert('Image size should be less than 20MB');
        return;
      }

      // Store the file for upload
      setSelectedFile(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (activeTab === 'Basic') {
      try {
        setLoading(true);

        // Create FormData for multipart/form-data
        const formDataToSend = new FormData();
        
        // Append profile data (only if changed)
        if (formData.displayName && formData.displayName !== userData?.userName) {
          formDataToSend.append('userName', formData.displayName);
        }
        if (formData.email && formData.email !== userData?.email) {
          formDataToSend.append('email', formData.email);
        }
        if (formData.country) {
          formDataToSend.append('country', formData.country);
        }
        if (formData.city) {
          formDataToSend.append('city', formData.city);
        }
        if (formData.province) {
          formDataToSend.append('province', formData.province);
        }
        if (formData.gender) {
          formDataToSend.append('gender', formData.gender);
        }
        if (formData.bio) {
          formDataToSend.append('bio', formData.bio);
        }
        
        // Append image file if selected
        if (selectedFile) {
          formDataToSend.append('photo', selectedFile);
        }

        // Check if there's anything to update
        let hasChanges = false;
        for (let _ of formDataToSend.entries()) {
          hasChanges = true;
          break;
        }

        if (!hasChanges) {
          alert('No changes to save');
          setLoading(false);
          return;
        }

        const response = await axiosSecure.patch(
          `/users/update-profile?id=${userId}`, 
          formDataToSend,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );

        if (response.data.success) {
          alert('Profile updated successfully!');
          
          // Update local user data
          setUserData(response.data.data);
          
          // Clear selected file
          setSelectedFile(null);
          
          // Optionally refresh the page or update auth context
          // window.location.reload();
        }
      } catch (error) {
        console.error('Error updating profile:', error);
        const errorMessage = error.response?.data?.message || 
                            error.response?.data?.errorSources?.[0]?.message ||
                            'Failed to update profile. Please try again.';
        alert(errorMessage);
      } finally {
        setLoading(false);
      }
    } else if (activeTab === 'Change Password') {
      try {
        setLoading(true);

        // Validate passwords
        if (!passwordData.oldPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
          alert('Please fill in all password fields');
          setLoading(false);
          return;
        }

        if (passwordData.newPassword !== passwordData.confirmPassword) {
          alert('New password and confirmation do not match');
          setLoading(false);
          return;
        }

        if (passwordData.newPassword.length < 6) {
          alert('New password must be at least 6 characters long');
          setLoading(false);
          return;
        }

        const response = await axiosSecure.patch(
          `/users/change-password?id=${userId}`,
          {
            oldPassword: passwordData.oldPassword,
            newPassword: passwordData.newPassword,
            confirmPassword: passwordData.confirmPassword
          }
        );

        if (response.data.success) {
          alert('Password changed successfully!');
          
          // Clear password fields
          setPasswordData({
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
          });
        }
      } catch (error) {
        console.error('Error changing password:', error);
        const errorMessage = error.response?.data?.message || 
                            error.response?.data?.errorSources?.[0]?.message ||
                            'Failed to change password. Please try again.';
        alert(errorMessage);
      } finally {
        setLoading(false);
      }
    }
  };

  const renderBasicContent = () => (
    <>
      <h1 className="text-xl font-medium text-white mb-8">Profile Information</h1>

      {/* Photo Profile Section */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-300 mb-3">Photo Profile</label>
        <div className="relative inline-block">
          <img
            src={profileImage}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover"
          />
          <button
            type="button"
            onClick={handleImageClick}
            className="absolute -bottom-1 -right-1 bg-gray-600 hover:bg-gray-500 rounded-full p-2 transition-colors"
          >
            <Edit className="w-4 h-4 text-white" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        {/* Display Name */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Display Name</label>
          <input
            type="text"
            placeholder="Enter Your Display Name"
            value={formData.displayName}
            onChange={(e) => handleInputChange('displayName', e.target.value)}
            className="w-full bg-[#121212] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            // onChange={(e) => handleInputChange('email', e.target.value)}
            readOnly={true}
            className="w-full bg-[#121212] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 cursor-not-allowed"
          />
        </div>

        {/* Country and City Row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Country</label>
            <select
              value={formData.country}
              onChange={(e) => handleInputChange('country', e.target.value)}
              className="w-full bg-[#121212] border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            >
              <option value="">Select Your Country</option>
              <option value="us">United States</option>
              <option value="uk">United Kingdom</option>
              <option value="ca">Canada</option>
              <option value="au">Australia</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">City</label>
            <select
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              className="w-full bg-[#121212] border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            >
              <option value="">Select Your City</option>
              <option value="new-york">New York</option>
              <option value="london">London</option>
              <option value="toronto">Toronto</option>
              <option value="sydney">Sydney</option>
            </select>
          </div>
        </div>

        {/* Province and Gender Row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Province</label>
            <select
              value={formData.province}
              onChange={(e) => handleInputChange('province', e.target.value)}
              className="w-full bg-[#121212] border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            >
              <option value="">Select Your Province</option>
              <option value="california">California</option>
              <option value="ontario">Ontario</option>
              <option value="new-south-wales">New South Wales</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Gender</label>
            <select
              value={formData.gender}
              onChange={(e) => handleInputChange('gender', e.target.value)}
              className="w-full bg-[#121212] border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            >
              <option value="">Select Your Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          </div>
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
          <textarea
            placeholder="Enter Your Bio"
            value={formData.bio}
            onChange={(e) => handleInputChange('bio', e.target.value)}
            rows={4}
            className="w-full bg-[#121212] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 resize-none"
          />
        </div>
      </div>
    </>
  );

  const handleResetPassword = () =>{
    
  }

  const renderPasswordContent = () => (
    <>
      <h1 className="text-xl font-medium text-white mb-8">Password</h1>

      <div className="space-y-6">
        {/* Old Password */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Old Password</label>
          <div className="relative">
            <input
              type={showOldPassword ? "text" : "password"}
              placeholder="Input your old password"
              value={passwordData.oldPassword}
              onChange={(e) => handlePasswordChange('oldPassword', e.target.value)}
              className="w-full bg-[#121212] border border-gray-600 rounded-lg px-4 py-3 pr-12 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            />
            <button
              type="button"
              onClick={() => setShowOldPassword(!showOldPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
            >
              {showOldPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="Input new password"
              value={passwordData.newPassword}
              onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
              className="w-full bg-[#121212] border border-gray-600 rounded-lg px-4 py-3 pr-12 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
            >
              {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            New password should be a combination of letters and numbers
          </p>
        </div>

        {/* Confirmation New Password */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Confirmation New Password</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm new password"
              value={passwordData.confirmPassword}
              onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
              className="w-full bg-[#121212] border border-gray-600 rounded-lg px-4 py-3 pr-12 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className=" min-h-screen text-white flex gap-8 p-8">
      {/* Sidebar */}
      <div className="w-64 bg-[#282727] h-92 p-4 rounded-lg h-fit">
        <div className="space-y-2">
          <div
            className={`flex items-center justify-between p-3 rounded cursor-pointer transition-colors ${activeTab === 'Basic' ? 'bg-[#E28B27] text-white' : 'bg-[#121212] hover:bg-gray-600'
              }`}
            onClick={() => setActiveTab('Basic')}
          >
            <span className="text-sm font-medium">Basic</span>
            <ChevronRight className="w-4 h-4" />
          </div>

          <div
            className={`flex items-center justify-between p-3 rounded cursor-pointer transition-colors ${activeTab === 'Change Password' ? 'bg-[#E28B27] text-white' : 'bg-[#121212] hover:bg-gray-600'
              }`}
            onClick={() => setActiveTab('Change Password')}
          >
            <span className="text-sm font-medium">Change Password</span>
            <ChevronRight className="w-4 h-4" />
          </div>

          <div
            className={`flex items-center justify-between p-3 rounded cursor-pointer transition-colors ${activeTab === 'Notifications' ? 'bg-[#E28B27] text-white' : 'bg-[#121212] hover:bg-gray-600'
              }`}
            onClick={() => setActiveTab('Notifications')}
          >
            <span className="text-sm font-medium">Notifications</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-[#282727] p-8 rounded-lg">
        <div className="max-w-2xl">
          {activeTab === 'Basic' && renderBasicContent()}
          {activeTab === 'Change Password' && renderPasswordContent()}
          {activeTab === 'Notifications' && (
            <>
              <h1 className="text-xl font-medium text-white mb-8">Notifications</h1>
              <p className="text-gray-400">Notification settings will be displayed here.</p>
            </>
          )}

          {/* Save Button */}
          <div className="mt-8">
            <button
              onClick={handleSave}
              className="bg-[#E28B27] hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsProfile;