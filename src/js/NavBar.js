import React from "react";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/NavBar.css";
import { supabase } from "./SupabaseClient";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleLogoClick = () => { 
    navigate("/");
  };
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };
  return (
    <div className="app-bar">
      <div className="logo-container">
        <img
            src="/api/placeholder/40/40"
            alt="logo"
            className="logo-image"
            onClick={handleLogoClick}
          />
      </div>
      <div className="main-container">
        <nav className="nav-items">
          <Link to="/overview" className="nav-item">
            Overview
          </Link>
          <Link to="/my-teams" className="nav-item">
            My Teams
          </Link>
          <Link to="/activity" className="nav-item">
            Activity
          </Link>
        </nav>
      </div>
      <div ref={menuRef} className="account-container">
        <img
          src="/api/placeholder/40/40"
          alt="icon"
          className="account-icon"
          onClick={toggleMenu}
        />
        {isMenuOpen && (
          <div className="account-dropdown-menu">
            <Link
              to="/profile"
              className="account-menu-item"
              onClick={handleMenuItemClick}
            >
              Profile
            </Link>
            <Link
              to="/settings"
              className="account-menu-item"
              onClick={handleMenuItemClick}
            >
              Settings
            </Link>
            <div 
              className="account-menu-item"
              onClick={handleLogout}
            >
              Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
