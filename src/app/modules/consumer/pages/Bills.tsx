import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ConsumerBills: React.FC = () => {
  const [bills, setBills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching bills from API
    setTimeout(() => {
      const mockBills = [
        {
          id: 1,
          ppaId: 'PPA-001',
          plantId: 'PLANT-001',
          billingMonth: 'June',
          billingYear: 2023,
          generatedUnits: 1200,
          consumedUnits: 1100,
          exportedUnits: 100,
          totalAmount: 6500,
          isPaid: true,
          paymentDate: '2023-06-15',
          dueDate: '2023-06-30',
          status: 'paid',
          tarrif: 5.5
        },
        {
          id: 2,
          ppaId: 'PPA-001',
          plantId: 'PLANT-001',
          billingMonth: 'May',
          billingYear: 2023,
          generatedUnits: 1100,
          consumedUnits: 1050,
          exportedUnits: 50,
          totalAmount: 6200,
          isPaid: true,
          paymentDate: '2023-05-15',
          dueDate: '2023-05-30',
          status: 'paid',
          tarrif: 5.5
        },
        {
          id: 3,
          ppaId: 'PPA-001',
          plantId: 'PLANT-001',
          billingMonth: 'April',
          billingYear: 2023,
          generatedUnits: 1300,
          consumedUnits: 1200,
          exportedUnits: 100,
          totalAmount: 6800,
          isPaid: true,
          paymentDate: '2023-04-15',
          dueDate: '2023-04-30',
          status: 'paid',
          tarrif: 5.5
        },
        {
          id: 4,
          ppaId: 'PPA-002',
          plantId: 'PLANT-002',
          billingMonth: 'June',
          billingYear: 2023,
          generatedUnits: 800,
          consumedUnits: 750,
          exportedUnits: 50,
          totalAmount: 4200,
          isPaid: false,
          dueDate: '2023-06-30',
          status: 'unpaid',
          tarrif: 5.25
        }
      ];
      setBills(mockBills);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <h1 className="h3 mb-2 text-gray-800">My Bills</h1>
          <p className="mb-4">View and manage your solar energy bills</p>
          
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <button className="btn btn-primary mr-2">
                <i className="fas fa-download"></i> Download All
              </button>
              <button className="btn btn-outline-primary">
                <i className="fas fa-print"></i> Print
              </button>
            </div>
            <div>
              <button className="btn btn-outline-secondary">
                <i className="fas fa-filter"></i> Filter
              </button>
            </div>
          </div>

          {loading ? (
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="card shadow mb-4">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-bordered" width="100%" cellSpacing="0">
                    <thead>
                      <tr>
                        <th>Bill ID</th>
                        <th>Month/Year</th>
                        <th>PPA ID</th>
                        <th>Plant ID</th>
                        <th>Generated (kWh)</th>
                        <th>Consumed (kWh)</th>
                        <th>Exported (kWh)</th>
                        <th>Amount (₹)</th>
                        <th>Status</th>
                        <th>Due Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bills.map((bill) => (
                        <tr key={bill.id}>
                          <td>BILL-{bill.id.toString().padStart(3, '0')}</td>
                          <td>{bill.billingMonth} {bill.billingYear}</td>
                          <td>{bill.ppaId}</td>
                          <td>{bill.plantId}</td>
                          <td>{bill.generatedUnits}</td>
                          <td>{bill.consumedUnits}</td>
                          <td>{bill.exportedUnits}</td>
                          <td>₹{bill.totalAmount.toLocaleString()}</td>
                          <td>
                            <span className={`badge ${
                              bill.status === 'paid' 
                                ? 'badge-success' 
                                : bill.status === 'unpaid' 
                                  ? 'badge-danger' 
                                  : bill.status === 'partial' 
                                    ? 'badge-warning' 
                                    : 'badge-secondary'
                            }`}>
                              {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
                            </span>
                          </td>
                          <td>{bill.dueDate}</td>
                          <td>
                            <div className="btn-group" role="group">
                              <button className="btn btn-sm btn-outline-primary">
                                <i className="fas fa-eye"></i>
                              </button>
                              {bill.status === 'unpaid' && (
                                <button className="btn btn-sm btn-outline-success">
                                  <i className="fas fa-money-bill-wave"></i>
                                </button>
                              )}
                              <button className="btn btn-sm btn-outline-info">
                                <i className="fas fa-download"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Pagination */}
                <nav aria-label="Bills pagination">
                  <ul className="pagination justify-content-end">
                    <li className="page-item disabled">
                      <a className="page-link" href="#" tabIndex={-1}>Previous</a>
                    </li>
                    <li className="page-item active">
                      <a className="page-link" href="#">1</a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">2</a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">3</a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">Next</a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsumerBills;