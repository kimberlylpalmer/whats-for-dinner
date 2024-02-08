import React from 'react';
import { NavLink } from "react-router-dom";
import { useAuth } from './AuthContext';
import "../styles.css";
import LogoutButton from './LogoutButton';

function NavBar() {
    const { authenticated } = useAuth();
    console.log("Authenticated:", authenticated);

    return (
        <nav className="navbar">
            <NavLink to="/" className="nav-link">Home</NavLink>
            {!authenticated && (
                <>
                    <NavLink to="/login" className="nav-link">Login</NavLink>
                    <NavLink to="/signup" className="nav-link">Signup</NavLink>
                </>
            )}
            {authenticated && <LogoutButton />}
        </nav>
    );
}

export default NavBar;

