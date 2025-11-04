import React from 'react';
import { useAuth } from './contexts/AuthContext.jsx';
import { Navigate } from 'react-router-dom';

const AuthGuard = ({ children }) => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        // Simple loading state while we check the cookie/session
        return (
            <div className="flex items-center justify-center h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                <p className="ml-3 text-lg text-gray-600">Checking credentials...</p>
            </div>
        );
    }

    if (!user.loggedIn) {
        // If not logged in, redirect to the login page
        return <Navigate to="/login" replace />;
    }

    // If logged in, render the protected content
    return children;
};

export default AuthGuard;