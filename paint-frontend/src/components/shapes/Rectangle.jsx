import React from "react";
import { Rect } from "react-konva";

const Rectangle = ({ shape, draggable, onDragEnd, onClick }) => (
  <Rect
    key={shape.shapeId}
    x={shape.x}
    y={shape.y}
    width={shape.width}
    height={shape.height}
    fill={shape.fill}
    stroke={shape.stroke}
    strokeWidth={shape.strokeWidth}
    draggable={draggable}
    onDragEnd={onDragEnd}
    onClick={onClick}
  />
);

export default Rectangle;
