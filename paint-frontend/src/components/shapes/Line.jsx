import React from "react";
import { Line } from "react-konva";

const LineDraw = ({ shape, draggable, onDragEnd,onClick}) => (
  <Line
    key={shape.shapeId}
    points={[...shape.points]}
    stroke={shape.stroke}
    strokeWidth={shape.strokeWidth}
    lineCap="round"
    lineJoin="round"
    draggable={draggable}
    onDragEnd={onDragEnd}
    onClick={onClick}
  />
);

export default LineDraw;
