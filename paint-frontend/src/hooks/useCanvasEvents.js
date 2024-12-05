import { useCallback, useRef } from "react";
import ShapeService from "../services/ShapeService";
import { SHAPE_TYPES } from "../constants/shapes";
import { useDrawingContext } from "../contexts/DrawingContext";

export const useCanvasEvents = (
  setSelectedNode,
  setSelectedShape,
  updateShapesState
) => {
  const {
    selectedTool,
    setShapes,
    fillColor,
    strokeColor,
    lineWidth,
    isEraserActive,
  } = useDrawingContext();

  const stageRef = useRef(null);
  const isDrawing = useRef(false);
  const currentShapeId = useRef(null);
  const startX = useRef(0);
  const startY = useRef(0);

  const reduceTransparency = useCallback((rgba) => {
    const match = rgba.match(/^rgba\((\d+),\s*(\d+),\s*(\d+),\s*[\d.]+\)$/);
    if (!match) return rgba;

    const [r, g, b] = match.slice(1);
    return `rgb(${r}, ${g}, ${b}, 0.3)`;
  }, []);


  const createShapeRequest = useCallback(
    (tool, pos, fill, stroke, width) => {
      const isLineOrFreehand = [
        SHAPE_TYPES.LINE,
        SHAPE_TYPES.FREEHAND,
      ].includes(tool);

      return {
        shapeType: tool,
        attributes: {
          xStart: pos.x,
          yStart: pos.y,
          fillColor: isLineOrFreehand ? fill : reduceTransparency(fill),
          strokeColor: isLineOrFreehand ? stroke : reduceTransparency(stroke),
          strokeWidth: width,
        },
      };
    },
    [reduceTransparency]
  );

  // Check if drawing is in a valid state
  const isValidDrawingState = useCallback(
    () =>
      isDrawing.current &&
      currentShapeId.current &&
      selectedTool !== SHAPE_TYPES.POINTER &&
      !isEraserActive,
    [selectedTool, isEraserActive]
  );

  // Check if shape finalization is valid
  const isValidFinalizationState = useCallback(
    () =>
      currentShapeId.current &&
      selectedTool !== SHAPE_TYPES.POINTER &&
      !isEraserActive,
    [selectedTool, isEraserActive]
  );

  // Reset drawing state
  const resetDrawingState = useCallback(() => {
    isDrawing.current = false;
    currentShapeId.current = null;
  }, []);

  
  const handleMouseDown = useCallback(
    async (e) => {
      // Deselect if eraser or pointer is active
      if (isEraserActive || selectedTool === SHAPE_TYPES.POINTER) {
        if (e.target === stageRef.current) {
          setSelectedNode(null);
          setSelectedShape(null);
        }
        return;
      }

      const pos = stageRef.current.getPointerPosition();
      isDrawing.current = true;
      startX.current = pos.x;
      startY.current = pos.y;

      try {
        const shapeRequest = createShapeRequest(
          selectedTool,
          pos,
          fillColor,
          strokeColor,
          lineWidth
        );

        const response = await ShapeService.createShape(shapeRequest);
        currentShapeId.current = response.shapeId;

        setShapes((prevShapes) => [
          ...prevShapes,
          {
            type: selectedTool,
            shapeId: response.shapeId,
            ...response.attributes,
          },
        ]);
      } catch (error) {
        console.error("Error creating shape", error);
      }
    },
    [
      isEraserActive,
      selectedTool,
      createShapeRequest,
      fillColor,
      strokeColor,
      lineWidth,
      setShapes,
      setSelectedNode,
      setSelectedShape,
    ]
  );

  const handleMouseMove = useCallback(async () => {
    if (!isValidDrawingState()) return;

    const pos = stageRef.current.getPointerPosition();
    try {
      const updateRequest = {
        xEnd: pos.x,
        yEnd: pos.y,
      };

      const response = await ShapeService.updateShapeDrawing(
        currentShapeId.current,
        updateRequest
      );

      updateShapesState(response, currentShapeId.current);
    } catch (error) {
      console.error("Error updating shape:", error);
    }
  }, [isValidDrawingState, updateShapesState]);

  const handleMouseUp = useCallback(async () => {
    if (!isValidFinalizationState()) return;

    try {
      const finalizeRequest = {
        fillColor,
        strokeColor,
      };

      const response = await ShapeService.finalizeShape(
        currentShapeId.current,
        finalizeRequest
      );

      updateShapesState(response, currentShapeId.current);
    } catch (error) {
      console.error("Error finalizing shape", error);
    } finally {
      resetDrawingState();
    }
  }, [
    fillColor,
    strokeColor,
    isValidFinalizationState,
    updateShapesState,
    resetDrawingState,
  ]);

  return {
    stageRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  };
};
