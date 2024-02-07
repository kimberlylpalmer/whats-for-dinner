// PrivateRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Adjust the import path as necessary

const PrivateRoute = ({ children }) => {
  const { authenticated } = useAuth();
  let location = useLocation();

  if (!authenticated) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to which will allow us to send them there after logging in
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute