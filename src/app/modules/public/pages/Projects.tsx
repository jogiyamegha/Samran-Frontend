import React from 'react';
import { motion } from 'framer-motion';
import { toAbsoluteUrl } from '../../../../_admin/helpers';

const Projects: React.FC = () => {
    const clusters = [
        { name: 'Gujarat Industrial Cluster', capacity: '12.5 MWp', status: 'Operational', yield: '18.2 GWh/yr', img: toAbsoluteUrl('media/redesign/industrial-cluster.png') },
        { name: 'Maharashtra Logistics Hub', capacity: '8.2 MWp', status: 'Commissioning', yield: '12.1 GWh/yr', img: toAbsoluteUrl('media/redesign/hero-infrastructure.png') },
        { name: 'Karnataka Tech Park', capacity: '5.4 MWp', status: 'Operational', yield: '7.8 GWh/yr', img: toAbsoluteUrl('media/redesign/dashboard-premium.png') },
        { name: 'Rajasthan Desert Plant', capacity: '25.0 MWp', status: 'Planned', yield: '42.5 GWh/yr', img: toAbsoluteUrl('media/redesign/industrial-cluster.png') },
    ];

    return (
        <div className="projects-page bg-white overflow-hidden">
            {/* Hero Section */}
            <section className="py-24 lg:py-32 bg-white text-[#0b1f33] relative">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-12 gap-12">
                        <div className="lg:col-span-8">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <span className="text-[#43EBA6] font-bold text-xs uppercase tracking-[0.3em] mb-8 block">ASSET PORTFOLIO</span>
                                <h1 className="text-6xl lg:text-[100px] font-black mb-10 tracking-tighter leading-[0.9] text-[#0b1f33]">
                                    SAMRAN Clusters. <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0b1f33] via-[#0f766e] to-[#0b1f33]">Digital Assets.</span>
                                </h1>
                                <p className="text-xl lg:text-2xl font-medium text-slate-600 opacity-90 mb-0 leading-relaxed max-w-2xl">
                                    Explore our growing network of industrial solar clusters. Institutional-grade, transparent, and built for decentralized wealth creation.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#43EBA6] opacity-10 blur-3xl rounded-full translate-y-1/4"></div>
            </section>

            {/* Projects Grid */}
            <section className="py-24 bg-[#f8fafc]">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {clusters.map((cluster, i) => (
                            <div key={i} className="col-span-1">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group relative rounded-[32px] overflow-hidden shadow-lg border border-slate-200 h-full bg-white hover:-translate-y-2 transition-all duration-300"
                                >
                                    <div className="overflow-hidden h-[300px] relative">
                                        <img src={cluster.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={cluster.name} />
                                        <div className="absolute inset-0 bg-black/20"></div>
                                    </div>
                                    <div className="p-10 bg-white">
                                        <div className="flex justify-between items-center mb-6">
                                            <span className={`inline-block px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider ${cluster.status === 'Operational' ? 'bg-[#ECFDF5] text-[#0f766e]' : 'bg-slate-100 text-slate-600'}`}>
                                                {cluster.status}
                                                {cluster.status === 'Operational' && <span className="inline-block w-2 h-2 ml-2 rounded-full bg-[#0f766e] animate-pulse"></span>}
                                            </span>
                                            <span className="text-3xl font-black text-[#052F2B] tracking-tight">{cluster.capacity}</span>
                                        </div>
                                        <h3 className="text-3xl font-black text-[#0b1f33] mb-6 tracking-tight">{cluster.name}</h3>
                                        <div className="flex gap-10 pt-8 border-t border-slate-100">
                                            <div>
                                                <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Estimated Yield</div>
                                                <div className="text-2xl font-black text-[#0f766e]">{cluster.yield}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Annual CO2 Offset</div>
                                                <div className="text-2xl font-black text-[#0f766e]">{(parseInt(cluster.capacity) * 1.2).toFixed(1)}k Tons</div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-6 pt-0 bg-[#f8fafc]">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
                    <div className="bg-[#052F2B] text-center p-12 lg:p-24 rounded-[48px] shadow-2xl relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-4xl lg:text-6xl font-black text-[#ECFDF5] mb-10 tracking-tight">Build your node today.</h2>
                            <div className="flex flex-wrap justify-center gap-6">
                                <button className="px-10 py-4 text-xl font-bold bg-[#43EBA6] text-[#052F2B] rounded-2xl hover:bg-[#34d399] transition-transform hover:-translate-y-1 shadow-lg">
                                    Invest in Node
                                </button>
                                <button className="px-10 py-4 text-xl font-bold border-2 border-white/20 text-[#ECFDF5] rounded-2xl hover:bg-white/10 transition-transform hover:-translate-y-1">
                                    Contact Sales
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Projects;
