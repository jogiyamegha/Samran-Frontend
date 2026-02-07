import React from 'react';
import { Link } from 'react-router-dom';
import { toAbsoluteUrl } from '../../../../_admin/helpers';

const Footer: React.FC = () => {
    return (
        <footer className="bg-[#052F2B] pt-24 pb-12 relative overflow-hidden z-10 border-t-4 border-[#43EBA6]/50 shadow-2xl">
            {/* Background Details */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: `radial-gradient(circle, #43EBA6 1px, transparent 1px)`,
                    backgroundSize: '32px 32px'
                }}
            />

            <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
                    {/* Brand Column */}
                    <div className="lg:col-span-5 space-y-8">
                        <Link to="/" className="inline-flex items-center gap-4">
                            <img
                                src={toAbsoluteUrl('media/samran-logo-v2.png')}
                                alt="SAMRAN"
                                className="w-16 h-16 object-contain brightness-0 invert"
                            />
                            <span className="text-[#ECFDF5] font-black text-4xl tracking-tighter">SAMRAN</span>
                        </Link>

                        <p className="text-[#ECFDF5] text-lg leading-relaxed max-w-md font-medium">
                            Leading the transition to decentralized, digital renewable energy. We democratize solar investments, allowing everyone to participate in the green energy revolution.
                        </p>

                        <div className="flex gap-4">
                            {['facebook-f', 'twitter', 'instagram', 'linkedin-in'].map((social) => (
                                <a
                                    key={social}
                                    href="#"
                                    className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#ECFDF5] hover:bg-[#43EBA6] hover:text-[#052F2B] hover:border-[#43EBA6] transition-all duration-300"
                                >
                                    <i className={`fab fa-${social} text-lg`}></i>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className="lg:col-span-2 col-span-6">
                        <h4 className="text-[#ECFDF5] font-bold text-lg mb-8">Platform</h4>
                        <ul className="space-y-4">
                            {[
                                { name: 'Active Projects', path: '/projects' },
                                { name: 'How It Works', path: '/about' },
                                { name: 'Returns Calculator', path: '/returns' },
                                { name: 'Help Center', path: '/faq' }
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link to={item.path} className="text-[#ECFDF5] hover:text-[#43EBA6] font-medium transition-colors block py-1">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-2 col-span-6">
                        <h4 className="text-[#ECFDF5] font-bold text-lg mb-8">Company</h4>
                        <ul className="space-y-4">
                            {[
                                { name: 'Our Mission', path: '/about' },
                                { name: 'Contact Us', path: '/contact' },
                                { name: 'Privacy Policy', path: '/privacy-policy' },
                                { name: 'Terms of Service', path: '/terms-conditions' }
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link to={item.path} className="text-[#ECFDF5] hover:text-[#43EBA6] font-medium transition-colors block py-1">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="lg:col-span-3">
                        <h4 className="text-[#ECFDF5] font-bold text-lg mb-6">Newsletter</h4>
                        <p className="text-[#ECFDF5] mb-6 font-medium">Stay updated with our latest projects and energy insights.</p>
                        <div className="relative">
                            <input
                                type="email"
                                className="w-full bg-white/15 border-2 border-white/30 rounded-xl px-5 py-4 text-[#ECFDF5] placeholder-[#B2F5EA]/70 focus:outline-none focus:border-[#43EBA6] focus:bg-white/20 transition-all font-medium"
                                placeholder="name@email.com"
                            />
                            <button className="absolute right-2 top-2 bottom-2 bg-[#43EBA6] text-[#052F2B] px-6 rounded-lg font-bold hover:scale-105 transition-transform shadow-lg">
                                Join
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-10 mt-10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[#ECFDF5]/80 font-medium text-sm">
                        &copy; {new Date().getFullYear()} SAMRAN Solar Tech. All rights reserved.
                    </p>
                    <div className="flex gap-8">
                        <Link to="/privacy-policy" className="text-[#ECFDF5]/80 hover:text-[#43EBA6] text-sm font-medium transition-colors">Privacy Policy</Link>
                        <Link to="/terms-conditions" className="text-[#ECFDF5]/80 hover:text-[#43EBA6] text-sm font-medium transition-colors">Terms of Use</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
