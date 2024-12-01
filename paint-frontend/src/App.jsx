import React from "react";
import "./App.css";
import "./styles/main.css";

import Canvas from "./components/Canvas";
import Toolbar from "./components/toolbar/Toolbar";
import SavePagePopup from "./components/savePopup/SavePagePopup";
import { DrawingProvider } from "./contexts/DrawingContext";

function App() {
  return (
    <DrawingProvider>
      <div className="main-screen">
        <Toolbar />
        <SavePagePopup />
        <Canvas />
      </div>
    </DrawingProvider>
  );
}

export default App;
