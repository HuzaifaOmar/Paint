import React from "react";
import { ShapeType } from "../constants/shapes";
import { useDrawingContext } from "../contexts/DrawingContext";

import Freehand from "../components/shapes/Freehand.jsx";
import Rectangle from "../components/shapes/Rectangle.jsx";
import Square from "../components/shapes/Square.jsx";
import Triangle from "../components/shapes/Triangle.jsx";
import LineDraw from "../components/shapes/Line.jsx";
import EllipseDraw from "../components/shapes/Ellipse.jsx";
import CircleDraw from "../components/shapes/Circle.jsx";

/**
 * Renders shapes based on their type
 */
const ShapeRenderer = ({
  selectedTool,
  eraserOn,
  onShapeClick,
  onDragEnd,
  onTransformEnd,
}) => {
  /**
   * Determine which shape component to render
   * @param {Object} shape - Shape to render
   * @returns {React.Component} Rendered shape component
   */
  const { shapes } = useDrawingContext();
  const renderShape = (shape) => {
    const draggable = selectedTool === ShapeType.POINTER && !eraserOn;

    const shapeProps = {
      shape,
      draggable,
      onDragEnd: (e) => onDragEnd(e, shape),
      onClick: (e) => onShapeClick(e),
      onTransformEnd: (e) => onTransformEnd(e, shape),
      ...(shape.x !== undefined && { x: shape.x }),
      ...(shape.y !== undefined && { y: shape.y }),
    };

    // Shape type to component mapping
    const shapeComponents = {
      [ShapeType.FREEHAND]: Freehand,
      [ShapeType.LINE]: LineDraw,
      [ShapeType.RECTANGLE]: Rectangle,
      [ShapeType.SQUARE]: Square,
      [ShapeType.CIRCLE]: CircleDraw,
      [ShapeType.ELLIPSE]: EllipseDraw,
      [ShapeType.TRIANGLE]: Triangle,
    };

    const ShapeComponent = shapeComponents[shape.type];
    return ShapeComponent ? <ShapeComponent {...shapeProps} /> : null;
  };

  return shapes.map(renderShape);
};

export default ShapeRenderer;
