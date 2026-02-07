import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import APICallService from '../../../../api/apiCallService';
import * as apiEndpoints from '../../../../api/apiEndPoints';

const InvestorReturns: React.FC = () => {
  const [returns, setReturns] = useState<any[]>([]);
  const [totalReturns, setTotalReturns] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayouts();
  }, []);

  const fetchPayouts = async () => {
    try {
      setLoading(true);
      const apiCall = new APICallService(apiEndpoints.INVESTOR.PAYOUTS);
      const res = await apiCall.callAPI();

      if (res) {
        setReturns(res.map((item: any) => ({
          id: item._id,
          investmentName: item.ppaDetail?.ppaName || 'Solar Asset',
          amount: item.totalAmount || 0,
          date: item.paymentDate ? new Date(item.paymentDate).toLocaleDateString() : 'N/A',
          status: item.isPaid ? 'completed' : 'pending',
          period: `${item.billingMonth}/${item.billingYear}`,
          roi: 0 // Mock for now
        })));
        setTotalReturns(res.reduce((sum: number, r: any) => sum + (r.totalAmount || 0), 0));
      }
    } catch (error) {
      console.error("Error fetching payouts:", error);
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
          <h1 className="text-5xl md:text-6xl fw-900 ls-n4 mb-3 text-ps-secondary">
            Payout History
          </h1>
          <p className="text-xl text-slate-500 font-light max-w-2xl">
            Transparent breakdown of your solar returns and daily yield distributions.
          </p>
        </div>
        <div className="flex gap-4">
          <button className="px-8 py-4 bg-white text-ps-secondary border border-slate-200 rounded-2xl font-bold text-sm hover:bg-slate-50 transition-all flex items-center gap-3">
            <i className="fas fa-download text-xs text-slate-400"></i> Tax Statement
          </button>
          <button className="px-8 py-4 bg-ps-secondary text-white rounded-2xl font-bold text-sm shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-3 border-0">
            <i className="fas fa-file-invoice-dollar text-xs text-ps-primary"></i> Export Records
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div variants={itemVariants} className="glass-card p-10 rounded-4xl bg-ps-secondary text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-ps-primary/10 blur-3xl group-hover:bg-ps-primary/20 transition-all duration-500"></div>
          <p className="text-xs font-bold text-ps-primary uppercase tracking-widest mb-6">Total Payouts</p>
          <h2 className="text-4xl fw-900 ls-n2 text-white">₹{totalReturns.toLocaleString()}</h2>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-card p-10 rounded-4xl border-b-4 border-emerald-500">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Avg. Monthly Return</p>
          <h2 className="text-4xl fw-900 text-ps-secondary ls-n2">₹{(totalReturns / (returns.length || 1)).toLocaleString(undefined, { maximumFractionDigits: 0 })}</h2>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-card p-10 rounded-4xl">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Yield Consistency</p>
          <h2 className="text-4xl fw-900 text-ps-primary ls-n2">98.2%</h2>
        </motion.div>
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
                  <th className="px-10 py-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Frequency Period</th>
                  <th className="px-10 py-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Asset Name</th>
                  <th className="px-10 py-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Credit Date</th>
                  <th className="px-10 py-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Yield</th>
                  <th className="px-10 py-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Amount</th>
                  <th className="px-10 py-6 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {returns.length > 0 ? returns.map((item, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-10 py-8">
                      <div className="font-black text-ps-secondary">{item.period}</div>
                    </td>
                    <td className="px-10 py-8">
                      <div className="font-bold text-slate-600 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-ps-primary"></div>
                        {item.investmentName}
                      </div>
                    </td>
                    <td className="px-10 py-8 text-slate-400 font-medium">
                      {item.date}
                    </td>
                    <td className="px-10 py-8">
                      <div className="font-black text-indigo-500">{item.roi}%</div>
                    </td>
                    <td className="px-10 py-8">
                      <div className="text-xl font-black text-ps-secondary">₹{item.amount.toLocaleString()}</div>
                    </td>
                    <td className="px-10 py-8 text-right">
                      <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest ${item.status === 'completed' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                        {item.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={6} className="px-10 py-20 text-center text-slate-400">
                      No payout records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="px-10 py-8 bg-slate-50/50 border-t border-slate-100 flex justify-end">
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

export default InvestorReturns;