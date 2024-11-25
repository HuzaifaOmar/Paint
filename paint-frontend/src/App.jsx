import "./App.css";
import Canvas from "./components/Canvas";
import Toolbar from "./components/toolbar/Toolbar";
import React, { useState } from "react";
import "./styles/main.css";

function App() {
  const [selectedShape, setSelectedShape] = useState("freehand");
  const [firstColor, setFirstColor] = useState("#000000");
  const [secondColor, setSecondColor] = useState("#FFFFFF");
  return (
    <div className="main-screen">
      <Toolbar
        selectedTool={selectedShape}
        setSelectedTool={setSelectedShape}
        fillColor={firstColor}
        setFillColor={setFirstColor}
        strokeColor={secondColor}
        setStrokeColor={setSecondColor}
      />
      <Canvas
        selectedShape={selectedShape}
        firstColor={firstColor}
        secondColor={secondColor}
      ></Canvas>
    </div>
  );
}

export default App;
