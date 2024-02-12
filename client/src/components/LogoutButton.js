// components/LogoutButton.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const LogoutButton = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    fetch("/api/logout", { method: "DELETE" })
      .then(() => {
        logout();
        navigate('/');
      })
      .catch((e) => {
        console.error('Logout failed', e);
      });
  };

  return (
    <button className="logoutButton button" type='button' onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;

