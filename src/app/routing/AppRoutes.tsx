/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import { FC, lazy, Suspense } from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { Logout, useAuth, UserVerifyDetails } from '../modules/auth';
import { ErrorsPage } from '../modules/errors/ErrorsPage'
import { App } from '../App'
import { LayoutSplashScreen } from '../../_admin/layout/core/MetronicSplashScreen';
import UserTypeRoute from './UserTypeRoute';

const PrivateRoutes = lazy(() => import('./PrivateRoutes').then(({ PrivateRoutes }) => ({ default: PrivateRoutes })));
const AuthPage = lazy(() => import('../modules/auth').then(({ AuthPage }) => ({ default: AuthPage })));
const ConsumerRoutes = lazy(() => import('../modules/consumer/routing/ConsumerRoutes'));
const InvestorRoutes = lazy(() => import('../modules/investor/routing/InvestorRoutes'));
const PublicRoutes = lazy(() => import('../modules/public/routing/PublicRoutes'));

const { BASE_URL } = import.meta.env;

// Component to handle smart redirect based on user type
const SmartRedirect: FC = () => {
    const { currentUser } = useAuth();

    if (!currentUser) {
        return <Navigate to="/home" replace />;
    }

    // Redirect based on user type
    switch (currentUser.userType) {
        case 1: // Admin
            return <Navigate to="/dashboard" replace />;
        case 2: // Investor
            return <Navigate to="/investor/dashboard" replace />;
        case 3: // Consumer
            return <Navigate to="/consumer/dashboard" replace />;
        default:
            return <Navigate to="/home" replace />;
    }
};

const AppRoutes: FC = () => {
    const { currentUser } = useAuth();
    return (
        <BrowserRouter basename={BASE_URL}>
            <Suspense fallback={<LayoutSplashScreen />}>
                <Routes>
                    <Route element={<App />}>
                        <Route path="error/*" element={<ErrorsPage />} />
                        <Route path="logout" element={<Logout />} />

                        {/* Public routes - accessible to all */}
                        <Route path="home/*" element={<PublicRoutes />} />

                        {currentUser ? (
                            <>
                                {/* Root redirect based on type */}
                                <Route index element={<SmartRedirect />} />

                                {/* User-specific routes */}
                                <Route path="consumer/*" element={<ConsumerRoutes />} />
                                <Route path="investor/*" element={<InvestorRoutes />} />

                                {/* Admin routes protected by UserTypeRoute */}
                                <Route path="/*" element={
                                    <UserTypeRoute allowedUserTypes={[1]}>
                                        <PrivateRoutes />
                                    </UserTypeRoute>
                                } />

                                {/* Catch-all for authenticated users */}
                                <Route path="*" element={<SmartRedirect />} />
                            </>
                        ) : (
                            <>
                                <Route path="auth/*" element={<AuthPage />} />
                                <Route path="user/verify-details/*" element={<UserVerifyDetails />} />
                                {/* Public routes for non-authenticated users */}
                                <Route path="/*" element={<PublicRoutes />} />
                                <Route path="*" element={<Navigate to="/home" />} />
                            </>
                        )}
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};

export { AppRoutes };
