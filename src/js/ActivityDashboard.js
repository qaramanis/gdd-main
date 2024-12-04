import React from "react";
import "../css/App.css";
import "../css/Activity.css";
import "./SupabaseClient.js";

import { useState, useEffect } from "react";
import { getAllActions, getAllProjects } from "./SupabaseClient";

const ActivityDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [actions, setActions] = useState([]);
  const [error, setError] = useState({
    projects: null,
    actions: null
  });
  const [loading, setLoading] = useState({
    projects: true,
    actions: true
  });

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

    async function loadActions() {
      try {
        const data = await getAllActions();
        setActions(data);
      } catch (error) {
        setError((prev) => ({ ...prev, actions: error.message }));
      } finally {
        setLoading((prev) => ({ ...prev, actions: false }));
      }
    }

    loadActions();
    loadProjects();
  }, []);

  if (loading.projects || loading.actions) {
    return <div className="dashboard">Loading...</div>;
  }

  if (error.projects || error.actions) {
    return (
      <div className="dashboard error-container">
        {error.projects && (
          <div className="error-message">Error loading projects: {error.projects}</div>
        )}
        {error.actions && (
          <div className="error-message">Error loading actions: {error.actions}</div>
        )}
      </div>
    );
  }


  const ActivityItem = ({ action }) => (
    <div className="preview-item" key={action.id}>
      <div className="preview-content">
        <img
          src="/api/placeholder/40/40"
          alt="icon"
          className="project-icon"
        />
        <div className="preview-details">
          <div className="preview-title">
            <span className="project-name">{action.projects?.name}</span>
            <span className="recent-text">{action.context}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="dashboard">
      <div className="activity-section-header">
        <div className="section-title">Most Recent Activity</div>
        <button className="activity-section-all-button">View All</button>
      </div>
      {actions.length === 0 ? (
          <p className="no-activity">No recent actions</p>
        ) : (
          <div className="activity-list">
            {actions.slice(0, 10).map((action) => (
              <ActivityItem key={action.id} action={action} />
            ))}
          </div>
        )}
      </div>
  );
};

export default ActivityDashboard;
