import React from "react";
import { Circle } from "react-konva";
const CircleDraw = ({
  shape,
  draggable,
  onDragEnd,
  onClick,
  onTransformEnd,
}) => (
  <Circle
    key={shape.shapeId}
    x={shape.x}
    y={shape.y}
    radius={shape.radius}
    fill={shape.fill}
    stroke={shape.stroke}
    strokeWidth={shape.strokeWidth}
    draggable={draggable}
    onDragEnd={onDragEnd}
    onTransformEnd={onTransformEnd}
    onClick={onClick}
  />
);

export default CircleDraw;
