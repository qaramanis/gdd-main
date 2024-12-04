import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/App.css";
import "../css/Overview.css";

import { Search, Plus } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TimeStampFormatter from "./TimeStampFormatter";

import { getAllActions, getAllProjects, getUrlFromBucketFile, uploadProjectIcon } from "./SupabaseClient";
import { supabase } from "./SupabaseClient";


const OverviewDashboard = () => {
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const addMenuRef = useRef(null);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState({
    projects: true
  });
  const navigate = useNavigate();

  const toggleAddMenu = () => {
    setIsAddMenuOpen(!isAddMenuOpen);
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

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await getAllProjects();
        setProjects(data);
      } catch (error) {
        setError((prev) => ({ ...prev, projects: error.message }));
      } finally {
        setLoading((prev) => ({ ...prev, projects: false }));
      }
    }
    loadProjects();
  }, []);



  const handleProjectClick = (projectUuid) => {
    navigate(`/project/${projectUuid}`);
  };

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
                <Link to="/add-new-game" className="new-menu-item">
                  Game
                </Link>
                <Link to="/add-new-team-member" className="new-menu-item">
                  Team Member
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="section-header">
        <div className="section-title">Recent Previews</div>
      </div>
      {loading.projects ? (
        <div>Loading projects...</div>
      ) : error?.projects ? (
        <div>Error loading projects: {error.projects}</div>
      ) : projects.length === 0 ? (
        <div>No projects found</div>
      ) : (
        <div>
          {projects.slice(0, 3).map((project) => (
            <div 
              key={project.id}
              className="preview-item" 
              onClick={() => handleProjectClick(project.uuid)}
            >
              <div className="preview-content">
                <img
                  src={project.icon_url || '/api/placeholder/40/40'}
                  alt={`${project.name} icon`}
                  className="project-icon"
                />
                <div className="preview-details">
                  <div className="preview-title">
                    <span className="project-name">{project.name}</span>
                    <span className="recent-text">Most recent action</span>
                  </div>
                </div>
                <div className="preview-timestamp">
                  <TimeStampFormatter
                    timestamp={project.created_at}
                    format="date"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="section-header">
        <div className="section-title">Projects</div>
      </div>
      {loading.projects ? (
        <div>Loading projects...</div>
      ) : error?.projects ? (
        <div>Error loading projects: {error.projects}</div>
      ) : projects.length === 0 ? (
        <div>No projects found</div>
      ) : (
        <div>
          {projects.slice(0, 3).map((project) => (
            <div 
              key={project.id}
              className="preview-item"
              onClick={() => handleProjectClick(project.uuid)}
            >
              <div className="preview-content">
                <img
                  src={project.icon_url || '/api/placeholder/40/40'}
                  alt={`${project.name} icon`}
                  className="project-icon"
                />
                <div className="preview-details">
                  <div className="preview-title">
                    <span className="project-name">{project.name}</span>
                    <span className="project-subtitle">{project.subtitle}</span>
                  </div>
                </div>
                <div className="preview-timestamp">
                  <TimeStampFormatter
                    timestamp={project.created_at}
                    format="date"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OverviewDashboard;