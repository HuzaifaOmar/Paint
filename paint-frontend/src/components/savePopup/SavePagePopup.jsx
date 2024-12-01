import React, { useState } from "react";
import axios from "axios";
import { useDrawingContext } from "../../contexts/DrawingContext";
import "./SavePagePopup.css";
const API_BASE_URL = "http://localhost:8080/api/shapes";

export default function SavePagePopup() {
  const [selectedFileType, setSelectedFileType] = useState("json");
  const { isPopupOpen, setIsPopupOpen } = useDrawingContext(); // Access context values
  const downloadFile = async () => {
    const response = await axios.get(`${API_BASE_URL}/save`);
    const data = response.data;
    console.log(response.data);
    if (!response.data || (!response.data.json && !response.data.xml)) {
      console.error("No data available to download.");
      alert("No data to save!");
      return;
    }

    try {
      // Select content based on the file type
      const content =
        selectedFileType === "json"
          ? data.json // Format JSON data
          : data.xml; // Use XML data directly as a string

      // Determine the MIME type for the file
      const mimeType =
        selectedFileType === "json" ? "application/json" : "application/xml";

      // Create a Blob and download the file
      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);

      const downloadLink = document.createElement("a");
      downloadLink.href = url;
      downloadLink.download = `shapes.${selectedFileType}`;
      downloadLink.click();

      // Revoke the created object URL to free up memory
      URL.revokeObjectURL(url);

      // Close the popup
      setIsPopupOpen(false);
    } catch (error) {
      console.error("Error during file download:", error);
      alert("An error occurred while trying to download the file.");
    }
  };

  return (
    <div>
      {/* Trigger Button */}
      {/* Popup */}
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Download Shapes</h3>
            <label htmlFor="fileType">Choose File Type:</label>
            <select
              id="fileType"
              value={selectedFileType}
              onChange={(e) => setSelectedFileType(e.target.value)}
            >
              <option value="json">JSON</option>
              <option value="xml">XML</option>
            </select>
            <div className="popup-actions">
              <button onClick={downloadFile}>Download</button>
              <button onClick={() => setIsPopupOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
