import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQProps {
    pageType: 'home' | 'investor';
}

const FAQSection: React.FC<FAQProps> = ({ pageType }) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    const homeFAQs = [
        {
            question: "What exactly is Samran?",
            // Specific to the core business model
            answer: "Samran is a fintech-enabled renewable energy platform. We bridge the gap between digital capital (investors) and physical energy infrastructure (enterprises). Investors fund solar projects, and enterprises get clean energy with zero upfront cost."
        },
        {
            question: "How does the Zero-Capex model benefit businesses?",
            answer: "We install, operate, and maintain the solar infrastructure at your premises with ₹0 upfront investment from you. You simply pay for the energy consumed at a tariff lower than your grid rates, generating immediate cash flow savings."
        },
        {
            question: "Is the solar energy cheaper than my current grid supply?",
            answer: "Yes, typically our solar tariffs are 20-40% lower than commercial grid rates. This locks in long-term savings and protects your business from future volatile grid tariff hikes."
        },
        {
            question: "How do you ensure transparency?",
            answer: "We use a secure digital ledger to create a verifiable record of every solar asset. All generation data and financial settlements are tracked in real-time, providing institutional-grade transparency and auditability for all stakeholders."
        },
        {
            question: "What happens if the system needs maintenance?",
            answer: "As part of our service agreement, Samran handles all maintenance, cleaning, and repairs. Our 24/7 telemetric monitoring ensures any issues are detected and resolved immediately, maximizing uptime."
        }
    ];

    const investorFAQs = [
        {
            question: "How do I earn returns on my investment?",
            answer: "You earn monthly yields generated from the sale of electricity produced by the solar assets you own fractionally. These payments are automated via our secure platform and deposited directly into your wallet/bank account."
        },
        {
            question: "What is the minimum investment amount?",
            answer: "We've democratized infrastructure investing. You can start building your solar portfolio with as little as ₹50,000, allowing you to diversify across multiple high-yield projects rather than risking capital on a single asset."
        },
        {
            question: "Is my investment safe?",
            answer: "Your investment is backed by hard assets—physical solar panels, inverters, and mounting structures. Additionally, all projects are fully insured against damage and theft, and revenue is secured by long-term Power Purchase Agreements (PPAs) with credit-worthy enterprises."
        },
        {
            question: "Can I sell my investment if I need liquidity?",
            answer: "Yes. Unlike traditional infrastructure investments which are illiquid, Samran provides a secondary marketplace where you can trade your fractional ownership tokens with other investors, giving you flexibility."
        },
        {
            question: "How are the yields calculated?",
            answer: "Yields are based on the actual electricity generation of the solar plant and the PPA tariff agreed with the energy consumer. Projections are made using historical weather data and technical simulations."
        }
    ];

    const faqs = pageType === 'home' ? homeFAQs : investorFAQs;

    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="py-24 lg:py-32 bg-white relative overflow-hidden font-sans">
            <div className="max-w-4xl mx-auto px-6 relative z-10">

                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ECFDF5] border border-[#43EBA6]/40 text-[#0f766e] text-xs font-bold uppercase tracking-wider mb-6">
                        <i className="fas fa-question-circle" />
                        Common Questions
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-black text-[#0b1f33] tracking-tight">
                        Frequently Asked <span className="text-[#0f766e]">Questions</span>
                    </h2>
                    <p className="text-slate-500 text-lg mt-4 font-medium max-w-2xl mx-auto">
                        {pageType === 'home'
                            ? "Everything you need to know about switching to solar with Samran."
                            : "Clarifying details on fractional ownership, yields, and asset security."}
                    </p>
                </div>

                {/* Accordion */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300 ${activeIndex === index ? 'bg-slate-50 shadow-lg border-[#43EBA6]/50' : 'bg-white hover:border-[#43EBA6]/30'}`}
                        >
                            <button
                                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                                onClick={() => toggleAccordion(index)}
                            >
                                <span className={`text-lg lg:text-xl font-bold pr-8 ${activeIndex === index ? 'text-[#0f766e]' : 'text-[#0b1f33]'}`}>
                                    {faq.question}
                                </span>
                                <span className={`w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center transition-transform duration-300 ${activeIndex === index ? 'bg-[#0f766e] text-white rotate-180' : 'bg-slate-100 text-slate-400'}`}>
                                    <i className="fas fa-chevron-down text-sm" />
                                </span>
                            </button>

                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <div className="px-6 pb-6 text-slate-600 leading-relaxed font-medium border-t border-slate-200/50 pt-4">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default FAQSection;
