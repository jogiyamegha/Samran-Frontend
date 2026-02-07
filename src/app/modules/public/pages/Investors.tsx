import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { toAbsoluteUrl } from '../../../../_admin/helpers'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const Investors: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Hero Reveal
    const heroTl = gsap.timeline();
    heroTl.fromTo('.hero-text-reveal',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.1 }
    )
      .fromTo('.hero-img-reveal',
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out' },
        "-=0.6"
      );

    // Scroll Reveals
    gsap.utils.toArray('.reveal-up').forEach((el: any) => {
      gsap.fromTo(el,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          }
        }
      )
    })
  }, { scope: mainRef })

  return (
    <div ref={mainRef} className="bg-white text-[#0b1f33] overflow-hidden font-sans">

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center pt-32 lg:pt-48 pb-20">

        {/* Very Subtle Grid */}
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{ backgroundImage: `linear-gradient(#0b1f33 0.5px, transparent 0.5px), linear-gradient(90deg, #0b1f33 0.5px, transparent 0.5px)`, backgroundSize: '40px 40px' }}
        />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-0 items-center">

          <div className="space-y-10 relative z-20">
            <div className="hero-text-reveal inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold tracking-widest uppercase border border-emerald-100/50">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Capital at Work
            </div>

            <h1 className="hero-text-reveal text-6xl lg:text-[70px] font-black leading-[0.95] tracking-tighter text-[#0b1f33]">
              Predictable <br />
              <span className="text-emerald-600">Yields.</span><br />
              Tangible Assets.
            </h1>

            <p className="hero-text-reveal text-xl text-slate-500 font-medium leading-relaxed max-w-lg">
              The stability of infrastructure investing, now accessible to everyone. Earn 12-15% annually from operational solar plants.
            </p>

            <div className="hero-text-reveal flex flex-wrap gap-4 pt-2">
              <Link to="/auth/registration" className="px-10 py-5 bg-[#0b1f33] text-white font-bold text-lg rounded-full hover:bg-[#1a2e40] hover:scale-105 transition-all shadow-xl shadow-slate-200">
                Start Investing
              </Link>
              <div className="flex items-center gap-4 px-6 py-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map(i => <div key={i} className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-500">User</div>)}
                </div>
                <div className="text-sm font-bold text-slate-600">
                  Trusted by <span className="text-[#0b1f33]">2,000+</span> investors
                </div>
              </div>
            </div>
          </div>

          <div className="hero-img-reveal relative lg:-ml-20 z-10 transition-transform duration-700 hover:scale-[1.02]">
            {/* Main Visual - Blended Cleanly */}
            <img
              src={toAbsoluteUrl('media/redesign/investor_hero_integrated.png')}
              alt="Growth Chart"
              className="w-full max-w-[650px] mx-auto"
            />

            {/* Floating Stats - Glassmorphism Light */}
            <div className="absolute bottom-10 left-0 lg:-left-10 bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-white/50 animate-float">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Payouts</p>
              <p className="text-3xl font-black text-[#0b1f33]">₹12.5 Cr</p>
            </div>
          </div>

        </div>
      </section>


      {/* STATS STRIP - Clean & White */}
      <section className="py-16 border-y border-slate-100 bg-slate-50/50">
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { l: 'Avg. IRR', v: '14.2%' },
            { l: 'Min Investment', v: '₹50k' },
            { l: 'Asset Term', v: '25 Yrs' },
            { l: 'Default Rate', v: '0%' },
          ].map((s, i) => (
            <div key={i} className="text-center reveal-up">
              <div className="text-4xl lg:text-5xl font-black text-[#0b1f33] tracking-tight mb-1">{s.v}</div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{s.l}</div>
            </div>
          ))}
        </div>
      </section>


      {/* WHY SOLAR - Integrated Visual */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">

            <div className="reveal-up relative group">
              <div className="absolute inset-0 bg-emerald-100 rounded-[60px] blur-[100px] opacity-40 group-hover:opacity-60 transition-opacity"></div>
              <img
                src={toAbsoluteUrl('media/redesign/solar_white_fade.png')}
                alt="Solar Panel Detail"
                className="relative z-10 w-full rounded-[40px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)]"
              />
            </div>

            <div className="space-y-12 reveal-up">
              <h2 className="text-5xl lg:text-7xl font-black text-[#0b1f33] tracking-tighter leading-[0.9]">
                The Asset Class <br />
                <span className="text-emerald-600">of the Future.</span>
              </h2>

              <div className="space-y-8">
                {[
                  { t: 'Inflation Protected', d: 'Energy tariffs are often linked to inflation indices, protecting your purchasing power.' },
                  { t: 'Non-Correlated', d: 'Sunlight doesn\'t care about stock market volatility. Your returns are based on generation.' },
                  { t: 'Hard Asset Backed', d: 'Your investment is secured by physical solar panels, inverters, and land leases.' }
                ].map((item, i) => (
                  <div key={i} className="pl-6 border-l-2 border-slate-200">
                    <h4 className="text-xl font-bold text-[#0b1f33] mb-2">{item.t}</h4>
                    <p className="text-slate-500 leading-relaxed font-medium">{item.d}</p>
                  </div>
                ))}
              </div>

              <Link to="/home/projects" className="inline-flex items-center gap-2 text-[#0b1f33] font-bold border-b-2 border-[#0b1f33] pb-1 hover:text-emerald-600 hover:border-emerald-600 transition-colors">
                View Live Assets <i className="fas fa-arrow-right"></i>
              </Link>
            </div>

          </div>
        </div>
      </section>


      {/* HOW IT WORKS - Minimal Cards */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black text-[#0b1f33] mb-20 reveal-up">Simple. Transparent. Liquid.</h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              { s: '01', t: 'Select', d: 'Browse vetted solar projects. Review technicals, financials, and legal docs.' },
              { s: '02', t: 'Invest', d: 'Purchase digital units representing fractional ownership. 100% digital process.' },
              { s: '03', t: 'Earn', d: 'Receive monthly payouts directly to your bank account from electricity sales.' }
            ].map((step, i) => (
              <div key={i} className="bg-white p-10 rounded-[30px] shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 reveal-up text-left">
                <div className="text-6xl font-black text-slate-100 mb-6">{step.s}</div>
                <h3 className="text-2xl font-bold text-[#0b1f33] mb-4">{step.t}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* LIGHT CTA */}
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center reveal-up">
          <h2 className="text-5xl lg:text-7xl font-black text-[#0b1f33] mb-8 tracking-tighter">
            Start your journey.
          </h2>
          <p className="text-xl text-slate-500 mb-12">
            Create your free investor account today and get access to exclusive deal flow.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/auth/registration" className="px-12 py-5 bg-emerald-600 text-white font-bold text-lg rounded-full hover:bg-emerald-700 hover:scale-105 transition-all shadow-xl shadow-emerald-200">
              Create Account
            </Link>
            <button className="px-12 py-5 bg-white text-[#0b1f33] border border-slate-200 font-bold text-lg rounded-full hover:bg-slate-50 transition-colors">
              Talk to Sales
            </button>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Investors
