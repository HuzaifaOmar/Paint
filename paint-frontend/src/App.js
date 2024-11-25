import "./App.css";
import Canvas from "./components/Canvas";
<<<<<<< HEAD
import ToolBar from "./components/toolbar/ToolBar";
=======
import ToolBar from "./components/ToolBar";
import React, { useState } from "react";
>>>>>>> a1e45df9eb9a247c4bacaaa4ad02848b0fcc3645
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
