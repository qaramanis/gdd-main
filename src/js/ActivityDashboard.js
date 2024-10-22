import React from "react";
import "../css/App.css";
import "../css/Activity.css";
import "./SupabaseClient.js";

import { useRef, useState, useEffect } from "react";
import {supabase, getAllActions, getAllProjects} from "./SupabaseClient";

const ActivityDashboard = () => {

  const [projects, setProjects] = useState([]);
  const [actions, setActions] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    
    async function loadProjects() {
      try{
        const data = await getAllProjects();
        setProjects(data);
      } catch(error){
        setError (prev => ({...prev, projects: error.message}));
      } finally {
        setLoading(prev => ({...prev, projects: false}));
      }
    }

    async function loadActions() {
      try{
        const data = await getAllActions();
        setActions(data);
      }catch(error){
        setError (prev => ({...prev, actions: error.message}));
      }finally{
        setLoading(prev => ({...prev, actions: false}));
      }
    }
    
    loadActions();
    loadProjects();
    
  }, []);

  if (loading.projects || loading.actions) {
    console.log("loading...")
  }

  if (projects.error) {
   console.log(projects.error && "Error loading projects");     
  };

  if (actions.error) {
    console.log(actions.error && "Error loading actions");     
   };

  return (
    <div className="dashboard">
      <div className="activity-section-header">
        <div className="section-title">Most Recent Activity</div>
        <button className="activity-section-all-button">View All</button>
      </div>

      {actions.length === 0 ? (
        <p>No recent actions</p>
      ) : (
        <div>
          {actions.slice(0,10).map(action => (
            <div className="preview-item">
              <div className="preview-content">
                <img
                  src="/api/placeholder/40/40"
                  alt="icon"
                  className="project-icon"
                />
              <div className="preview-details">
                <div className="preview-title">
                  <span className="project-name"> {action.projects.name}</span>
                  <span className="recent-text"> {action.context}</span>
                </div>
              </div>
            </div>
          </div>

          ))}
        </div>
      )}
      </div>
  );
};

export default ActivityDashboard;