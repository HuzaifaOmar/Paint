import "./App.css";
import Canvas from "./components/Canvas";
import Toolbar from "./components/toolbar/Toolbar";
import React, { useState } from "react";
import "./styles/main.css";
import SavePagePopup from "./components/savePopup/SavePagePopup";
function App() {
  const [selectedTool, setSelectedTool] = useState("freehand");
  const [fillColor, setFillColor] = useState("rgba(240, 240, 240, 1.00)");
  const [strokeColor, setStrokeColor] = useState("rgba(0, 0, 0, 1.00)");
  const [lineWidth, setLineWidth] = useState(2.0);
  const [eraserOn,setEraserOn]=useState(false)
  const[duplicateTool,setDuplicateTool]=useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  return (
    <div className="main-screen">
      <Toolbar
        selectedTool={selectedTool}
        setSelectedTool={setSelectedTool}
        fillColor={fillColor}
        setFillColor={setFillColor}
        strokeColor={strokeColor}
        setStrokeColor={setStrokeColor}
        lineWidth={lineWidth}
        setLineWidth={setLineWidth}
        eraserOn={eraserOn}
        setEraserOn={setEraserOn}
        isPopupOpen={isPopupOpen}
        setIsPopupOpen={setIsPopupOpen}
        setDuplicateTool={setDuplicateTool}
      />
      <SavePagePopup
                isPopupOpen={isPopupOpen}
                setIsPopupOpen={setIsPopupOpen}
            />
      <Canvas
        selectedTool={selectedTool}
        fillColor={fillColor}
        strokeColor={strokeColor}
        lineWidth={lineWidth}
        eraserOn={eraserOn}
        setFillColor={setFillColor}
        setStrokeColor={setStrokeColor}
        setLineWidth={setLineWidth}
        duplicateTool={duplicateTool}
        setDuplicateTool={setDuplicateTool}
      />
    </div>
  );
}

export default App;
