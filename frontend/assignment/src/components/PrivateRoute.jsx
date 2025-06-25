import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getUser } from '../auth';

const PrivateRoute = ({ roles }) => {
  const user = getUser();

  // If no user is logged in, redirect to login
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // If roles are specified and user doesn't have required role, redirect
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // Otherwise, render the child routes
  return <Outlet />;
};

export default PrivateRoute;