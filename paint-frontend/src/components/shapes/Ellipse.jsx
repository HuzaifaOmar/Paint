import React from "react";
import { Ellipse } from "react-konva";

const EllipseDraw = ({ shape, index }) => (
  <Ellipse
    key={index}
    x={shape.x}
    y={shape.y}
    radiusX={shape.radiusX}
    radiusY={shape.radiusY}
    stroke={shape.firstColor}
    strokeWidth={shape.lineWidth}
    fill={shape.secondColor}
  />
);

export default EllipseDraw;
