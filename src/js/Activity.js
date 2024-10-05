import React from "react";
import "../css/App.css";
import "../css/Activity.css";
import "../js/ActivityDashboard";
import ActivityDashboard from "../js/ActivityDashboard";

const Activity = () => {
  return (
    <div className="activity-container">
      <ActivityDashboard />
    </div>
  );
};

export default Activity;
