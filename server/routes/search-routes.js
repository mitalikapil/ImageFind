const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/auth-check');
const SearchHistory = require('../models/SearchHistory');
const axios = require('axios');

// --- 1. Top Searches Banner ---
router.get('/top-searches', async (req, res) => {
    try {
        const topSearches = await SearchHistory.aggregate([
            // 1. Group by search term and count occurrences
            { $group: { _id: '$term', count: { $sum: 1 } } },
            // 2. Sort by count (descending)
            { $sort: { count: -1 } },
            // 3. Limit to top 5
            { $limit: 5 },
            // 4. Optionally, rename _id to term for cleaner output
            { $project: { _id: 0, term: '$_id', count: 1 } }
        ]);
        res.status(200).json(topSearches);
    } catch (err) {
        console.error('Error fetching top searches:', err);
        res.status(500).json({ error: 'Failed to retrieve top searches.' });
    }
});

// --- 2. Search Functionality ---
router.post('/search', isAuthenticated, async (req, res) => {
    const { term } = req.body;
    if (!term) {
        return res.status(400).json({ error: 'Search term is required.' });
    }

    try {
        // A. Store History
        await new SearchHistory({
            userId: req.user.id, // req.user is available due to isAuthenticated middleware
            term: term
        }).save();

        // B. Call Unsplash API
        const unsplashUrl = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(term)}&per_page=20`;
        const unsplashRes = await axios.get(unsplashUrl, {
            headers: {
                Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
            }
        });
        
        // C. Return the relevant data (mapping to only necessary fields)
        const simplifiedResults = unsplashRes.data.results.map(img => ({
            id: img.id,
            description: img.alt_description,
            urls: img.urls,
            user: img.user.name,
        }));
        
        res.status(200).json({
            term: term,
            count: simplifiedResults.length,
            results: simplifiedResults
        });

    } catch (err) {
        console.error('Search error:', err);
        res.status(500).json({ error: 'Failed to execute search or save history.' });
    }
});

// --- 3. User's Search History ---
router.get('/history', isAuthenticated, async (req, res) => {
    try {
        const history = await SearchHistory.find({ userId: req.user.id })
            .select('term timestamp -_id') // Only select term and timestamp
            .sort({ timestamp: -1 })
            .limit(10); // Show last 10 searches

        res.status(200).json(history);
    } catch (err) {
        console.error('History error:', err);
        res.status(500).json({ error: 'Failed to retrieve search history.' });
    }
});

module.exports = router;