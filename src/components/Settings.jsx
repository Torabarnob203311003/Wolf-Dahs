import { useState, useRef, useEffect } from 'react';
import { ChevronRight, Edit, Eye, EyeOff } from 'lucide-react';
import axiosSecure from '../lib/axiosSecure';
import placeholderImage from "/placeholder.jpg";
import { useAuth } from '../context/AuthContext';
import { ScaleLoader } from "react-spinners";

function SettingsProfile() {
  const [activeTab, setActiveTab] = useState('Basic');
  // const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const {user, loading} = useAuth();
  

  if(loading){
    return <>
      <div className="p-12 flex flex-col items-center justify-center">
        <ScaleLoader
          color='#facc15'
          loading={loading}
          cssOverride={{ display: "block", margin: "0 auto" }}
          size={150}
          aria-label="Loading Spinner"
        />
        <p className="text-gray-400 text-sm mt-4">Loading user...</p>
      </div>
    </>
  }
  
  
  return (
    <div className="min-h-screen text-white flex gap-8 p-8">
      {/* Sidebar */}
      <div className="w-64 bg-[#282727] p-4 rounded-lg h-fit">
        <div className="space-y-2">
          {[
            { id: 'Basic', label: 'Basic' },
            { id: 'Change Password', label: 'Change Password' },
            { id: 'createAdmin', label: 'Create Admin' },
            { id: 'Notifications', label: 'Notifications' }
          ].map((tab) => (
            <div
              key={tab.id}
              className={`flex items-center justify-between p-3 rounded cursor-pointer transition-colors ${
                activeTab === tab.id ? 'bg-[#E28B27] text-white' : 'bg-[#121212] hover:bg-gray-600'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="text-sm font-medium">{tab.label}</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-[#282727] p-8 rounded-lg">
        <div className="max-w-2xl">
          {activeTab === 'Basic' && <BasicProfileSection userId={user._id} />}
          {activeTab === 'Change Password' && <ChangePasswordSection userId={user._id} />}
          {activeTab === 'createAdmin' && <CreateAdminSection />}
          {activeTab === 'Notifications' && <NotificationsSection />}
        </div>
      </div>
    </div>
  );
}

// Basic Profile Section Component
function BasicProfileSection({ userId }) {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [profileImage, setProfileImage] = useState(placeholderImage);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    country: '',
    city: '',
    province: '',
    gender: '',
    bio: '',
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
        
        setFormData({
          displayName: user.userName || '',
          email: user.email || '',
          country: user.country || '',
          city: user.city || '',
          province: user.province || '',
          gender: user.gender || '',
          bio: user.bio || '',
        });

        if (user.photoUrl) {
          setProfileImage(user.photoUrl);
        }
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
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

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      if (file.size > 20 * 1024 * 1024) {
        alert('Image size should be less than 20MB');
        return;
      }

      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {
    try {
      setLoading(true);

      // Create FormData for multipart/form-data
      const formDataToSend = new FormData();
      
      // Append profile data
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

      console.log('Saving profile data:', {
        displayName: formData.displayName,
        email: formData.email,
        country: formData.country,
        city: formData.city,
        province: formData.province,
        gender: formData.gender,
        bio: formData.bio,
        hasImage: !!selectedFile
      });

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
        setUserData(response.data.data);
        setSelectedFile(null);
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
  };

  return (
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

      {/* Save Button */}
      <div className="mt-8">
        <button
          onClick={handleSaveProfile}
          disabled={loading}
          className="bg-[#E28B27] hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : 'Save Profile'}
        </button>
      </div>
    </>
  );
}

// Change Password Section Component
function ChangePasswordSection({ userId }) {
  const [loading, setLoading] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleChangePassword = async () => {
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

      console.log('Changing password with data:', {
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
        confirmPassword: passwordData.confirmPassword
      });

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
  };

  return (
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

      {/* Change Password Button */}
      <div className="mt-8">
        <button
          onClick={handleChangePassword}
          disabled={loading}
          className="bg-[#E28B27] hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Changing Password...' : 'Change Password'}
        </button>
      </div>
    </>
  );
}

// Create Admin Section Component
function CreateAdminSection() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [adminData, setAdminData] = useState({
    adminName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleAdminChange = (field, value) => {
    setAdminData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCreateAdmin = async () => {
  try {
    setLoading(true);

    // Validation
    if (!adminData.adminName || !adminData.email || !adminData.password || !adminData.confirmPassword) {
      alert('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (adminData.password !== adminData.confirmPassword) {
      alert('Password and confirmation do not match');
      setLoading(false);
      return;
    }

    if (adminData.password.length < 8) {
      alert('Password must be at least 8 characters long');
      setLoading(false);
      return;
    }

    console.log('Creating admin with data:', {
      userName: adminData.adminName, // Make sure this matches backend expectation
      email: adminData.email,
      password: adminData.password,
    });

    // API Call - Use the exact field names your backend expects
    const response = await axiosSecure.post('/users/create-admin', {
      userName: adminData.adminName, // Changed from username to userName
      email: adminData.email,
      password: adminData.password,
      role: adminData.role
    });

    if (response.data.success) {
      alert('Admin created successfully!');
      // Reset form
      setAdminData({
        adminName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: ''
      });
    }
  } catch (error) {
    console.error('Error creating admin:', error);
    const errorMessage = error.response?.data?.message || 
                        error.response?.data?.errorSources?.[0]?.message ||
                        'Failed to create admin. Please try again.';
    alert(errorMessage);
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <h1 className="text-xl font-medium text-white mb-8">Create Admin</h1>

      <div className="space-y-6">
        {/* Admin Name */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Admin Name</label>
          <input
            type="text"
            placeholder="Enter Admin Name"
            value={adminData.adminName}
            onChange={(e) => handleAdminChange('adminName', e.target.value)}
            className="w-full bg-[#121212] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
          <input
            type="email"
            placeholder="Enter admin email"
            value={adminData.email}
            onChange={(e) => handleAdminChange('email', e.target.value)}
            className="w-full bg-[#121212] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create password"
              value={adminData.password}
              onChange={(e) => handleAdminChange('password', e.target.value)}
              className="w-full bg-[#121212] border border-gray-600 rounded-lg px-4 py-3 pr-12 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Password should be at least 8 characters with letters and numbers
          </p>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              value={adminData.confirmPassword}
              onChange={(e) => handleAdminChange('confirmPassword', e.target.value)}
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

      {/* Create Admin Button */}
      <div className="mt-8">
        <button
          onClick={handleCreateAdmin}
          disabled={loading}
          className="bg-[#E28B27] hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Creating Admin...' : 'Create Admin'}
        </button>
      </div>
    </>
  );
}

// Notifications Section Component
function NotificationsSection() {
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    raffleUpdates: true,
    prizeAlerts: true,
    newsletter: false
  });

  const handleNotificationChange = (setting, value) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleSaveNotifications = async () => {
    try {
      console.log('Saving notification settings:', notificationSettings);
      
      // API Call - Replace with your actual endpoint
      const response = await axiosSecure.patch('/users/update-notifications', {
        notifications: notificationSettings
      });

      if (response.data.success) {
        alert('Notification settings updated successfully!');
      }
    } catch (error) {
      console.error('Error updating notifications:', error);
      alert('Failed to update notification settings');
    }
  };

  return (
    <>
      <h1 className="text-xl font-medium text-white mb-8">Notifications</h1>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-[#121212] rounded-lg">
          <div>
            <h3 className="text-white font-medium">Email Notifications</h3>
            <p className="text-gray-400 text-sm">Receive updates via email</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={notificationSettings.emailNotifications}
              onChange={(e) => handleNotificationChange('emailNotifications', e.target.checked)}
              className="sr-only peer" 
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-[#121212] rounded-lg">
          <div>
            <h3 className="text-white font-medium">Push Notifications</h3>
            <p className="text-gray-400 text-sm">Receive browser notifications</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={notificationSettings.pushNotifications}
              onChange={(e) => handleNotificationChange('pushNotifications', e.target.checked)}
              className="sr-only peer" 
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-[#121212] rounded-lg">
          <div>
            <h3 className="text-white font-medium">Raffle Updates</h3>
            <p className="text-gray-400 text-sm">Get notified about new raffles</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={notificationSettings.raffleUpdates}
              onChange={(e) => handleNotificationChange('raffleUpdates', e.target.checked)}
              className="sr-only peer" 
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
          </label>
        </div>
      </div>

      {/* Save Notifications Button */}
      <div className="mt-8">
        <button
          onClick={handleSaveNotifications}
          className="bg-[#E28B27] hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-medium transition-colors"
        >
          Save Notification Settings
        </button>
      </div>
    </>
  );
}

export default SettingsProfile;

