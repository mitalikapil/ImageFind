import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
// Contexts
import { AuthProvider } from './contexts/AuthContext.jsx'; 

// Guards
import AuthGuard from './AuthGuard.jsx';

// Pages
import LoginPage from './pages/LoginPage.jsx';
import SearchPage from './pages/SearchPage.jsx';

/**
 * Main application component responsible for setting up context providers and routing.
 */
function App() {
    return (
        // The AuthProvider wraps the entire app to manage global authentication state
        <AuthProvider>
            <BrowserRouter>
                <div className="min-h-screen bg-gray-100 font-sans">
                    <Routes>
                        {/* 1. Public Route: Login Page
                          Users land here if they are not authenticated.
                        */}
                        <Route 
                            path="/login" 
                            element={<LoginPage />} 
                        />
                        
                        {/* 2. Protected Route: Main Search Page
                          This route is wrapped in AuthGuard, ensuring only logged-in 
                          users can access the SearchPage component.
                        */}
                        <Route 
                            path="/" 
                            element={
                                <AuthGuard>
                                    <SearchPage />
                                </AuthGuard>
                            } 
                        />
                        
                        {/* 3. Simple Fallback Route (404) 
                          You can expand this into a full 404 page later.
                        */}
                        <Route 
                            path="*" 
                            element={
                                <div className="text-center p-20">
                                    <h2 className="text-3xl font-bold text-gray-800">404 - Page Not Found</h2>
                                    <p className="text-gray-500 mt-2">The page you were looking for does not exist.</p>
                                </div>
                            } 
                        />
                    </Routes>
                </div>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;

