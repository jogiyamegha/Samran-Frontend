import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ConsumerProfile: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    // Simulate fetching profile from API
    setTimeout(() => {
      const mockProfile = {
        id: 1,
        name: 'Rajesh Kumar',
        email: 'rajesh.kumar@example.com',
        phone: '+91-9876543210',
        address: '456 Park Street, Mumbai, Maharashtra 400001',
        plantCount: 2,
        totalCapacity: '15 kW',
        joinDate: '2022-03-15',
        lastLogin: '2023-06-15',
        isActive: true
      };
      setProfile(mockProfile);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <h1 className="h3 mb-2 text-gray-800">Consumer Profile</h1>
          <p className="mb-4">Manage your consumer account information</p>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-4">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Profile Picture</h6>
            </div>
            <div className="card-body text-center">
              <img 
                className="avatar avatar-lg rounded-circle mb-3" 
                src="https://ui-avatars.com/api/?name=Rajesh+Kumar&size=128&background=0D8ABC&color=fff" 
                alt="Profile"
              />
              <h5 className="font-weight-bold">{profile.name}</h5>
              <p className="text-muted">{profile.email}</p>
              <button className="btn btn-primary btn-sm">
                <i className="fas fa-camera"></i> Change Photo
              </button>
            </div>
          </div>

          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Account Summary</h6>
            </div>
            <div className="card-body">
              <div className="list-group list-group-flush">
                <div className="list-group-item d-flex justify-content-between align-items-center">
                  <span>Solar Plants</span>
                  <span className="font-weight-bold">{profile.plantCount}</span>
                </div>
                <div className="list-group-item d-flex justify-content-between align-items-center">
                  <span>Total Capacity</span>
                  <span className="font-weight-bold">{profile.totalCapacity}</span>
                </div>
                <div className="list-group-item d-flex justify-content-between align-items-center">
                  <span>Join Date</span>
                  <span>{profile.joinDate}</span>
                </div>
                <div className="list-group-item d-flex justify-content-between align-items-center">
                  <span>Last Login</span>
                  <span>{profile.lastLogin}</span>
                </div>
                <div className="list-group-item d-flex justify-content-between align-items-center">
                  <span>Account Status</span>
                  <span className={`badge ${
                    profile.isActive ? 'badge-success' : 'badge-secondary'
                  }`}>
                    {profile.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">Personal Information</h6>
              <button 
                className="btn btn-sm btn-outline-primary"
                onClick={() => setEditing(!editing)}
              >
                <i className="fas fa-edit"></i> {editing ? 'Cancel' : 'Edit'}
              </button>
            </div>
            <div className="card-body">
              {editing ? (
                <form>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="firstName">First Name</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="firstName" 
                        defaultValue={profile.name.split(' ')[0]}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="lastName">Last Name</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="lastName" 
                        defaultValue={profile.name.split(' ')[1] || ''}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      id="email" 
                      defaultValue={profile.email}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input 
                      type="tel" 
                      className="form-control" 
                      id="phone" 
                      defaultValue={profile.phone}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <textarea 
                      className="form-control" 
                      id="address" 
                      rows={3}
                      defaultValue={profile.address}
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label htmlFor="accountStatus">Account Status</label>
                    <select 
                      className="form-control" 
                      id="accountStatus"
                      defaultValue={profile.isActive ? 'active' : 'inactive'}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      setEditing(false);
                    }}
                  >
                    Save Changes
                  </button>
                </form>
              ) : (
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group row">
                      <label className="col-sm-4 col-form-label font-weight-bold">Full Name:</label>
                      <div className="col-sm-8">
                        <p className="form-control-plaintext">{profile.name}</p>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-4 col-form-label font-weight-bold">Email:</label>
                      <div className="col-sm-8">
                        <p className="form-control-plaintext">{profile.email}</p>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-4 col-form-label font-weight-bold">Phone:</label>
                      <div className="col-sm-8">
                        <p className="form-control-plaintext">{profile.phone}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group row">
                      <label className="col-sm-4 col-form-label font-weight-bold">Account Status:</label>
                      <div className="col-sm-8">
                        <span className={`badge ${
                          profile.isActive ? 'badge-success' : 'badge-secondary'
                        }`}>
                          {profile.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-4 col-form-label font-weight-bold">Join Date:</label>
                      <div className="col-sm-8">
                        <p className="form-control-plaintext">{profile.joinDate}</p>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-4 col-form-label font-weight-bold">Last Login:</label>
                      <div className="col-sm-8">
                        <p className="form-control-plaintext">{profile.lastLogin}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group row">
                      <label className="col-sm-2 col-form-label font-weight-bold">Address:</label>
                      <div className="col-sm-10">
                        <p className="form-control-plaintext">{profile.address}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Security Settings</h6>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <button className="btn btn-outline-primary btn-block mb-2">
                    <i className="fas fa-key"></i> Change Password
                  </button>
                </div>
                <div className="col-md-6">
                  <button className="btn btn-outline-danger btn-block mb-2">
                    <i className="fas fa-lock"></i> Security Settings
                  </button>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-12">
                  <h6>Two-Factor Authentication</h6>
                  <p className="text-muted">Add an extra layer of security to your account</p>
                  <button className="btn btn-outline-secondary">
                    <i className="fas fa-shield-alt"></i> Enable 2FA
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsumerProfile;