// /client/src/components/ImageGrid.jsx

import React from 'react';
import '../App.css'
import { useImageSelect } from '../contexts/ImageSelectContext.jsx';
import ImageCard from './ImageCard.jsx';

const SelectedCounter = ({ count }) => (
    <div className="p-3 mb-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 font-semibold shadow-sm">
        Selected: {count} {count === 1 ? 'image' : 'images'}
    </div>
);

const ImageGrid = () => {
    const { searchResults, searchTerm, selectedImageIds, isSearching } = useImageSelect();
    const resultCount = searchResults.length;
    const selectedCount = selectedImageIds.size;

    if (isSearching) {
        return (
            <div className="flex justify-center items-center h-48">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
                <p className="ml-3 text-lg text-gray-600">Searching Unsplash...</p>
            </div>
        );
    }
    
    if (!searchTerm) {
        return (
            <div className="text-center p-10 text-gray-500">
                <p className="text-xl">Start by entering a search term above!</p>
            </div>
        );
    }

    return (
        <div className="mt-8">
            {/* Search Summary */}
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
                You searched for: "<span className="text-indigo-600">{searchTerm}</span>" 
                — {resultCount} results
            </h3>
            
            {/* Multi-Select Counter */}
            <SelectedCounter count={selectedCount} />
            
            {/* The Grid Layout */}
            {resultCount > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {searchResults.map((image) => (
                        <ImageCard key={image.id} image={image} />
                    ))}
                </div>
            ) : (
                <div className="text-center p-10 text-gray-500 border border-dashed rounded-lg">
                    <p className="text-lg">No images found for "{searchTerm}". Try another term.</p>
                </div>
            )}
        </div>
    );
};

export default ImageGrid;