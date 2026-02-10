import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const ConsumerProfile: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      // 1. Get basic user info from local storage (or context)
      const storedUser = localStorage.getItem('user');
      let userData = storedUser ? JSON.parse(storedUser) : {};

      // 2. Fetch plants for stats
      let plantCount = 0;
      let totalCapacity = 0;
      try {
        const plantResponse = await axios.get('/user/my-plants');
        if (plantResponse.data && plantResponse.data.result) {
          const plants = plantResponse.data.result;
          plantCount = plants.length;
          // Assuming plantCapacity is a string like "5 kW" or number in kW
          // We need to parse it if we want to sum it up. 
          // In Plant ADD form, 'roofArea' was used, capacity wasn't explicit or was calculated.
          // Let's assume for now we count plants. estimating capacity is hard without field.
          // But we can try to guess or just leave it as N/A or 0 for now if field missing.
          // If we have 'plantCapacity' in the plant object (added by backend calculation?), use it.
          // Otherwise, 0.
          totalCapacity = plants.reduce((acc: number, curr: any) => acc + (parseFloat(curr.plantCapacity || 0) || 0), 0);
        }
      } catch (e) {
        // Silently fail - plant stats just won't show
      }

      setProfile({
        ...userData,
        name: userData.firstName ? `${userData.firstName} ${userData.lastName}` : userData.name || 'User',
        email: userData.email,
        phone: userData.phone || 'N/A',
        address: userData.address || 'N/A',
        plantCount,
        totalCapacity: `${totalCapacity} kW`,
        joinDate: userData.createdAt || new Date().toISOString(),
        isActive: userData.status === 1 // Assuming 1 is active
      });
      setFormData(userData);

    } catch (error) {
      // Silently fail - will show empty state
      // Don't show error toast, just show whatever data we have from localStorage
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    try {
      await axios.put('/user/profile/update', formData);
      toast.success("Profile Updated Successfully!");

      // Update local storage and state
      const updatedUser = { ...JSON.parse(localStorage.getItem('user') || '{}'), ...formData };
      localStorage.setItem('user', JSON.stringify(updatedUser)); // Update local storage

      setProfile(prev => ({
        ...prev,
        ...formData,
        name: formData.firstName ? `${formData.firstName} ${formData.lastName}` : formData.name
      }));
      setEditing(false);
    } catch (error) {
      toast.error("Failed to update profile.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#052F2B]"></div>
      </div>
    );
  }

  if (!profile) return <div>Load failed</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-[#0b1f33] tracking-tight">My Profile</h1>
          <p className="text-[#64748b] mt-1">Manage your personal information and account settings</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Profile Card */}
        <div className="space-y-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-24 bg-[#052F2B]"></div>
            <div className="relative z-10 -mt-4">
              <img
                src={`https://ui-avatars.com/api/?name=${profile.name || 'User'}&size=128&background=43EBA6&color=052F2B&bold=true`}
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg mx-auto mb-4"
              />
              <h5 className="font-black text-xl text-[#0b1f33]">{profile.name}</h5>
              <p className="text-gray-500 text-sm mb-4">{profile.email}</p>
              <button className="px-4 py-2 bg-emerald-50 text-emerald-700 text-sm font-bold rounded-lg hover:bg-emerald-100 transition">
                Change Photo
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h6 className="font-bold text-[#0b1f33] mb-4 border-b border-gray-100 pb-2">Account Summary</h6>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">Solar Plants</span>
                <span className="font-bold text-[#0b1f33]">{profile.plantCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">Total Capacity</span>
                <span className="font-bold text-[#0b1f33]">{profile.totalCapacity}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">Joined</span>
                <span className="font-bold text-[#0b1f33]">{new Date(profile.joinDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">Status</span>
                <span className={`px-2 py-0.5 rounded text-xs font-bold ${profile.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'}`}>
                  {profile.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Details & Settings */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
              <h6 className="font-bold text-[#0b1f33] text-lg">Personal Information</h6>
              <button
                onClick={() => setEditing(!editing)}
                className={`text-sm font-bold px-4 py-2 rounded-lg transition ${editing ? 'bg-gray-100 text-gray-600' : 'bg-[#052F2B] text-white hover:bg-[#0b1f33]'}`}
              >
                {editing ? 'Cancel' : 'Edit Details'}
              </button>
            </div>

            {editing ? (
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">First Name</label>
                    <input type="text" name="firstName" value={formData.firstName || ''} onChange={handleInputChange} className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#43EBA6] focus:ring-2 focus:ring-[#43EBA6]/20 outline-none transition" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Last Name</label>
                    <input type="text" name="lastName" value={formData.lastName || ''} onChange={handleInputChange} className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#43EBA6] focus:ring-2 focus:ring-[#43EBA6]/20 outline-none transition" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Email</label>
                    <input type="email" name="email" value={formData.email || ''} disabled className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 cursor-not-allowed" title="Email cannot be changed" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Phone</label>
                    <input type="tel" name="phone" value={formData.phone || ''} onChange={handleInputChange} className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#43EBA6] focus:ring-2 focus:ring-[#43EBA6]/20 outline-none transition" />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Address</label>
                    <textarea rows={2} name="address" value={formData.address || ''} onChange={handleInputChange} className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#43EBA6] focus:ring-2 focus:ring-[#43EBA6]/20 outline-none transition"></textarea>
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <button type="button" onClick={handleSaveProfile} className="px-6 py-3 bg-[#052F2B] text-white font-bold rounded-xl shadow-lg hover:bg-[#0b1f33] transition">
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wide block mb-1">Full Name</label>
                    <div className="font-bold text-[#0b1f33]">{profile.name}</div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wide block mb-1">Email</label>
                    <div className="font-bold text-[#0b1f33]">{profile.email}</div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wide block mb-1">Phone</label>
                    <div className="font-bold text-[#0b1f33]">{profile.phone}</div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wide block mb-1">Address</label>
                    <div className="font-bold text-[#0b1f33]">{profile.address}</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h6 className="font-bold text-[#0b1f33] text-lg mb-6 border-b border-gray-100 pb-4">Security Settings</h6>
            <div className="grid md:grid-cols-2 gap-6">
              <button className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-[#43EBA6] hover:bg-emerald-50/30 transition group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 group-hover:bg-[#43EBA6] group-hover:text-[#052F2B] transition">
                    <i className="fas fa-key"></i>
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-[#0b1f33]">Change Password</div>
                    <div className="text-xs text-gray-500">Update your password</div>
                  </div>
                </div>
                <i className="fas fa-chevron-right text-gray-300 group-hover:text-[#43EBA6]"></i>
              </button>

              <button className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-[#43EBA6] hover:bg-emerald-50/30 transition group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 group-hover:bg-[#43EBA6] group-hover:text-[#052F2B] transition">
                    <i className="fas fa-shield-alt"></i>
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-[#0b1f33]">Two-Factor Auth</div>
                    <div className="text-xs text-gray-500">Add extra security</div>
                  </div>
                </div>
                <i className="fas fa-chevron-right text-gray-300 group-hover:text-[#43EBA6]"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsumerProfile;