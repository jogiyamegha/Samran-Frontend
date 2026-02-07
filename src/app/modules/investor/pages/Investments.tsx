import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import APICallService from '../../../../api/apiCallService';
import * as apiEndpoints from '../../../../api/apiEndPoints';

const InvestorInvestments: React.FC = () => {
  const [investments, setInvestments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvestments();
  }, []);

  const fetchInvestments = async () => {
    try {
      setLoading(true);
      const apiCall = new APICallService(apiEndpoints.INVESTOR.MY_INVESTMENTS);
      const res = await apiCall.callAPI();

      if (res) {
        setInvestments(res.map((inv: any) => ({
          id: inv._id,
          projectName: inv.ppaDetail?.ppaName || 'Solar Project',
          plantCapacity: `${inv.ppaDetail?.plantCapacity || 0} kW`,
          investmentAmount: inv.investmentAmount || 0,
          investmentPercent: inv.investmentPercent || 0,
          plantCapacityReserved: `${inv.plantCapacityReserved || 0} kW`,
          status: inv.isActive ? 'active' : 'pending',
          startDate: inv.createdAt ? new Date(inv.createdAt).toLocaleDateString() : 'N/A',
          returns: 0 // Fetch from payouts if possible
        })));
      }
    } catch (error) {
      console.error("Error fetching investments:", error);
    } finally {
      setLoading(false);
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
            Solar Assets
          </h1>
          <p className="text-xl text-slate-500 font-light max-w-2xl">
            Detailed overview of your currently owned fractional solar capacity.
          </p>
        </div>
        <div className="flex gap-4">
          <button className="px-8 py-4 bg-white text-ps-secondary border border-slate-200 rounded-2xl font-bold text-sm hover:bg-slate-50 transition-all flex items-center gap-3">
            <i className="fas fa-filter text-xs text-slate-400"></i> Filter
          </button>
          <Link to="/investor/new-investment" className="px-8 py-4 bg-ps-primary text-[#052F2B] rounded-2xl font-bold text-sm shadow-ps hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-3 text-decoration-none">
            <i className="fas fa-plus text-xs"></i> New Investment
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-40">
          <div className="w-12 h-12 border-4 border-ps-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <motion.div variants={itemVariants} className="glass-card rounded-4xl shadow-elegant overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-10 py-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Project</th>
                  <th className="px-10 py-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Investment</th>
                  <th className="px-10 py-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Capacity</th>
                  <th className="px-10 py-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-10 py-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Returns (YTD)</th>
                  <th className="px-10 py-6 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {investments.length > 0 ? investments.map((investment, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-ps-primary group-hover:scale-110 transition-transform">
                          <i className="fas fa-solar-panel"></i>
                        </div>
                        <div>
                          <h4 className="font-black text-ps-secondary text-lg">{investment.projectName}</h4>
                          <span className="text-xs text-slate-400 font-medium tracking-tight">ID: #PS-{1000 + i}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <div className="font-black text-ps-secondary text-lg">₹{investment.investmentAmount.toLocaleString()}</div>
                      <div className="text-xs text-slate-400 font-medium">{investment.investmentPercent}% Share</div>
                    </td>
                    <td className="px-10 py-8">
                      <div className="font-bold text-ps-secondary mb-2 whitespace-nowrap">{investment.plantCapacityReserved} / {investment.plantCapacity}</div>
                      <div className="w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-ps-primary" style={{ width: `${(parseFloat(investment.plantCapacityReserved) / parseFloat(investment.plantCapacity)) * 100}%` }}></div>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest ${investment.status === 'active' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                        {investment.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-10 py-8">
                      <div className="font-black text-ps-primary text-xl">₹{investment.returns.toLocaleString()}</div>
                      <div className="flex items-center gap-1 text-emerald-500 font-bold text-xs">
                        <i className="fas fa-arrow-up"></i> {investment.returns > 0 ? '12.4%' : '0%'}
                      </div>
                    </td>
                    <td className="px-10 py-8 text-right">
                      <div className="flex justify-end gap-2">
                        <Link to={`/investor/investments/${investment.id}`} className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 hover:text-ps-primary hover:border-ps-primary transition-all">
                          <i className="fas fa-eye text-sm"></i>
                        </Link>
                        <button className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 hover:text-indigo-500 hover:border-indigo-500 transition-all">
                          <i className="fas fa-chart-bar text-sm"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={6} className="px-10 py-20 text-center text-slate-400">
                      No investments found. <Link to="/home/investors" className="text-ps-primary font-bold hover:underline">Start investing</Link>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="px-10 py-8 bg-slate-50/50 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-6">
            <span className="text-sm text-slate-400 font-medium">Showing {investments.length} solar assets</span>
            <div className="flex gap-2">
              <button className="px-6 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-400 cursor-not-allowed">Previous</button>
              <button className="px-6 py-2 bg-ps-primary text-[#052F2B] rounded-xl text-xs font-bold shadow-sm">1</button>
              <button className="px-6 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">Next</button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default InvestorInvestments;