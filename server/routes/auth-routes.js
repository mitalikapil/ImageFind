const express = require('express');
const passport = require('passport');
const router = express.Router();

// Define the final redirect URL for the frontend (Vite's default port)
const FRONTEND_SUCCESS_REDIRECT = 'http://localhost:5173/'; 

// Helper to check if a strategy is configured in the .env file
function isConfigured(prefix) {
    return !!(process.env[`${prefix}_CLIENT_ID`] && process.env[`${prefix}_CLIENT_SECRET`] && process.env[`${prefix}_CALLBACK_URL`]);
}

// --- Google OAuth ---
// NOTE: Google callback path changed from /redirect to /callback
if (isConfigured('GOOGLE')) {
    router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
    
    router.get('/google/callback', passport.authenticate('google', { failureRedirect: FRONTEND_SUCCESS_REDIRECT }), (req, res) => {
        // Successful authentication, redirect to the frontend application
        res.redirect(FRONTEND_SUCCESS_REDIRECT);
    });
} else {
    router.get('/google', (req, res) => res.status(501).json({ error: 'Google OAuth not configured' }));
    router.get('/google/callback', (req, res) => res.status(501).json({ error: 'Google OAuth not configured' }));
}

// --- Facebook OAuth ---
// NOTE: Facebook callback path changed from /redirect to /callback
if (isConfigured('FACEBOOK')) {
    router.get('/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }));
    
    router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: FRONTEND_SUCCESS_REDIRECT }), (req, res) => {
        res.redirect(FRONTEND_SUCCESS_REDIRECT);
    });
} else {
    router.get('/facebook', (req, res) => res.status(501).json({ error: 'Facebook OAuth not configured' }));
    router.get('/facebook/callback', (req, res) => res.status(501).json({ error: 'Facebook OAuth not configured' }));
}

// --- GitHub OAuth ---
// NOTE: GitHub callback path changed from /redirect to /callback
if (isConfigured('GITHUB')) {
    router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
    
    router.get('/github/callback', passport.authenticate('github', { failureRedirect: FRONTEND_SUCCESS_REDIRECT }), (req, res) => {
        res.redirect(FRONTEND_SUCCESS_REDIRECT);
    });
} else {
    router.get('/github', (req, res) => res.status(501).json({ error: 'GitHub OAuth not configured' }));
    router.get('/github/callback', (req, res) => res.status(501).json({ error: 'GitHub OAuth not configured' }));
}

// --- Basic Logout Endpoint ---
router.get('/logout', (req, res, next) => {
    // 1. Passport's logout method (asynchronous)
    req.logout(function(err) {
        if (err) { return next(err); }
        
        // 2. Destroy the session in Express
        req.session.destroy(function(err) {
            if (err) {
                console.error("Error destroying session:", err);
                return res.status(500).send('Could not log out.');
            }
            // 3. Clear the session cookie in the browser
            res.clearCookie('connect.sid'); 
            res.json({ message: 'Logged out successfully', loggedOut: true });
        });
    });
});

module.exports = router;
