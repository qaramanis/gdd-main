import React, {useState, useEffect} from 'react';
import "../css/Project.css";
import "../css/App.css";

import TimeStampFormatter from './TimeStampFormatter';

import { supabase } from "./SupabaseClient";
import { getAllActions, getAllProjects, getProjectByUuid, getActionForProjectById } from './SupabaseClient';

import { useParams } from 'react-router-dom';

const ProjectDashboard = () => {

    const {uuid} = useParams();
    const [project, setProject] = useState([]);
    const [error, setError] = useState(null);
    const [actions, setActions] = useState([]);
    const [loading, setLoading] = useState({
        project: true,
        actions: true
    });
    
    useEffect(() => {
        async function fetchProject() {
            try {
              const data = await getProjectByUuid(uuid);
              setProject(data);
            } catch (error) {
              setError((prev) => ({ ...prev, project: error.message }));
            } finally {
              setLoading((prev) => ({ ...prev, project: false }));
            }
          }
        fetchProject();
    }, [uuid]);
    
    useEffect(() => {
        async function fetchActions() {
            if (!project?.id) return; // Don't fetch if project.id isn't available yet
            
            try {
                const data = await getActionForProjectById(project.id);
                setActions(data);
            } catch (error) {
                setError(prev => ({ ...prev, actions: error.message }));
            } finally {
                setLoading(prev => ({ ...prev, actions: false }));
            }
        }
        fetchActions();
    }, [project?.id]);


    if (loading.project) return <div>Loading project...</div>;
    if (error?.project) return <div>Error loading project: {error.project}</div>;
    if (!project) return <div>No project found</div>;

    return ( 
        <div className="dashboard">
            <div className="section-header">
                <div className="section-title">{project.name}</div>
            </div>
            <div className="project-container">
                <div className="project-item-container">
                    <div className="project-image">
                        <img 
                         src={project.icon_url || '/api/placeholder/40/40'}
                         alt={`${project.name} icon`}
                         className="project-thumbnail"/>
                    </div>
                    <div className="project-description">
                        {project.description}
                    </div>
                </div>
            </div>
            <div className="section-header">
                <div className="section-title">History</div>
                <div className="section-subtitle">Latest edits on your project</div>
            </div>
            <div className="project-container">
            {loading.actions ? (
                    <div>Loading actions...</div>
                ) : error?.actions ? (
                    <div>Error loading actions: {error.actions}</div>
                ) : actions.length > 0 ? (
                    actions.slice(0, 3).map((action) => (
                        <div className="history-item-container" key={action.id}>
                            <div className="history-item-content">
                                <div className="history-title">
                                    <span className="history-action-text">{action.context}</span>
                                </div>
                                <div className="history-timestamp">
                                    <TimeStampFormatter
                                        timestamp={action.created_at}
                                        format="relative"
                                    />
                                    <span style={{ marginLeft: '8px' }}>by {action.created_by}</span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>No actions found</div>
                )}
            </div>

            {/*team members*/}
            <div className="section-header">
                <div className="section-title">Team Members</div>
                <div className="section-subtitle">See who else is working on this project</div>
            </div>
            <div className="project-container">

            </div>
        </div>
        

    )
}

export default ProjectDashboard;