import React, { useRef, useState } from "react";
import "../css/AddNewGame.css";
import "../css/AddNew.css";
import { useSearchParams } from "react-router-dom";

const AddNewGame = () => {
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
            <p className="selected-file">
              Selected file: {selectedFile.name}
              <p>Drag a different file or click again to change the file</p>
            </p>
          )}
        </div>
        <div className="template-container">Templates soon to be added</div>
      </div>
    </div>
  );
};

export default AddNewGame;
