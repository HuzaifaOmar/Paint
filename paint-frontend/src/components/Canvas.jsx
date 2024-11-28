import React, { useRef, useState } from "react";
import { Stage, Layer, Transformer } from "react-konva";
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
  selectedTool,
  fillColor,
  strokeColor,
  lineWidth,
  eraserOn,
  setFillColor,
  setStrokeColor,
  setLineWidth
}) => {
  const stageRef = useRef();
  const [dots] = useState(() =>
    generateDottedBackground(window.innerWidth, window.innerHeight)
  );
  const [shapes, setShapes] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const isDrawing = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const currentShapeId = useRef(null);
  const [selectedShap,setSelectedShape]=useState(null)

  const handleMouseDown = async (e) => {
    if (eraserOn) return;
    else if (selectedShape === ShapeType.POINTER) {

      if (e.target === stageRef.current) {
        setSelectedNode(null);
        setSelectedShape(null)
      }
      return;
    }
    console.log("in handleMouseDown fun");
    const pos = stageRef.current.getPointerPosition();
    startX.current = pos.x;
    startY.current = pos.y;
    isDrawing.current = true;

    try {
      const shapeRequest = {
        shapeType: selectedTool,
        attributes: {
          xStart: pos.x,
          yStart: pos.y,
          fillColor: [ShapeType.LINE, ShapeType.FREEHAND].includes(
            selectedTool
          )
            ? fillColor
            : fillColor + "6F",
          strokeColor: [ShapeType.LINE, ShapeType.FREEHAND].includes(
            selectedTool
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
          type: selectedTool,
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
      selectedTool === ShapeType.POINTER ||
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
      selectedTool === ShapeType.POINTER ||
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
  const handleTransformEnd = async (e, shape) => {
    console.log("in handleTransformEnd fun");
    console.log("e", e);
    const attr = e.target.attrs;
    console.log("shape", shape);
    try {
      const transformRequest = {
        x: attr.x,
        y: attr.y,
        scaleX: attr.scaleX,
        scaleY: attr.scaleY,
        rotation: attr.rotation,
      };
      const response = await axios.put(
        `${API_BASE_URL}/${shape.shapeId}/transform`,
        transformRequest
      );
      console.log("transform response", response.data);
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
        }
        return newShapes;
      });
    } catch (error) {
      console.error("Error transforming shape: ", error);
    }
  };

  const handleShapeClick = async (e) => {
    if (eraserOn) {
      setSelectedNode(null);
      setShapes(
        shapes.filter((s) => s.shapeId !== shapes[e.target.index].shapeId)
      );
      await axios.delete(
        `${API_BASE_URL}/${shapes[e.target.index].shapeId}/erase`
      );
    } else if (selectedShape === ShapeType.POINTER) {
      setSelectedNode(e.target);
      setFillColor(shapes[e.target.index].fill)
      setStrokeColor(shapes[e.target.index].stroke)
      setLineWidth(shapes[e.target.index].strokeWidth)
      setSelectedShape(shapes[e.target.index])
    }
  };
  useEffect(()=>{
    if(selectedShap!==null){
      console.log(fillColor);
      console.log(selectedShap)
      selectedShap.fill=fillColor
      selectedShap.stroke=strokeColor
      selectedShap.strokeWidth=lineWidth
    }
  },[fillColor,strokeColor,lineWidth,selectedShap])  

  const renderShape = (shape) => {
    const draggable = selectedTool === ShapeType.POINTER && !eraserOn;
    const shapeProps = {
      shape: shape,
      draggable: draggable,
      onDragEnd: (e) => handleDragEnd(e, shape),
      onClick: (e) => handleShapeClick(e),
      ...(shape.x !== undefined && { x: shape.x }), // Conditionally add x if it exists
      ...(shape.y !== undefined && { y: shape.y }), // Conditionally add y if it exists
      onTransformEnd: (e) => handleTransformEnd(e, shape),
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
        <Layer>
          {shapes.map((shape, i) => renderShape(shape, i))}
          {/* Transformer */}

          {selectedNode && <Transformer nodes={[selectedNode]} />}
        </Layer>
      </Stage>
    </div>
  );
};

export default Canvas;
