import React from "react";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/NavBar.css";

const AppBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
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
  return (
    <div className="app-bar">
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
            <Link
              to="/logout"
              className="account-menu-item"
              onClick={handleMenuItemClick}
            >
              Logout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppBar;
