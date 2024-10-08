import React from "react";
import "../css/App.css";
import "../css/Activity.css";

const ActivityDashboard = () => {
  return (
    <div className="dashboard">
      <div className="activity-section-header">
        <div className="activity-section-title">Most Recent Activity</div>
        <button className="activity-section-all-button">View All</button>
      </div>
      <div className="activity-item-container">
        <div className="activity-preview-content">
          <img
            src="/api/placeholder/40/40"
            alt="icon"
            className="overview-project-icon"
          />
          <div className="activity-preview-details">
            <div className="ativity-preview-title">
              <span className="activity-project-name"> test</span>
              <span className="activity-recent-text"> latest commit</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityDashboard;
