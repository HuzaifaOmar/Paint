import React from "react";
import { Line } from "react-konva";

const Triangle = ({ shape, draggable, onDragEnd,onClick }) => (
  <Line
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
