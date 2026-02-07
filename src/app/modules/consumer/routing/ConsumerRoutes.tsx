import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserTypeRoute from '../../../routing/UserTypeRoute';
import { UserLayout } from '../../../../_admin/layout/UserLayout';
import ConsumerDashboard from '../pages/Dashboard';
import ConsumerPlants from '../pages/Plants';
import PlantDetail from '../pages/PlantDetail';
import ConsumerBills from '../pages/Bills';
import ConsumerProfile from '../pages/Profile';

const ConsumerRoutes: React.FC = () => {
  return (
    <UserTypeRoute allowedUserTypes={[3]}>
      <UserLayout>
        <Routes>
          <Route path="/" element={<ConsumerDashboard />} />
          <Route path="/dashboard" element={<ConsumerDashboard />} />
          <Route path="/plants" element={<ConsumerPlants />} />
          <Route path="/plants/:id" element={<PlantDetail />} />
          <Route path="/bills" element={<ConsumerBills />} />
          <Route path="/profile" element={<ConsumerProfile />} />
        </Routes>
      </UserLayout>
    </UserTypeRoute>
  );
};

export default ConsumerRoutes;