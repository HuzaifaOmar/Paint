import React from "react";
import { Line } from "react-konva";

const Triangle = ({ shape, draggable, onDragEnd, onClick, x, y }) => (
  <Line
    {...(x !== undefined && { x })} // Only add x if it's provided
    {...(y !== undefined && { y })} // Only add y if it's provided
    key={shape.shapeId}
    points={shape.points}
    fill={shape.fill}
    stroke={shape.stroke}
    strokeWidth={shape.strokeWidth}
    draggable={draggable}
    onDragEnd={onDragEnd}
    onClick={onClick}
    closed
  />
);

export default Triangle;
