import React from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { ImageSelectProvider } from '../contexts/ImageSelectContext.jsx';
import TopSearchesBanner from '../components/TopSearchesBanner.jsx';
import SearchBar from '../components/SearchBar.jsx';
import ImageGrid from '../components/ImageGrid.jsx'; // To be created
import HistorySidebar from '../components/HistorySidebar.jsx'; // To be created
import '../App.css'
import Threads from '../components/Threads';
const Header = ({ username, logout }) => (
    <header className="flex justify-between items-center p-4 bg-white shadow-lg sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-indigo-700">MERN Image Search</h1>
        <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome, {username}!</span>
            <button
                onClick={logout}
                className="px-4 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            >
                Logout
            </button>
        </div>
    </header>
);

const SearchPage = () => {
    const { user, logout } = useAuth();
    
        return (
            <div className="relative min-h-screen">
                    {/* Fixed full-viewport background using Threads */}
                    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 }}>
                        <Threads
                            amplitude={1}
                            distance={0}
                            enableMouseInteraction={true}
                        />
                    </div>

                    {/* Foreground content above the background */}
                    <ImageSelectProvider>
                        <div className="relative z-10 min-h-screen">
                            <Header username={user.username} logout={logout} />
                            <div className="flex h-full">
                                {/* Main Content Area */}
                                <main className="grow p-6">
                                    <TopSearchesBanner />
                                    <SearchBar />
                                    <ImageGrid />
                                </main>

                                {/* History Sidebar Area */}
                                <aside className="w-80 bg-gray-50 p-6 border-l border-gray-200">
                                    <HistorySidebar />
                                </aside>
                            </div>
                        </div>
                    </ImageSelectProvider>

            </div>
        );
};

export default SearchPage;