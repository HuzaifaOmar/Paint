import React from "react";
import { Line } from "react-konva";

const LineDraw = ({
  shape,
  draggable,
  onDragEnd,
  onClick,
  x,
  y,
  onTransformEnd,
}) => (
  <Line
    {...(x !== undefined && { x })} // Only add x if it's provided
    {...(y !== undefined && { y })} // Only add y if it's provided
    scaleX={shape.scaleX}
    scaleY={shape.scaleY}
    rotation={shape.rotation}
    key={shape.shapeId}
    points={[...shape.points]}
    stroke={shape.stroke}
    strokeWidth={shape.strokeWidth}
    lineCap="round"
    lineJoin="round"
    draggable={draggable}
    onDragEnd={onDragEnd}
    onTransformEnd={onTransformEnd}
    onClick={onClick}
  />
);

export default LineDraw;
