import React from "react";
import { Line } from "react-konva";

const LineDraw = ({ shape }) => (
  <Line
    key={shape.shapeId}
    points={[...shape.points]}
    stroke={shape.stroke}
    strokeWidth={shape.strokeWidth}
    lineCap="round"
    lineJoin="round"
  />
);

export default LineDraw;
