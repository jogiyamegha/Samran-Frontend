import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../modules/auth/core/Auth';

interface UserTypeRouteProps {
  allowedUserTypes: number[];
  children: React.ReactNode;
}

const UserTypeRoute: React.FC<UserTypeRouteProps> = ({ allowedUserTypes, children }) => {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    // If not logged in, redirect to login
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // Check if the user's type is in the allowed list
  if (!allowedUserTypes.includes(currentUser.userType || 0)) {
    // Redirect to home/public space to avoid infinite loops if the root is protected
    return <Navigate to="/home" replace />;
  }

  // User is authorized to access this route
  return <>{children}</>;
};

export default UserTypeRoute;