import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Stage, Layer, Transformer } from "react-konva";
import { useDrawingContext } from "../contexts/DrawingContext";
import { SHAPE_TYPES } from "../constants/shapes";
import { generateDottedBackground } from "../utils/backgroundGenerator";
import ShapeService from "../services/ShapeService";
import ShapesRenderer from "../utils/ShapesRenderer";
import { useCanvasEvents } from "../hooks/useCanvasEvents";

const Canvas = () => {
  const {
    selectedTool,
    fillColor,
    strokeColor,
    lineWidth,
    isEraserActive,
    isDuplicateToolActive,
    undoRequest,
    redoRequest,
    shapes,
    reload,
    setFillColor,
    setStrokeColor,
    setLineWidth,
    setIsDuplicateToolActive,
    setShapes,
    setReload,
  } = useDrawingContext();
  const [selectedNode, setSelectedNode] = useState(null);

  const updateShapesState = useCallback(
    (response, id) => {
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
    },
    [setShapes]
  );
  const [selectedShape, setSelectedShape] = useState(null);

  const { stageRef, handleMouseDown, handleMouseMove, handleMouseUp } =
    useCanvasEvents(setSelectedNode, setSelectedShape, updateShapesState);

  const backgroundDots = useMemo(
    () =>
      generateDottedBackground(
        window.innerWidth,
        window.innerHeight,
        setReload
      ),
    [setReload]
  );

  useEffect(() => {
    if (reload === true) {
      ShapeService.clear();
    }
  }, [reload]);

  const handleDragEnd = async (e, shape) => {
    if (isEraserActive) return;
    console.log("in handleDragEnd fun");

    const pos = e.target.position();
    try {
      const moveRequest = {
        x: pos.x,
        y: pos.y,
      };

      console.log("shape before move request", shape);

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
    if (isEraserActive) {
      await eraseShape(clickedShape);
    } else if (selectedTool === SHAPE_TYPES.POINTER) {
      handleShapeSelection(clickedShape, e.target);
    }
  };

  useEffect(() => {
    setSelectedNode(null);
    setSelectedShape(null);
  }, [selectedTool]);

  const handleRecolor = async (shape) => {
    try {
      const recolorRequest = {
        fillColor: fillColor,
        strokeColor: strokeColor,
        strokeWidth: lineWidth,
      };

      const response = await ShapeService.recolorShape(
        shape.shapeId,
        recolorRequest
      );
      updateShapesState(response, shape.shapeId);
    } catch (error) {
      handleApiError("Error recoloring shape", error);
    }
  };

  useEffect(() => {
    if (!selectedShape) return;
    handleRecolor(selectedShape);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fillColor, strokeColor, lineWidth]);

  const handleCopy = async () => {
    const response = await ShapeService.copyShape(selectedShape.shapeId);

    setShapes((prevShapes) => [
      ...prevShapes,
      {
        type: response.shapeType,
        shapeId: response.shapeId,
        ...response.attributes,
      },
    ]);
    setSelectedShape(null);
    setSelectedNode(null);
  };

  useEffect(() => {
    if (isDuplicateToolActive === true) {
      setIsDuplicateToolActive(false);
      if (!selectedShape) return;
      handleCopy();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDuplicateToolActive]);

  const handleApiError = (message, error) => {
    console.error(message, error);
  };

  useEffect(() => {
    if (undoRequest === null) return;
    setSelectedNode(null);
    const type = undoRequest.type;
    const shape = undoRequest.shape;
    switch (type) {
      case "delete":
        setShapes((prevShapes) =>
          prevShapes.filter((s) => s.shapeId !== shape.shapeId)
        );
        break;
      case "update":
        updateShapesState(shape, shape.shapeId);
        break;
      case "create":
        setShapes((prevShapes) => [
          ...prevShapes,
          {
            type: shape.shapeType,
            shapeId: shape.shapeId,
            ...shape.attributes,
          },
        ]);
        break;
      default:
        return;
    }
  }, [setShapes, undoRequest, updateShapesState]);

  useEffect(() => {
    if (redoRequest === null) return;
    setSelectedNode(null);
    const type = redoRequest.type;
    const shape = redoRequest.shape;
    switch (type) {
      case "delete":
        setShapes((prevShapes) =>
          prevShapes.filter((s) => s.shapeId !== shape.shapeId)
        );
        break;
      case "update":
        updateShapesState(shape, shape.shapeId);
        break;
      case "create":
        setShapes((prevShapes) => [
          ...prevShapes,
          {
            type: shape.shapeType,
            shapeId: shape.shapeId,
            ...shape.attributes,
          },
        ]);
        break;
      default:
        return;
    }
  }, [redoRequest, setShapes, updateShapesState]);

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
            isEraserActive={isEraserActive}
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
