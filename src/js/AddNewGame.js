import React, { useRef, useState, useEffect } from "react";
import "../css/AddNewGame.css";
import "../css/AddNew.css";
import { useSearchParams } from "react-router-dom";
import { supabase } from "./SupabaseClient";

const AddNewGame = () => {
  //file input related v
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

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
        console.log("Dropped file:", file.name);
      } else {
        alert("File type not supported");
      }
    }
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
              <p>Selected file: {selectedFile.name}</p>
              <button
                className="add-new-change-button"
                onClick={handleImportClick}
              >
                Change selected file
              </button>
            </div>
          )}
        </div>

        <div className="template-container">
          {templates.lenght === 0 ? (
            <p>no templates</p>
          ) : (
            <div className="grid-container">
              {templates.slice(0, 3).map((template) => (
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
