const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    // Store one of the provider IDs based on how the user logged in
    googleId: { type: String, unique: true, sparse: true },
    facebookId: { type: String, unique: true, sparse: true },
    githubId: { type: String, unique: true, sparse: true },
    username: String,
    email: String,
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);