import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const ConsumerDashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState({
    totalPlants: 0,
    totalBills: 0,
    pendingBills: 0,
    totalGenerated: 0,
    walletBalance: 0,
  });
  const [plants, setPlants] = useState<any[]>([]);
  const [bills, setBills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch plants
      const plantsRes = await axios.get('/user/my-plants');
      const rawPlantsData = plantsRes.data?.result || [];
      // Flatten nested propertyAddress for easier access
      const plantsData = rawPlantsData.map((plant: any) => ({
        ...plant,
        propertyName: plant.propertyAddress?.propertyName || plant.propertyName || 'N/A',
        address: plant.propertyAddress?.address || plant.address,
        city: plant.propertyAddress?.city || plant.city,
        state: plant.propertyAddress?.state || plant.state,
      }));
      setPlants(plantsData.slice(0, 3)); // Show first 3

      // Fetch bills
      const billsRes = await axios.get('/user/my-bills');
      const billsData = billsRes.data?.result || [];
      setBills(billsData.slice(0, 2)); // Show first 2

      // Fetch wallet
      let walletBalance = 0;
      try {
        const walletRes = await axios.get('/user/wallet/balance');
        walletBalance = walletRes.data?.result?.balance || 0;
      } catch (e) { }

      // Calculate stats
      const pendingBills = billsData.filter((b: any) => !b.isPaid).length;
      const totalGenerated = billsData.reduce((acc: number, b: any) => acc + (b.generatedUnits || 0), 0);

      setDashboardData({
        totalPlants: plantsData.length,
        totalBills: billsData.length,
        pendingBills,
        totalGenerated,
        walletBalance,
      });
    } catch (error) {
      // Silently handle - will show empty state UI
      // Silently fail - will show empty state UI
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

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-4">
        <div>
          <h1 className="text-3xl font-black text-[#0b1f33] tracking-tight">Consumer Dashboard</h1>
          <p className="text-[#64748b] mt-1">Welcome back! Here's your energy portfolio overview.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 transition shadow-sm">
            <i className="fas fa-download me-2"></i> Report
          </button>
          <Link to="/consumer/plants" className="px-5 py-2 bg-[#052F2B] rounded-lg text-sm font-bold text-white hover:bg-[#0b1f33] transition shadow-lg shadow-[#052F2B]/20 flex items-center">
            <i className="fas fa-plus me-2"></i> Add Plant
          </Link>
        </div>
      </div>

      {plants.some(p => p.plantStatus === 1) && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center gap-4 animate__animated animate__fadeIn">
          <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 flex-shrink-0">
            <i className="fas fa-clock fs-4"></i>
          </div>
          <div>
            <h4 className="text-amber-900 font-bold mb-0.5">Application Under Review</h4>
            <p className="text-amber-700 text-sm mb-0">Your solar plant application is being verified by our team. You'll be notified once it's approved.</p>
          </div>
        </div>
      )}

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Plants Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <i className="fas fa-solar-panel fa-4x text-[#052F2B]"></i>
          </div>
          <div className="relative z-10">
            <div className="text-xs font-bold text-[#64748b] uppercase tracking-wider mb-2">Solar Plants</div>
            <div className="flex items-baseline gap-2">
              <div className="text-4xl font-black text-[#052F2B]">{dashboardData.totalPlants}</div>
            </div>
          </div>
          <div className="h-1 w-full bg-gray-100 mt-4 rounded-full overflow-hidden">
            <div className="h-full bg-[#052F2B]" style={{ width: '100%' }}></div>
          </div>
        </div>

        {/* Generated Card */}
        <div className="bg-gradient-to-br from-[#052F2B] to-[#0f766e] rounded-2xl p-6 shadow-lg shadow-[#052F2B]/20 text-white relative overflow-hidden">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-[#43EBA6] rounded-full opacity-20 blur-2xl"></div>
          <div className="relative z-10">
            <div className="text-xs font-bold text-[#ECFDF5]/70 uppercase tracking-wider mb-2">Energy Generated</div>
            <div className="flex items-baseline gap-2">
              <div className="text-4xl font-black text-white">{dashboardData.totalGenerated}</div>
              <span className="text-sm font-bold text-[#43EBA6]">kWh</span>
            </div>
            <div className="mt-4 flex items-center text-xs text-[#ECFDF5]/80 font-medium">
              <span>Lifetime total</span>
            </div>
          </div>
        </div>


        {/* Bills Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <i className="fas fa-file-invoice fa-4x text-blue-800"></i>
          </div>
          <div className="relative z-10">
            <div className="text-xs font-bold text-[#64748b] uppercase tracking-wider mb-2">Total Bills</div>
            <div className="text-4xl font-black text-[#0b1f33]">{dashboardData.totalBills}</div>
            <div className="mt-4 text-xs font-bold text-[#64748b]">
              {dashboardData.pendingBills > 0 && <span className="text-orange-500">{dashboardData.pendingBills} Pending </span>}
              {dashboardData.pendingBills > 0 ? 'action required' : 'All paid'}
            </div>
          </div>
        </div>

        {/* Wallet Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <i className="fas fa-wallet fa-4x text-[#43EBA6]"></i>
          </div>
          <div className="relative z-10">
            <div className="text-xs font-bold text-[#64748b] uppercase tracking-wider mb-2">Wallet Balance</div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-[#64748b]">₹</span>
              <div className="text-4xl font-black text-[#052F2B]">{dashboardData.walletBalance.toLocaleString()}</div>
            </div>
            <div className="mt-4 text-xs font-bold text-[#0f766e]">
              <Link to="/consumer/wallet" className="hover:underline">Add Funds →</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Content Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Recent Plants Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h6 className="font-bold text-[#0b1f33] text-lg">My Solar Plants</h6>
            <Link to="/consumer/plants" className="text-sm font-bold text-[#0f766e] hover:text-[#052F2B]">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-bold">
                <tr>
                  <th className="px-6 py-4">Plant Name</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {plants.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                      No plants yet. <Link to="/consumer/plants" className="text-[#0f766e] font-bold">Add your first plant</Link>
                    </td>
                  </tr>
                ) : plants.map((plant) => (
                  <tr key={plant._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-[#0b1f33]">{plant.propertyName}</div>
                      <div className="text-xs text-gray-400">{plant.address}</div>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-600">{plant.city}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${plant.plantStatus === 2 ? 'bg-emerald-100 text-emerald-800' :
                        plant.plantStatus === 3 ? 'bg-red-100 text-red-800' :
                          'bg-amber-100 text-amber-800'
                        }`}>
                        {plant.plantStatus === 1 ? 'Submitted' : plant.plantStatus === 2 ? 'Approved' : plant.plantStatus === 3 ? 'Rejected' : 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link to={`/consumer/plants/${plant._id}`} className="inline-flex justify-center items-center w-8 h-8 rounded-lg bg-gray-100 text-gray-600 hover:bg-[#052F2B] hover:text-white transition-colors">
                        <i className="fas fa-chevron-right text-xs"></i>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Bills */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h6 className="font-bold text-[#0b1f33] text-lg">Recent Bills</h6>
            <Link to="/consumer/bills" className="text-sm font-bold text-[#0f766e] hover:text-[#052F2B]">View All</Link>
          </div>
          <div className="p-4 space-y-3 flex-grow">
            {bills.length === 0 ? (
              <div className="text-center text-gray-500 py-8">No bills yet</div>
            ) : bills.map((bill) => (
              <div key={bill._id} className={`p-4 rounded-xl border hover:shadow-md transition-all group cursor-pointer relative overflow-hidden ${bill.isPaid ? 'bg-gray-50 border-gray-100' : 'bg-[#fff7ed] border-orange-100'
                }`}>
                {!bill.isPaid && <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-400"></div>}
                <div className="flex justify-between items-start mb-2">
                  <div className={`text-xs font-bold uppercase ${bill.isPaid ? 'text-gray-400' : 'text-orange-400'}`}>
                    {bill.billingMonth} {bill.billingYear}
                  </div>
                  <div className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${bill.isPaid ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                    {bill.isPaid ? 'Paid' : 'Unpaid'}
                  </div>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <div className="font-black text-[#0b1f33] text-lg">₹ {bill.totalAmount?.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">{bill.generatedUnits} kWh</div>
                  </div>
                  {!bill.isPaid && (
                    <Link to="/consumer/bills" className="px-3 py-1.5 bg-[#052F2B] text-white text-xs font-bold rounded-lg shadow-lg hover:bg-[#0b1f33]">
                      Pay Now
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ConsumerDashboard;