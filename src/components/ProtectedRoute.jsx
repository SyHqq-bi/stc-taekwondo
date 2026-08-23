import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-stc-navy flex items-center justify-center text-stc-offwhite">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-stc-red"></div>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  if (requiredRole === 'ADMIN' && profile?.role !== 'ADMIN') {
    return <Navigate to="/member" replace />;
  }

  return children;
};