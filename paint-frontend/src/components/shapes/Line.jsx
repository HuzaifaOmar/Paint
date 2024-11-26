import React from "react";
import { Line } from "react-konva";

const LineDraw = ({ shape, index }) => (
  <Line
    key={index}
    points={shape.points}
    stroke={shape.firstColor}
    strokeWidth={shape.lineWidth}
    lineCap="round"
    lineJoin="round"
  />
);

export default LineDraw;