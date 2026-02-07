import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-white min-h-screen pt-24 pb-24">
      <div className="max-w-[1000px] mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#43EBA6] font-bold text-xs uppercase tracking-[0.3em] mb-4 block">LEGAL & COMPLIANCE</span>
          <h1 className="text-4xl lg:text-6xl font-black text-[#0b1f33] tracking-tight mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Your privacy is paramount. This policy outlines how SAMRAN enables transparent, secure, and sovereign data management for your energy assets.
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none text-slate-600">
          <div className="space-y-12">

            {/* Section 1 */}
            <section className="bg-slate-50 p-8 rounded-[32px] border border-slate-100">
              <h3 className="text-2xl font-bold text-[#0b1f33] mb-4">1. Information We Collect</h3>
              <p className="mb-4">
                We collect information you provide directly to us, such as when you create an account,
                use our services, or communicate with us. This may include:
              </p>
              <ul className="space-y-3 list-none pl-0">
                {[
                  "Name and contact information",
                  "Email address and phone number",
                  "Payment and financial information",
                  "Solar plant telemetry and energy usage data",
                  "Any other information you choose to provide"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <i className="fas fa-check-circle text-[#43EBA6] mt-1.5 text-sm"></i>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Section 2 */}
            <section>
              <h3 className="text-2xl font-bold text-[#0b1f33] mb-4">2. How We Use Your Information</h3>
              <p className="mb-4">
                We use the information we collect to provide secure, verified energy transactions. Specifically, we use data to:
              </p>
              <ul className="grid md:grid-cols-2 gap-4 list-none pl-0">
                {[
                  "Provide, maintain, and improve our services",
                  "Process on-chain transactions and settlements",
                  "Send technical notices and support messages",
                  "Respond to your comments and questions",
                  "Send you marketing communications (with your consent)",
                  "Link or combine with other information for analytics"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-[#0f766e]"></div>
                    <span className="text-sm font-medium text-[#0b1f33]">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Section 3 */}
            <section className="bg-[#052F2B] text-white p-10 rounded-[32px] relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-[#ECFDF5] mb-4">3. Data Security</h3>
                <p className="text-[#B2F5EA] leading-relaxed mb-0">
                  We implement appropriate technical and organizational measures to protect
                  your personal information against unauthorized access, alteration, disclosure,
                  or destruction. Our architecture utilizes zero-trust principles and cryptographic verification for sensitive asset data.
                </p>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#43EBA6] opacity-10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
            </section>

            {/* Section 4 */}
            <section>
              <h3 className="text-2xl font-bold text-[#0b1f33] mb-4">4. Your Rights</h3>
              <p className="mb-6">Depending on your jurisdiction, you retain sovereignty over your data, including the right to:</p>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { title: "Access", desc: "Request copies of your personal data." },
                  { title: "Rectification", desc: "Request correction of inaccurate information." },
                  { title: "Erasure", desc: "Request deletion of your personal data." },
                  { title: "Portability", desc: "Transfer your data to another service." }
                ].map((right, i) => (
                  <div key={i} className="border-l-4 border-[#43EBA6] pl-6 py-2">
                    <h4 className="font-bold text-[#0b1f33] text-lg">{right.title}</h4>
                    <p className="text-sm text-slate-500 m-0">{right.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Contact */}
            <section className="border-t border-slate-200 pt-12 mt-12">
              <h3 className="text-2xl font-bold text-[#0b1f33] mb-4">Contact Us</h3>
              <p>
                If you have questions about this privacy policy, please contact our compliance officer at <a href="mailto:privacy@samran.solar" className="text-[#0f766e] font-bold hover:underline">privacy@samran.solar</a>.
              </p>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;