import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const PlantDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [plant, setPlant] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlantDetail();
  }, [id]);

  const fetchPlantDetail = async () => {
    try {
      // Since we don't have a single get endpoint, we fetch all and find
      const response = await axios.get('/user/my-plants');
      if (response.data && response.data.result) {
        const foundPlant = response.data.result.find((p: any) => p._id === id);
        if (foundPlant) {
          // Flatten nested propertyAddress for easier access
          const flattenedPlant = {
            ...foundPlant,
            propertyName: foundPlant.propertyAddress?.propertyName || foundPlant.propertyName || 'N/A',
            propertyType: foundPlant.propertyAddress?.propertyType || foundPlant.propertyType,
            address: foundPlant.propertyAddress?.address || foundPlant.address,
            city: foundPlant.propertyAddress?.city || foundPlant.city,
            state: foundPlant.propertyAddress?.state || foundPlant.state,
            pincode: foundPlant.propertyAddress?.pincode || foundPlant.pincode,
            roofArea: foundPlant.propertyAddress?.roofArea || foundPlant.roofArea,
            billAmount: foundPlant.propertyAddress?.billAmount || foundPlant.billAmount,
            billImage: foundPlant.propertyAddress?.billImage || foundPlant.billImage,
            electricityRate: foundPlant.propertyAddress?.electricityRate || foundPlant.electricityRate,
          };
          setPlant(flattenedPlant);
        } else {
          // Plant not found - will show not found state
        }
      }
    } catch (error) {
      // Silently fail - page will show "not found" state
      // Don't show error toast, page will show "not found" state
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#052F2B]"></div>
      </div>
    );
  }

  if (!plant) {
    return (
      <div className="p-6 bg-red-50 text-red-600 rounded-xl border border-red-100">
        Plant not found. <Link to="/consumer/plants" className="underline font-bold">Go back</Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <Link to="/consumer/dashboard" className="hover:text-[#052F2B]">Dashboard</Link>
          <i className="fas fa-chevron-right text-xs"></i>
          <Link to="/consumer/plants" className="hover:text-[#052F2B]">My Plants</Link>
          <i className="fas fa-chevron-right text-xs"></i>
          <span className="font-bold text-[#0b1f33]">Plant #{plant._id?.toString().slice(-6).toUpperCase()}</span>
        </div>
        <div className="flex justify-between items-end">
          <h1 className="text-3xl font-black text-[#0b1f33] tracking-tight">Plant Details</h1>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 transition shadow-sm">
              <i className="fas fa-edit me-2"></i> Edit
            </button>
          </div>
        </div>
      </div>

      {/* Admin Note / Status Warning */}
      {(plant.adminNote || plant.plantStatus === 3 || plant.status === 'Rejected') && (
        <div className={`p-6 rounded-2xl border ${plant.plantStatus === 3 || plant.status === 'Rejected' ? 'bg-red-50 border-red-100' : 'bg-yellow-50 border-yellow-100'
          }`}>
          <div className="flex gap-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${plant.plantStatus === 3 || plant.status === 'Rejected' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'
              }`}>
              <i className={`fas ${plant.plantStatus === 3 || plant.status === 'Rejected' ? 'fa-exclamation-circle' : 'fa-info-circle'} text-xl`}></i>
            </div>
            <div>
              <h4 className={`font-bold text-lg mb-1 ${plant.plantStatus === 3 || plant.status === 'Rejected' ? 'text-red-800' : 'text-yellow-800'
                }`}>
                {plant.plantStatus === 3 || plant.status === 'Rejected' ? 'Action Required: Plant Rejected' : 'Admin Note'}
              </h4>
              <p className={`${plant.plantStatus === 3 || plant.status === 'Rejected' ? 'text-red-700' : 'text-yellow-700'
                }`}>
                {plant.adminNote || "Please review your application details or contact admin."}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Info Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Property Info */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <h3 className="font-bold text-[#0b1f33] text-xl mb-6 border-b border-gray-100 pb-4">Property Information</h3>
          <div className="grid md:grid-cols-2 gap-y-6 gap-x-12">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Property Name</label>
              <div className="font-bold text-[#0b1f33] text-lg">{plant.propertyName}</div>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Type</label>
              <div className="font-bold text-[#0b1f33] text-lg">
                {plant.propertyType === 1 ? 'Housing Society' : plant.propertyType === 2 ? 'Manufacturing Unit' : plant.propertyType}
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Address</label>
              <div className="font-bold text-[#0b1f33] text-lg">{plant.address}, {plant.city}, {plant.state} - {plant.pincode}</div>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Bill Amount</label>
              <div className="font-bold text-[#0b1f33] text-lg">₹ {plant.billAmount?.toLocaleString()}</div>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Status</label>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${plant.plantStatus === 2 || plant.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                plant.plantStatus === 3 || plant.status === 'Rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                {plant.plantStatus === 1 ? 'Submitted' : plant.plantStatus === 2 ? 'Approved' : plant.plantStatus === 3 ? 'Rejected' : (plant.status || 'Submitted')}
              </span>
            </div>
          </div>

          <h3 className="font-bold text-[#0b1f33] text-xl mb-6 mt-10 border-b border-gray-100 pb-4">Application Details</h3>
          <div className="grid md:grid-cols-2 gap-y-6 gap-x-12">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Roof Area</label>
              <div className="font-bold text-[#0b1f33] text-lg">{plant.roofArea} sq ft</div>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Submitted On</label>
              <div className="font-bold text-[#0b1f33] text-lg">{new Date(plant.createdAt).toLocaleDateString()}</div>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Electricity Rate</label>
              <div className="font-bold text-[#0b1f33] text-lg">₹ {plant.electricityRate}/kWh</div>
            </div>
          </div>
        </div>

        {/* Sidebar Cards */}
        <div className="space-y-6">
          {/* Documents */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h4 className="font-bold text-[#0b1f33] mb-4">Documents</h4>
            <div className="space-y-3">
              {plant.billImage && (
                <div className="flex items-center p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition cursor-pointer" onClick={() => window.open(plant.billImage, '_blank')}>
                  <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center me-3">
                    <i className="fas fa-file-image"></i>
                  </div>
                  <div className="overflow-hidden">
                    <div className="font-bold text-[#0b1f33] text-sm truncate">Electricity Bill</div>
                    <div className="text-xs text-gray-500">View Document</div>
                  </div>
                </div>
              )}
              {!plant.billImage && (
                <div className="text-sm text-gray-500 italic">No documents uploaded.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantDetail;