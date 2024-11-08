import React from 'react';
import "../css/Project.css";
import "../css/App.css";


import { useParams } from 'react-router-dom';

const ProjectDashboard = () => {

    const  {uuid} = useParams();

    return ( 
        <div className="dashboard">

            {/*basic information*/}
            <div className="section-header">
                <div className="section-title">{uuid}</div>
            </div>
            <div className="project-container">
            
            </div>

             {/*history*/}
            <div className="section-header">
                <div className="section-title">History</div>
                <div className="section-subtitle">Latest edits on your project</div>
            </div>
            <div className="project-container">

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