import React from "react";
import { Rect } from "react-konva";

const Square = ({ shape, draggable, onDragEnd ,onClick}) => (
  <Rect
    key={shape.shapeId}
    x={shape.x}
    y={shape.y}
    width={shape.side}
    height={shape.side}
    fill={shape.fill}
    stroke={shape.stroke}
    strokeWidth={shape.strokeWidth}
    draggable={draggable}
    onDragEnd={onDragEnd}
    onClick={onClick}
  />
);

export default Square;
