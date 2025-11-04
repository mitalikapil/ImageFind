const isAuthenticated = (req, res, next) => {
    // Passport adds the 'user' property to the request object if authenticated
    if (req.user) {
        // User is logged in, continue to the next middleware/route handler
        next();
    } else {
        // User is not logged in
        res.status(401).json({ error: 'You must be logged in to access this resource.' });
    }
};

module.exports = isAuthenticated;