import React, { useRef, useEffect, useState } from "react";
import { Stage, Layer, Line } from "react-konva";

const Canvas = ({ selectedShape, firstColor, secondColor }) => {
  const stageRef = useRef();
  const [dots, setDots] = useState([]);
  const [lines, setLines] = useState([]);
  const isDrawing = useRef(false);
  const lineWidth = 2;

  const handleMouseDown = () => {
    if (selectedShape === "freehand") {
      isDrawing.current = true;
      const pos = stageRef.current.getPointerPosition();
      setLines([...lines, { points: [pos.x, pos.y], firstColor, lineWidth }]);
    } else return;
  };

  const handleMouseMove = () => {
    if (!isDrawing.current) return;
    if (selectedShape === "freehand") {
      const pos = stageRef.current.getPointerPosition();
      const newLines = [...lines];
      const lastLine = newLines[newLines.length - 1];
      lastLine.points = lastLine.points.concat([pos.x, pos.y]);
      setLines(newLines);
    } else return;
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

    const newDots = dottedPattern.map((coord, index) => {
      return (
        <Line
          key={`dot-${index}`}
          points={[coord[0], coord[1], coord[0] + dotRadius, coord[1]]}
          stroke="gray"
          strokeWidth={1.5}
        />
      );
    });

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
        </Layer>
      </Stage>
    </div>
  );
};

export default Canvas;
