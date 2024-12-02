import React from "react";
import "./App.css";
import "./styles/main.css";

import Canvas from "./components/Canvas";
import Toolbar from "./components/toolbar/Toolbar";
import SavePagePopup from "./components/savePopup/SavePagePopup";
import LoadPagePopup from "./components/savePopup/LoadPagePopup";
import { DrawingProvider } from "./contexts/DrawingContext";

function App() {
  return (
    <DrawingProvider>
      <div className="main-screen">
        <Toolbar />
        <SavePagePopup />
        <LoadPagePopup />
        <Canvas />
      </div>
    </DrawingProvider>
  );
}

export default App;
