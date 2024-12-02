import React, { createContext, useState, useContext } from "react";

const DrawingContext = createContext();

export const DrawingProvider = ({ children }) => {
  const [selectedTool, setSelectedTool] = useState("freehand");
  const [fillColor, setFillColor] = useState("rgba(240, 240, 240, 1.00)");
  const [strokeColor, setStrokeColor] = useState("rgba(0, 0, 0, 1.00)");
  const [lineWidth, setLineWidth] = useState(2.0);
  const [isEraserActive, setIsEraserActive] = useState(false);
  const [isDuplicateToolActive, setIsDuplicateToolActive] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [undoRequest, setUndoRequest] = useState(null);
  const [redoRequest, setRedoRequest] = useState(null);
  const [isLoadPopupOpen, setIsLoadPopupOpen] = useState(false);
  const [reload, setReload] = useState(false);
  const [shapes, setShapes] = useState([]);
  const contextValue = {
    selectedTool,
    fillColor,
    strokeColor,
    lineWidth,
    isEraserActive,
    isDuplicateToolActive,
    isPopupOpen,
    undoRequest,
    redoRequest,
    shapes,
    isLoadPopupOpen,
    reload,
    setSelectedTool,
    setFillColor,
    setStrokeColor,
    setLineWidth,
    setIsEraserActive,
    setIsDuplicateToolActive,
    setIsLoadPopupOpen,
    setUndoRequest,
    setRedoRequest,
    setShapes,
    setIsPopupOpen,
    setReload,
  };
  return (
    <DrawingContext.Provider value={contextValue}>
      {children}
    </DrawingContext.Provider>
  );
};

export const useDrawingContext = () => {
  const context = useContext(DrawingContext);
  if (context === undefined) {
    throw new Error("useDrawingContext must be used within a DrawingProvider");
  }
  return context;
};
