import "./App.css";
import Canvas from "./components/Canvas";
import Toolbar from "./components/toolbar/Toolbar";
import React, { useState } from "react";
import "./styles/main.css";

function App() {
  const [selectedShape, setSelectedShape] = useState("freehand");
  const [fillColor, setFillColor] = useState("#F0F0F0");
  const [strokeColor, setStrokeColor] = useState("#000000");
  const [lineWidth, setLineWidth] = useState(2.0);
  const [eraserOn,setEraserOn]=useState(false)
  return (
    <div className="main-screen">
      <Toolbar
        selectedTool={selectedShape}
        setSelectedTool={setSelectedShape}
        fillColor={fillColor}
        setFillColor={setFillColor}
        strokeColor={strokeColor}
        setStrokeColor={setStrokeColor}
        lineWidth={lineWidth}
        setLineWidth={setLineWidth}
        eraserOn={eraserOn}
        setEraserOn={setEraserOn}
      />
      <Canvas
        selectedShape={selectedShape}
        fillColor={fillColor}
        strokeColor={strokeColor}
        lineWidth={lineWidth}
        eraserOn={eraserOn}
      />
    </div>
  );
}

export default App;
