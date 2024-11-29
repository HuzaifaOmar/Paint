import "./App.css";
import Canvas from "./components/Canvas";
import Toolbar from "./components/toolbar/Toolbar";
import React, { useState } from "react";
import "./styles/main.css";

function App() {
  const [selectedTool, setSelectedTool] = useState("freehand");
  const [fillColor, setFillColor] = useState("#F0F0F0");
  const [strokeColor, setStrokeColor] = useState("#000000");
  const [lineWidth, setLineWidth] = useState(2.0);
  const [eraserOn,setEraserOn]=useState(false)
  const [selectedShape, setSelectedShape] = useState(null);
  const[copyTool,setCopyTool]=useState(false);
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
        selectedShape={selectedShape}
        setCopyTool={setCopyTool}
        copyTool = {copyTool}
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
        selectedShape={selectedShape}
        setSelectedShape={setSelectedShape}
        copyTool={copyTool}
        setCopyTool={setCopyTool}
      />
    </div>
  );
}

export default App;
