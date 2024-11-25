import "./App.css";
import Canvas from "./components/Canvas";
import Toolbar from "./components/toolbar/Toolbar";
import React, { useState } from "react";
import "./styles/main.css";

function App() {
  const [selectedShape, setSelectedShape] = useState("freehand");
  const [firstColor, setFirstColor] = useState("#000000");
  const [secondColor, setSecondColor] = useState("#FFFFFF");
  const [lineWidth, setLineWidth] = useState(1);
  return (
    <div className="main-screen">
      <Toolbar
        selectedTool={selectedShape}
        setSelectedTool={setSelectedShape}
        fillColor={firstColor}
        setFillColor={setFirstColor}
        strokeColor={secondColor}
        setStrokeColor={setSecondColor}
        lineWidth={lineWidth}
        setLineWidth={setLineWidth}
      />
      <Canvas
        selectedShape={selectedShape}
        firstColor={firstColor}
        secondColor={secondColor}
        width={lineWidth}
      />
    </div>
  );
}

export default App;
