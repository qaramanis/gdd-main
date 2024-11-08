import React, {useState, useEffect} from 'react';
import "../css/Project.css";
import "../css/App.css";

import { supabase } from "./SupabaseClient";
import TimeStampFormatter
 from './TimeStampFormatter';



import { useParams } from 'react-router-dom';

const ProjectDashboard = () => {

    const {uuid} = useParams();
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState(null);
    const [actions, setActions] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        fetchProjects();
        if(projects){
            fetchActions();
        }
    }, [uuid]);

    async function fetchProjects() {
        try{
            console.log("Fetching projects ... ");

        let { data: projects, error } = await supabase
            .from("projects")
            .select("*")
            .eq("uuid",uuid)
            .single();
        if (error) {
            throw error;
        }

        setProjects(projects);

        console.log("Projects fetched successfully", projects);
        } catch (error) {
        console.error("Error fetching projects:", error.message);
        setError(error.message);
        } finally {
        setLoading(false);
        }
    }

    async function fetchActions(){
        try{
            console.log("Fetching actions ... ");

        let { data: actions, error } = await supabase
            .from("actions")
            .select("*")
            .eq("project_id", projects.id);

        if (error) {
            throw error;
        }

        setActions(actions);

        console.log("Actions fetched successfully", actions);
        } catch (error) {
        console.error("Error fetching actions:", error.message);
        setError(error.message);
        } finally {
        setLoading(false);
        }
    }

    if (error) {
        console.log("Error:" && { error });
    }
    

    return ( 
        <div className="dashboard">
            {/*basic information*/}
            <div className="section-header">
                <div className="section-title">{projects.name}</div>
            </div>
            <div className="project-container">
            
            </div>

             {/*history*/}
            <div className="section-header">
                <div className="section-title">History</div>
                <div className="section-subtitle">Latest edits on your project</div>
            </div>
            <div className="project-container">
                {actions.slice(0, 3).map((action) => (
                    <div className="preview-item" >
                        <div className="preview-content" key={action.id}>
                            <div className="preview-details">
                            <div className="preview-title">
                                <span className="project-name">{action.name}</span>
                                <span className="recent-text">{action.context}</span>
                            </div>
                            </div>
                            <div className="preview-timestamp">
                            <TimeStampFormatter
                                timestamp={action.created_at}
                                format="date"
                            />
                            </div>
                        </div>
                    </div>
                ))}
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