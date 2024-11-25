import "./App.css";
import Canvas from "./components/Canvas";
import Canvas1 from "./components/Canvas1";
import ToolBar from "./components/ToolBar";
import React, { useState } from "react";
import "./styles/main.css";

function App() {
  const [selectedShape, setSelectedShape] = useState("freehand");
  const [firstColor, setFirstColor] = useState("#000000");
  const [secondColor, setSecondColor] = useState("#FFFFFF");
  return (
    <div className="main-screen">
      <ToolBar
        selectedShape={selectedShape}
        setSelectedShape={setSelectedShape}
        firstColor={firstColor}
        setFirstColor={setFirstColor}
        secondColor={secondColor}
        setSecondColor={setSecondColor}
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
