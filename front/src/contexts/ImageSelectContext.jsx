import React, { createContext, useState, useContext } from 'react';
import '../App.css'
export const ImageSelectContext = createContext();

import ImageCard from '../components/ImageCard';

// Custom hook for easy access
export const useImageSelect = () => useContext(ImageSelectContext);

export const ImageSelectProvider = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    // Using a Set for efficient tracking of selected IDs (O(1) lookups)
    const [selectedImageIds, setSelectedImageIds] = useState(new Set());
    const [isSearching, setIsSearching] = useState(false);

    // Function to toggle selection state of an image
    const toggleSelection = (imageId) => {
        setSelectedImageIds(prevIds => {
            const newIds = new Set(prevIds);
            if (newIds.has(imageId)) {
                newIds.delete(imageId);
            } else {
                newIds.add(imageId);
            }
            return newIds;
        });
    };
    
    // Function to clear selection when a new search starts
    const clearSelection = () => {
        setSelectedImageIds(new Set());
    }

    const contextValue = {
        searchTerm,
        setSearchTerm,
        searchResults,
        setSearchResults,
        selectedImageIds,
        toggleSelection,
        clearSelection,
        isSearching,
        setIsSearching
    };

    return (
        <ImageSelectContext.Provider value={contextValue}>
            {children}
        </ImageSelectContext.Provider>
    );
};