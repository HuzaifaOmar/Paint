import React from "react";
import { Line } from "react-konva";

const Triangle = ({ shape, index }) => (
  <Line
    key={index}
    points={shape.points}
    stroke={shape.firstColor}
    strokeWidth={shape.lineWidth}
    fill={shape.secondColor}
    closed
  />
);

export default Triangle;
