import React from "react";
import "../css/App.css";
import "../css/Activity.css";

const ActivityDashboard = () => {
  return (
    <div className="dashboard">
      <div className="activity-section-header">
        <div className="section-title">Most Recent Activity</div>
        <button className="activity-section-all-button">View All</button>
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
              <span className="project-name"> test</span>
              <span className="recent-text"> latest commit</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityDashboard;
