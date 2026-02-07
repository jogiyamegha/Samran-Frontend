import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PublicLayout: React.FC = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className="flex flex-col min-h-screen bg-samran-white-clean font-sans text-samran-navy">
            <Navbar />
            <main className="flex-grow w-full">
                <Outlet />
            </main>
            <div className="mt-auto pt-12">
                <Footer />
            </div>
        </div>
    );
};

export default PublicLayout;
