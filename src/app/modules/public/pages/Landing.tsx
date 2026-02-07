import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { toAbsoluteUrl } from '../../../../_admin/helpers';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Landing: React.FC = () => {
  const horizontalSectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const horizontalWidth = horizontalSectionRef.current?.scrollWidth || 0;
    const windowWidth = window.innerWidth;
    const scrollAmount = horizontalWidth - windowWidth;

    const pin = gsap.to(horizontalSectionRef.current, {
      x: -scrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top top",
        end: () => `+=${scrollAmount}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      pin.kill();
    };
  }, []);

  const features = [
    {
      title: "Fractional Ownership",
      description: "Own solar assets starting at just ₹5,000. Institutional-grade yield for everyone.",
      icon: "fas fa-pie-chart",
      color: "from-blue-500 to-cyan-400"
    },
    {
      title: "Smart Monitoring",
      description: "Real-time telemetry and generation data tracked via blockchain verified nodes.",
      icon: "fas fa-microchip",
      color: "from-purple-500 to-pink-400"
    },
    {
      title: "Liquid Exit",
      description: "A secondary marketplace to trade your energy units whenever you need liquidity.",
      icon: "fas fa-exchange-alt",
      color: "from-emerald-400 to-teal-500"
    },
    {
      title: "ESG Compliance",
      description: "Seamless carbon offset tracking and automated sustainability reporting.",
      icon: "fas fa-leaf",
      color: "from-amber-400 to-orange-500"
    }
  ];

  return (
    <div className="landing-page bg-white overflow-hidden" style={{ fontFamily: '"Inter", sans-serif' }}>
      {/* Grid Background Effect */}
      <div className="fixed-top w-100 h-100 pointer-events-none opacity-05"
        style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px', zIndex: -1 }}></div>

      {/* Hero Section */}
      <section className="hero-section min-vh-100 d-flex align-items-center position-relative pt-32 pb-20">
        <div className="container position-relative z-index-10">
          <div className="row align-items-center justify-content-center text-center">
            <div className="col-lg-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="mb-10"
              >
                <span className="badge rounded-pill bg-ps-primary bg-opacity-10 text-ps-primary px-6 py-3 fw-bold ls-2 text-uppercase fs-7 mb-8 d-inline-block">
                  SAMRAN V2.0 IS LIVE
                </span>
                <h1 className="display-1 fw-900 text-ps-secondary mb-10 ls-n5 line-height-90">
                  The Operating System for <br />
                  <span className="text-ps-primary modern-gradient-text">Sustainable Capital.</span>
                </h1>
                <p className="fs-2 text-ps-muted mb-15 fw-light mx-auto max-w-700px line-height-160">
                  Fractionalizing energy infrastructure for global investors while enabling ₹0 upfront solar hosting for modern enterprises.
                </p>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="d-flex flex-wrap justify-content-center gap-6 position-relative z-index-20"
              >
                <Link to="/auth/registration" className="btn btn-ps-primary btn-xl rounded-pill px-15 py-6 fs-4 shadow-ps hover-scale fw-bold border-0 bg-ps-primary text-white">
                  Start Your Journey
                </Link>
                <Link to="/about" className="btn btn-outline-ps-secondary btn-xl rounded-pill px-15 py-6 fs-4 fw-bold border-2">
                  How SAMRAN Works
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Floating UI Elements */}
          <div className="row mt-32 position-relative pt-10">
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="col-lg-8 mx-auto position-relative"
            >
              <div className="glass-card p-2 rounded-6 shadow-elegant border border-ps border-opacity-50 h-500px overflow-hidden bg-white">
                <img src={toAbsoluteUrl('media/redesign/dashboard-premium.png')} className="w-100 h-100 object-fit-cover rounded-5" alt="Dashboard" />
              </div>

              {/* Floating Stats */}
              <motion.div
                animate={{ x: [0, 10, 0], y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="position-absolute top-0 start-0 mt-20 ms-n15 glass-card p-8 rounded-5 shadow-lg border border-ps text-center scale-110 d-none d-lg-block bg-white bg-opacity-90"
              >
                <div className="fs-1 fw-900 text-ps-primary">12.4%</div>
                <div className="fs-8 fw-bold text-ps-muted text-uppercase ls-1">Projected IRR</div>
              </motion.div>

              <motion.div
                animate={{ x: [0, -10, 0], y: [0, 15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="position-absolute bottom-0 end-0 mb-20 me-n15 glass-card p-8 rounded-5 shadow-lg border border-ps text-center scale-110 d-none d-lg-block bg-white bg-opacity-90"
              >
                <div className="fs-1 fw-900 text-ps-secondary">₹5,000</div>
                <div className="fs-8 fw-bold text-ps-muted text-uppercase ls-1">Min. Entry</div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient-radial opacity-05 pointer-events-none"></div>
      </section>

      {/* GSAP Horizontal Scroll Showcase */}
      <div ref={triggerRef} className="overflow-hidden bg-ps-secondary">
        <div ref={horizontalSectionRef} className="d-flex align-items-center h-100vh" style={{ width: 'fit-content', paddingLeft: '10vw' }}>
          <div className="flex-shrink-0" style={{ width: '80vw', padding: '0 5vw' }}>
            <div className="text-white text-center">
              <h2 className="display-1 fw-900 ls-n5 mb-10 text-white">Ecosystem Built for <br /> <span className="text-ps-primary">Scale.</span></h2>
              <p className="fs-2 opacity-50 fw-light line-height-160 text-white">Scroll horizontally to explore the SAMRAN product suite</p>
              <i className="fas fa-arrow-right fs-1 text-ps-primary animate-bounce mt-10"></i>
            </div>
          </div>
          {features.map((feature, i) => (
            <div key={i} className="flex-shrink-0" style={{ width: '60vw', padding: '0 5vw' }}>
              <div className="glass-card bg-white p-12 p-lg-20 rounded-6 shadow-2xl hover-lift-lg transition-all-500 h-100" style={{ background: 'rgba(255, 255, 255, 0.95)' }}>
                <div className={`w-80px h-80px rounded-4 bg-gradient-to-br ${feature.color} d-flex align-items-center justify-content-center fs-1 text-white mb-10 shadow-lg`}>
                  <i className={feature.icon}></i>
                </div>
                <h3 className="display-4 fw-900 text-ps-secondary mb-6 ls-n2">{feature.title}</h3>
                <p className="fs-3 text-ps-muted fw-light line-height-160 mb-0">{feature.description}</p>
              </div>
            </div>
          ))}
          <div className="flex-shrink-0" style={{ width: '20vw' }}></div>
        </div>
      </div>

      {/* Product Flow Section - Sticky Panels Style */}
      <section className="py-40">
        <div className="container">
          <div className="row g-20 align-items-start">
            <div className="col-lg-6 position-sticky top-20">
              <div className="section-tag text-ps-primary fw-bold text-uppercase ls-3 fs-7 mb-8">Transparency First</div>
              <h2 className="display-2 fw-900 text-ps-secondary ls-n4 mb-10 line-height-100">
                Real Assets, <br />Digital Precision.
              </h2>
              <p className="fs-3 text-ps-muted fw-light mb-15">
                Our platform provides an institutional link between your capital and physical energy generation.
              </p>
              <div className="d-flex flex-column gap-12">
                {[
                  { t: "Asset Verification", d: "Satellite-driven site monitoring and daily yield auditing." },
                  { t: "Instant Settlements", d: "Revenues distributed daily via automated ledger reconciliation." },
                  { t: "Ownership Representation", d: "Immutable proof of ownership for every fractional capacity unit." }
                ].map((step, i) => (
                  <div key={i} className="d-flex gap-8 group">
                    <div className="w-12px h-12px bg-ps-primary border border-4 border-white shadow-ps rounded-circle mt-3 group-hover-scale-150 transition-300"></div>
                    <div>
                      <h4 className="fw-900 text-ps-secondary fs-4 mb-2">{step.t}</h4>
                      <p className="fs-5 text-ps-muted fw-light line-height-150 mb-0">{step.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-6 pt-20 pt-lg-0">
              <div className="row g-12">
                {[1, 2, 3].map(i => (
                  <div key={i} className="col-12">
                    <div className="glass-card h-400px rounded-6 overflow-hidden border border-ps shadow-elegant group position-relative">
                      <img src={toAbsoluteUrl(`/media/redesign/hero-infrastructure.png`)} className="w-100 h-100 object-fit-cover transition-all-700 group-hover-scale-110" alt="Process" />
                      <div className="position-absolute bottom-0 start-0 w-100 p-10 bg-gradient-to-t">
                        <span className="badge bg-white bg-opacity-20 backdrop-blur-md rounded-pill px-4 py-2 border border-white border-opacity-30 mb-4 text-white">SAMRAN NODE {i}</span>
                        <h4 className="text-white fw-900 fs-3 mb-0 ls-n1">Industrial Solar Cluster India-{i}</h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Metrics Section */}
      <section className="py-25 bg-ps-secondary rounded-t-100px position-relative overflow-hidden mb-32">
        <div className="container position-relative z-index-2">
          <div className="row g-15 text-center">
            {[
              { l: 'Energy Assets Managed', v: '₹450Cr+' },
              { l: 'Clean GWh Generated', v: '185.2' },
              { l: 'Registered Investors', v: '12,400+' },
              { l: 'Carbon Offset (Tons)', v: '22,000+' }
            ].map((stat, i) => (
              <div key={i} className="col-md-3">
                <motion.div
                  whileInView={{ scale: [0.9, 1], opacity: [0, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="display-4 fw-900 text-white mb-3 ls-n2">{stat.v}</div>
                  <div className="fs-7 text-ps-primary fw-bold text-uppercase ls-2">{stat.l}</div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
        {/* Glowing Orbs */}
        <div className="position-absolute top-0 start-0 w-400px h-400px bg-ps-primary opacity-10 blur-150px rounded-circle translate-middle mt-n20"></div>
        <div className="position-absolute bottom-0 end-0 w-600px h-600px bg-ps-primary opacity-10 blur-150px rounded-circle translate-middle-x mb-n30"></div>
      </section>

      {/* High-End CTA Section */}
      <section className="py-40 px-6 mt-20">
        <div className="container">
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-ps-secondary text-white p-15 p-lg-30 rounded-6 text-center position-relative overflow-hidden"
            style={{
              backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.95)), url(${toAbsoluteUrl('media/redesign/hero-infrastructure.png')})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              boxShadow: '0 50px 100px -20px rgba(14, 165, 233, 0.15)'
            }}
          >
            <div className="position-relative z-index-2 max-w-800px mx-auto">
              <h2 className="display-1 fw-900 mb-10 ls-n4 line-height-90 text-white">
                Ready to scale <br />your energy portfolio?
              </h2>
              <p className="fs-3 opacity-60 mb-15 fw-light line-height-160">
                Join the world's most advanced fractional solar network. Start investing or hosting in under 5 minutes.
              </p>
              <div className="d-flex flex-wrap justify-content-center gap-6">
                <Link to="/auth/registration" className="btn btn-ps-primary btn-xl rounded-pill px-15 py-6 fs-3 hover-lift shadow-ps border-0 fw-black bg-ps-primary text-white">
                  Get Started Now
                </Link>
                <Link to="/contact" className="btn btn-outline-white btn-xl rounded-pill px-15 py-6 fs-3 border-opacity-25 fw-bold border-2">
                  Contact Enterprise
                </Link>
              </div>
            </div>

            {/* Final Abstract decoration */}
            <div className="position-absolute top-1/2 start-1/2 translate-middle w-100 h-100 bg-pattern-dots opacity-05"></div>
          </motion.div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{
        __html: `
                .fw-900 { font-weight: 900; }
                .ls-n5 { letter-spacing: -0.05em; }
                .ls-n4 { letter-spacing: -0.04em; }
                .ls-n2 { letter-spacing: -0.02em; }
                .ls-2 { letter-spacing: 0.2em; }
                .ls-3 { letter-spacing: 0.3em; }
                .line-height-90 { line-height: 0.9 !important; }
                .line-height-100 { line-height: 1.0 !important; }
                .line-height-160 { line-height: 1.6 !important; }
                .rounded-6 { border-radius: 4rem; }
                .rounded-t-100px { border-top-left-radius: 100px; border-top-right-radius: 100px; }
                .btn-xl { padding: 1.5rem 3.5rem; }
                .shadow-ps { box-shadow: 0 20px 40px -10px var(--ps-primary-dark); }
                .shadow-elegant { box-shadow: 0 40px 80px -15px rgba(0, 0, 0, 0.1); }
                .modern-gradient-text { background: linear-gradient(135deg, #0ea5e9 0%, #a855f7 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
                .glass-card { background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.2); }
                .bg-gradient-radial { background: radial-gradient(circle, var(--ps-primary) 0%, transparent 70%); }
                .bg-gradient-to-t { background: linear-gradient(0deg, rgba(15, 23, 42, 0.95) 0%, transparent 100%); }
                .bg-gradient-to-br { background: linear-gradient(135deg, var(--tw-gradient-from), var(--tw-gradient-to)); }
                
                .h-100vh { height: 100vh; }
                .w-400vw { width: 500vw; }
                
                .animate-bounce { animation: bounce 2s infinite; }
                @keyframes bounce { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(10px); } }
                
                .hover-lift-lg:hover { transform: translateY(-20px); }
                
                .bg-pattern-dots { background-image: radial-gradient(#ffffff 1px, transparent 0); background-size: 30px 30px; }
                
                .z-index-10 { z-index: 10; }
                .z-index-20 { z-index: 20; }
                
                @media (max-width: 991.98px) {
                    .display-1 { font-size: 3.2rem; }
                    .display-2 { font-size: 2.5rem; }
                    .py-40 { padding-top: 6rem; padding-bottom: 6rem; }
                    .rounded-6 { border-radius: 2.5rem; }
                    .h-500px { height: 350px; }
                }
            `}} />
    </div>
  );
};

export default Landing;