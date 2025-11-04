// /client/src/components/ImageCard.jsx

import React from 'react';
import { useImageSelect } from '../contexts/ImageSelectContext.jsx';
import '../App.css'
const ImageCard = ({ image }) => {
    const { selectedImageIds, toggleSelection } = useImageSelect();
    
    // Check if this specific image is currently selected
    const isSelected = selectedImageIds.has(image.id);

    const handleToggle = () => {
        toggleSelection(image.id);
    };

    return (
        <div className="relative overflow-hidden rounded-lg shadow-lg group">
            {/* Image Display */}
            <img
                src={image.urls.regular}
                alt={image.description || 'Unsplash Image'}
                className={`w-full h-56 object-cover transition duration-300 ease-in-out ${
                    isSelected ? 'opacity-50 blur-sm scale-105' : 'opacity-100'
                }`}
            />
            
            {/* Checkbox Overlay and Hover Effect */}
            <div className={`absolute inset-0 flex items-center justify-center p-2 transition duration-300 ${
                isSelected ? 'bg-indigo-600/70' : 'bg-black/20 opacity-0 group-hover:opacity-100 group-hover:bg-black/30'
            }`}>
                <label className="flex items-center space-x-2 text-white cursor-pointer">
                    <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={handleToggle}
                        className="form-checkbox h-6 w-6 text-indigo-500 bg-white border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <span className="text-sm font-semibold select-none">
                        {isSelected ? 'Selected' : 'Select Image'}
                    </span>
                </label>
            </div>

            {/* Image Footer/Description */}
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-linear-to-t from-black/60 to-transparent">
                <p className="text-white text-xs truncate">
                    {image.description || 'No description available'}
                </p>
                <p className="text-gray-300 text-xs">
                    By: {image.user}
                </p>
            </div>
        </div>
    );
};

export default ImageCard;