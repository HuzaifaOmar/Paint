import React from "react";
import { Ellipse } from "react-konva";

const EllipseDraw = ({ shape, draggable, onDragEnd }) => (
  <Ellipse
    key={shape.shapeId}
    x={shape.x}
    y={shape.y}
    radiusX={shape.radiusX}
    radiusY={shape.radiusY}
    fill={shape.fill}
    stroke={shape.stroke}
    strokeWidth={shape.strokeWidth}
    draggable={draggable}
    onDragEnd={onDragEnd}
  />
);

export default EllipseDraw;
