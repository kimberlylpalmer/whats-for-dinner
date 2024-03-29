// context/AuthContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';
// import { Navigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const userData = sessionStorage.getItem('user');
    if (userData) {
      setAuthenticated(true);
      // setUser(JSON.parse(userData));
      const parsedUserData = JSON.parse(userData);
      setUser(parsedUserData);
    }
     // You can also check for authentication cookies here if necessary
  }, []);
  
  const login = (userData) => {
    sessionStorage.setItem('user', JSON.stringify(userData));
    setAuthenticated(true);
    setUser(userData);
    // Set cookies if using cookies for session management
  };
  
  const logout = () => {
    sessionStorage.removeItem('user');
    setAuthenticated(false);
    document.cookie = "session=; Max-Age=-99999999; path=/";
    setUser(null);
    // navigate('/')
  };
    
      const value = {
        authenticated,
        user, 
        login,
        logout,
    };
  
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  };
  
  const useAuth = () => useContext(AuthContext);
  
  export { AuthProvider, useAuth };
  
