import React from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import UserTypeRoute from '../../../routing/UserTypeRoute';
import { UserLayout } from '../../../../_admin/layout/UserLayout';
import ConsumerDashboard from '../pages/Dashboard';
import ConsumerPlants from '../pages/Plants';
import PlantDetail from '../pages/PlantDetail';
import Bills from '../pages/Bills';
import Profile from '../pages/Profile';
import Wallet from '../pages/Wallet';

const ConsumerRoutes: React.FC = () => {
  return (
    <UserTypeRoute allowedUserTypes={[3]}>
      <Routes>
        <Route element={<UserLayout><Outlet /></UserLayout>}>
          <Route path='dashboard' element={<ConsumerDashboard />} />
          <Route path='plants' element={<ConsumerPlants />} />
          <Route path='plants/:id' element={<PlantDetail />} />
          <Route path='bills' element={<Bills />} />
          <Route path='wallet' element={<Wallet />} />
          <Route path='profile' element={<Profile />} />
          <Route index element={<Navigate to='/consumer/dashboard' />} />
        </Route>
      </Routes>
    </UserTypeRoute>
  );
};

export default ConsumerRoutes;