import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { toAbsoluteUrl } from '../../../../_admin/helpers';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { useAuth } from '../../auth';
import ConsumerRoutes from '../../consumer/routing/ConsumerRoutes';

const Navbar: React.FC = () => {
    const { currentUser, logout } = useAuth();
    const [isHidden, setIsHidden] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { scrollY } = useScroll();
    const location = useLocation();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() || 0;
        if (latest > previous && latest > 150) {
            setIsHidden(true);
        } else {
            setIsHidden(false);
        }
        setIsScrolled(latest > 20);
    });

    const isInvestor = currentUser?.userType === 2;

    const baseNavLinks = [
        { name: 'Home', path: '/home' },
        { name: 'Investors', path: '/home/investors' },
        { name: 'Projects', path: '/home/projects' },
        { name: 'About', path: '/home/about' },
        { name: 'Contact', path: '/home/contact' },
    ];

    const investorLinks = [
        { name: 'Dashboard', path: '/investor/dashboard' },
        { name: 'Investments', path: '/investor/investments' },
        { name: 'Returns', path: '/investor/returns' },
    ];

    const getNavLinks = () => {
        if (currentUser && location.pathname.startsWith(isInvestor ? '/investor' : '/consumer')) {
            return isInvestor ? investorLinks : [
                { name: 'Dashboard', path: '/consumer/dashboard' },
                { name: 'My Plants', path: '/consumer/plants' },
                { name: 'Bills', path: '/consumer/bills' },
            ];
        }

        const links = [...baseNavLinks];
        if (currentUser) {
            let dashboardPath = '/home';
            if (currentUser.userType === 1) dashboardPath = '/dashboard';
            else if (currentUser.userType === 2) dashboardPath = '/investor/dashboard';
            else if (currentUser.userType === 3) dashboardPath = '/consumer/dashboard';

            links.unshift({
                name: 'Dashboard',
                path: dashboardPath
            });
        }
        return links;
    };

    const navLinks = getNavLinks();

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    return (
        <motion.nav
            variants={{
                visible: { y: 0, opacity: 1 },
                hidden: { y: -100, opacity: 0 },
            }}
            animate={isHidden && !isMobileMenuOpen ? 'hidden' : 'visible'}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${isScrolled ? 'py-3' : 'py-6'}`}
        >
            <div className="container max-w-[1400px] mx-auto px-6 lg:px-8">
                <div className={`relative flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-500 ${isScrolled
                    ? 'bg-white/80 backdrop-blur-xl border border-white/50 shadow-[0_8px_30px_rgba(0,0,0,0.04)]'
                    : 'bg-transparent border border-transparent'
                    }`}>

                    {/* Logo Area */}
                    <Link to="/" className="flex items-center gap-3 relative z-10 group">
                        <img
                            src={toAbsoluteUrl('media/samran-logo-v2.png')}
                            alt="Samran"
                            className="w-12 h-12 object-contain drop-shadow-md"
                        />
                        <span className="text-[#0b1f33] font-black tracking-tighter text-2xl hidden lg:block text-decoration-none">SAMRAN</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-1 bg-white/60 backdrop-blur-md px-1.5 py-1.5 rounded-full border border-white/40 shadow-sm mx-auto absolute left-1/2 -translate-x-1/2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`px-5 py-2.5 rounded-full text-sm font-bold tracking-tight transition-all duration-300 text-decoration-none ${location.pathname === link.path
                                    ? 'bg-[#052F2B] text-white shadow-lg shadow-[#052F2B]/20'
                                    : 'text-[#64748b] hover:text-[#0b1f33] hover:bg-white/80'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="hidden lg:flex items-center gap-2">
                        {!currentUser ? (
                            <>
                                <Link
                                    to="/auth/login"
                                    className="text-sm font-bold text-[#64748b] hover:text-[#0b1f33] px-5 py-2.5 transition-colors text-decoration-none"
                                >
                                    Log In
                                </Link>
                                <Link
                                    to="/auth/registration"
                                    className="px-6 py-3 bg-[#43EBA6] text-[#052F2B] rounded-xl font-bold text-sm shadow-lg shadow-[#43EBA6]/20 hover:shadow-xl hover:shadow-[#43EBA6]/30 hover:-translate-y-0.5 transition-all flex items-center gap-2 text-decoration-none"
                                >
                                    Open Account
                                    <i className="fas fa-arrow-right text-xs" />
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    to={isInvestor ? "/investor/profile" : "/consumer/profile"}
                                    className="w-11 h-11 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center hover:bg-ps-primary hover:text-white transition-all border border-slate-200 hover:shadow-lg hover:shadow-ps-primary/20 group overflow-hidden"
                                    title="Profile Settings"
                                >
                                    {currentUser?.profilePicture ? (
                                        <img
                                            src={`${import.meta.env.VITE_APP_API_URL || "http://127.0.0.1:7000/"}${currentUser.profilePicture}`}
                                            alt="Profile"
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                                        />
                                    ) : (
                                        <i className="fas fa-user group-hover:scale-110 transition-transform" />
                                    )}
                                </Link>
                                <button
                                    onClick={() => {
                                        logout();
                                        window.location.href = '/auth/login';
                                    }}
                                    className="text-sm font-bold text-red-600 hover:text-red-700 px-5 py-2.5 transition-colors bg-transparent border-0"
                                >
                                    Sign Out
                                </button>
                            </>
                        )}
                    </div>

                    {/* Mobile Toggle Icons */}
                    <button
                        className="lg:hidden relative z-10 w-10 h-10 flex items-center justify-center text-[#0b1f33] bg-white rounded-xl shadow-sm border border-slate-200"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-lg`}></i>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="lg:hidden fixed inset-0 z-[999] bg-[#052F2B] flex flex-col pt-32 px-6"
                    >
                        <div className="flex flex-col gap-6">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + i * 0.1 }}
                                >
                                    <Link
                                        to={link.path}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`text-4xl font-black tracking-tight text-decoration-none ${location.pathname === link.path ? 'text-[#43EBA6]' : 'text-white/90'
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="mt-auto mb-10 space-y-4"
                        >
                            {!currentUser ? (
                                <>
                                    <Link
                                        to="/auth/login"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="block w-full py-4 text-center text-lg text-white/80 font-bold border border-white/10 rounded-2xl text-decoration-none"
                                    >
                                        Log In
                                    </Link>
                                    <Link
                                        to="/auth/registration"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="block w-full py-4 text-center bg-[#43EBA6] text-[#052F2B] rounded-2xl font-bold text-lg shadow-xl text-decoration-none"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to={currentUser.userType === 1 ? "/dashboard" : (currentUser.userType === 2 ? "/investor/dashboard" : "/consumer/dashboard")}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="block w-full py-4 text-center bg-[#43EBA6] text-[#052F2B] rounded-2xl font-bold text-lg shadow-xl text-decoration-none"
                                    >
                                        Dashboard
                                    </Link>
                                    <button
                                        onClick={() => {
                                            logout();
                                            window.location.href = '/auth/login';
                                        }}
                                        className="block w-full py-4 text-center text-lg text-red-400 font-bold border border-white/10 rounded-2xl bg-transparent"
                                    >
                                        Sign Out
                                    </button>
                                </>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;

