import React from "react";
import { Ellipse } from "react-konva";

const EllipseDraw = ({ shape }) => (
  <Ellipse
    key={shape.shapeId}
    x={shape.x}
    y={shape.y}
    radiusX={shape.radiusX}
    radiusY={shape.radiusY}
    fill={shape.fill}
    stroke={shape.stroke}
    strokeWidth={shape.strokeWidth}
  />
);

export default EllipseDraw;
