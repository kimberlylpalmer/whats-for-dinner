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
            {!authenticated && (
                <>
                    <NavLink to="/" className="nav-link button">Home</NavLink>
                    <NavLink to="/login" className="nav-link button">Login</NavLink>
                    <NavLink to="/signup" className="nav-link button">Signup</NavLink>
                    <NavLink to="/recipes" className="nav-link button">View Recipes</NavLink>
                </>
            )}
            {authenticated && <LogoutButton />}
        </nav>
    );
}

export default NavBar;

