import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const PlantDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [plant, setPlant] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching plant detail from API
    setTimeout(() => {
      const mockPlant = {
        id: parseInt(id || '1'),
        propertyName: id === '2' ? 'Commercial Building B' : 'Residential Complex A',
        propertyType: id === '2' ? 'Manufacturing Unit' : 'Housing Society',
        address: '123 Main Street, Mumbai, Maharashtra 400001',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001',
        roofArea: '1200 sq ft',
        billAmount: 15000,
        electricityRate: 8.5,
        plantStatus: id === '2' ? 'Approved' : 'Submitted',
        plantCapacity: '10 kW',
        expectedYears: 25,
        startDate: '2023-01-15',
        endDate: '2048-01-15',
        ppaDetails: {
          startDate: '2023-01-15',
          endDate: '2048-01-15',
          tariffRate: 5.5,
          escalation: 3
        },
        performance: {
          monthly: [
            { month: 'Jan', generation: 1200, consumption: 1100, export: 100 },
            { month: 'Feb', generation: 1100, consumption: 1050, export: 50 },
            { month: 'Mar', generation: 1300, consumption: 1200, export: 100 },
            { month: 'Apr', generation: 1400, consumption: 1300, export: 100 },
            { month: 'May', generation: 1500, consumption: 1400, export: 100 },
            { month: 'Jun', generation: 1600, consumption: 1500, export: 100 },
          ]
        }
      };
      setPlant(mockPlant);
      setLoading(false);
    }, 500);
  }, [id]);

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

  if (!plant) {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="alert alert-danger" role="alert">
              Plant not found
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
          <h1 className="h3 mb-2 text-gray-800">Plant Details</h1>
          
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/consumer/dashboard">Dashboard</Link></li>
              <li className="breadcrumb-item"><Link to="/consumer/plants">My Plants</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Plant #{plant.id}</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">Plant Information</h6>
              <div>
                <button className="btn btn-sm btn-outline-primary mr-2">
                  <i className="fas fa-edit"></i> Edit
                </button>
                <button className="btn btn-sm btn-outline-info mr-2">
                  <i className="fas fa-file-pdf"></i> Download Report
                </button>
                <button className="btn btn-sm btn-outline-success">
                  <i className="fas fa-history"></i> History
                </button>
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label font-weight-bold">Property Name:</label>
                    <div className="col-sm-8">
                      <p className="form-control-plaintext">{plant.propertyName}</p>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label font-weight-bold">Property Type:</label>
                    <div className="col-sm-8">
                      <p className="form-control-plaintext">{plant.propertyType}</p>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label font-weight-bold">Address:</label>
                    <div className="col-sm-8">
                      <p className="form-control-plaintext">{plant.address}</p>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label font-weight-bold">City:</label>
                    <div className="col-sm-8">
                      <p className="form-control-plaintext">{plant.city}</p>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label font-weight-bold">State:</label>
                    <div className="col-sm-8">
                      <p className="form-control-plaintext">{plant.state}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label font-weight-bold">Pincode:</label>
                    <div className="col-sm-8">
                      <p className="form-control-plaintext">{plant.pincode}</p>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label font-weight-bold">Roof Area:</label>
                    <div className="col-sm-8">
                      <p className="form-control-plaintext">{plant.roofArea}</p>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label font-weight-bold">Bill Amount:</label>
                    <div className="col-sm-8">
                      <p className="form-control-plaintext">₹{plant.billAmount.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label font-weight-bold">Electricity Rate:</label>
                    <div className="col-sm-8">
                      <p className="form-control-plaintext">₹{plant.electricityRate}/kWh</p>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label font-weight-bold">Status:</label>
                    <div className="col-sm-8">
                      <span className={`badge ${
                        plant.plantStatus.toLowerCase() === 'approved' 
                          ? 'badge-success' 
                          : plant.plantStatus.toLowerCase() === 'submitted' 
                            ? 'badge-warning' 
                            : plant.plantStatus.toLowerCase() === 'rejected' 
                              ? 'badge-danger' 
                              : 'badge-secondary'
                      }`}>
                        {plant.plantStatus}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="row mt-4">
                <div className="col-12">
                  <h5>Plant Specifications</h5>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group row">
                        <label className="col-sm-4 col-form-label font-weight-bold">Plant Capacity:</label>
                        <div className="col-sm-8">
                          <p className="form-control-plaintext">{plant.plantCapacity}</p>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-4 col-form-label font-weight-bold">Expected Years:</label>
                        <div className="col-sm-8">
                          <p className="form-control-plaintext">{plant.expectedYears} years</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group row">
                        <label className="col-sm-4 col-form-label font-weight-bold">Start Date:</label>
                        <div className="col-sm-8">
                          <p className="form-control-plaintext">{plant.startDate}</p>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-4 col-form-label font-weight-bold">End Date:</label>
                        <div className="col-sm-8">
                          <p className="form-control-plaintext">{plant.endDate}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">PPA Details</h6>
            </div>
            <div className="card-body">
              <div className="form-group row">
                <label className="col-sm-5 col-form-label font-weight-bold">Agreement Start:</label>
                <div className="col-sm-7">
                  <p className="form-control-plaintext">{plant.ppaDetails.startDate}</p>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-5 col-form-label font-weight-bold">Agreement End:</label>
                <div className="col-sm-7">
                  <p className="form-control-plaintext">{plant.ppaDetails.endDate}</p>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-5 col-form-label font-weight-bold">Tariff Rate (₹/kWh):</label>
                <div className="col-sm-7">
                  <p className="form-control-plaintext">{plant.ppaDetails.tariffRate}</p>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-5 col-form-label font-weight-bold">Escalation (%):</label>
                <div className="col-sm-7">
                  <p className="form-control-plaintext">{plant.ppaDetails.escalation}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Performance Summary (Last 6 Months)</h6>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered" width="100%" cellSpacing="0">
                  <thead>
                    <tr>
                      <th>Month</th>
                      <th>Generation (kWh)</th>
                      <th>Consumption (kWh)</th>
                      <th>Export (kWh)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {plant.performance.monthly.map((month: any, index: number) => (
                      <tr key={index}>
                        <td>{month.month}</td>
                        <td>{month.generation}</td>
                        <td>{month.consumption}</td>
                        <td>{month.export}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">Plant Documents</h6>
            </div>
            <div className="card-body">
              <div className="list-group">
                <a href="#" className="list-group-item list-group-item-action">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">Plant Installation Certificate.pdf</h5>
                    <small className="text-muted">2 days ago</small>
                  </div>
                  <p className="mb-1">Official certificate for plant installation</p>
                  <small className="text-muted">PDF • 1.2 MB</small>
                </a>
                <a href="#" className="list-group-item list-group-item-action">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">PPA Document.pdf</h5>
                    <small className="text-muted">1 week ago</small>
                  </div>
                  <p className="mb-1">Power Purchase Agreement</p>
                  <small className="text-muted">PDF • 1.8 MB</small>
                </a>
                <a href="#" className="list-group-item list-group-item-action">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">Performance Report Q1.pdf</h5>
                    <small className="text-muted">1 month ago</small>
                  </div>
                  <p className="mb-1">Quarterly performance report</p>
                  <small className="text-muted">PDF • 2.1 MB</small>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantDetail;