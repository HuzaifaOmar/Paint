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
        primaryColor={firstColor}
        setPrimaryColor={setFirstColor}
        secondaryColor={secondColor}
        setSecondaryColor={setSecondColor}
      />
      <Canvas
        selectedShape={selectedShape}
        firstColor={firstColor}
        secondColor={secondColor}
      />
    </div>
  );
}

export default App;
