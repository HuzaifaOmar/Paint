import React from "react";
import { Line } from "react-konva";

const Freehand = ({ shape }) => (
  <Line
    key={shape.shapeId}
    points={[...shape.points]}
    stroke={shape.strokeColor}
    strokeWidth={shape.strokeWidth}
    tension={0.5}
    lineCap="round"
    lineJoin="round"
  />
);

export default Freehand;
