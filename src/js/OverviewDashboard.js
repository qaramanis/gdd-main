import React from "react";
import "../css/App.css";
import "../css/Overview.css";
import { Search, Plus } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

const OverviewDashboard = () => {
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const addMenuRef = useRef(null);
  const toggleAddMenu = () => {
    setIsAddMenuOpen(!isAddMenuOpen);
  };
  const handleMenuItemClick = () => {
    setIsAddMenuOpen(false);
    //add more functionality onClick
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (addMenuRef.current && !addMenuRef.current.contains(event.target)) {
        setIsAddMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="dashboard">
      <div className="overview-dashboard-header">
        <div className="overview-search-container">
          <Search className="overview-search-icon" size={20} />
          <input
            type="text"
            placeholder="Search Games and Documents ..."
            className="overview-search-input"
          />
        </div>
        <div className="overview-header-buttons" ref={addMenuRef}>
          <div className="relative">
            <button className="overview-add-button" onClick={toggleAddMenu}>
              <Plus size={16} className="overview-button-icon" />
              Add New...
            </button>
            {isAddMenuOpen && (
              <div className="new-dropdown-menu">
                <Link
                  to="/add-new"
                  className="new-menu-item"
                  onClick={handleMenuItemClick}
                >
                  Game
                </Link>
                <Link
                  to="/add-new"
                  className="new-menu-item"
                  onClick={handleMenuItemClick}
                >
                  File
                </Link>
                <Link
                  to="/add-new"
                  className="new-menu-item"
                  onClick={handleMenuItemClick}
                >
                  Team Member
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="section-header">
        <h2 className="section-title">Recent Previews</h2>
      </div>
      <div className="preview-item">
        <div className="preview-content">
          <img
            src="/api/placeholder/40/40"
            alt="icon"
            className="project-icon"
          />
          <div className="preview-details">
            <div className="preview-title">
              <span className="project-name">test</span>
              <span className="recent-text">Most recent action</span>
            </div>
          </div>
          <button className="overview-more-options">
            <div className="overview-more-option-container">
              <div className="overview-more-options-dot"></div>
              <div className="overview-more-options-dot"></div>
              <div className="overview-more-options-dot"></div>
            </div>
          </button>
        </div>
      </div>
      <div className="section-header">
        <h2 className="section-title">Projects</h2>
      </div>
      <div className="preview-item">
        <div className="preview-content">
          <img
            src="/api/placeholder/40/40"
            alt="icon"
            className="project-icon"
          />
          <div className="preview-details">
            <div className="preview-title">
              <span className="project-name">test</span>
              <span className="recent-text">Most recent action</span>
            </div>
          </div>
          <button className="overview-more-options">
            <div className="overview-more-option-container">
              <div className="overview-more-options-dot"></div>
              <div className="overview-more-options-dot"></div>
              <div className="overview-more-options-dot"></div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OverviewDashboard;
