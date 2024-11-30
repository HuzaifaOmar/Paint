import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { Stage, Layer, Transformer } from "react-konva";
import { ShapeType } from "../constants/shapes";
import { generateDottedBackground } from "../utils/backgroundGenerator";
import ShapeService from "../services/ShapeService.js";
import ShapesRenderer from "./ShapesRenderer.jsx";

const Canvas = ({
  selectedTool,
  fillColor,
  strokeColor,
  lineWidth,
  eraserOn,
  setFillColor,
  setStrokeColor,
  setLineWidth,
  copyTool,
  setCopyTool,
}) => {
  const startX = useRef(0);
  const startY = useRef(0);

  const stageRef = useRef(null);
  const isDrawing = useRef(false);
  const currentShapeId = useRef(null);

  // State management
  const [shapes, setShapes] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedShape, setSelectedShape] = useState(null);

  // Memoized background dots to prevent unnecessary re-renders
  const backgroundDots = useMemo(
    () => generateDottedBackground(window.innerWidth, window.innerHeight),
    []
  );

  const createShapeRequest = (tool, pos, fill, stroke, width) => ({
    shapeType: tool,
    attributes: {
      xStart: pos.x,
      yStart: pos.y,
      fillColor: [ShapeType.LINE, ShapeType.FREEHAND].includes(tool)
        ? fill
        : fill + "6F",
      strokeColor: [ShapeType.LINE, ShapeType.FREEHAND].includes(tool)
        ? stroke
        : stroke + "6F",
      strokeWidth: width,
    },
  });

  const handleMouseDown = useCallback(
    async (e) => {
      if (eraserOn || selectedTool === ShapeType.POINTER) {
        if (e.target === stageRef.current) {
          setSelectedNode(null);
          setSelectedShape(null);
        }
        return;
      }

      console.log("in handleMouseDown fun");
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
        handleApiError("Error creating shape", error);
      }
    },
    [
      selectedTool,
      fillColor,
      strokeColor,
      lineWidth,
      eraserOn,
      setSelectedShape,
    ]
  );

  const isValidDrawingState = () =>
    isDrawing.current &&
    currentShapeId.current &&
    selectedTool !== ShapeType.POINTER &&
    !eraserOn;

  const handleMouseMove = async () => {
    if (!isValidDrawingState()) return;

    console.log("in handleMouseMove fun");
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
  };

  const isValidFinalizationState = () =>
    currentShapeId.current && selectedTool !== ShapeType.POINTER && !eraserOn;

  const handleMouseUp = async () => {
    if (!isValidFinalizationState()) return;

    console.log("in handleMouseUp fun");
    try {
      const finalizeRequest = {
        fillColor,
        strokeColor,
      };

      let tempId = currentShapeId.current;
      const response = await ShapeService.finalizeShape(
        tempId,
        finalizeRequest
      );

      updateShapesState(response, tempId);
    } catch (error) {
      handleApiError("Error finalizing shape", error);
    } finally {
      resetDrawingState();
    }
  };

  const handleDragEnd = async (e, shape) => {
    if (eraserOn) return;
    console.log("in handleDragEnd fun");

    const pos = e.target.position();
    try {
      const moveRequest = {
        x: pos.x,
        y: pos.y,
      };
      const response = await ShapeService.moveShape(shape.shapeId, moveRequest);

      updateShapesState(response, shape.shapeId);
    } catch (error) {
      handleApiError("Error finalizing shape", error);
    }
  };

  const handleTransformEnd = async (e, shape) => {
    console.log("in handleTransformEnd fun");
    const attr = e.target.attrs;
    try {
      const transformRequest = {
        x: attr.x,
        y: attr.y,
        scaleX: attr.scaleX,
        scaleY: attr.scaleY,
        rotation: attr.rotation,
      };
      const response = await ShapeService.transformShape(
        shape.shapeId,
        transformRequest
      );
      updateShapesState(response, shape.shapeId);
    } catch (error) {
      handleApiError("Error transforming shape", error);
    }
  };

  const eraseShape = async (shape) => {
    setSelectedNode(null);
    setShapes((prevShapes) =>
      prevShapes.filter((s) => s.shapeId !== shape.shapeId)
    );
    await ShapeService.eraseShape(shape.shapeId);
  };

  const handleShapeSelection = (shape, target) => {
    setSelectedNode(target);
    setFillColor(shape.fill || fillColor);
    setStrokeColor(shape.stroke || strokeColor);
    setLineWidth(shape.strokeWidth);
    setSelectedShape(shape);
  };
  const handleShapeClick = async (e) => {
    const clickedShape = shapes[e.target.index];

    if (eraserOn) {
      await eraseShape(clickedShape);
    } else if (selectedTool === ShapeType.POINTER) {
      handleShapeSelection(clickedShape, e.target);
    }
  };

  useEffect(() => {
    if (!selectedShape) return;
    selectedShape.fill = fillColor;
    selectedShape.stroke = strokeColor;
    selectedShape.strokeWidth = lineWidth;
  }, [fillColor, strokeColor, lineWidth, selectedShape]);

  const updateShapesState = (response, id) => {
    setShapes((prevShapes) => {
      const newShapes = [...prevShapes];
      const shapeIndex = newShapes.findIndex((s) => s.shapeId === id);

      if (shapeIndex !== -1) {
        newShapes[shapeIndex] = {
          ...newShapes[shapeIndex],
          ...response.attributes,
        };
      }
      return newShapes;
    });
  };

  const handleCopy = async () => {
    console.log("original shape", selectedShape);
    const response = await ShapeService.copyShape(selectedShape.shapeId);
    console.log("copied shape", response);

    setShapes((prevShapes) => [
      ...prevShapes,
      {
        type: response.shapeType,
        shapeId: response.shapeId,
        ...response.attributes,
      },
    ]);
  };

  useEffect(() => {
    if (copyTool === true) {
      setCopyTool(false);
      if (!selectedShape) return;
      handleCopy();
    }
  }, [copyTool]);

  const resetDrawingState = () => {
    isDrawing.current = false;
    currentShapeId.current = null;
  };
  const handleApiError = (message, error) => {
    console.error(message, error);
  };

  return (
    <div className="canvas-container">
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        ref={stageRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <Layer>{backgroundDots}</Layer>
        <Layer>
          <ShapesRenderer
            shapes={shapes}
            selectedTool={selectedTool}
            eraserOn={eraserOn}
            onShapeClick={handleShapeClick}
            onDragEnd={handleDragEnd}
            onTransformEnd={handleTransformEnd}
          />
          {selectedNode && <Transformer nodes={[selectedNode]} />}
        </Layer>
      </Stage>
    </div>
  );
};

export default Canvas;
