const mongoose = require('mongoose');

const SearchHistorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    term: {
        type: String,
        required: true,
        // Enforce lowercase for consistent aggregation/grouping
        set: value => value.toLowerCase()
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('SearchHistory', SearchHistorySchema);