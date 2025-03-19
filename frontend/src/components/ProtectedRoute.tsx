import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const token = localStorage.getItem('token'); // Check if the user is logged in

  // If the user is not logged in, redirect to the sign-in page
  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  // If the user is logged in, render the protected component
  return <Outlet />;
};

export default ProtectedRoute;