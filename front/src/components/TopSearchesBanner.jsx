import React from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useImageSelect } from '../contexts/ImageSelectContext.jsx';
import SearchBar from './SearchBar.jsx'; // Use SearchBar's internal logic for clicking
import '../App.css'

const TopSearchesBanner = () => {
    const { topSearches } = useAuth();
    // Access the search handler directly or create a helper if needed
    // For simplicity, we can modify the handleSearch logic slightly or just render
    
    if (topSearches.length === 0) {
        return null; // Don't show the banner if no top searches exist
    }

    const handleBannerClick = (term) => {
        // Find a way to trigger the search in SearchBar.jsx
        // The most decoupled way is to redirect or re-fetch logic here.
        // For a seamless UX, the SearchBar needs to be modified to accept a function prop or we use a more complex state management.
        
        // --- Simplified approach: For this implementation, we'll assume the component containing the Banner 
        // --- and SearchBar handles the search logic passed down as a prop. 
        // --- *NOTE*: Since SearchBar uses local state, it's easier to implement the search logic directly here 
        // --- and pass the results to the context.

        // For the sake of demonstration and using the existing SearchBar:
        // *** This requires slightly refactoring SearchBar to export its core logic OR we create a handler here ***
        
        // Since SearchBar is a form, we'll create the handler here:
        const { setSearchResults, setSearchTerm, setIsSearching, clearSelection } = useImageSelect();
        const API_BASE_URL = 'http://localhost:5000';

        const triggerSearch = async (term) => {
             setIsSearching(true);
             clearSelection();
             
             try {
                const response = await axios.post(
                    `${API_BASE_URL}/api/search`, 
                    { term: term.trim() },
                    { withCredentials: true }
                );
                setSearchResults(response.data.results);
                setSearchTerm(response.data.term);
             } catch (error) {
                console.error('Banner search error:', error);
             } finally {
                setIsSearching(false);
             }
        };

        triggerSearch(term);
    };

    return (
        <div className="p-3 mb-4 bg-indigo-50 border-l-4 border-indigo-500 shadow-md">
            <h4 className="text-sm font-semibold text-indigo-800 mb-2">🔥 Top Searches Across All Users:</h4>
            <div className="flex flex-wrap gap-2">
                {topSearches.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => handleBannerClick(item.term)}
                        className="text-xs px-3 py-1 bg-white border border-indigo-300 text-indigo-600 rounded-full hover:bg-indigo-100 transition duration-150"
                    >
                        {item.term} ({item.count})
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TopSearchesBanner;
