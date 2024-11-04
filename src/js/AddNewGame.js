import React, {useRef, useState} from 'react';
import "../css/AddNewGame.css";
import "../css/AddNew.css";


const AddNewGame = () => {

    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleImportClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            // You can handle the file here - e.g., upload it or process it
            console.log('Selected file:', file.name);
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
            setSelectedFile(file);
            // You can handle the file here - e.g., upload it or process it
            console.log('Dropped file:', file.name);
        }
    };

    return (
        <div className="container">
            <div className="add-new-dashboard">
                <div className="add-new-header">
                    <div className="add-new-title">Create a new Game Design Document</div>
                    <div className="section-subtitle">
                        Import existing documents or get started with one of our predefined and fully customizable Templates
                    </div>
                </div>
                <div 
                className="import-container"
                onClick={handleImportClick}
                onDragOver={handleDragOver}
                onDrop={handleDrop}>
                    <input
                        type= "file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{display:"none"}}
                        //can specify accepted file types here    
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
                <div className="template-container">
                    Templates soon to be added
                </div>
            </div>
        </div>
    )
}

export default AddNewGame;