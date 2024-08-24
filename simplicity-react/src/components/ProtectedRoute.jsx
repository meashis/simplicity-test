import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        // Redirect to login if not authenticated
        return <Navigate to="/login" replace />;
    }

    // If authenticated, render the children components (the protected page)
    return children;
};

export default ProtectedRoute;
