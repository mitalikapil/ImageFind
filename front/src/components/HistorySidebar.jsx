// /client/src/components/HistorySidebar.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useImageSelect } from '../contexts/ImageSelectContext.jsx';
import '../App.css'

const HistorySidebar = () => {
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuth();
    const { setSearchResults, setSearchTerm } = useImageSelect(); // To initiate search on click
    
    const API_BASE_URL = 'http://localhost:5000';

    const fetchHistory = async () => {
        if (!user.loggedIn) return;

        setIsLoading(true);
        try {
            const res = await axios.get(`${API_BASE_URL}/api/history`, { withCredentials: true });
            setHistory(res.data);
        } catch (error) {
            console.error('Failed to fetch history:', error);
            // If error is 401, AuthGuard should handle it, but good to clear state
            setHistory([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, [user.loggedIn]);

    const handleHistoryClick = (term) => {
        // Simple way to trigger a search: set the term, which should be picked up by the SearchBar logic
        // NOTE: In a more complex app, you'd export the search handler from SearchBar/SearchPage 
        // to avoid duplicating API logic here. For now, we update the term state.
        setSearchTerm(term);
        // *The user would need to manually hit "Search" after clicking history item.*
        alert(`Search term updated to: "${term}". Click the Search button to view results.`); 
    };

    const formatDate = (dateString) => {
        const options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleTimeString('en-US', options);
    };

    return (
        <div className="h-full">
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
                User Search History
            </h3>
            
            {isLoading && <p className="text-center text-gray-500">Loading history...</p>}
            
            {!isLoading && history.length === 0 && (
                <p className="text-gray-500 text-sm">No recent search history found.</p>
            )}

            <ul className="space-y-3">
                {history.map((item, index) => (
                    <li 
                        key={index} 
                        className="p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition cursor-pointer border border-gray-200"
                        onClick={() => handleHistoryClick(item.term)}
                    >
                        <p className="font-semibold text-indigo-600 truncate">{item.term}</p>
                        <p className="text-xs text-gray-500 mt-0.5">
                            {formatDate(item.timestamp)}
                        </p>
                    </li>
                ))}
            </ul>
            
            <p className="mt-4 text-xs text-gray-400">
                Clicking a term updates the search bar, but you must click 'Search' to run the query.
            </p>
        </div>
    );
};

export default HistorySidebar;