import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Case created. A SAMRAN institutional consultant will contact you shortly.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="contact-page bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="py-24 lg:py-32 bg-[#fff] relative">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-[#43EBA6] font-bold text-xs uppercase tracking-[0.3em] mb-8 block">INSTITUTIONAL ACCESS</span>
                <h1 className="text-6xl lg:text-[100px] font-black text-[#0b1f33] mb-10 tracking-tighter leading-[0.9]">
                  Join the <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0b1f33] via-[#0f766e] to-[#0b1f33]">Energy Network.</span>
                </h1>
                <p className="text-xl lg:text-2xl text-[#475569] font-medium leading-relaxed max-w-3xl mx-auto mb-0">
                  Build your enterprise solar cluster or diversify your portfolio with SAMRAN. Our specialists are ready to architect your energy future.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#43EBA6] opacity-[0.03] blur-3xl rounded-full"></div>
      </section>

      {/* Contact Grid */}
      <section className="pb-24 lg:pb-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-5 h-full">
              <div className="flex flex-col h-full justify-between gap-12 py-10">
                <div className="flex flex-col gap-12">
                  {[
                    { t: 'SAMRAN GLOBAL HQ', d: 'Sector 5, Gandhinagar, Gujarat', i: 'fas fa-map-marker-alt' },
                    { t: 'SOLUTIONS INQUIRY', d: 'partner@samran.solar', i: 'fas fa-envelope-open-text' },
                    { t: 'INVESTOR RELATIONS', d: 'ir@samran.solar', i: 'fas fa-briefcase' }
                  ].map((item, i) => (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.15 }}
                      key={i}
                      className="flex gap-8 group"
                    >
                      <div className="w-16 h-16 bg-[#ECFDF5] rounded-2xl flex items-center justify-center text-[#0f766e] text-2xl transition-all duration-300 border border-[#43EBA6]/20 shadow-sm shrink-0">
                        <i className={item.i}></i>
                      </div>
                      <div>
                        <h4 className="font-black text-[#0b1f33] text-2xl mb-2 tracking-tight">{item.t}</h4>
                        <p className="text-lg text-[#475569] font-medium mb-0">{item.d}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 p-10 bg-[#052F2B] rounded-[32px] text-white relative overflow-hidden shadow-2xl">
                  <div className="relative z-10">
                    <h4 className="font-bold mb-4 tracking-tight text-3xl text-[#ECFDF5]">Scale with Precision.</h4>
                    <p className="text-lg opacity-80 font-medium text-[#B2F5EA]">Get custom asset modeling and project feasibility reports for your industrial clusters.</p>
                  </div>
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#43EBA6] opacity-10 rounded-full blur-2xl"></div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white p-12 lg:p-16 rounded-[40px] border border-slate-200 shadow-2xl"
              >
                <h3 className="text-4xl lg:text-5xl font-black text-[#0b1f33] mb-12 tracking-tight">Architect Your Access.</h3>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="col-span-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 block">Entity Name</label>
                    <input type="text" name="name" className="w-full px-6 py-4 rounded-xl text-lg font-medium bg-slate-50 border border-slate-200 focus:border-[#43EBA6] focus:ring-1 focus:ring-[#43EBA6] focus:outline-none transition-all placeholder:text-slate-400" placeholder="Arkham Industrial Ltd." value={formData.name} onChange={handleChange} required />
                  </div>
                  <div className="col-span-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 block">Professional Email</label>
                    <input type="email" name="email" className="w-full px-6 py-4 rounded-xl text-lg font-medium bg-slate-50 border border-slate-200 focus:border-[#43EBA6] focus:ring-1 focus:ring-[#43EBA6] focus:outline-none transition-all placeholder:text-slate-400" placeholder="cio@entity.com" value={formData.email} onChange={handleChange} required />
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 block">Inquiry Pathway</label>
                    <div className="relative">
                      <select name="subject" className="w-full px-6 py-4 rounded-xl text-lg font-medium bg-slate-50 border border-slate-200 focus:border-[#43EBA6] focus:ring-1 focus:ring-[#43EBA6] focus:outline-none transition-all placeholder:text-slate-400 appearance-none" value={formData.subject} onChange={handleChange} required>
                        <option value="">Select an option</option>
                        <option value="Host">Enterprise Hosting (₹0 Upfront)</option>
                        <option value="Invest">Asset Diversification</option>
                        <option value="Solar">Capacity Procurement</option>
                        <option value="Tech">Protocol White-labeling</option>
                      </select>
                      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                        <i className="fas fa-chevron-down"></i>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 block">Executive Brief</label>
                    <textarea name="message" className="w-full px-6 py-4 rounded-xl text-lg font-medium bg-slate-50 border border-slate-200 focus:border-[#43EBA6] focus:ring-1 focus:ring-[#43EBA6] focus:outline-none transition-all placeholder:text-slate-400" rows={5} placeholder="How can SAMRAN facilitate your transition?" value={formData.message} onChange={handleChange} required></textarea>
                  </div>
                  <div className="col-span-1 md:col-span-2 pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full py-5 rounded-2xl text-xl font-bold bg-[#052F2B] text-white hover:bg-[#04362F] shadow-lg transition-transform"
                    >
                      Initiate Connection
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;