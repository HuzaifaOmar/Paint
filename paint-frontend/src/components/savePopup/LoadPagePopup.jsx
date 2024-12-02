import React, { useState } from "react";
import axios from "axios";
import "./LoadPagePopup.css"; // Optional: Add your styles
import { useDrawingContext } from "../../contexts/DrawingContext";
import ShapeService from "../../services/ShapeService";

const API_BASE_URL = "http://localhost:8080/api/shapes/save";

export default function LoadPagePopup() {
  const { shapes, setShapes } = useDrawingContext();
  const { isLoadPopupOpen, setIsLoadPopupOpen } = useDrawingContext();
  const [file, setFile] = useState(null); // Holds the selected file
  const [error, setError] = useState(""); // Handles file validation errors

  // Handle file selection
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const fileExtension = selectedFile.name.split(".").pop().toLowerCase();
      if (fileExtension === "json" || fileExtension === "xml") {
        setFile(selectedFile);
        setError(""); // Clear any previous errors
      } else {
        setError("Only .json and .xml files are allowed.");
        setFile(null);
      }
    }
  };
  const hanldeJsonKeys = (fileContent) => {
    const jsonData = JSON.parse(fileContent);
    const mappedData = jsonData.map((item) => {
      if (item.shapeType === "square") {
        return {
          fill: item.attributes.fill,
          rotation: item.attributes.rotation,
          scaleX: item.attributes.scaleX,
          scaleY: item.attributes.scaleY,
          shapeId: item.shapeId,
          side: item.attributes.side,
          stroke: item.attributes.stroke,
          strokeWidth: item.attributes.strokeWidth,
          type: item.shapeType,
          x: item.attributes.x,
          y: item.attributes.y,
        };
      } else if (item.shapeType === "freehand") {
        return {
          strokeWidth: item.attributes.strokeWidth,
          scaleX: item.attributes.scaleX,
          scaleY: item.attributes.scaleY,
          stroke: item.attributes.stroke,
          rotation: item.attributes.rotation,
          points: item.attributes.points,
          type: item.shapeType,
          x: item.attributes.x,
          y: item.attributes.y,
        };
      } else if (item.shapeType === "ellipse") {
        return {
          fill: item.attributes.fill,
          rotation: item.attributes.rotation,
          scaleX: item.attributes.scaleX,
          scaleY: item.attributes.scaleY,
          shapeId: item.shapeId,
          type: item.shapeType,
          x: item.attributes.x,
          y: item.attributes.y,
          radiusX: item.attributes.radiusX,
          radiusY: item.attributes.radiusY,
          stroke: item.attributes.stroke,
          strokeWidth: item.attributes.strokeWidth,
        };
      } else if (item.shapeType === "line") {
        return {
          fill: item.attributes.fill,
          strokeWidth: item.attributes.strokeWidth,
          scaleX: item.attributes.scaleX,
          scaleY: item.attributes.scaleY,
          stroke: item.attributes.stroke,
          rotation: item.attributes.rotation,
          points: item.attributes.points,
          type: item.shapeType,
          x: item.attributes.x,
          y: item.attributes.y,
          strokeWidth: item.attributes.strokeWidth,
        };
      } else if (item.shapeType === "circle") {
        return {
          fill: item.attributes.fill,
          rotation: item.attributes.rotation,
          scaleX: item.attributes.scaleX,
          scaleY: item.attributes.scaleY,
          shapeId: item.shapeId,
          type: item.shapeType,
          x: item.attributes.x,
          y: item.attributes.y,
          radius: item.attributes.radius,
          stroke: item.attributes.stroke,
          strokeWidth: item.attributes.strokeWidth,
        };
      } else if (item.shapeType === "rectangle") {
        return {
          fill: item.attributes.fill,
          rotation: item.attributes.rotation,
          scaleX: item.attributes.scaleX,
          scaleY: item.attributes.scaleY,
          shapeId: item.shapeId,
          type: item.shapeType,
          x: item.attributes.x,
          y: item.attributes.y,
          width: item.attributes.width,
          height: item.attributes.height,
          stroke: item.attributes.stroke,
          strokeWidth: item.attributes.strokeWidth,
        };
      } else if (item.shapeType === "triangle") {
        return {
          fill: item.attributes.fill,
          rotation: item.attributes.rotation,
          scaleX: item.attributes.scaleX,
          scaleY: item.attributes.scaleY,
          shapeId: item.shapeId,
          type: item.shapeType,
          x: item.attributes.x,
          y: item.attributes.y,
          points: item.attributes.points,
          stroke: item.attributes.stroke,
          strokeWidth: item.attributes.strokeWidth,
        };
      }
    });
    return mappedData;
  };
  const hanldeXmlKeys = (fileContent) => {
    // const jsonData = JSON.parse(fileContent);
    const mappedData = fileContent.map((item) => {
      if (item.shapeType === "square") {
        return {
          fill: item.attributes.fill,
          rotation: +item.attributes.rotation,
          scaleX: +item.attributes.scaleX,
          scaleY: +item.attributes.scaleY,
          shapeId: item.shapeId,
          side: +item.attributes.side,
          stroke: item.attributes.stroke,
          strokeWidth: +item.attributes.strokeWidth,
          type: item.shapeType,
          x: +item.attributes.x,
          y: +item.attributes.y,
        };
      } else if (item.shapeType === "freehand") {
        return {
          strokeWidth: +item.attributes.strokeWidth,
          scaleX: +item.attributes.scaleX,
          scaleY: +item.attributes.scaleY,
          stroke: item.attributes.stroke,
          rotation: +item.attributes.rotation,
          points: item.attributes.points.map((point) => +point),
          type: item.shapeType,
        };
      } else if (item.shapeType === "ellipse") {
        return {
          fill: item.attributes.fill,
          rotation: +item.attributes.rotation,
          scaleX: +item.attributes.scaleX,
          scaleY: +item.attributes.scaleY,
          shapeId: item.shapeId,
          type: item.shapeType,
          x: +item.attributes.x,
          y: +item.attributes.y,
          radiusX: +item.attributes.radiusX,
          radiusY: +item.attributes.radiusY,
          stroke: item.attributes.stroke,
          strokeWidth: +item.attributes.strokeWidth,
        };
      } else if (item.shapeType === "line") {
        return {
          fill: item.attributes.fill,
          strokeWidth: +item.attributes.strokeWidth,
          scaleX: +item.attributes.scaleX,
          scaleY: +item.attributes.scaleY,
          stroke: item.attributes.stroke,
          rotation: +item.attributes.rotation,
          points: item.attributes.points.map((point) => +point),
          type: item.shapeType,
          strokeWidth: +item.attributes.strokeWidth,
        };
      } else if (item.shapeType === "circle") {
        return {
          fill: item.attributes.fill,
          rotation: +item.attributes.rotation,
          scaleX: +item.attributes.scaleX,
          scaleY: +item.attributes.scaleY,
          shapeId: item.shapeId,
          type: item.shapeType,
          x: +item.attributes.x,
          y: +item.attributes.y,
          radius: +item.attributes.radius,
          stroke: item.attributes.stroke,
          strokeWidth: +item.attributes.strokeWidth,
        };
      } else if (item.shapeType === "rectangle") {
        return {
          fill: item.attributes.fill,
          rotation: +item.attributes.rotation,
          scaleX: +item.attributes.scaleX,
          scaleY: +item.attributes.scaleY,
          shapeId: item.shapeId,
          type: item.shapeType,
          x: +item.attributes.x,
          y: +item.attributes.y,
          width: +item.attributes.width,
          height: +item.attributes.height,
          stroke: item.attributes.stroke,
          strokeWidth: +item.attributes.strokeWidth,
        };
      } else if (item.shapeType === "triangle") {
        return {
          fill: item.attributes.fill,
          rotation: +item.attributes.rotation,
          scaleX: +item.attributes.scaleX,
          scaleY: +item.attributes.scaleY,
          shapeId: item.shapeId,
          type: item.shapeType,
          points: item.attributes.points.map((point) => +point),
          stroke: item.attributes.stroke,
          strokeWidth: +item.attributes.strokeWidth,
        };
      }
    });
    return mappedData;
  };

  // Handle file upload
  const handleFileUpload = async () => {
    if (!file) {
      setError("Please select a valid file before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const reader = new FileReader();
    reader.onload = async (event) => {
      const fileContent = event.target.result;
      console.log("File content:", fileContent); // Access the file content here

      try {
        if (file.name.endsWith(".json")) {
          console.log("Loading JSON file", fileContent);
          const response = await axios.post(
            `${API_BASE_URL}/load/json`,
            fileContent,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const mappedData = hanldeJsonKeys(fileContent);
          setShapes(mappedData);
          console.log("Server response:", response.data);
          setIsLoadPopupOpen(false);
        } else if (file.name.endsWith(".xml")) {
          console.log("Loading XML file", fileContent);
          const response = await axios.post(
            `${API_BASE_URL}/load/xml`,
            fileContent,
            {
              headers: {
                "Content-Type": "application/xml",
              },
            }
          );
          console.log("Server response:", response.data);
          const mappedData = hanldeXmlKeys(response.data);
          setShapes(mappedData);
          console.log("Server response:", response.data);
          setIsLoadPopupOpen(false);
        }
        ShapeService.clear();
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("An error occurred while uploading the file.");
      }
    };

    reader.readAsText(file);
  };

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
            <button onClick={() => setIsLoadPopupOpen(false)}>Cancel</button>
          </div>
        </div>
      </div>
    )
  );
}
