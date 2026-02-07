import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import APICallService from '../../../../api/apiCallService';
import * as apiEndpoints from '../../../../api/apiEndPoints';

const InvestmentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [investment, setInvestment] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvestmentDetail();
  }, [id]);

  const fetchInvestmentDetail = async () => {
    try {
      setLoading(true);
      const apiCall = new APICallService(apiEndpoints.INVESTOR.INVESTMENT_DETAIL, id);
      const res = await apiCall.callAPI();

      if (res) {
        setInvestment({
          id: res._id,
          projectName: res.ppaDetail?.ppaName || 'Solar Project',
          plantCapacity: `${res.ppaDetail?.plantCapacity || 0} kW`,
          investmentAmount: res.investmentAmount || 0,
          investmentPercent: res.investmentPercent || 0,
          plantCapacityReserved: `${res.plantCapacityReserved || 0} kW`,
          status: res.isActive ? 'active' : 'pending',
          startDate: res.createdAt ? new Date(res.createdAt).toLocaleDateString() : 'N/A',
          endDate: 'Dec 2033', // Mock or linked from PPA
          returns: 0,
          description: res.description || 'Solar installation providing reliable clean energy.',
          location: res.ppaDetail?.plantDetail?.city || 'Gujarat, India',
          ppaDetails: {
            startDate: '2023-01-15',
            endDate: '2033-01-15',
            rate: res.ppaDetail?.tarrif || 0,
            escalation: 2.5
          },
          performance: {
            monthly: [
              { month: 'Jan', generation: 0, consumption: 0, export: 0 },
            ]
          }
        });
      }
    } catch (error) {
      console.error("Error fetching investment detail:", error);
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

  if (loading || !investment) {
    return (
      <div className="flex justify-center py-40">
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
      {/* Header & Breadcrumbs */}
      <div className="space-y-6">
        <nav className="flex gap-4 text-[10px] font-black tracking-widest text-slate-400 uppercase">
          <Link to="/investor/dashboard" className="hover:text-ps-primary transition-colors text-decoration-none">Portfolio</Link>
          <span>/</span>
          <Link to="/investor/investments" className="hover:text-ps-primary transition-colors text-decoration-none">Assets</Link>
          <span>/</span>
          <span className="text-ps-secondary">{investment.projectName}</span>
        </nav>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <h1 className="text-5xl md:text-6xl fw-900 ls-n4 modern-gradient-text">
                {investment.projectName}
              </h1>
              <span className={`px-5 py-2 rounded-full text-xs font-black tracking-widest ${investment.status === 'active' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                {investment.status.toUpperCase()}
              </span>
            </div>
            <p className="text-xl text-slate-500 font-light max-w-2xl">
              <i className="fas fa-map-marker-alt text-ps-primary mr-3"></i>
              {investment.location} • Commissioned {investment.startDate}
            </p>
          </div>
          <div className="flex gap-4">
            <button className="px-8 py-4 bg-white text-ps-secondary border border-slate-200 rounded-2xl font-bold text-sm hover:bg-slate-50 transition-all flex items-center gap-3">
              <i className="fas fa-share-alt text-xs text-slate-400"></i> Share
            </button>
            <button className="px-8 py-4 bg-ps-primary text-[#052F2B] rounded-2xl font-bold text-sm shadow-ps hover:shadow-xl hover:-translate-y-0.5 transition-all outline-none border-0 flex items-center gap-3">
              <i className="fas fa-download text-xs"></i> Full Report
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Left Column: Stats & Performance */}
        <div className="xl:col-span-8 space-y-8">
          {/* Primary Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div variants={itemVariants} className="glass-card p-8 rounded-4xl shadow-elegant">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Capital Allocation</p>
              <h3 className="text-3xl fw-900 text-ps-secondary mb-2 ls-n1">₹{investment.investmentAmount.toLocaleString()}</h3>
              <p className="text-sm text-ps-primary font-bold">{investment.investmentPercent}% Plant Share</p>
            </motion.div>

            <motion.div variants={itemVariants} className="glass-card p-8 rounded-4xl shadow-elegant border-b-4 border-ps-primary">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Total Returns (YTD)</p>
              <h3 className="text-3xl fw-900 text-ps-secondary mb-2 ls-n1">₹{investment.returns.toLocaleString()}</h3>
              <p className="text-sm text-emerald-500 font-bold flex items-center gap-2">
                <i className="fas fa-chart-line"></i> Yield in progress
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="glass-card p-8 rounded-4xl shadow-elegant">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Owned Capacity</p>
              <h3 className="text-3xl fw-900 text-ps-secondary mb-2 ls-n1">{investment.plantCapacityReserved}</h3>
              <p className="text-sm text-slate-400 font-medium">Out of {investment.plantCapacity}</p>
            </motion.div>
          </div>

          {/* Performance section would go here, fetching from backend performance API if available */}

          {/* Description */}
          <motion.div variants={itemVariants} className="glass-card p-10 rounded-4xl shadow-elegant">
            <h3 className="text-2xl fw-900 text-ps-secondary ls-n1 mb-6">Asset Details</h3>
            <p className="text-lg text-slate-500 font-light leading-relaxed">
              {investment.description}
            </p>
          </motion.div>
        </div>

        {/* Right Column: PPA & Documents */}
        <div className="xl:col-span-4 space-y-8">
          {/* PA Agreement Card */}
          <motion.div variants={itemVariants} className="glass-card p-10 rounded-4xl shadow-elegant border-t-4 border-ps-primary relative overflow-hidden group">
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-ps-primary/5 rounded-full blur-3xl group-hover:bg-ps-primary/10 transition-all duration-700"></div>

            <h3 className="text-2xl fw-900 text-ps-secondary ls-n1 mb-8">Agreement Details</h3>

            <div className="space-y-6 relative z-10">
              <div className="flex justify-between items-center group/item p-4 hover:bg-slate-50 rounded-2xl transition-all">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Tariff Rate</span>
                <span className="text-lg font-black text-ps-secondary">₹{investment.ppaDetails.rate} / kWh</span>
              </div>

              <div className="flex justify-between items-center group/item p-4 hover:bg-slate-50 rounded-2xl transition-all">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Annual Escalation</span>
                <span className="text-lg font-black text-indigo-500">+{investment.ppaDetails.escalation}%</span>
              </div>

              <div className="flex justify-between items-center group/item p-4 hover:bg-slate-50 rounded-2xl transition-all">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Commissioned</span>
                <span className="text-lg font-black text-ps-secondary">{investment.startDate}</span>
              </div>
            </div>

            <div className="mt-10 p-6 bg-slate-50 border border-slate-100 rounded-3xl flex items-center gap-5 hover:border-ps-primary/30 transition-all cursor-pointer">
              <div className="w-12 h-12 bg-ps-primary text-[#052F2B] rounded-2xl flex items-center justify-center shadow-lg shadow-ps-primary/20">
                <i className="fas fa-file-contract"></i>
              </div>
              <div>
                <h4 className="font-black text-ps-secondary text-sm">Legal Agreement</h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Digitally Signed</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default InvestmentDetail;