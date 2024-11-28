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
      />
    </div>
  );
}

export default App;
