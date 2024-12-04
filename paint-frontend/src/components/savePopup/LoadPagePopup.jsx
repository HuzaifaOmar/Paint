import React, { useState } from "react";
import { useDrawingContext } from "../../contexts/DrawingContext.jsx";
import ShapeService from "../../services/ShapeService.js";
import { transformShapeData } from "../../utils/ShapesTransformer.jsx";

const ALLOWED_FILE_EXTENSIONS = ["json", "xml"];

export default function LoadPagePopup() {
  const { setShapes, isLoadPopupOpen, setIsLoadPopupOpen } =
    useDrawingContext();
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const readFileAsText = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  };
  // Handle file upload
  const handleFileUpload = async () => {
    if (!file) {
      setError("Please select a valid file before uploading.");
      return;
    }

    try {
      await ShapeService.clear();

      const fileContent = await readFileAsText(file);
      const isJson = file.name.endsWith(".json");

      const loadMethod = isJson
        ? ShapeService.loadJsonShapes
        : ShapeService.loadXmlShapes;

      const loadedShapes = await loadMethod(fileContent);

      const mappedData = transformShapeData(
        isJson ? fileContent : loadedShapes,
        isJson
      );
      setShapes(mappedData);
      setIsLoadPopupOpen(false);
    } catch (error) {
      console.error("File upload error:", error);
      setError("An error occurred while processing the file.");
    }
  };

  const validateFile = (selectedFile) => {
    if (!selectedFile) {
      setError("No file selected.");
      return false;
    }

    const fileExtension = selectedFile.name.split(".").pop().toLowerCase();
    const isValidExtension = ALLOWED_FILE_EXTENSIONS.includes(fileExtension);

    if (!isValidExtension) {
      setError("Only .json and .xml files are allowed.");
      setFile(null);
      return false;
    }

    setFile(selectedFile);
    setError("");
    return true;
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    validateFile(selectedFile);
  };

  const handleCancel = () => setIsLoadPopupOpen(false);

  return (
    isLoadPopupOpen && (
      <div className="popup-overlay">
        <div className="popup-content">
          <h3>Upload Shapes File</h3>
          <input type="file" accept=".json,.xml" onChange={handleFileChange} />
          {error && <p className="error">{error}</p>}
          <div className="popup-actions">
            <button onClick={handleFileUpload} disabled={!file}>
              Upload
            </button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      </div>
    )
  );
}
