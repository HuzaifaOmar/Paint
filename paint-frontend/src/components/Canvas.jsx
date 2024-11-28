import React, { useRef, useState } from "react";
import { Stage, Layer,Transformer } from "react-konva";
import { ShapeType } from "../constants/shapes";
import { generateDottedBackground } from "../utils/backgroundGenerator";

import axios from "axios";
import Freehand from "./shapes/Freehand.jsx";
import Rectangle from "./shapes/Rectangle.jsx";
import Square from "./shapes/Square.jsx";
import Triangle from "./shapes/Triangle.jsx";
import LineDraw from "./shapes/Line.jsx";
import EllipseDraw from "./shapes/Ellipse.jsx";
import CircleDraw from "./shapes/Circle.jsx";

const API_BASE_URL = "http://localhost:8080/api/shapes";

const Canvas = ({
  selectedShape,
  fillColor,
  strokeColor,
  lineWidth,
  eraserOn,
}) => {
  const stageRef = useRef();
  const [dots] = useState(() =>
    generateDottedBackground(window.innerWidth, window.innerHeight)
  );
  const [shapes, setShapes] = useState([]);
  const isDrawing = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const currentShapeId = useRef(null);


  const handleMouseDown = async () => {
    if (selectedShape === ShapeType.POINTER || eraserOn) return;
    console.log("in handleMouseDown fun");
    const pos = stageRef.current.getPointerPosition();
    startX.current = pos.x;
    startY.current = pos.y;
    isDrawing.current = true;

    try {
      const shapeRequest = {
        shapeType: selectedShape,
        attributes: {
          xStart: pos.x,
          yStart: pos.y,
          fillColor: [ShapeType.LINE, ShapeType.FREEHAND].includes(
            selectedShape
          )
            ? fillColor
            : fillColor + "6F",
          strokeColor: [ShapeType.LINE, ShapeType.FREEHAND].includes(
            selectedShape
          )
            ? strokeColor
            : strokeColor + "6F",
          strokeWidth: lineWidth,
        },
      };
      console.log("create request", shapeRequest);
      const response = await axios.post(`${API_BASE_URL}/create`, shapeRequest);
      currentShapeId.current = response.data.shapeId;
      console.log("create response", response.data);
      setShapes((prevShapes) => [
        ...prevShapes,
        {
          type: selectedShape,
          shapeId: response.data.shapeId,
          ...response.data.attributes,
        },
      ]);
    } catch (error) {
      console.error("Error creating shape:", error);
    }
  };

  const handleMouseMove = async () => {
    if (
      !isDrawing.current ||
      !currentShapeId.current ||
      selectedShape === ShapeType.POINTER ||
      eraserOn
    )
      return;
    console.log("in handleMouseMove fun");
    const pos = stageRef.current.getPointerPosition();
    try {
      const updateRequest = {
        xEnd: pos.x,
        yEnd: pos.y,
      };

      const response = await axios.put(
        `${API_BASE_URL}/${currentShapeId.current}`,
        updateRequest
      );
      console.log("update response", response.data);

      setShapes((prevShapes) => {
        const newShapes = [...prevShapes];
        const shapeIndex = newShapes.findIndex(
          (s) => s.shapeId === currentShapeId.current
        );

        if (shapeIndex !== -1) {
          newShapes[shapeIndex] = {
            ...newShapes[shapeIndex],
            ...response.data.attributes,
          };
        }
        return newShapes;
      });
    } catch (error) {
      console.error("Error updating shape:", error);
    }
  };

  const handleMouseUp = async () => {
    if (
      !currentShapeId.current ||
      selectedShape === ShapeType.POINTER ||
      eraserOn
    )
      return;
    console.log("in handleMouseUp fun");
    try {
      const finalizeRequest = {
        fillColor: fillColor,
        strokeColor: strokeColor,
      };
      let tempId = currentShapeId.current;
      const response = await axios.put(
        `${API_BASE_URL}/${currentShapeId.current}/finalize`,
        finalizeRequest
      );

      setShapes((prevShapes) => {
        const newShapes = [...prevShapes];

        const shapeIndex = newShapes.findIndex((s) => s.shapeId === tempId);
        console.log("shapes arr after finalizing shape", shapes);

        if (shapeIndex !== -1) {
          newShapes[shapeIndex] = {
            ...newShapes[shapeIndex],
            ...response.data.attributes,
          };
        }

        return newShapes;
      });
    } catch (error) {
      console.error("Error updating shape:", error);
    }
    isDrawing.current = false;
    currentShapeId.current = null;
  };

  const handleDragEnd = async (e, shape) => {
    if (eraserOn) return;
    console.log("in handleDragEnd fun");

    const pos = e.target.position();
    try {
      const moveRequest = {
        x: pos.x,
        y: pos.y,
      };
      console.log("moveRequest json", JSON.stringify(moveRequest));
      const response = await axios.put(
        `${API_BASE_URL}/${shape.shapeId}/move`,
        moveRequest
      );
      console.log("move response", response.data);
      console.log("shape before move", shape);

      setShapes((prevShapes) => {
        const newShapes = [...prevShapes];
        const shapeIndex = newShapes.findIndex(
          (s) => s.shapeId === shape.shapeId
        );

        if (shapeIndex !== -1) {
          newShapes[shapeIndex] = {
            ...newShapes[shapeIndex],
            ...response.data.attributes,
          };
          console.log("shape after move", newShapes[shapeIndex]);
        }
        return newShapes;
      });
    } catch (error) {
      console.error("Error updating shape position:", error);
    }
  };
  // const [selectedId,setSelectedId]=useState(null);
  const [selectedNode, setSelectedNode] = useState(null); 
  const handleShapeClick = async (e) => {
    if (eraserOn) {
      setShapes(
        shapes.filter((s) => s.shapeId !== shapes[e.target.index].shapeId)
      );
      await axios.delete(
        `${API_BASE_URL}/${shapes[e.target.index].shapeId}/erase`
      );
    }
    else if (selectedShape === "pointer") {
      setSelectedNode(e.target);
    }
  };

  const renderShape = (shape) => {
    const draggable = selectedShape === ShapeType.POINTER && !eraserOn;
    const shapeProps = {
      shape: shape,
      draggable: draggable,
      onDragEnd: (e) => handleDragEnd(e, shape),
      onClick: (e) => handleShapeClick(e),
      ...(shape.x !== undefined && { x: shape.x }), // Conditionally add x if it exists
      ...(shape.y !== undefined && { y: shape.y }), // Conditionally add y if it exists
    };

    switch (shape.type) {
      case ShapeType.FREEHAND:
        return <Freehand {...shapeProps} />;
      case ShapeType.LINE:
        return <LineDraw {...shapeProps} />;
      case ShapeType.RECTANGLE:
        return <Rectangle {...shapeProps} />;
      case ShapeType.SQUARE:
        return <Square {...shapeProps} />;
      case ShapeType.CIRCLE:
        return <CircleDraw {...shapeProps} />;
      case ShapeType.ELLIPSE:
        return <EllipseDraw {...shapeProps} />;
      case ShapeType.TRIANGLE:
        return <Triangle {...shapeProps} />;
      default:
        return null;
    }
  };



  return (
    <div className="canvas-container">
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        ref={stageRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <Layer>{dots}</Layer>
        <Layer>{shapes.map((shape, i) => renderShape(shape, i))}
          {/* Transformer */}

          {selectedNode && (
          <Transformer
            nodes={[selectedNode]}
          />
        )}
        </Layer>
      </Stage>
    </div>
  );
};

export default Canvas;
