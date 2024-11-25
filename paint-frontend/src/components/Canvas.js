import React, { useRef, useEffect, useState } from "react";
import { Stage, Layer, Line } from "react-konva";

const Canvas = () => {
  const stageRef = useRef(null);
  const [dots, setDots] = useState([]);

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
      >
        <Layer>{dots}</Layer>
      </Stage>
    </div>
  );
};

export default Canvas;
