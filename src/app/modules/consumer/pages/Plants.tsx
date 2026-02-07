import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';

const ConsumerPlants: React.FC = () => {
  const [plants, setPlants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPlants([
        {
          _id: '1',
          propertyName: 'Home Solar System',
          propertyType: 'Housing Society',
          address: '123 Main St',
          city: 'New York',
          state: 'NY',
          pincode: '10001',
          roofArea: '200 sq ft',
          billAmount: 5000,
          billImage: '',
          electricityRate: 8.5,
          createdAt: '2023-01-15',
          status: 'Submitted'
        },
        {
          _id: '2',
          propertyName: 'Office Building Solar',
          propertyType: 'Manufacturing Unit',
          address: '456 Business Ave',
          city: 'San Francisco',
          state: 'CA',
          pincode: '94105',
          roofArea: '500 sq ft',
          billAmount: 12000,
          billImage: '',
          electricityRate: 9.2,
          createdAt: '2023-03-22',
          status: 'Approved'
        }
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const handleDeletePlant = (id: string) => {
    if (window.confirm('Are you sure you want to delete this plant?')) {
      setPlants(plants.filter(plant => plant._id !== id));
      toast.success('Plant deleted successfully');
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would call the API
    const newPlant = {
      _id: (plants.length + 1).toString(),
      ...formData,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'Submitted'
    };
    
    setPlants([...plants, newPlant]);
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
    setShowAddForm(false);
    toast.success('Plant added successfully');
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="h3 mb-0 text-gray-800">My Solar Plants</h1>
            <button 
              className="btn btn-primary"
              onClick={() => setShowAddForm(!showAddForm)}
            >
              {showAddForm ? 'Cancel' : 'Add New Plant'}
            </button>
          </div>

          {showAddForm && (
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Add New Plant</h6>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="propertyName" className="form-label">Property Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="propertyName"
                          name="propertyName"
                          value={formData.propertyName}
                          onChange={handleInputChange}
                          placeholder="Enter property name"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="propertyType" className="form-label">Property Type</label>
                        <select
                          className="form-select"
                          id="propertyType"
                          name="propertyType"
                          value={formData.propertyType}
                          onChange={handleInputChange}
                        >
                          <option value="Housing Society">Housing Society</option>
                          <option value="Manufacturing Unit">Manufacturing Unit</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input
                          type="text"
                          className="form-control"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          placeholder="Enter address"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="city" className="form-label">City</label>
                        <input
                          type="text"
                          className="form-control"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="Enter city"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="row">
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="state" className="form-label">State</label>
                        <input
                          type="text"
                          className="form-control"
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          placeholder="Enter state"
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="pincode" className="form-label">Pincode</label>
                        <input
                          type="text"
                          className="form-control"
                          id="pincode"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleInputChange}
                          placeholder="Enter pincode"
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="roofArea" className="form-label">Roof Area (sq ft)</label>
                        <input
                          type="text"
                          className="form-control"
                          id="roofArea"
                          name="roofArea"
                          value={formData.roofArea}
                          onChange={handleInputChange}
                          placeholder="Enter roof area"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="row">
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="billAmount" className="form-label">Bill Amount</label>
                        <input
                          type="number"
                          className="form-control"
                          id="billAmount"
                          name="billAmount"
                          value={formData.billAmount}
                          onChange={handleInputChange}
                          placeholder="Enter bill amount"
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="electricityRate" className="form-label">Electricity Rate</label>
                        <input
                          type="number"
                          step="0.01"
                          className="form-control"
                          id="electricityRate"
                          name="electricityRate"
                          value={formData.electricityRate}
                          onChange={handleInputChange}
                          placeholder="Enter electricity rate"
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="billImage" className="form-label">Bill Document</label>
                        <input
                          type="file"
                          className="form-control"
                          id="billImage"
                          name="billImage"
                          onChange={handleFileChange}
                          accept=".pdf,.jpg,.jpeg,.png"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <button type="submit" className="btn btn-primary">Submit Plant</button>
                </form>
              </div>
            </div>
          )}

          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Plants List</h6>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Property Name</th>
                      <th>Location</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Date Submitted</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {plants.map(plant => (
                      <tr key={plant._id}>
                        <td>{plant.propertyName || 'N/A'}</td>
                        <td>{plant.city}, {plant.state}</td>
                        <td>{plant.propertyType}</td>
                        <td>
                          <span className={`badge ${
                            plant.status === 'Approved' ? 'bg-success' : 
                            plant.status === 'Rejected' ? 'bg-danger' : 'bg-warning'
                          }`}>
                            {plant.status}
                          </span>
                        </td>
                        <td>{plant.createdAt}</td>
                        <td>
                          <Link 
                            to={`/consumer/plants/${plant._id}`} 
                            className="btn btn-sm btn-primary me-1"
                          >
                            View
                          </Link>
                          <button 
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDeletePlant(plant._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsumerPlants;