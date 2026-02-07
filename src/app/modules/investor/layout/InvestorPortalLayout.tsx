import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../../public/components/Navbar';
import Footer from '../../public/components/Footer';

const InvestorPortalLayout: React.FC = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className="flex flex-col min-h-screen bg-white font-sans relative">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 grid-dots opacity-40"></div>
                <div className="absolute inset-0 gradient-mesh opacity-60"></div>
            </div>

            <div className="relative z-10 flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow w-full pt-32 pb-20">
                    <div className="container max-w-[1400px] mx-auto px-6 lg:px-8">
                        <Outlet />
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default InvestorPortalLayout;
