import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { I18nProvider } from '../_admin/i18n/i18nProvider';
import { LayoutProvider, LayoutSplashScreen } from '../_admin/layout/core';
import { MasterInit } from '../_admin/layout/MasterInit';
import { AuthInit } from './modules/auth';
import { ThemeModeProvider } from '../_admin/partials';

const App = () => {
    return (
        <Suspense fallback={<LayoutSplashScreen />}>
            <I18nProvider>
                <LayoutProvider>
                    <ThemeModeProvider>
                        <AuthInit>
                            <Outlet />
                            <MasterInit />
                        </AuthInit>
                    </ThemeModeProvider>
                </LayoutProvider>
            </I18nProvider>
        </Suspense>
    );
};

export { App };
