import React, { useRef, useState, useEffect } from "react";
import "../css/AddNewGame.css";
import "../css/AddNew.css";
import { Navigate, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { supabase, createNewProject } from "./SupabaseClient";
import ProjectIconUpload from "../js/ProjectIconUpload.js";

const AddNewGame = () => {
  
  //file input related v
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();


  const [searchParams] = useSearchParams();
  const itemType = searchParams.get("type");

  const isTextDocument = ["txt", "md", "html", "csv", "docx"].includes(
    itemType,
  );

  const handleImportClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const acceptedTypes = [
        ".txt",
        ".cvs",
        ".html",
        ".pdf",
        ".docx",
        ".js",
        ".css",
      ];
      const fileExtension = "." + file.name.split(".").pop();
      if (acceptedTypes.includes(fileExtension)) {
        setSelectedFile(file);
        console.log("Selected file:", file.name);
      } else {
        alert("File type not supported");
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files[0];
    if (file) {
      const acceptedTypes = [
        ".txt",
        ".html",
        ".pdf",
        ".docx",
        ".odt ",
        ".pages",
        ".md"
      ];
      const fileExtension = "." + file.name.split(".").pop();
      if (acceptedTypes.includes(fileExtension)) {
        setSelectedFile(file);
        console.log("Dropped file:", file.name);
      } else {
        alert("File type not supported");
      }
    }
  };

  const handleContinue = async () => {
    const fileContent = await selectedFile.text();

    const { data, error } = await supabase.storage
      .from("files")
      .upload(selectedFile.name, selectedFile)
    if (error){
      console.error("Error uploading file:", error);
      
    } else {
      console.log('File uploaded successfully:', data);
    }
    //navigate(`/project/${selectedFile.name}`); //needs cahnge
  };

  const [gameDetails, setGameDetails] = useState({
    name: "",
    description: "",
    category: "action"
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const errors = {};
    if (!gameDetails.name.trim()){
      errors.name = "Name is required";
    }
    if (!gameDetails.description.trim()){
      errors.description = "Description is required";
    }
    if (!gameDetails.category) {
      errors.category = "Please select a category";
    }

    return errors;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0){
      try {
        const newProject = await createNewProject(gameDetails);
        console.log("Project created successfully:", newProject);
        // Navigate to the project page or show success message
        navigate(`/project/${newProject.uuid}`);
      } catch (error) {
        console.error("Error creating project:", error);
        setFormErrors({ submit: "Failed to create project. Please try again." });
      }
    }
    setIsSubmitting(false);
  };

  const gameCategories = [
    "Action",
    "Adventure",
    "RPG",
    "Strategy",
    "Simulation",
    "Sports",
    "Puzzle",
    "Other"
  ];

  const handleGameDetailsChange = (e) => {
    const { name, value } = e.target;
    setGameDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  //database related v
  const [templates, setTemplates] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTemplates();
  }, []);


  async function fetchTemplates() {
    try {
      console.log("Fetching templates");

      let { data: templates, error } = await supabase
        .from("templates")
        .select("*");

      if (error) {
        throw error;
      }

      setTemplates(templates);
      console.log("Templates fetched successfully", templates);
    } catch (error) {
      console.error("Error fetching templates:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  if (error) {
    console.log("Error:" && { error });
  }

  return (
    <div className="container">
      <div className="add-new-dashboard">
        <div className="add-new-header">
          <div className="add-new-title">Create a new Game Design Document</div>
          <div className="section-subtitle">
            Import existing documents or get started with one of our predefined
            and fully customizable Templates
          </div>
        </div>
        <div className="game-details-container">
          <form className="game-details-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label htmlFor="gameName">Game Name</label>
              <input
                type="text"
                id="gameName"
                name="name"
                value={gameDetails.name}
                onChange={handleGameDetailsChange}
                placeholder="Enter game name"
                className={`form-input ${formErrors.name ? 'error' : ''}`}
              />
              {formErrors.name && <span className="error-message">{formErrors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="gameDescription">Game Description</label>
              <textarea
                id="gameDescription"
                name="description"
                value={gameDetails.description}
                onChange={handleGameDetailsChange}
                placeholder="Enter game description"
                className={`form-input ${formErrors.description ? 'error' : ''}`}
                rows="3"
              />
              {formErrors.description && <span className="error-message">{formErrors.description}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="gameCategory">Game Category</label>
              <select
                id="gameCategory"
                name="category"
                value={gameDetails.category}
                onChange={handleGameDetailsChange}
                className={`form-input ${formErrors.category ? 'error' : ''}`}
              >
                {gameCategories.map(category => (
                  <option key={category.toLowerCase()} value={category.toLowerCase()}>
                    {category}
                  </option>
                ))}
              </select>
              {formErrors.category && <span className="error-message">{formErrors.category}</span>}
            </div>
            <div className="form-actions">
              {formErrors.submit && <span className="error-message">{formErrors.submit}</span>}
              <button
                type="button"
                className="submit-button"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating...' : 'Create Project'}
              </button>
            </div>  
          </form>
        </div>
        <div
          className="import-container"
          onClick={handleImportClick}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
            accept=".txt,.cvs,.html,.pdf,.docx,.css,.js"
          />
          <p>Drag your file here or</p>
          <p>click to import from your computer</p>
          {selectedFile && (
            <div className="selected-file">
              <p>Selected file: </p>
              <p>{selectedFile.name}</p>
              <button
                className="add-new-change-button"
                onClick={(e) => {
                  e.stopPropagation(); 
                  handleImportClick();}}
              >
                Change selected file
              </button>
              <button
                className="add-new-change-button"
                onClick={(e) => {
                  e.stopPropagation(); 
                  handleContinue();
                }}
              >
                Continue
              </button>
            </div>
          )}
        </div>

        <div className="template-container">
          {templates.lenght === 0 ? (
            <p>no templates</p>
          ) : (
            <div className="grid-container">
              {templates.reverse().slice(0, 3).map((template) => (
                <div className="grid-item">
                  <div className="template-item-container" key={template.id}>
                    <img
                      src={template.thumbnail_url}
                      alt="thumbnail-url"
                      className="template-item-image"
                    />
                    <div className="template-item-title">{template.title}</div>
                  </div>
                </div>
              ))}
              <div className="grid-item">
                <div className="template-item-container" key={"4"}>
                  <img
                    src="api/placeholder"
                    alt="thumbnail-url"
                    className="template-item-image"
                  />
                  <div className="template-item-title">View all</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddNewGame;
