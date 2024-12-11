import React, { useState, useEffect } from 'react';
import { updateProjectDescription } from './SupabaseClient';

const EditDescriptionModal = ({ project, isOpen, onClose, onUpdate }) => {
  const [description, setDescription] = useState(project.description);
  const [name, setName] = useState(project.name);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    if (isOpen) {
        setDescription(project.description);
        setName(project.name);
    }
  },[isOpen, project.description, project.name]);

  const handleClose = () => {
    setDescription(project.description);
    setName(project.name);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const updatedProject = await updateProjectDescription(project.id, description);
      onUpdate(updatedProject);
      onClose();
    } catch (error) {
      console.error('Error updating description:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={handleClose} className="modal-close">
          ✕
        </button>
        
        <div className="modal-project-icon">
          <img 
            src={project.icon_url || '/api/placeholder/120/120'} 
            alt={`${project.name} icon`}
          />
        </div>

        <div className="modal-project-name">
            <textarea
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="modal-name-textarea" 
              placeholder="Enter project name..."
            />
        </div>

        <div className="modal-project-description">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="modal-description-textarea"
            placeholder="Enter project description..."
          />
        </div>

      </div>
    </div>
  );
};

export default EditDescriptionModal;