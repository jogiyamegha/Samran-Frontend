import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { toAbsoluteUrl } from '../../../../_admin/helpers';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const About: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Reveal Animations
    const sections = gsap.utils.toArray('.reveal-up');
    sections.forEach((section: any) => {
      gsap.fromTo(section,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
          }
        }
      );
    });
  }, { scope: mainRef });

  return (
    <div ref={mainRef} className="bg-white overflow-hidden text-[#0b1f33]">

      {/* HEADER SECTION */}
      <section className="relative pt-40 pb-20 lg:pt-52 lg:pb-32 px-6">
        <div className="max-w-[1400px] mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-[#f0fdf4] text-[#0f766e] text-xs font-bold tracking-[0.2em] uppercase mb-6 border border-[#bbf7d0]">
              We are SAMRAN
            </span>
            <h1 className="text-6xl lg:text-[100px] font-black tracking-tighter leading-[0.9] mb-8 text-[#0b1f33]">
              Building the <br />
              <span className="text-[#0f766e]">Energy Internet.</span>
            </h1>
            <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
              We are a team of engineers, financiers, and environmentalists dedicated to democratizing access to clean energy infrastructure through technology.
            </p>
          </motion.div>
        </div>

        {/* Background Gradients */}
        <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-to-b from-[#f0fdf4] to-white -z-10" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#43EBA6] opacity-[0.05] rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute top-20 left-0 w-[400px] h-[400px] bg-[#0f766e] opacity-[0.05] rounded-full blur-[80px] -translate-x-1/2" />
      </section>



      {/* MISSION / STORY SECTION */}
      <section className="py-24 lg:py-32 bg-[#f8fafc] overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">

            <div className="order-2 lg:order-1 reveal-up">
              <div className="relative rounded-[40px] overflow-hidden">
                <img
                  src={toAbsoluteUrl('media/redesign/green_data_center.png')}
                  alt="Green Data Center"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-10 reveal-up">
              <h2 className="text-5xl lg:text-[70px] font-black text-[#0b1f33] leading-[0.95] tracking-tight">
                Software meets <br />
                <span className="text-[#0f766e]">Solar.</span>
              </h2>
              <div className="space-y-6 text-lg text-slate-600 font-medium leading-relaxed">
                <p>
                  Traditionally, energy infrastructure was a game for utility giants. High capital barriers, complex regulations, and zero liquidity kept individual investors out.
                </p>
                <p>
                  SAMRAN breaks these walls. By digitizing solar assets into fractional, data-backed units, we create a liquid market for clean energy.
                </p>
                <p>
                  Our "Green Data Center" approach ensures every watt generated is cryptographically verified, ensuring total transparency for our investors.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 pt-6">
                <div>
                  <div className="text-4xl font-black text-[#0b1f33]">100GW</div>
                  <div className="text-xs uppercase tracking-widest text-[#0f766e] font-bold mt-1">Target by 2030</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-[#0b1f33]">Zero</div>
                  <div className="text-xs uppercase tracking-widest text-[#0f766e] font-bold mt-1">Carbon Footprint</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* VALUES SECTION */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20 reveal-up">
            <h2 className="text-4xl lg:text-5xl font-black text-[#0b1f33] mb-6">Our Core Principles</h2>
            <p className="text-xl text-slate-500">Built on trust, verified by code.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { t: 'Radical Transparency', d: 'Real-time generation data visible to all. No hidden fees, no opaque contracts.', i: 'fas fa-eye' },
              { t: 'Investor Sovereignty', d: 'You own the asset. We just manage it. You have full control over your portfolio.', i: 'fas fa-crown' },
              { t: 'Sustainable Yield', d: 'We prioritize long-term stability and environmental impact over short-term gains.', i: 'fas fa-seedling' }
            ].map((card, i) => (
              <div key={i} className="group p-10 rounded-[32px] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 reveal-up">
                <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-[#0f766e] text-2xl shadow-sm mb-8 group-hover:scale-110 transition-transform">
                  <i className={card.i}></i>
                </div>
                <h3 className="text-2xl font-bold text-[#0b1f33] mb-4">{card.t}</h3>
                <p className="text-slate-500 leading-relaxed font-medium">{card.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-32 bg-[#052F2B] relative overflow-hidden">
        <div className="max-w-[1000px] mx-auto px-6 relative z-10 text-center reveal-up">
          <h2 className="text-5xl lg:text-7xl font-black text-white mb-8 tracking-tight">
            Be part of the solution.
          </h2>
          <p className="text-xl text-[#b2f5ea] mb-12 max-w-2xl mx-auto">
            Join thousands of others building a cleaner, wealthier future.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="px-10 py-5 bg-[#43EBA6] text-[#052F2B] text-lg font-bold rounded-2xl hover:scale-105 transition-transform">
              View Open Roles
            </button>
            <button className="px-10 py-5 border border-white/20 text-white text-lg font-bold rounded-2xl hover:bg-white/10 transition-colors">
              Contact Us
            </button>
          </div>
        </div>

        {/* Abstract BG */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `radial-gradient(#43EBA6 1px, transparent 1px)`, backgroundSize: '40px 40px' }}></div>
      </section>

    </div>
  );
};

export default About;