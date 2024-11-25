import React, { useRef, useEffect, useState } from "react";
import { Stage, Layer, Line, Rect, Circle } from "react-konva";

const Canvas = ({ selectedShape, firstColor, secondColor }) => {
  const stageRef = useRef();
  const [dots, setDots] = useState([]);
  const [lines, setLines] = useState([]);
  const [shapes, setShapes] = useState([]);
  const isDrawing = useRef(false);
  const lineWidth = 2;
  const startX = useRef(0);
  const startY = useRef(0);

  const handleMouseDown = () => {
    const pos = stageRef.current.getPointerPosition();
    startX.current = pos.x;
    startY.current = pos.y;
    isDrawing.current = true;
    
    if (selectedShape === "freehand") {
      setLines([...lines, { points: [pos.x, pos.y], firstColor, lineWidth }]);
    } else if (selectedShape === "line") {
      setLines([...lines, { points: [pos.x, pos.y], firstColor, lineWidth }]);
    } else if (selectedShape === "rectangle") {
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
        },
      ]);
    } else return;
  };

  const handleMouseMove = () => {
    if (!isDrawing.current) return;
    const pos = stageRef.current.getPointerPosition();
    
    if (selectedShape === "freehand") {
      const newLines = [...lines];
      const lastLine = newLines[newLines.length - 1];
      lastLine.points = lastLine.points.concat([pos.x, pos.y]);
      setLines(newLines);
    } else if (selectedShape === "line") {
      const newLines = [...lines];
      const lastLine = newLines[newLines.length - 1];
      lastLine.points = [startX.current, startY.current, pos.x, pos.y];
      setLines(newLines);
    } else if (selectedShape === "rectangle") {
      const newShapes = [...shapes];
      const lastShape = newShapes[newShapes.length - 1];
      lastShape.width = pos.x - lastShape.x;
      lastShape.height = pos.y - lastShape.y;
      setShapes(newShapes);
    } else if (selectedShape === "circle") {
      const newShapes = [...shapes];
      const lastShape = newShapes[newShapes.length - 1];
      const dx = pos.x - lastShape.x;
      const dy = pos.y - lastShape.y;
      lastShape.radius = Math.sqrt(dx * dx + dy * dy);
      setShapes(newShapes);
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

    setDots(newDots); // Set the generated dots into state
  }, []); // Empty array means this runs once on component mount

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
        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke={line.firstColor}
              strokeWidth={line.lineWidth}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
            />
          ))}
          {shapes.map((shape, i) => {
            if (shape.type === "rectangle") {
              return (
                <Rect
                  key={i}
                  x={shape.x}
                  y={shape.y}
                  width={shape.width}
                  height={shape.height}
                  stroke={shape.firstColor}
                  strokeWidth={shape.lineWidth}
                />
              );
            } else if (shape.type === "circle") {
              return (
                <Circle
                  key={i}
                  x={shape.x}
                  y={shape.y}
                  radius={shape.radius}
                  stroke={shape.firstColor}
                  strokeWidth={shape.lineWidth}
                />
              );
            }
            return null;
          })}
        </Layer>
      </Stage>
    </div>
  );
};

export default Canvas;
