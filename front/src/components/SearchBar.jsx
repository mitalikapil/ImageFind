import React, { useState } from 'react';
import axios from 'axios';
import { useImageSelect } from '../contexts/ImageSelectContext.jsx';
import { useAuth } from '../contexts/AuthContext.jsx'; // To update history banner
import '../App.css'

const SearchBar = () => {
    const [inputTerm, setInputTerm] = useState('');
    const { 
        setSearchResults, 
        setSearchTerm, 
        setIsSearching, 
        clearSelection 
    } = useImageSelect();
    const { fetchTopSearches } = useAuth();
    
    // Ensure this matches the configured backend URL
    const API_BASE_URL = 'http://localhost:5000'; 

    const handleSearch = async (term) => {
        if (!term.trim()) return;

        setIsSearching(true);
        clearSelection(); // Clear previous selection for a new search
        
        try {
            const response = await axios.post(
                `${API_BASE_URL}/api/search`, 
                { term: term.trim() },
                { withCredentials: true } // Important for sending the session cookie
            );
            
            // Update the context state
            setSearchResults(response.data.results);
            setSearchTerm(response.data.term);
            
            // Re-fetch top searches to update the banner for ALL users
            fetchTopSearches(); 

        } catch (error) {
            console.error('Search API error:', error);
            // Handle specific errors (e.g., 401 unauthorized, though AuthGuard should prevent this)
            setSearchResults([]);
            setSearchTerm(term.trim());
        } finally {
            setIsSearching(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSearch(inputTerm);
    };

    return (
        <form onSubmit={handleSubmit} className="flex space-x-3 p-4 bg-white rounded-lg shadow-md">
            <input
                type="text"
                value={inputTerm}
                onChange={(e) => setInputTerm(e.target.value)}
                placeholder="Enter a search term (e.g., 'mountain', 'coffee')"
                className="grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
            />
            <button
                type="submit"
                className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-150 disabled:bg-indigo-400"
                disabled={!inputTerm.trim()}
            >
                Search
            </button>
        </form>
    );
};

export default SearchBar;