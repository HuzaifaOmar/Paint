import React, { useRef, useEffect, useState } from "react";
import { Line, Stage, Layer } from "react-konva";
import axios from "axios";
import Freehand from "./shapes/Freehand.jsx";
import Rectangle from "./shapes/Rectangle.jsx";
import Square from "./shapes/Square.jsx";
import Triangle from "./shapes/Triangle.jsx";
import LineDraw from "./shapes/Line.jsx";
import EllipseDraw from "./shapes/Ellipse.jsx";
import CircleDraw from "./shapes/Circle.jsx";

const API_BASE_URL = "http://localhost:8080/shapes";

const Canvas = ({ selectedShape, fillColor, strokeColor, lineWidth }) => {
  const stageRef = useRef();
  const [dots, setDots] = useState([]);
  const [shapes, setShapes] = useState([]);
  const isDrawing = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const currentShapeId = useRef(null);

  const handleMouseDown = async () => {
    const pos = stageRef.current.getPointerPosition();
    startX.current = pos.x;
    startY.current = pos.y;
    isDrawing.current = true;

    try {
      const shapeRequest = {
        shapeType: selectedShape,
        attributes: {
          xStart: pos.x,
          yStart: pos.y,
          fillColor: fillColor,
          strokeColor: strokeColor,
          strokeWidth: lineWidth,
        },
      };
      console.log("create request", shapeRequest);
      const response = await axios.post(`${API_BASE_URL}/create`, shapeRequest);
      currentShapeId.current = response.data.shapeId;
      console.log("create response", response.data);
      setShapes((prevShapes) => [
        ...prevShapes,
        {
          type: selectedShape,
          shapeId: response.data.shapeId,
          ...response.data.attributes,
        },
      ]);
    } catch (error) {
      console.error("Error creating shape:", error);
    }
  };

  const handleMouseMove = async () => {
    if (!isDrawing.current || !currentShapeId.current) return;

    const pos = stageRef.current.getPointerPosition();

    try {
      const updateRequest = {
        xEnd: pos.x,
        yEnd: pos.y,
      };

      const response = await axios.put(
        `${API_BASE_URL}/update/${currentShapeId.current}`,
        updateRequest
      );
      console.log(response.data);
      setShapes((prevShapes) => {
        const newShapes = [...prevShapes];
        const shapeIndex = newShapes.findIndex(
          (s) => s.shapeId === currentShapeId.current
        );

        if (shapeIndex !== -1) {
          newShapes[shapeIndex] = {
            ...newShapes[shapeIndex],
            ...response.data.attributes,
          };
        }
        return newShapes;
      });
      // console.log(shapes);
    } catch (error) {
      console.error("Error updating shape:", error);
    }
  };

  const handleMouseUp = async () => {
    if (!currentShapeId.current) return;
    isDrawing.current = false;
    currentShapeId.current = null;
  };

  const renderShape = (shape, index) => {
    switch (shape.type) {
      case "freehand":
        return <Freehand shape={shape} />;
      case "line":
        // console.log(shape);
        return <LineDraw shape={shape} />;
      case "rectangle":
        return <Rectangle shape={shape} />;
      case "square":
        return <Square shape={shape} />;
      case "circle":
        return <CircleDraw shape={shape} />;
      case "ellipse":
        return <EllipseDraw shape={shape} />;
      case "triangle":
        return <Triangle shape={shape} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const stageWidth = window.innerWidth;
    const stageHeight = window.innerHeight;

    const dotSpacing = 50;
    const dotRadius = 1.5;

    const dottedPattern = [];

    for (let x = 7; x < stageWidth; x += dotSpacing) {
      for (let y = 7; y < stageHeight; y += dotSpacing) {
        dottedPattern.push([x, y]);
      }
    }

    const newDots = dottedPattern.map((coord, index) => (
      <Line
        key={`dot-${index}`}
        points={[coord[0], coord[1], coord[0] + dotRadius, coord[1]]}
        stroke="gray"
        strokeWidth={1.5}
      />
    ));

    setDots(newDots);
  }, []);

  return (
    <div className="canvas-container">
      <Stage
        width={window.innerWidth}
        height={window.innerHeight - 47}
        ref={stageRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <Layer>{dots}</Layer>
        <Layer>{shapes.map((shape, i) => renderShape(shape, i))}</Layer>
      </Stage>
    </div>
  );
};
export default Canvas;
