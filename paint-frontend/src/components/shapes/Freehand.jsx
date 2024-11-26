import React from "react";
import { Line } from "react-konva";

const Freehand = ({ shape, index }) => (
  <Line
    key={index}
    points={shape.points}
    stroke={shape.firstColor}
    strokeWidth={shape.lineWidth}
    tension={0.5}
    lineCap="round"
    lineJoin="round"
  />
);

export default Freehand;