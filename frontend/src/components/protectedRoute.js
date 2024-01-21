import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from 'context/authContext.js';

const ProtectedRoute = ({ element }) => {
  const { user } = useAuth();
  const location = useLocation();

  return user ? element : <Navigate to="/" state={{ from: location }} replace />;
};

const AnonymousRoute = ({ element }) => {
  const { user } = useAuth();
  const location = useLocation();

  return !user ? element : <Navigate to="/" state={{ from: location }} replace />;
};

export {ProtectedRoute, AnonymousRoute};
