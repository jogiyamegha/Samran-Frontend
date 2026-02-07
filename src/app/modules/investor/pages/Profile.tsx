import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../auth';
import APICallService from '../../../../api/apiCallService';
import * as apiEndpoints from '../../../../api/apiEndPoints';
import { toast } from 'react-toastify';

const InvestorProfile: React.FC = () => {
  const { currentUser, saveCurrentUser } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    if (currentUser) {
      setProfile({
        name: currentUser.name || 'N/A',
        email: currentUser.email || 'N/A',
        phone: currentUser.phone || 'N/A',
        address: currentUser.address || 'N/A',
        investmentCount: 0, // Should be fetched from another API if needed
        joinDate: currentUser.createdAt ? new Date(currentUser.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'N/A',
      });
      setFormData({
        name: currentUser.name || '',
        phone: currentUser.phone || '',
        address: currentUser.address || ''
      });
      setLoading(false);
    }
  }, [currentUser]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const apiCall = new APICallService(apiEndpoints.USER.UPDATE_PROFILE, formData);
      const res = await apiCall.callAPI();
      if (res) {
        saveCurrentUser(res);
        toast.success("Profile updated successfully");
        setEditing(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  if (loading || !profile) {
    return (
      <div className="flex justify-center py-40">
        <div className="w-12 h-12 border-4 border-ps-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-12"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-5xl md:text-6xl fw-900 ls-n4 mb-3 modern-gradient-text">
            Account Settings
          </h1>
          <p className="text-xl text-slate-500 font-light max-w-2xl">
            Manage your digital identity, security preferences, and portfolio settings.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Left: Identity Card */}
        <div className="xl:col-span-4 space-y-8">
          <motion.div variants={itemVariants} className="glass-card p-10 rounded-4xl shadow-elegant text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-2 bg-ps-primary"></div>
            <div className="relative inline-block mb-8 mt-4">
              <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-ps-primary to-indigo-500 shadow-xl group-hover:scale-105 transition-transform duration-500">
                <img
                  className="w-full h-full rounded-full border-4 border-white object-cover"
                  src={currentUser?.profilePicture ? `${import.meta.env.VITE_APP_API_URL || "http://127.0.0.1:7000/"}${currentUser.profilePicture}` : `https://ui-avatars.com/api/?name=${profile.name}&size=200&background=0b1f33&color=fff`}
                  alt="Profile"
                />
              </div>
              <button className="absolute bottom-1 right-1 w-10 h-10 bg-ps-primary text-[#052F2B] rounded-full shadow-lg border-4 border-white flex items-center justify-center hover:scale-110 transition-transform">
                <i className="fas fa-camera text-xs"></i>
              </button>
            </div>
            <h2 className="text-3xl font-black text-ps-secondary mb-1">{profile.name}</h2>
            <p className="text-slate-400 font-medium mb-8">{profile.email}</p>
            <div className="inline-flex items-center px-5 py-2 bg-emerald-100 text-emerald-600 rounded-full text-xs font-black tracking-widest">
              VERIFIED INVESTOR
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="glass-card rounded-4xl shadow-elegant overflow-hidden">
            <div className="p-8 border-b border-slate-100">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Account Statistics</h3>
            </div>
            <div className="divide-y divide-slate-50">
              <div className="flex justify-between p-7 text-sm">
                <span className="text-slate-400 font-medium">Member Since</span>
                <span className="font-black text-ps-secondary">{profile.joinDate}</span>
              </div>
              <div className="flex justify-between p-7 text-sm">
                <span className="text-slate-400 font-medium">Account Status</span>
                <span className="font-black text-emerald-500">Active</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right: Detailed Settings */}
        <div className="xl:col-span-8 space-y-8">
          <motion.div variants={itemVariants} className="glass-card rounded-4xl shadow-elegant overflow-hidden">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-2xl fw-900 text-ps-secondary ls-n1">Personal Information</h3>
              <button
                className={`px-6 py-2.5 rounded-xl font-bold text-xs shadow-sm transition-all border-0 ${editing ? 'bg-slate-100 text-slate-500' : 'bg-ps-primary text-[#052F2B]'}`}
                onClick={() => setEditing(!editing)}
              >
                {editing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>
            <div className="p-10">
              {editing ? (
                <form className="space-y-8" onSubmit={handleUpdate}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ps-1">Full Identity Name</label>
                      <input
                        type="text"
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-ps-primary/20 transition-all font-medium"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ps-1">Contact Number</label>
                      <input
                        type="text"
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-ps-primary/20 transition-all font-medium"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ps-1">Residential Address</label>
                    <textarea
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-ps-primary/20 transition-all font-medium"
                      rows={3}
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    ></textarea>
                  </div>
                  <div className="flex justify-end pt-4">
                    <button type="submit" className="px-10 py-4 bg-ps-primary text-[#052F2B] rounded-2xl font-black shadow-ps hover:shadow-xl hover:-translate-y-0.5 transition-all outline-none border-0">
                      Update Profile
                    </button>
                  </div>
                </form>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-10">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Legal Name</label>
                      <div className="text-lg font-black text-ps-secondary">{profile.name}</div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                      <div className="text-lg font-black text-ps-primary">{profile.email}</div>
                    </div>
                  </div>
                  <div className="space-y-10">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Mobile Number</label>
                      <div className="text-lg font-black text-ps-secondary">{profile.phone}</div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Address</label>
                      <div className="text-lg font-bold text-ps-secondary/70 leading-relaxed">{profile.address}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Security section remains mostly the same, but could be connected later */}
          <motion.div variants={itemVariants} className="glass-card rounded-4xl shadow-elegant overflow-hidden">
            <div className="p-8 border-b border-slate-100">
              <h3 className="text-2xl fw-900 text-ps-secondary ls-n1">Security & Shield</h3>
            </div>
            <div className="p-10 space-y-8">
              <div className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl group">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-ps-secondary group-hover:bg-ps-secondary group-hover:text-white transition-all duration-500">
                    <i className="fas fa-microchip"></i>
                  </div>
                  <div>
                    <h4 className="font-black text-ps-secondary">Two-Factor Authentication</h4>
                    <p className="text-xs text-slate-400 font-medium">Verify login attempts via SMS or Authenticator App.</p>
                  </div>
                </div>
                <div className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-ps-primary"></div>
                </div>
              </div>

              <div className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl group">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-ps-primary group-hover:bg-ps-primary group-hover:text-[#052F2B] transition-all duration-500">
                    <i className="fas fa-shield-alt"></i>
                  </div>
                  <div>
                    <h4 className="font-black text-ps-secondary">Password Integrity</h4>
                    <p className="text-xs text-slate-400 font-medium">Secure your account with regular rotations.</p>
                  </div>
                </div>
                <button className="px-6 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-black text-ps-secondary hover:bg-ps-secondary hover:text-white transition-all outline-none">
                  Update
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default InvestorProfile;