require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors'); 
const app = express();
const port = process.env.PORT || 5000;

// --- Environment validation ---
// In production we require certain critical environment variables to be present.
function checkRequiredEnv(requiredVars = []) {
    const missing = requiredVars.filter(k => !process.env[k]);
    if (missing.length === 0) return { ok: true };

    const message = `Missing required environment variables: ${missing.join(', ')}`;
    if (process.env.NODE_ENV === 'production') {
        // Fail fast in production
        console.error(message);
        console.error('Exiting because required environment variables are not set in production.');
        process.exit(1);
    } else {
        // Warn in development so local work can continue
        console.warn(message);
        console.warn('Continuing in non-production mode (development).');
        return { ok: false, missing };
    }
}

// Check for critical vars required in production
checkRequiredEnv(['MONGODB_URI', 'SESSION_SECRET']);

// Connect to MongoDB (only if MONGODB_URI is provided)
if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => console.log('MongoDB connected successfully'))
        .catch(err => console.log('MongoDB connection failed:', err));
} else {
    console.warn('MONGODB_URI not set. Skipping MongoDB connection. Some features may be unavailable.');
}

// Import Passport Setup and configure strategies
require('./config/passport-setup');

// Middleware
app.use(express.json()); // Body parser for application/json
app.use(cookieParser());

// Configure CORS for frontend communication
// IMPORTANT: Updated to port 5173 for Vite development environment
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true 
}));

// Setup session management (required for passport sessions)
app.use(session({
    secret: process.env.SESSION_SECRET || 'averysecretkey',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        secure: false, // Set to true in production with HTTPS
    }
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// --- Routes ---
const authRoutes = require('./routes/auth-routes');
const searchRoutes = require('./routes/search-routes');

app.use('/auth', authRoutes); // OAuth initiation and callbacks
app.use('/api', searchRoutes); // Protected search and history routes

// Utility route to check login status
app.get('/api/current_user', (req, res) => {
    // req.user is set by Passport's session deserialization
    if (req.user) {
        res.send({ loggedIn: true, user: { id: req.user.id, username: req.user.username } });
    } else {
        res.send({ loggedIn: false });
    }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
