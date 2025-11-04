// client/src/pages/LoginPage.jsx

import React from 'react';
import OAuthButtons from '../components/OAuthButtons.jsx';
import '../App.css'

const LoginPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <OAuthButtons />
        </div>
    );
};

export default LoginPage;