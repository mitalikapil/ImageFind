import React from 'react';
// Import icons for better visual appeal (e.g., react-icons or similar)
import PrismaticBurst from './PrismaticBurst';
import '../App.css'
// (icons can be added later, e.g. react-icons)

const OAuthButtons = () => {
    const backendUrl = 'http://localhost:5000/auth'; // Base URL for auth routes

    const Button = ({ href, icon, provider, bgColor }) => (
        <a 
            href={href}
            className={`w-full flex items-center justify-center space-x-3 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white shadow-sm hover:opacity-90 transition-opacity ${bgColor}`}
        >
            {/* Replace with actual icon component if using an icon library */}
            <span className="text-xl">{icon}</span> 
            <span>Sign in with {provider}</span>
        </a>
    );

    return (
        <div className="relative max-h-screen">
            {/* Background/prismatic burst (absolute) */}
            {/* Use fixed positioning and viewport units so the background always fills the whole viewport */}
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 }}>
                <PrismaticBurst
                    animationType="rotate3d"
                    intensity={2}
                    speed={0.5}
                    distort={1.0}
                    paused={false}
                    offset={{ x: 0, y: 0 }}
                    hoverDampness={0.25}
                    rayCount={24}
                    mixBlendMode="lighten"
                    colors={['#ff007a', '#4d3dff', '#ffffff']}
                />
            </div>

            {/* Foreground content (z-indexed above background) */}
            <div className="min-h-screen flex flex-col items-center justify-center px-4 relative z-10">
                {/* Centered heading above the card */}
                <div className="text-3xl font-extrabold text-white mb-6 text-center">
                    Welcome to ImageBuilder
                </div>

                <div className="max-w-md w-full p-8 space-y-6 bg-white rounded-xl shadow-2xl">
                <h2 className="text-2xl font-bold text-center text-gray-900">
                    Sign In to Search Images
                </h2>
                <div className="space-y-4">
                    <Button 
                        href={`${backendUrl}/google`} 
                        icon="G" // Placeholder for Google Icon
                        provider="Google"
                        bgColor="bg-red-600"
                    />
                    <Button 
                        href={`${backendUrl}/facebook`} 
                        icon="f" // Placeholder for Facebook Icon
                        provider="Facebook"
                        bgColor="bg-blue-600"
                    />
                    <Button 
                        href={`${backendUrl}/github`} 
                        icon="</>" // Placeholder for GitHub Icon
                        provider="GitHub"
                        bgColor="bg-gray-800"
                    />
                </div>
                <p className="text-center text-xs text-gray-500">
                    Only authenticated users can search and view history.
                </p>
            </div>
        </div>
        </div>
    );
};

export default OAuthButtons;