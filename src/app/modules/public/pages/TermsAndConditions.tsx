import React from 'react';

const TermsAndConditions: React.FC = () => {
  return (
    <div className="bg-white min-h-screen pt-24 pb-24">
      <div className="max-w-[1000px] mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#43EBA6] font-bold text-xs uppercase tracking-[0.3em] mb-4 block">LEGAL AGREEMENT</span>
          <h1 className="text-4xl lg:text-6xl font-black text-[#0b1f33] tracking-tight mb-6">
            Terms & Conditions
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed mb-4">
            These terms govern your use of the SAMRAN platform. Please read them carefully.
          </p>
          <div className="inline-block px-4 py-1 rounded-full bg-slate-100 text-slate-500 text-sm font-bold">
            Last Updated: January 24, 2026
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none text-slate-600">
          <div className="space-y-12">

            {/* Section 1 */}
            <section className="bg-slate-50 p-8 rounded-[32px] border border-slate-100">
              <h3 className="text-2xl font-bold text-[#0b1f33] mb-4">1. Acceptance of Terms</h3>
              <p className="mb-0 leading-relaxed">
                By accessing or using the SAMRAN platform, you accept and agree to be bound by these
                Terms and Conditions. If you disagree with any part of these terms, you may not
                access our platform. These terms constitute a legally binding agreement between you and SAMRAN.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h3 className="text-2xl font-bold text-[#0b1f33] mb-4">2. Description of Service</h3>
              <p className="mb-4">
                Our platform provides institutional-grade solar energy management services, specifically:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Solar plant performance monitoring",
                  "Billing and PPA settlement processing",
                  "Fractional asset management & tracking",
                  "Investment portfolio analytics",
                  "Energy consumption reporting"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                    <i className="fas fa-check-circle text-[#0f766e]"></i>
                    <span className="text-sm font-medium text-[#0b1f33]">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <h3 className="text-2xl font-bold text-[#0b1f33] mb-4">3. User Responsibilities</h3>
              <p className="mb-4">
                As a user of our platform, you agree to maintain the integrity of the network by adhering to the following:
              </p>
              <div className="bg-[#fff] border border-slate-200 rounded-2xl overflow-hidden">
                {[
                  "Provide accurate and verifiable identification information",
                  "Maintain the security of your account credentials and keys",
                  "Notify us immediately of any unauthorized access or breach",
                  "Use the platform in compliance with all applicable local laws",
                  "Not share your account or access tokens with third parties",
                  "Report any smart contract defects or UI issues promptly"
                ].map((item, i) => (
                  <div key={i} className="p-4 border-b border-slate-100 last:border-0 flex gap-4">
                    <span className="text-slate-400 font-mono text-sm">0{i + 1}</span>
                    <span className="text-slate-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 4 */}
            <section className="bg-orange-50 p-8 rounded-[32px] border border-orange-100">
              <h3 className="text-2xl font-bold text-orange-900 mb-4">4. Limitation of Liability</h3>
              <p className="mb-0 text-orange-800 leading-relaxed">
                In no event shall SAMRAN, nor its directors, employees, partners, agents, suppliers,
                or affiliates, be liable for any indirect, incidental, special, consequential,
                or punitive damages, including without limitation, loss of profits, data, use,
                goodwill, or other intangible losses resulting from your access to or use of the service.
              </p>
            </section>

            {/* Footer */}
            <div className="flex gap-8 pt-12 mt-12 border-t border-slate-200 text-sm font-bold text-slate-500">
              <a href="#" className="hover:text-[#0f766e]">Intellectual Property</a>
              <a href="#" className="hover:text-[#0f766e]">Governing Law</a>
              <a href="#" className="hover:text-[#0f766e]">Changes to Terms</a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;