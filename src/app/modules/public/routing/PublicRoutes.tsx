import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import PublicLayout from '../layout/PublicLayout';
import Landing from '../pages/Landing';
import Home from '../pages/Home';
import Investors from '../pages/Investors';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Projects from '../pages/Projects';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import TermsAndConditions from '../pages/TermsAndConditions';

const PublicRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="investors" element={<Investors />} />
        <Route path="landing" element={<Landing />} />
        <Route path="about" element={<About />} />
        <Route path="projects" element={<Projects />} />
        <Route path="contact" element={<Contact />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="terms-conditions" element={<TermsAndConditions />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default PublicRoutes;