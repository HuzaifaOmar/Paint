import React from "react";
import { Rect } from "react-konva";

const Rectangle = ({
  shape,
  draggable,
  onDragEnd,
  onClick,
  onTransformEnd,
}) => (
  <Rect
    key={shape.shapeId}
    x={shape.x}
    y={shape.y}
    scaleX={shape.scaleX}
    scaleY={shape.scaleY}
    rotation={shape.rotation}
    width={shape.width}
    height={shape.height}
    fill={shape.fill}
    stroke={shape.stroke}
    strokeWidth={shape.strokeWidth}
    draggable={draggable}
    onDragEnd={onDragEnd}
    onTransformEnd={onTransformEnd}
    onClick={onClick}
  />
);

export default Rectangle;
