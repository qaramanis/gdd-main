import React from "react";
import "../css/App.css";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";


const AddNewTeamMember = () => {
    return (
        <div className="container">
            <div className="dashboard">
                <div className="section-header">
                    <div className="section-title">Members</div>
                    <div className="section-subtitle">
                        Manage team members and invitations
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddNewTeamMember;