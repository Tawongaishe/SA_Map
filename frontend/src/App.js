// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MentorPage from './pages/MentorPage';  // Import MentorPage
import Profile from './pages/Profile';  // Import Profile
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PrivateRoute from './components/PrivateRoute';  // Import PrivateRoute
import './App.css';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);  // Track if user is authenticated

    // Check if user is logged in on page load
    useEffect(() => {
        const userId = localStorage.getItem('user_id');
        if (userId) {
            setIsAuthenticated(true);
        }
    }, []);



    return (
        <Router>
            <div className="container">
                <h1>South African Startup Map</h1>
                <nav className="navigation">
                    <Link to="/">Home</Link>
                    {!isAuthenticated ? (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Sign Up</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/mentorship">Mentors</Link>
                            <Link to="/profile">Profile</Link>  
                        </>
                    )}
                </nav>

                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/signup" element={<SignupPage />} />

                    {/* Protected Routes */}
                    <Route
                        path="/mentorship"
                        element={
                            <PrivateRoute isAuthenticated={isAuthenticated}>
                                <MentorPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <PrivateRoute isAuthenticated={isAuthenticated}>
                                <Profile setIsAuthenticated={setIsAuthenticated}/>
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
