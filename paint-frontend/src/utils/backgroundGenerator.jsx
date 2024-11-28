import React from "react";
import { Line } from "react-konva";

export function generateDottedBackground(
  stageWidth,
  stageHeight,
  dotSpacing = 50,
  dotRadius = 1.5
) {
  const dottedPattern = [];

  for (let x = 7; x < stageWidth; x += dotSpacing) {
    for (let y = 7; y < stageHeight; y += dotSpacing) {
      dottedPattern.push([x, y]);
    }
  }

  return dottedPattern.map((coord, index) => (
    <Line
      key={`dot-${index}`}
      points={[coord[0], coord[1], coord[0] + dotRadius, coord[1]]}
      stroke="gray"
      strokeWidth={1.5}
    />
  ));
}
