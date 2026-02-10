import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';

const ConsumerPlants: React.FC = () => {
  const [plants, setPlants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    try {
      const response = await axios.get('/user/my-plants');
      if (response.data && response.data.result) {
        // Flatten nested propertyAddress for easier access
        const flattenedPlants = response.data.result.map((plant: any) => ({
          ...plant,
          propertyName: plant.propertyAddress?.propertyName || plant.propertyName || 'N/A',
          propertyType: plant.propertyAddress?.propertyType || plant.propertyType,
          address: plant.propertyAddress?.address || plant.address,
          city: plant.propertyAddress?.city || plant.city,
          state: plant.propertyAddress?.state || plant.state,
          pincode: plant.propertyAddress?.pincode || plant.pincode,
          roofArea: plant.propertyAddress?.roofArea || plant.roofArea,
          billAmount: plant.propertyAddress?.billAmount || plant.billAmount,
          billImage: plant.propertyAddress?.billImage || plant.billImage,
          electricityRate: plant.propertyAddress?.electricityRate || plant.electricityRate,
        }));
        setPlants(flattenedPlants);
      } else {
        setPlants([]);
      }
    } catch (error) {
      // Silently fail - will show empty state
      setPlants([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePlant = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this plant?')) {
      try {
        // Placeholder for delete functionality
        toast.info("Delete functionality not yet available from backend.");
      } catch (error) {
        toast.error("Failed to delete plant");
      }
    }
  };

  // Form state
  const [formData, setFormData] = useState({
    propertyName: '',
    propertyType: 'Housing Society',
    address: '',
    city: '',
    state: '',
    pincode: '',
    roofArea: '',
    billAmount: '',
    electricityRate: '',
    billImage: null as File | null
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, billImage: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append('propertyName', formData.propertyName);
      data.append('propertyType', formData.propertyType === 'Housing Society' ? '1' : '2');
      data.append('address', formData.address);
      data.append('city', formData.city);
      data.append('state', formData.state);
      data.append('pincode', formData.pincode);
      data.append('roofArea', formData.roofArea);
      data.append('billAmount', formData.billAmount);
      data.append('electricityRate', formData.electricityRate);
      if (formData.billImage) {
        data.append('billImage', formData.billImage);
      }

      await axios.post('/user/plant/add', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      toast.success('Plant added successfully');
      setShowAddModal(false);
      setFormData({
        propertyName: '',
        propertyType: 'Housing Society',
        address: '',
        city: '',
        state: '',
        pincode: '',
        roofArea: '',
        billAmount: '',
        electricityRate: '',
        billImage: null
      });
      fetchPlants();

    } catch (error) {
      toast.error("Failed to add plant. Check required fields.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#052F2B]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-[#0b1f33] tracking-tight">My Solar Plants</h1>
          <p className="text-[#64748b] mt-1">Manage your solar installations and monitor performance</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 bg-[#052F2B] text-white font-bold rounded-xl shadow-lg hover:bg-[#0b1f33] transition-all flex items-center gap-2"
        >
          <i className="fas fa-plus-circle"></i> Add New Plant
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#f8fafc] text-xs uppercase text-gray-500 font-bold border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Property Name</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date Submitted</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {plants.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No plants found. Add your first solar plant to get started.
                  </td>
                </tr>
              ) : plants.map(plant => (
                <tr key={plant._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-[#0b1f33]">
                    {plant.propertyName || 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-gray-600 font-medium">
                    {plant.city}, {plant.state}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {plant.propertyType === 1 ? 'Housing Society' : plant.propertyType === 2 ? 'Manufacturing Unit' : plant.propertyType}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${plant.status === 'Approved' || plant.plantStatus === 2 ? 'bg-emerald-100 text-emerald-800' :
                      plant.status === 'Rejected' || plant.plantStatus === 3 ? 'bg-red-100 text-red-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                      {plant.plantStatus === 1 ? 'Submitted' : plant.plantStatus === 2 ? 'Approved' : plant.plantStatus === 3 ? 'Rejected' : (plant.status || 'Submitted')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm">
                    {new Date(plant.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        to={`/consumer/plants/${plant._id}`}
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition"
                        title="View Details"
                      >
                        <i className="fas fa-eye"></i>
                      </Link>
                      <button
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                        onClick={() => handleDeletePlant(plant._id)}
                        title="Delete Plant"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Plant Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered size="lg" contentClassName="rounded-3xl border-0 overflow-hidden">
        <div className="bg-[#052F2B] p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-2 -mr-2 w-20 h-20 bg-[#43EBA6] rounded-full opacity-20 blur-2xl"></div>
          <h4 className="font-black text-xl relative z-10">Add New Plant</h4>
          <p className="text-[#ECFDF5]/70 text-sm relative z-10">Register your solar installation</p>
        </div>
        <div className="p-8">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Property Name</label>
                <input
                  required
                  type="text"
                  name="propertyName"
                  value={formData.propertyName}
                  onChange={handleInputChange}
                  placeholder="e.g. My Home Solar"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#052F2B] focus:ring-0 transition-all font-bold text-[#0b1f33]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Property Type</label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#052F2B] focus:ring-0 transition-all font-bold text-[#0b1f33]"
                >
                  <option value="Housing Society">Housing Society</option>
                  <option value="Manufacturing Unit">Manufacturing Unit</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Address</label>
                <input
                  required
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Full street address"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#052F2B] focus:ring-0 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">City</label>
                <input
                  required
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#052F2B] focus:ring-0 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">State</label>
                <input
                  required
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#052F2B] focus:ring-0 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Pincode</label>
                <input
                  required
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#052F2B] focus:ring-0 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Roof Area (sq ft)</label>
                <input
                  required
                  type="number"
                  name="roofArea"
                  value={formData.roofArea}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#052F2B] focus:ring-0 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Previous Bill Amount (₹)</label>
                <input
                  required
                  type="number"
                  name="billAmount"
                  value={formData.billAmount}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#052F2B] focus:ring-0 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Electricity Rate (₹/kWh)</label>
                <input
                  required
                  type="number"
                  step="0.01"
                  name="electricityRate"
                  value={formData.electricityRate}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#052F2B] focus:ring-0 transition-all"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Recent Bill Document</label>
                <input
                  required
                  type="file"
                  name="billImage"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#052F2B] focus:ring-0 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#052F2B] file:text-white hover:file:bg-[#0b1f33]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="light" onClick={() => setShowAddModal(false)} className="py-3 rounded-xl font-bold border border-gray-200 text-gray-600 hover:bg-gray-50 bg-white">
                Cancel
              </Button>
              <Button
                type="submit"
                className="py-3 rounded-xl font-bold bg-[#052F2B] border-0 hover:bg-[#0b1f33] shadow-lg shadow-[#052F2B]/20 text-white"
              >
                Submit Application
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default ConsumerPlants;