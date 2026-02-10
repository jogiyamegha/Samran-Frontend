import React, { useRef, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import FAQSection from '../components/FAQSection';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from '@studio-freight/lenis';
import { toAbsoluteUrl } from '../../../../_admin/helpers';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Home: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);



  const transparencyItems = useMemo(() => [
    { title: 'Asset Verification', content: 'Digital proof of physical deployment at the hosting facility. Every panel serial number is tracked and verified.', icon: 'fa-clipboard-check' },
    { title: 'Revenue Tracking', content: 'Direct PPA settlement visibility. Every rupee tracked from generation to wallet with real-time settlement.', icon: 'fa-chart-line' },
    { title: 'Ownership Proof', content: 'Secure digital deed of ownership. Your investment represents verifiable rights to physical assets.', icon: 'fa-file-contract' },
    { title: 'Public Audit', content: '24/7 audit logs for telemetry and payout reconciliation. Zero trust architecture for institutional peace of mind.', icon: 'fa-magnifying-glass-dollar' }
  ], []);



  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      infinite: false,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  useGSAP(() => {
    // Hero animations
    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });
    heroTl.to('.hero-content', { opacity: 0, scale: 0.92, y: -100, ease: 'none' });
    heroTl.to('.hero-gradient', { scale: 1.5, opacity: 0.3, ease: 'none' }, 0);

    // Reveal animations
    gsap.utils.toArray('.reveal-up').forEach((elem: any) => {
      gsap.fromTo(elem,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: elem,
            start: 'top 85%',
          }
        }
      );
    });

    // Image parallax
    gsap.utils.toArray('.img-parallax').forEach((img: any) => {
      gsap.fromTo(img,
        { y: -50 },
        {
          y: 50,
          ease: 'none',
          scrollTrigger: {
            trigger: img,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      );
    });

    // Horizontal scroll
    const sections = gsap.utils.toArray('.horizontal-panel');
    if (sections.length > 0 && horizontalRef.current) {
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: '.horizontal-container',
          pin: true,
          scrub: 1,
          end: () => `+=${horizontalRef.current?.scrollWidth}`,
          invalidateOnRefresh: true,
        },
      });
    }

    // Stagger animations


    gsap.from('.transparency-card', {
      scrollTrigger: { trigger: '.transparency-section', start: 'top 80%' },
      y: 50,
      opacity: 0,
      scale: 0.95,
      stagger: 0.12,
      duration: 0.9,
      ease: 'back.out(1.2)'
    });

  }, { scope: mainRef, dependencies: [] });

  return (
    <div ref={mainRef} className="bg-[#fafbfc] text-[#081827] overflow-x-hidden selection:bg-[#43EBA6
]/20 selection:text-[#081827]">

      {/* ============ HERO SECTION ============ */}
      <section className="hero-section relative min-h-screen flex flex-col justify-center overflow-hidden bg-white">
        {/* Animated gradient blob - made more subtle */}
        <div className="hero-gradient absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-gradient-to-br from-[#43EBA6]/10 via-cyan-400/5 to-transparent rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/5 via-indigo-400/5 to-transparent rounded-full blur-3xl opacity-60" />

        {/* Dotted Grid pattern */}
        <div className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, #94a3b8 1.5px, transparent 1.5px)`,
            backgroundSize: '24px 24px',
            opacity: 0.4
          }}
        />

        <div className="hero-content z-20 w-full max-w-[1280px] mx-auto px-6 lg:px-8 pt-32 pb-20 lg:pt-44 lg:pb-28 relative">
          {/* Left content - Redesigned */}
          <div className="lg:w-[50%] lg:ml-[5%] space-y-10 relative z-20">
            {/* Badge */}
            <div className="inline-flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#43EBA6] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#43EBA6]"></span>
              </span>
              <span className="text-xs font-bold uppercase">Trusted by 50+ Enterprises</span>
            </div>

            {/* Headline */}
            <div className="space-y-6">

              <h1 className="text-5xl lg:text-[80px] font-black tracking-[-0.04em] leading-[0.9] text-[#0b1f33]">
                Modern <br />
                Energy <br />
                <span
                  className="text-transparent bg-clip-text bg-gradient-to-r from-[#0b1f33] via-[#0f766e] to-[#0b1f33] bg-[length:200%_200%] animate-gradient"
                >
                  Finance.
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg lg:text-xl max-w-lg font-medium leading-relaxed tracking-tight border-l-4 border-[#43EBA6] pl-6">
                <span className="text-[#334155]">
                  Institutional solar fractionalization.
                </span>
                <br className="hidden lg:block" />
                <span className="text-[#0b1f33] font-bold">
                  Switch with ₹0 upfront.
                </span>
              </p>

            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                to="/auth/registration"
                className="group px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 bg-[#43EBA6] text-white shadow-xl shadow-blue-900/10 hover:shadow-2xl hover:shadow-blue-900/20 hover:-translate-y-1 transition-all duration-300"
              >
                Enroll as a Host
                <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform text-[#43EBA6]" />
              </Link>
              <button
                onClick={() => document.querySelector('.comparison-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-white border border-slate-200 text-[#081827] rounded-xl font-bold text-lg hover:border-[#081827] hover:bg-[#081827] hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg flex items-center justify-center gap-2"
              >
                View Benefits
              </button>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-6 pt-8 border-t border-slate-100 max-w-md">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-2 border-white shadow-md flex items-center justify-center overflow-hidden bg-white">
                    <img
                      src={`https://ui-avatars.com/api/?name=User+${i}&background=random&color=fff`}
                      alt={`Investor ${i}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                <div className="w-12 h-12 rounded-full bg-[#052F2B] border-2 border-white shadow-md flex items-center justify-center text-white text-xs font-bold">
                  +22k
                </div>
              </div>
              <div>
                <div className="font-black text-[#081827] text-lg leading-none mb-1">22,000+</div>
                <div className="text-[#64748b] text-sm font-medium">Investors Active</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right content - Integrated Visual (Moved Outside hero-content to prevent GSAP transform clipping) */}
        <div className="relative z-10 lg:absolute lg:right-0 lg:top-0 lg:h-full lg:w-[90vw]">
          <img
            src={toAbsoluteUrl('media/redesign/homehero.png')}
            alt="Samran Explorer"
            className="w-full h-full object-cover object-center lg:object-left lg:scale-75 lg:origin-right"
          />
          {/* Sun Overlay - Scaled up to hide edges */}
          <img
            src={toAbsoluteUrl('media/redesign/sunlight.png')}
            alt=""
            className="absolute inset-0 w-[150%] max-w-none h-[150%] object-cover lg:object-left pointer-events-none lg:scale-75 lg:origin-right z-20 -translate-x-[30%] -translate-y-[30%]"
            style={{ maskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)', WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)' }}
          />

          {/* Hero Caption */}
          <div className="hidden lg:block absolute bottom-[25%] left-[50%] max-w-sm p-6 rounded-2xl z-30 animate-float-delayed">
            <div className="flex items-start gap-4">
              <div className="w-1 h-12 bg-emerald-500 rounded-full shrink-0"></div>
              <div>
                <p className="font-bold text-[#0b1f33] text-sm leading-relaxed">
                  Bridging the gap between digital capital and physical energy infrastructure.
                </p>
                <p className="text-xs font-bold text-emerald-600 mt-1 uppercase tracking-wider">Seamless. Scalable. Smart.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Partner logos */}
        <div className="w-full py-12 bg-white border-y border-slate-100 relative z-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-8 text-xs font-bold text-[#94a3b8] uppercase tracking-[0.2em]">Trusted Partners</div>
            <div className="flex justify-center items-center gap-12 lg:gap-24 flex-wrap grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
              {['TATA POWER', 'ADANI RENEWABLES', 'REC', 'ABB', 'SUZLON'].map((partner, i) => (
                <span key={i} className="font-black text-xl lg:text-3xl text-[#081827] tracking-tighter cursor-default">{partner}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ COMPARISON SECTION ============ */}
      <section className="comparison-section py-24 lg:py-32 bg-[#f8fafc] relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">

          {/* Header */}
          <div className="text-center mb-20 space-y-4 reveal-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ECFDF5] border border-[#43EBA6]/40 text-[#0f766e] text-xs font-bold uppercase tracking-wider">
              <i className="fas fa-check-circle" />
              Smart Switch
            </div>

            <h2 className="text-5xl lg:text-[80px] font-black tracking-tight text-[#0b1f33]">
              Why Subscribe?
            </h2>

            <p className="text-xl lg:text-2xl text-[#334155] max-w-3xl mx-auto font-medium">
              Enterprise-grade energy adoption without capital lock-in
            </p>
          </div>

          {/* Cards */}
          <div className="grid lg:grid-cols-2 gap-10">

            {/* Samran */}
            <div className="reveal-up bg-[#052F2B] rounded-[48px] p-12 lg:p-16 shadow-[0_50px_120px_rgba(0,0,0,0.45)] relative overflow-hidden">

              <div className="absolute inset-0 bg-gradient-to-br from-[#0f766e]/20 via-transparent to-transparent" />

              <div className="relative z-10 space-y-10">

                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#43EBA6]/10 border border-[#43EBA6]/30 text-[#43EBA6] text-xs font-bold uppercase tracking-wider">
                  <i className="fas fa-bolt" />
                  De-Re Infrastructure
                </div>

                <h3 className="text-4xl lg:text-5xl font-black text-[#ECFDF5] leading-tight">
                  Pay as you consume. <br />
                  <span className="text-[#43EBA6]">₹0 Invested.</span>
                </h3>

                <div className="space-y-6 pt-8 border-t border-white/10">
                  {[
                    ['Capital Locked', 'Absolute Zero'],
                    ['Lifecycle Risk', 'Insured by Samran'],
                    ['Efficiency', 'IoT Monitoring'],
                    ['ROI Timeline', 'Immediate Returns']
                  ].map(([t, v], i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#43EBA6]/10 border border-[#43EBA6]/30 flex items-center justify-center text-[#43EBA6]">
                        <i className="fas fa-check" />
                      </div>
                      <div>
                        <div className="font-bold text-xl text-[#ECFDF5]">{t}</div>
                        <div className="text-[#B2F5EA]">{v}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <Link
                  to="/auth/registration"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-[#43EBA6] text-[#052F2B] rounded-2xl font-bold shadow-xl hover:scale-105 transition"
                >
                  Get Started <i className="fas fa-arrow-right" />
                </Link>

              </div>
            </div>

            {/* Traditional */}
            <div className="reveal-up bg-white border border-[#e2e8f0] rounded-[48px] p-12 lg:p-16 shadow-xl">

              <div className="space-y-10">

                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#f1f5f9] border border-[#cbd5e1] text-[#475569] text-xs font-bold uppercase tracking-wider">
                  <i className="fas fa-industry" />
                  Traditional CAPEX
                </div>

                <h3 className="text-4xl lg:text-5xl font-black text-[#0b1f33]">
                  High Risk. <br />
                  <span className="text-red-600">Heavy Capex.</span>
                </h3>

                <div className="space-y-6 pt-8 border-t border-[#e2e8f0]">
                  {[
                    ['Initial Outlay', 'Massive Lock'],
                    ['Performance', 'User Burden'],
                    ['ROI', '5–7 Year Payback'],
                    ['Maintenance', 'Self-managed']
                  ].map(([t, v], i) => (
                    <div key={i} className="flex gap-4 opacity-70">
                      <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600">
                        <i className="fas fa-times" />
                      </div>
                      <div>
                        <div className="font-bold text-xl text-[#0b1f33]">{t}</div>
                        <div className="text-[#64748b]">{v}</div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>

          {/* Highlight Bar */}
          <div className="mt-20 reveal-up">
            <div className="max-w-4xl mx-auto bg-[#052F2B] rounded-3xl p-10 shadow-[0_40px_100px_rgba(0,0,0,0.4)] border border-[#0f766e]/40 grid md:grid-cols-3 gap-10 text-center">
              {[
                ['100%', 'Insurance Backed'],
                ['₹0', 'Upfront Capital'],
                ['24/7', 'Monitoring']
              ].map(([v, t], i) => (
                <div key={i}>
                  <div className="text-5xl font-black text-[#43EBA6]">{v}</div>
                  <div className="text-sm font-bold uppercase tracking-widest text-[#ECFDF5] mt-2">
                    {t}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>


      {/* ============ TRANSPARENCY SECTION ============ */}
      <section className="transparency-section py-24 lg:py-32 bg-[#f8fafc] relative overflow-hidden">

        {/* subtle dot grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle, #43EBA6 1px, transparent 1px)`,
            backgroundSize: '48px 48px'
          }}
        />

        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">

          {/* Header */}
          <div className="mb-20 reveal-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ECFDF5] border border-[#43EBA6]/40 text-[#0f766e] text-xs font-bold uppercase tracking-wider mb-6">
              <i className="fas fa-certificate" />
              Full Transparency
            </div>

            <h2 className="text-5xl lg:text-[80px] font-black tracking-tight text-[#0b1f33] max-w-4xl">
              Institutional-Grade{" "}
              <span className="text-[#43EBA6]">Transparency</span>
            </h2>

            <p className="text-xl lg:text-2xl text-[#334155] max-w-3xl mt-6 font-medium">
              Every transaction, every watt, every rupee — fully auditable and transparent
            </p>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {transparencyItems.map((item, i) => (
              <div
                key={i}
                className="group bg-white rounded-[40px] p-10 border border-[#e2e8f0] shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >

                {/* Icon */}
                <div className="w-20 h-20 rounded-2xl bg-[#ECFDF5] border border-[#43EBA6]/20 flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform">
                  <i className={`fas ${item.icon} text-3xl text-[#052F2B]`} />
                </div>

                {/* Title */}
                <h4 className="text-2xl lg:text-3xl font-black text-[#0b1f33] mb-4 tracking-tight">
                  {item.title}
                </h4>

                {/* Content */}
                <p className="text-[#475569] text-lg leading-relaxed font-medium">
                  {item.content}
                </p>

                {/* Learn more */}
                <div className="mt-6 inline-flex items-center gap-2 text-[#0f766e] font-bold">
                  Learn more
                  <i className="fas fa-arrow-right text-sm" />
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>





      {/* ============ HORIZONTAL SCROLL SECTION ============ */}
      <section className="horizontal-container h-screen overflow-hidden flex items-center bg-[#052F2B] relative">
        <div ref={horizontalRef} className="flex h-full w-[400%]">

          {/* PANEL 1 — PHYSICAL INFRASTRUCTURE */}
          <div className="horizontal-panel w-screen h-full flex items-center justify-center relative flex-shrink-0 overflow-hidden px-8 lg:px-20">
            <img
              src={toAbsoluteUrl('media/redesign/solar_farm_v3.png')}
              className="absolute inset-0 w-full h-full object-cover opacity-20"
              alt="infrastructure"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#052F2B] via-[#052F2B]/90 to-transparent" />

            <div className="relative z-10 max-w-[1400px] w-full">
              <div className="w-24 h-1.5 bg-[#43EBA6] mb-12 rounded-full" />

              <h2 className="text-[90px] lg:text-[140px] font-black tracking-tight leading-[0.85] text-[#ECFDF5] mb-8">
                Physical <br />
                <span className="text-[#43EBA6]">Nodes.</span>
              </h2>

              <p className="text-2xl lg:text-4xl text-[#B2F5EA] max-w-3xl leading-tight font-medium">
                Verified infrastructure{" "}
                <span className="text-[#43EBA6] font-bold underline decoration-[#43EBA6] decoration-4 underline-offset-8">
                  deployed live
                </span>{" "}
                on the grid.
              </p>

              <div className="flex gap-6 mt-12">
                {[
                  ["OPERATIONAL", "450+ MW"],
                  ["LOCATIONS", "78 Sites"]
                ].map(([t, v], i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-4">
                    <div className="text-[#43EBA6] text-xs font-bold mb-1">{t}</div>
                    <div className="text-[#ECFDF5] text-2xl font-black">{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* PANEL 2 — LIVE DATA */}
          <div className="horizontal-panel w-screen h-full flex items-center justify-center px-8 lg:px-20 bg-[#f8fafc] flex-shrink-0">
            <div className="max-w-[1400px] w-full grid lg:grid-cols-2 gap-16 items-center">

              <div className="space-y-8">
                <div className="w-24 h-1.5 bg-[#43EBA6] rounded-full" />

                <h2 className="text-7xl lg:text-[110px] font-black tracking-tight text-[#0b1f33] leading-[0.9]">
                  Live <br />
                  <span className="text-[#0f766e]">Pulse.</span>
                </h2>

                <p className="text-2xl lg:text-3xl text-[#334155] leading-relaxed font-medium">
                  Watch your energy units <span className="font-bold text-[#0b1f33]">settle daily</span>. Zero latency yields.
                </p>

                <div className="flex gap-4 pt-4">
                  {[
                    ["TODAY'S GENERATION", "8,472 kWh"],
                    ["REVENUE", "₹67,104"]
                  ].map(([t, v], i) => (
                    <div key={i} className="bg-white rounded-2xl shadow-xl p-6 border border-[#e2e8f0]">
                      <div className="text-[#0f766e] text-xs font-bold mb-2">{t}</div>
                      <div className="text-[#0b1f33] text-4xl font-black">{v}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="bg-white p-6 rounded-[40px] shadow-2xl border border-[#e2e8f0]">
                  <img src={toAbsoluteUrl('media/redesign/analytics_ui_v3.png')} className="w-full h-auto rounded-3xl" alt="analytics" />
                </div>
                <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-[#052F2B] rounded-3xl flex items-center justify-center text-[#43EBA6] shadow-2xl">
                  <i className="fas fa-chart-line text-4xl" />
                </div>
              </div>

            </div>
          </div>

          {/* PANEL 3 — LIQUIDITY */}
          <div className="horizontal-panel w-screen h-full flex items-center justify-center px-8 lg:px-20 bg-[#052F2B] flex-shrink-0 relative overflow-hidden">
            <img src={toAbsoluteUrl('media/redesign/liquidity_v3.png')} className="absolute inset-0 w-full h-full object-cover opacity-10" />

            <div className="relative z-10 text-center space-y-12 max-w-5xl">
              <h2 className="text-[100px] lg:text-[160px] font-black text-[#ECFDF5]">LIQUIDITY</h2>

              <p className="text-2xl lg:text-4xl text-[#B2F5EA] font-medium max-w-3xl mx-auto">
                Trade fractional ownership on our <span className="text-[#43EBA6] font-bold">institutional marketplace</span>
              </p>

              <div className="flex justify-center gap-6">
                {[
                  ["24H VOLUME", "₹4.2 Cr"],
                  ["AVG. SPREAD", "0.3%"]
                ].map(([t, v], i) => (
                  <div key={i} className="bg-white/10 border border-white/20 rounded-2xl px-8 py-5">
                    <div className="text-[#43EBA6] text-xs font-bold mb-2">{t}</div>
                    <div className="text-[#ECFDF5] text-3xl font-black">{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* PANEL 4 — ESG */}
          <div className="horizontal-panel w-screen h-full flex items-center justify-center px-8 lg:px-20 bg-[#f8fafc] flex-shrink-0">
            <div className="text-center space-y-12 max-w-5xl">

              <h2 className="text-[90px] lg:text-[140px] font-black text-[#0b1f33]">
                ESG <span className="text-[#0f766e]">Ready.</span>
              </h2>

              <p className="text-2xl lg:text-4xl text-[#334155] max-w-4xl mx-auto font-medium">
                Every watt tracked. Every ton offset <span className="font-bold text-[#0b1f33] underline decoration-[#43EBA6] decoration-8 underline-offset-[12px]">verified</span>.
              </p>

            </div>
          </div>

        </div>
      </section>


      {/* ============ FAQ SECTION ============ */}
      <FAQSection pageType="home" />

      {/* ============ FINAL CTA SECTION ============ */}
      <section className="py-24 lg:py-32 px-6 lg:px-8 bg-[#f8fafc] relative overflow-hidden">

        {/* subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(#43EBA6 1px, transparent 1px), linear-gradient(90deg, #43EBA6 1px, transparent 1px)`,
            backgroundSize: '96px 96px'
          }}
        />

        <div className="max-w-[1400px] mx-auto reveal-up">

          {/* Main CTA */}
          <div className="bg-[#052F2B] rounded-[56px] p-12 lg:p-24 relative overflow-hidden shadow-[0_60px_140px_rgba(0,0,0,0.6)]">

            <img
              src={toAbsoluteUrl('media/redesign/cta_bg_v3.png')}
              className="absolute inset-0 w-full h-full object-cover opacity-10"
              alt="cta background"
            />

            <div className="relative z-10 lg:flex lg:items-center lg:justify-between gap-12">

              <div className="space-y-6 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#43EBA6]/10 border border-[#43EBA6]/30 text-[#43EBA6] text-xs font-bold uppercase tracking-wider">
                  <i className="fas fa-rocket" />
                  Get Started
                </div>

                <h2 className="text-6xl lg:text-[90px] font-black tracking-tight text-[#ECFDF5] leading-none">
                  Ready to <span className="text-[#43EBA6]">Scale?</span>
                </h2>

                <p className="text-xl lg:text-2xl text-[#B2F5EA] font-medium">
                  Join 50+ enterprises already running on Samran infrastructure
                </p>
              </div>

              <div className="flex flex-col gap-4 lg:w-[360px]">

                <Link
                  to="/auth/registration"
                  className="px-10 py-6 rounded-2xl font-bold text-xl bg-[#43EBA6] text-[#052F2B] shadow-2xl hover:scale-105 transition flex items-center justify-center gap-3"
                >
                  Start Your Journey
                  <i className="fas fa-arrow-right" />
                </Link>

                <button className="px-10 py-6 rounded-2xl font-bold text-xl border-2 border-white/30 text-[#ECFDF5] hover:bg-white hover:text-[#052F2B] transition shadow-xl flex items-center justify-center gap-3">
                  <i className="fas fa-phone" />
                  Contact Sales
                </button>

                <div className="text-center text-[#B2F5EA] text-sm font-medium mt-2">
                  <i className="fas fa-check-circle text-[#43EBA6] mr-2" />
                  No commitment • Free consultation
                </div>

              </div>
            </div>
          </div>

          {/* Trust badges */}
          <div className="mt-16 grid md:grid-cols-4 gap-6 text-center">
            {[
              { icon: 'fa-shield-check', text: 'ISO Certified' },
              { icon: 'fa-lock', text: 'Bank-grade Security' },
              { icon: 'fa-award', text: 'Industry Leader' },
              { icon: 'fa-headset', text: '24/7 Support' }
            ].map((badge, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-lg hover:shadow-xl"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[#052F2B] border border-[#43EBA6]/40 flex items-center justify-center text-[#43EBA6]">
                  <i className={`fas ${badge.icon} text-xl`} />
                </div>
                <div className="text-[#0b1f33] font-bold">{badge.text}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ============ CUSTOM STYLES ============ */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-25px); }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          
          .grid-dots {
            background-image: radial-gradient(circle, currentColor 1px, transparent 1px);
            background-size: 30px 30px;
          }

          /* Smooth hover transitions - Removed global * to fix conflicts */
          a, button, input, .transition-all {
            transition-property: transform, box-shadow, border-color, background-color, opacity;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            transition-duration: 300ms;
          }

          /* Improve text rendering */
          body {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          /* Custom scrollbar */
          ::-webkit-scrollbar {
            width: 12px;
          }
          ::-webkit-scrollbar-track {
            background: #f1f5f9;
          }
          ::-webkit-scrollbar-thumb {
            background: #43EBA6
;
            border-radius: 6px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: #0891b2;
          }
        `
      }} />
    </div>
  );
};

export default Home;
