import React from "react";
import { Line } from "react-konva";

const Freehand = ({ shape, draggable, onDragEnd, onClick, x, y }) => (
  <Line
    {...(x !== undefined && { x })} // Only add x if it's provided
    {...(y !== undefined && { y })} // Only add y if it's provided
    key={shape.shapeId}
    points={[...shape.points]}
    stroke={shape.stroke}
    strokeWidth={shape.strokeWidth}
    tension={0.5}
    lineCap="round"
    lineJoin="round"
    draggable={draggable}
    onDragEnd={onDragEnd}
    onClick={onClick}
  />
);

export default Freehand;
