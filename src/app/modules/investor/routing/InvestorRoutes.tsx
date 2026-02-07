import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserTypeRoute from '../../../routing/UserTypeRoute';
import InvestorPortalLayout from '../layout/InvestorPortalLayout';
import InvestorDashboard from '../pages/Dashboard';
import InvestorInvestments from '../pages/Investments';
import InvestmentDetail from '../pages/InvestmentDetail';
import InvestorReturns from '../pages/Returns';
import InvestorProfile from '../pages/Profile';
import NewInvestment from '../pages/NewInvestment';

const InvestorRoutes: React.FC = () => {
  return (
    <UserTypeRoute allowedUserTypes={[2]}>
      <Routes>
        <Route element={<InvestorPortalLayout />}>
          <Route path="/" element={<InvestorDashboard />} />
          <Route path="dashboard" element={<InvestorDashboard />} />
          <Route path="investments" element={<InvestorInvestments />} />
          <Route path="investments/:id" element={<InvestmentDetail />} />
          <Route path="new-investment" element={<NewInvestment />} />
          <Route path="returns" element={<InvestorReturns />} />
          <Route path="profile" element={<InvestorProfile />} />
        </Route>
      </Routes>
    </UserTypeRoute>
  );
};

export default InvestorRoutes;