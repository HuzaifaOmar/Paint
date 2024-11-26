import React from "react";
import { Rect } from "react-konva";

const Square = ({ shape, index }) => (
  <Rect
    key={index}
    x={shape.x}
    y={shape.y}
    width={shape.width}
    height={shape.height}
    stroke={shape.firstColor}
    strokeWidth={shape.lineWidth}
    fill={shape.secondColor}
  />
);

export default Square;
