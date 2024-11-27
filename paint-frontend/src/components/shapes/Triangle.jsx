import React from "react";
import { Line } from "react-konva";

const Triangle = ({ shape }) => (
  <Line
    key={shape.shapeId}
    points={shape.points}
    fill={shape.fill}
    stroke={shape.stroke}
    strokeWidth={shape.strokeWidth}
    closed
  />
);

export default Triangle;
