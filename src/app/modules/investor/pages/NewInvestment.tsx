import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import APICallService from '../../../../api/apiCallService';
import * as apiEndpoints from '../../../../api/apiEndPoints';
import { toast } from 'react-toastify';

const NewInvestment: React.FC = () => {
    const navigate = useNavigate();
    const [filter, setFilter] = useState('All');
    const [opportunities, setOpportunities] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedOpp, setSelectedOpp] = useState<any>(null);

    useEffect(() => {
        fetchOpportunities();
    }, []);

    const fetchOpportunities = async () => {
        try {
            setLoading(true);
            const apiCall = new APICallService(apiEndpoints.INVESTOR.AVAILABLE_INVESTMENTS);
            const res = await apiCall.callAPI();
            if (res && Array.isArray(res)) {
                // Map backend response to UI model
                // Assuming backend returns PPA objects with added 'fundedPercent', 'availableCapacity'
                const mappedOpps = res.map((item: any, index: number) => ({
                    id: item._id,
                    name: item.ppaName || `Solar Cluster ${index + 1}`,
                    location: `${item.plantDetail?.city || 'Unknown'}, ${item.plantDetail?.address || 'India'}`,
                    capacity: `${item.plantCapacity} MWp`,
                    minInvestment: '₹1,00,000', // Hardcoded or needs to be in DB
                    estimatedROI: '14-16%',     // Hardcoded or needs to be in DB
                    riskScore: 'Low',           // Hardcoded
                    funded: item.fundedPercent || 0,
                    tag: item.fundedPercent > 90 ? 'Almost Full' : (item.fundedPercent < 20 ? 'New' : 'Trending'),
                    isFull: item.fundedPercent >= 100,
                    details: item // Store full item for modal
                }));
                setOpportunities(mappedOpps);
            }
        } catch (error) {
            console.error("Error fetching opportunities:", error);
            toast.error("Failed to load investment opportunities");
        } finally {
            setLoading(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    const filteredOpportunities = filter === 'All'
        ? opportunities
        : opportunities.filter(opp => opp.tag === filter); // Simple filter logic, can be expanded

    if (loading) {
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
            className="space-y-12 relative"
        >
            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h1 className="text-5xl md:text-6xl fw-900 ls-n4 mb-3 text-ps-secondary uppercase">
                        Investment Hub
                    </h1>
                    <p className="text-xl text-slate-500 font-light max-w-2xl">
                        Explore verified institutional-grade solar assets and scale your sustainable portfolio.
                    </p>
                </div>
                <div className="flex bg-slate-100 p-1.5 rounded-2xl gap-1">
                    {['All', 'High Yield', 'Low Risk', 'Near Completion'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all border-0 ${filter === f ? 'bg-white text-ps-secondary shadow-sm' : 'text-slate-500 hover:text-ps-secondary'} border-0`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Opportunities Grid */}
            {opportunities.length === 0 ? (
                <div className="text-center py-20 bg-slate-50 rounded-4xl">
                    <p className="text-slate-400 font-medium">No active investment opportunities at the moment.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {filteredOpportunities.map((opp) => (
                        <motion.div
                            key={opp.id}
                            variants={itemVariants}
                            className="glass-card rounded-4xl border border-slate-100 overflow-hidden group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative"
                        >
                            {/* Status Tag */}
                            <div className="absolute top-8 right-8 z-10">
                                <span className={`px-5 py-2 ${opp.isFull ? 'bg-slate-200 text-slate-500' : 'bg-ps-primary text-[#052F2B]'} font-black text-[10px] tracking-widest rounded-full shadow-lg`}>
                                    {opp.isFull ? 'SOLD OUT' : opp.tag.toUpperCase()}
                                </span>
                            </div>

                            <div className="p-10">
                                <div className="flex items-center gap-5 mb-8">
                                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-ps-primary text-2xl group-hover:scale-110 transition-transform">
                                        <i className="fas fa-solar-panel"></i>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-ps-secondary group-hover:text-ps-primary transition-colors">{opp.name}</h3>
                                        <p className="text-slate-400 font-bold text-sm tracking-wide flex items-center gap-2">
                                            <i className="fas fa-map-marker-alt text-ps-primary/50"></i> {opp.location}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-6 mb-10">
                                    <div className="p-5 bg-slate-50 rounded-3xl group-hover:bg-ps-secondary/5 transition-colors">
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 text-center">ROI</div>
                                        <div className="text-xl font-black text-emerald-500 text-center">{opp.estimatedROI}</div>
                                    </div>
                                    <div className="p-5 bg-slate-50 rounded-3xl group-hover:bg-ps-secondary/5 transition-colors">
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 text-center">Min. Invest</div>
                                        <div className="text-xl font-black text-ps-secondary text-center">{opp.minInvestment}</div>
                                    </div>
                                    <div className="p-5 bg-slate-50 rounded-3xl group-hover:bg-ps-secondary/5 transition-colors">
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 text-center">Capacity</div>
                                        <div className="text-xl font-black text-ps-secondary text-center">{opp.capacity}</div>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="space-y-3 mb-10">
                                    <div className="flex justify-between items-end">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Funding Progress</span>
                                        <span className="text-xs font-black text-ps-secondary">{opp.funded}%</span>
                                    </div>
                                    <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${opp.funded}%` }}
                                            transition={{ duration: 1.5, delay: 0.5 }}
                                            className="h-full bg-gradient-to-r from-ps-primary to-emerald-500"
                                        ></motion.div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <button
                                        className={`flex-grow py-5 ${opp.isFull ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-ps-secondary text-white hover:bg-black shadow-xl active:scale-95'} rounded-2xl font-black text-sm transition-all border-0`}
                                        onClick={() => !opp.isFull && toast.info("Investment flow integration coming soon!")}
                                        disabled={opp.isFull}
                                    >
                                        {opp.isFull ? 'OPPORTUNITY CLOSED' : 'INVEST IN NODE'}
                                    </button>
                                    <button
                                        onClick={() => setSelectedOpp(opp)}
                                        className="w-16 py-5 bg-slate-100 text-ps-secondary rounded-2xl flex items-center justify-center hover:bg-ps-primary transition-all border-0"
                                    >
                                        <i className="fas fa-info-circle"></i>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Help CTA */}
            <motion.div variants={itemVariants} className="p-12 bg-[#F8FAF3] rounded-4xl border border-ps-primary/20 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-8">
                    <div className="w-20 h-20 bg-white rounded-3xl shadow-ps flex items-center justify-center text-ps-primary text-3xl">
                        <i className="fas fa-shield-alt"></i>
                    </div>
                    <div>
                        <h4 className="text-2xl font-black text-ps-secondary mb-1">Institutional Shield</h4>
                        <p className="text-slate-500 font-medium">All assets are legally verified and insured by global providers.</p>
                    </div>
                </div>
                <button className="px-10 py-5 bg-white text-ps-secondary border-2 border-slate-200 rounded-2xl font-black text-sm hover:border-ps-primary transition-all active:scale-95">
                    View Legal Framework
                </button>
            </motion.div>

            {/* Info Modal */}
            <AnimatePresence>
                {selectedOpp && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedOpp(null)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        ></motion.div>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-[2rem] p-8 md:p-12 w-full max-w-2xl relative z-10 shadow-2xl overflow-hidden"
                        >
                            <button
                                onClick={() => setSelectedOpp(null)}
                                className="absolute top-6 right-6 w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:bg-red-50 hover:text-red-500 transition-colors border-0"
                            >
                                <i className="fas fa-times"></i>
                            </button>

                            <h2 className="text-3xl font-black text-ps-secondary mb-2">{selectedOpp.name}</h2>
                            <p className="text-slate-500 mb-8 flex items-center gap-2">
                                <i className="fas fa-map-marker-alt text-ps-primary"></i> {selectedOpp.location}
                            </p>

                            <div className="grid grid-cols-2 gap-6 mb-8">
                                <div className="p-5 bg-slate-50 rounded-2xl">
                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Capacity</div>
                                    <div className="text-xl font-black text-ps-secondary">{selectedOpp.capacity}</div>
                                </div>
                                <div className="p-5 bg-slate-50 rounded-2xl">
                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Available</div>
                                    <div className="text-xl font-black text-emerald-600">
                                        {(selectedOpp.details.availableCapacity || 0).toLocaleString()} kW
                                    </div>
                                </div>
                                <div className="p-5 bg-slate-50 rounded-2xl">
                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">PPA Tariff</div>
                                    <div className="text-xl font-black text-ps-secondary">₹{selectedOpp.details.tarrif}/unit</div>
                                </div>
                                <div className="p-5 bg-slate-50 rounded-2xl">
                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Tenure</div>
                                    <div className="text-xl font-black text-ps-secondary">{selectedOpp.details.expectedYears} Years</div>
                                </div>
                            </div>

                            <p className="text-slate-600 leading-relaxed mb-8">
                                This solar asset is part of our strategic renewable energy portfolio.
                                Secure your fractional ownership today to start earning monthly returns generated from clean energy sales.
                            </p>

                            <button
                                onClick={() => {
                                    setSelectedOpp(null);
                                    toast.info("Investment functionality coming soon!");
                                }}
                                className="w-full py-4 bg-ps-primary text-[#052F2B] font-black rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all border-0"
                            >
                                Proceed to Invest
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default NewInvestment;
