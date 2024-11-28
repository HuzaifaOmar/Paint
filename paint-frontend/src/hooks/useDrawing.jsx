import { useState, useCallback, useRef } from "react";

export function useDrawing() {
  const [shapes, setShapes] = useState([]);
  const currentShapeId = useRef(null);

  const addShape = useCallback((shape) => {
    setShapes((prev) => [...prev, shape]);
    currentShapeId.current = shape.shapeId;
  }, []);

  const updateShape = useCallback((updatedShape) => {
    setShapes((prev) =>
      prev.map((shape) =>
        shape.shapeId === updatedShape.shapeId ? updatedShape : shape
      )
    );
  }, []);

  const removeShape = useCallback((shapeId) => {
    setShapes((prev) => prev.filter((shape) => shape.shapeId !== shapeId));
  }, []);

  return {
    shapes,
    currentShapeId,
    addShape,
    updateShape,
    removeShape,
  };
}
