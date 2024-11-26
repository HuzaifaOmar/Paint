import React from "react";
import { Circle } from "react-konva";

const CircleDraw = ({ shape, index }) => (
  <Circle
    key={index}
    x={shape.x}
    y={shape.y}
    radius={shape.radius}
    stroke={shape.firstColor}
    strokeWidth={shape.lineWidth}
    fill={shape.secondColor}
  />
);

export default CircleDraw;