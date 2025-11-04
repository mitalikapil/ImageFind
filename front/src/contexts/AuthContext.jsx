import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import '../App.css'
// Configure axios base URL for backend communication
axios.defaults.withCredentials = true; 
const API_BASE_URL = 'http://localhost:5000'; // Ensure this matches your Express server port

export const AuthContext = createContext();

// Custom hook for easy access to auth context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({ loggedIn: false, username: null, id: null });
    const [topSearches, setTopSearches] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Function to check login status
    const checkUserStatus = async () => {
        try {
            const userRes = await axios.get(`${API_BASE_URL}/api/current_user`);
            if (userRes.data.loggedIn) {
                setUser({
                    loggedIn: true,
                    username: userRes.data.user.username,
                    id: userRes.data.user.id
                });
            } else {
                setUser({ loggedIn: false, username: null, id: null });
            }
        } catch (error) {
            console.error('Error checking auth status:', error);
            setUser({ loggedIn: false, username: null, id: null });
        } finally {
            setIsLoading(false);
        }
    };

    // Function to fetch top searches (available to all users, even if logged out)
    const fetchTopSearches = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/api/top-searches`);
            setTopSearches(res.data);
        } catch (error) {
            console.error('Error fetching top searches:', error);
            setTopSearches([]);
        }
    };

    useEffect(() => {
        checkUserStatus();
        fetchTopSearches();
    }, []);

    const logout = async () => {
        try {
            await axios.get(`${API_BASE_URL}/auth/logout`);
            setUser({ loggedIn: false, username: null, id: null });
            // Re-fetch top searches as a logged-out user
            fetchTopSearches(); 
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const contextValue = {
        user,
        topSearches,
        isLoading,
        logout,
        fetchTopSearches, // Allow components to refresh the banner
        checkUserStatus, // Allow login component to trigger status refresh
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};