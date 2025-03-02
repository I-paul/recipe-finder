import React, { createContext, useState, useContext } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Login from './Login.jsx';
import Signup from './signup.jsx';

// Create auth context
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'

  const login = (credentials) => {
    // Here you would typically validate credentials with an API
    console.log('Logging in with:', credentials);
    setIsAuthenticated(true);
    setShowAuthModal(false);
  };

  const signup = (userData) => {
    // Here you would typically send user data to an API
    console.log('Signing up with:', userData);
    setIsAuthenticated(true);
    setShowAuthModal(false);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const openLogin = () => {
    setAuthMode('login');
    setShowAuthModal(true);
  };

  const openSignup = () => {
    setAuthMode('signup');
    setShowAuthModal(true);
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
  };

  const toggleAuthMode = () => {
    setAuthMode(prevMode => prevMode === 'login' ? 'signup' : 'login');
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      login, 
      signup, 
      logout, 
      showAuthModal, 
      authMode, 
      openLogin, 
      openSignup, 
      closeAuthModal, 
      toggleAuthMode 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);