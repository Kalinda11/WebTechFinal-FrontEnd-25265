import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';

// Protected Routes Component
export const ProtectedRoute = () => {
  const token = localStorage.getItem("token");

  // Check if token exists and is valid
  const isAuthenticated = () => {
    // You can add additional token validation logic here
    return !!token;
  };

  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};
