import React, { useRef, useEffect, useState } from "react";
import { Line, Stage, Layer } from "react-konva";
import Freehand from "./shapes/Freehand.jsx";
import Rectangle from "./shapes/Rectangle.jsx";
import Square from "./shapes/Square.jsx";
import Triangle from "./shapes/Triangle.jsx";
import LineDraw from "./shapes/Line.jsx";
import EllipseDraw from "./shapes/Ellipse.jsx";
import CircleDraw from "./shapes/Circle.jsx";

const Canvas = ({ selectedShape, firstColor, secondColor, width }) => {
  const stageRef = useRef();
  const [dots, setDots] = useState([]);
  const [shapes, setShapes] = useState([]);
  const isDrawing = useRef(false);
  const lineWidth = width;
  const startX = useRef(0);
  const startY = useRef(0);

  const handleMouseDown = () => {
    const pos = stageRef.current.getPointerPosition();
    startX.current = pos.x;
    startY.current = pos.y;
    isDrawing.current = true;

    if (selectedShape === "freehand" || selectedShape === "line") {
      setShapes([
        ...shapes,
        { type: selectedShape, points: [pos.x, pos.y], firstColor, lineWidth },
      ]);
    } else if (selectedShape === "rectangle" || selectedShape === "square") {
      setShapes([
        ...shapes,
        {
          type: selectedShape,
          x: pos.x,
          y: pos.y,
          width: 0,
          height: 0,
          firstColor,
          lineWidth,
          secondColor,
        },
      ]);
    } else if (selectedShape === "circle") {
      setShapes([
        ...shapes,
        {
          type: selectedShape,
          x: pos.x,
          y: pos.y,
          radius: 0,
          firstColor,
          lineWidth,
          secondColor,
        },
      ]);
    } else if (selectedShape === "ellipse") {
      setShapes([
        ...shapes,
        {
          type: "ellipse",
          x: pos.x,
          y: pos.y,
          radiusX: 0,
          radiusY: 0,
          firstColor,
          lineWidth,
          secondColor,
        },
      ]);
    } else if (selectedShape === "triangle") {
      setShapes([
        ...shapes,
        {
          type: "triangle",
          x: pos.x,
          y: pos.y,
          points: [pos.x, pos.y, pos.x, pos.y, pos.x, pos.y],
          firstColor,
          lineWidth,
          secondColor,
        },
      ]);
    } else return;
  };

  const handleMouseMove = () => {
    if (!isDrawing.current) return;
    const pos = stageRef.current.getPointerPosition();

    if (selectedShape === "freehand") {
      const newLines = [...shapes];
      const lastLine = newLines[newLines.length - 1];
      lastLine.points = lastLine.points.concat([pos.x, pos.y]);
      setShapes(newLines);
    } else if (selectedShape === "line") {
      const newLines = [...shapes];
      const lastLine = newLines[newLines.length - 1];
      lastLine.points = [startX.current, startY.current, pos.x, pos.y];
      setShapes(newLines);
    } else if (selectedShape === "rectangle") {
      const newShapes = [...shapes];
      const lastShape = newShapes[newShapes.length - 1];
      lastShape.width = pos.x - lastShape.x;
      lastShape.height = pos.y - lastShape.y;
      setShapes(newShapes);
    } else if (selectedShape === "square") {
      const newShapes = [...shapes];
      let size = 0
      const lastShape = newShapes[newShapes.length - 1];
      if ((lastShape.x-pos.x)>0 &&(lastShape.y-pos.y)>0){
       size = Math.min(lastShape.x-pos.x, lastShape.y-pos.y);
      }
      else{
       size = Math.min(pos.x - lastShape.x, pos.y - lastShape.y);
      }
      // size = Math.min(pos.x - lastShape.x, pos.y - lastShape.y);
      lastShape.width = size;
      lastShape.height = size;
      setShapes(newShapes);
    } else if (selectedShape === "circle") {
      const newShapes = [...shapes];
      const lastShape = newShapes[newShapes.length - 1];
      const dx = pos.x - lastShape.x;
      const dy = pos.y - lastShape.y;
      lastShape.radius = Math.sqrt(dx * dx + dy * dy);
      setShapes(newShapes);
    } else if (selectedShape === "ellipse") {
      const newShapes = [...shapes];
      const lastShape = newShapes[newShapes.length - 1];
      const dx = pos.x - lastShape.x;
      const dy = pos.y - lastShape.y;
      lastShape.radiusX = Math.abs(dx);
      lastShape.radiusY = Math.abs(dy);
      setShapes(newShapes);
    } else if (selectedShape === "triangle") {
      const newShapes = [...shapes];
      const lastShape = newShapes[newShapes.length - 1];
      const dx = pos.x - lastShape.x;
      const dy = pos.y - lastShape.y;
      lastShape.points = [
        startX.current,
        startY.current,
        startX.current + dx,
        startY.current,
        startX.current + dx / 2,
        startY.current + dy,
      ];
      setShapes(newShapes);
    }
  };

  const renderShape = (shape, index) => {
    switch (shape.type) {
      case "freehand":
        return <Freehand shape={shape} index={index} />;
      case "line":
        return <LineDraw shape={shape} index={index} />;
      case "rectangle":
        return <Rectangle shape={shape} index={index} />;
      case "square":
        return <Square shape={shape} index={index} />;
      case "circle":
        return <CircleDraw shape={shape} index={index} />;
      case "ellipse":
        return <EllipseDraw shape={shape} index={index} />;
      case "triangle":
        return <Triangle shape={shape} index={index} />;
      default:
        return null;
    }
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
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
        height={window.innerHeight}
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
