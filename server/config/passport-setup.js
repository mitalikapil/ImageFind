const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const FacebookStrategy = require('passport-facebook');
const GitHubStrategy = require('passport-github2'); // github2 often preferred for its scope handling
const User = require('../models/User');

// --- Serialization (Storing User in Session) ---
passport.serializeUser((user, done) => {
    // Stores the MongoDB user ID in the session cookie
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    // Retrieves the user object from the database using the ID from the cookie
    User.findById(id).then((user) => {
        done(null, user);
    });
});

// --- Passport Strategies ---

// 1. Google Strategy
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET && process.env.GOOGLE_CALLBACK_URL) {
    passport.use(
        new GoogleStrategy({
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }, async (accessToken, refreshToken, profile, done) => {
            const currentUser = await User.findOne({ googleId: profile.id });
            if (currentUser) {
                done(null, currentUser);
            } else {
                const newUser = await new User({
                    googleId: profile.id,
                    username: profile.displayName,
                    // Google profile structure puts email in an array
                    email: profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null 
                }).save();
                done(null, newUser);
            }
        })
    );
} else {
    console.warn('Google OAuth not configured. Missing GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET/GOOGLE_CALLBACK_URL. Skipping Google strategy.');
}

// 2. Facebook Strategy
if (process.env.FACEBOOK_CLIENT_ID && process.env.FACEBOOK_CLIENT_SECRET && process.env.FACEBOOK_CALLBACK_URL) {
    passport.use(
        new FacebookStrategy({
            clientID: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
            callbackURL: process.env.FACEBOOK_CALLBACK_URL,
            profileFields: ['id', 'displayName', 'emails'] // Requesting these specific fields
        }, async (accessToken, refreshToken, profile, done) => {
            const currentUser = await User.findOne({ facebookId: profile.id });
            if (currentUser) {
                done(null, currentUser);
            } else {
                const newUser = await new User({
                    facebookId: profile.id,
                    username: profile.displayName,
                    // Facebook profile structure puts email in an array
                    email: profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null 
                }).save();
                done(null, newUser);
            }
        })
    );
} else {
    console.warn('Facebook OAuth not configured. Missing FACEBOOK_CLIENT_ID/FACEBOOK_CLIENT_SECRET/FACEBOOK_CALLBACK_URL. Skipping Facebook strategy.');
}

// 3. GitHub Strategy
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET && process.env.GITHUB_CALLBACK_URL) {
    passport.use(
        new GitHubStrategy({
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.GITHUB_CALLBACK_URL,
            scope: ['user:email'] // Ensure this scope is requested
        }, async (accessToken, refreshToken, profile, done) => {
            const currentUser = await User.findOne({ githubId: profile.id });
            if (currentUser) {
                done(null, currentUser);
            } else {
                // GitHub often requires an extra step to get the primary email
                // For simplicity here, we use the first email provided or null
                const newUser = await new User({
                    githubId: profile.id,
                    username: profile.displayName || profile.username,
                    // GitHub profile may return emails as an array
                    email: profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null
                }).save();
                done(null, newUser);
            }
        })
    );
} else {
    console.warn('GitHub OAuth not configured. Missing GITHUB_CLIENT_ID/GITHUB_CLIENT_SECRET/GITHUB_CALLBACK_URL. Skipping GitHub strategy.');
}