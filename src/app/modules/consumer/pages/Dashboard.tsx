import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ConsumerDashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState({
    totalPlants: 0,
    totalBills: 0,
    pendingBills: 0,
    totalConsumed: 0,
    totalGenerated: 0,
  });

  useEffect(() => {
    // In a real application, you would fetch this data from the API
    // For now, we'll use mock data
    setDashboardData({
      totalPlants: 2,
      totalBills: 15,
      pendingBills: 3,
      totalConsumed: 2450,
      totalGenerated: 2800,
    });
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <h1 className="h3 mb-2 text-gray-800">Consumer Dashboard</h1>
          <p className="mb-4">Welcome to your solar energy management portal</p>
        </div>
      </div>

      {/* Content Row */}
      <div className="row">
        {/* Plants Card */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Solar Plants
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">{dashboardData.totalPlants}</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-solar-panel fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bills Card */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-success shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                    Total Bills
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">{dashboardData.totalBills}</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-file-invoice fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Bills Card */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-info shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                    Pending Bills
                  </div>
                  <div className="row no-gutters align-items-center">
                    <div className="col-auto">
                      <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">{dashboardData.pendingBills}</div>
                    </div>
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-clock fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Energy Generated Card */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-warning shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                    Energy Generated (kWh)
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">{dashboardData.totalGenerated}</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-bolt fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Row */}
      <div className="row">
        {/* Recent Plants */}
        <div className="col-xl-8 col-lg-7">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">My Solar Plants</h6>
              <Link to="/consumer/plants" className="btn btn-primary btn-sm">View All</Link>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Plant Name</th>
                      <th>Location</th>
                      <th>Capacity (kW)</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Home Solar System</td>
                      <td>123 Main St, City</td>
                      <td>5.2 kW</td>
                      <td><span className="badge bg-success">Active</span></td>
                      <td>
                        <Link to="/consumer/plants/1" className="btn btn-sm btn-primary">View</Link>
                      </td>
                    </tr>
                    <tr>
                      <td>Garage Solar System</td>
                      <td>125 Main St, City</td>
                      <td>3.8 kW</td>
                      <td><span className="badge bg-success">Active</span></td>
                      <td>
                        <Link to="/consumer/plants/2" className="btn btn-sm btn-primary">View</Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Bills */}
        <div className="col-xl-4 col-lg-5">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">Recent Bills</h6>
              <Link to="/consumer/bills" className="btn btn-primary btn-sm">View All</Link>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <div>Bill #1234</div>
                  <div className="text-success">Paid</div>
                </div>
                <div className="text-muted small">Due Date: Dec 15, 2023</div>
                <div className="mt-1">Amount: $125.50</div>
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <div>Bill #1235</div>
                  <div className="text-warning">Pending</div>
                </div>
                <div className="text-muted small">Due Date: Jan 15, 2024</div>
                <div className="mt-1">Amount: $142.30</div>
              </div>
              <div>
                <div className="d-flex justify-content-between">
                  <div>Bill #1236</div>
                  <div className="text-warning">Pending</div>
                </div>
                <div className="text-muted small">Due Date: Feb 15, 2024</div>
                <div className="mt-1">Amount: $138.75</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsumerDashboard;