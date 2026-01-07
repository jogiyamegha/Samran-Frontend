import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { PageTitle } from '../../../_admin/layout/core';
import TermsOfService from './TermsOfService';
import ContactUs from './ContactUs';
import PrivacyPolicy from './PrivacyPolicy';
import Faqs from './Faqs';
import AppSettings from './AppSettings';

const CmsPage = () => {
    return (
        <Routes>
            <Route element={<Outlet />}>
                <Route
                    index
                    element={<Navigate to='/cms/terms-of-service' />}
                />
                <Route
                    path="/terms-of-service"
                    element={
                        <>
                            <PageTitle>Terms Of Service</PageTitle>
                            <TermsOfService />
                        </>
                    }
                />
                <Route
                    path="/contact-us"
                    element={
                        <>
                            <PageTitle>Contact Us</PageTitle>
                            <ContactUs />
                        </>
                    }
                />
                <Route
                    path="/privacy-policy"
                    element={
                        <>
                            <PageTitle>Privacy Policy</PageTitle>
                            <PrivacyPolicy />
                        </>
                    }   
                />
                <Route
                    path="/faqs"
                    element={
                        <>
                            <PageTitle>FAQs</PageTitle>
                            <Faqs />
                        </>
                    }
                />
                <Route
                    path="/setting"
                    element={
                        <>
                            <PageTitle>App Settings</PageTitle>
                            <AppSettings />
                        </>
                    }
                />
            </Route>
        </Routes>
    )
}
export default CmsPage;