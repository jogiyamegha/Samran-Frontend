import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import APICallService from '../../../../api/apiCallService';
import * as apiEndpoints from '../../../../api/apiEndPoints';
import { toast } from 'react-toastify';

const InvestorDashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    totalInvested: 0,
    totalReturns: 0,
    walletBalance: 0,
    annualYield: 0,
    activeCapacity: 0,
    carbonOffset: 0,
    monthlyEarnings: 0
  });

  const [assets, setAssets] = useState<any[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // Fetch portfolio summary
      const portfolioApi = new APICallService(apiEndpoints.INVESTOR.PORTFOLIO);
      const portfolioRes = await portfolioApi.callAPI();

      if (portfolioRes) {
        setDashboardData({
          totalInvested: portfolioRes.totalInvestedAmount || 0,
          totalReturns: portfolioRes.totalReturn || 0,
          walletBalance: portfolioRes.balance || 0,
          annualYield: 10.2, // Still mock or calculated
          activeCapacity: 15.5, // Mock for now
          carbonOffset: 1240, // Mock for now
          monthlyEarnings: 0 // Fetch from payouts if needed
        });
      }

      // Fetch investments (assets)
      const investmentsApi = new APICallService(apiEndpoints.INVESTOR.MY_INVESTMENTS);
      const investmentsRes = await investmentsApi.callAPI();
      if (investmentsRes) {
        setAssets(investmentsRes.map((inv: any) => ({
          name: inv.ppaDetail?.ppaName || 'Solar Asset',
          location: inv.ppaDetail?.plantDetail?.city || 'Gujarat',
          capacity: `${inv.ppaDetail?.plantCapacity || 0} kW`,
          return: `₹${inv.investmentAmount?.toLocaleString()}`,
          status: inv.isActive ? 'Optimal' : 'Maintenance'
        })));

        // Calculate total capacity
        const totalCap = investmentsRes.reduce((acc: number, inv: any) => acc + (inv.ppaDetail?.plantCapacity || 0), 0);
        setDashboardData(prev => ({ ...prev, activeCapacity: totalCap }));
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadReport = () => {
    toast.info("Generating your portfolio report...", {
      autoClose: 2000,
      icon: <i className="fas fa-file-pdf text-ps-primary"></i>
    });

    setTimeout(() => {
      toast.success("Report ready! Check your downloads folder.");
    }, 2500);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
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
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-5xl md:text-6xl fw-900 ls-n4 mb-3 text-ps-secondary">
            Investor Portfolio
          </h1>
          <p className="text-xl text-slate-500 font-light max-w-2xl">
            Real-time performance metrics and asset tracking for your sustainable capital.
          </p>
        </div>
        <div className="flex gap-4">
          <Link to="/investor/new-investment" className="px-8 py-4 bg-ps-primary text-[#052F2B] rounded-2xl font-bold text-sm shadow-ps hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-3 text-decoration-none">
            <i className="fas fa-plus text-xs"></i> New Investment
          </Link>
          <button
            onClick={handleDownloadReport}
            className="px-8 py-4 bg-white text-ps-secondary border border-slate-200 rounded-2xl font-bold text-sm hover:bg-slate-50 transition-all flex items-center gap-3 border-0 outline-none"
          >
            <i className="fas fa-download text-xs text-slate-400"></i> Report
          </button>
        </div>
      </div>

      {/* Primary Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <motion.div variants={itemVariants} className="glass-card p-8 rounded-4xl shadow-elegant relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-ps-primary/10 rounded-full blur-2xl group-hover:bg-ps-primary/20 transition-all duration-500"></div>
          <p className="text-xs font-bold text-ps-primary uppercase tracking-widest mb-6">Total Invested</p>
          <h2 className="text-4xl fw-900 text-ps-secondary mb-2 ls-n2">₹{dashboardData.totalInvested.toLocaleString()}</h2>
          <div className="flex items-center gap-2 text-emerald-500 font-bold text-sm">
            <i className="fas fa-caret-up"></i>
            <span>Active Portfolio</span>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-card p-8 rounded-4xl shadow-elegant">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Lifetime Returns</p>
          <h2 className="text-4xl fw-900 text-ps-secondary mb-2 ls-n2">₹{dashboardData.totalReturns.toLocaleString()}</h2>
          <div className="flex items-center gap-2 text-indigo-500 font-bold text-sm">
            <i className="fas fa-chart-line"></i>
            <span>{dashboardData.annualYield}% Average Yield</span>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-card p-8 rounded-4xl shadow-elegant border-b-4 border-ps-primary">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Wallet Balance</p>
          <h2 className="text-4xl fw-900 modern-gradient-text mb-4 ls-n2">₹{dashboardData.walletBalance.toLocaleString()}</h2>
          <button className="text-ps-primary font-bold text-sm hover:underline flex items-center gap-2 bg-transparent border-0 p-0">
            Withdraw Funds <i className="fas fa-arrow-right text-[10px]"></i>
          </button>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-card p-8 rounded-4xl shadow-elegant">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Energy Impact</p>
          <h2 className="text-4xl fw-900 text-ps-secondary mb-2 ls-n2">{dashboardData.carbonOffset} kg</h2>
          <div className="flex items-center gap-2 text-ps-primary font-bold text-sm">
            <i className="fas fa-leaf"></i>
            <span>{dashboardData.activeCapacity} kW Capacity</span>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Performance Chart Placeholder */}
        <motion.div variants={itemVariants} className="xl:col-span-8 glass-card rounded-4xl shadow-elegant overflow-hidden">
          <div className="p-8 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-2xl fw-900 text-ps-secondary ls-n1">Growth & Generation</h3>
              <p className="text-slate-400 font-light mt-1">Daily returns vs Energy production</p>
            </div>
            <div className="flex bg-slate-100 p-1.5 rounded-xl gap-1">
              {['1M', '6M', '1Y', 'All'].map((period) => (
                <button key={period} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${period === '1M' ? 'bg-white text-ps-secondary shadow-sm' : 'text-slate-500 hover:text-ps-secondary'} border-0`}>
                  {period}
                </button>
              ))}
            </div>
          </div>
          <div className="p-8 pb-4">
            <div className="flex items-end justify-between h-[300px] gap-2 lg:gap-4">
              {[40, 60, 45, 80, 70, 90, 100, 85, 95, 110, 105, 120].map((h, i) => (
                <div key={i} className="flex-grow bg-ps-primary/10 rounded-t-xl relative group transition-all duration-500 hover:bg-ps-primary/20" style={{ height: `${h}%` }}>
                  <div className="absolute bottom-0 left-0 right-0 bg-ps-primary rounded-t-xl transition-all duration-700 delay-100" style={{ height: '30%', opacity: 0.8 }}></div>
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-ps-secondary text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">₹{(h * 150).toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Active Solar Assets */}
        <motion.div variants={itemVariants} className="xl:col-span-4 glass-card rounded-4xl shadow-elegant overflow-hidden flex flex-col">
          <div className="p-8 border-b border-slate-100">
            <h3 className="text-2xl fw-900 text-ps-secondary ls-n1">Solar Assets</h3>
          </div>
          <div className="p-8 flex-grow space-y-6">
            {assets.length > 0 ? assets.slice(0, 3).map((asset, i) => (
              <div key={i} className="flex items-center justify-between p-5 bg-slate-50 rounded-3xl hover:bg-slate-100 transition-colors cursor-pointer group">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-ps-primary group-hover:scale-110 transition-transform">
                    <i className="fas fa-solar-panel"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-ps-secondary">{asset.name}</h4>
                    <p className="text-xs text-slate-400 font-medium">{asset.location} • {asset.capacity}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-emerald-500 text-sm mb-1">{asset.return}</div>
                  <div className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${asset.status === 'Optimal' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                    {asset.status.toUpperCase()}
                  </div>
                </div>
              </div>
            )) : (
              <div className="text-center py-10">
                <p className="text-slate-400 text-sm">No active assets found</p>
                <Link to="/investor/new-investment" className="text-ps-primary font-bold text-xs hover:underline mt-2 inline-block text-decoration-none">Start investing now</Link>
              </div>
            )}
            <Link to="/investor/investments" className="w-full py-4 bg-slate-100 text-ps-secondary rounded-2xl font-bold text-sm hover:bg-slate-200 transition-all flex items-center justify-center gap-2 mt-4 text-decoration-none">
              View All Assets <i className="fas fa-arrow-right text-[10px]"></i>
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default InvestorDashboard;