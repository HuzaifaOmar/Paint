import React, { useRef, useEffect, useState } from "react";
import { Line, Stage, Layer } from "react-konva";
import axios from "axios";
import Freehand from "./shapes/Freehand.jsx";
import Rectangle from "./shapes/Rectangle.jsx";
import Square from "./shapes/Square.jsx";
import Triangle from "./shapes/Triangle.jsx";
import LineDraw from "./shapes/Line.jsx";
import EllipseDraw from "./shapes/Ellipse.jsx";
import CircleDraw from "./shapes/Circle.jsx";

const API_BASE_URL = "http://localhost:8080/api/shapes";

const Canvas = ({ selectedShape, fillColor, strokeColor, lineWidth,eraserOn }) => {
  const stageRef = useRef();
  const [dots, setDots] = useState([]);
  const [shapes, setShapes] = useState([]);
  const isDrawing = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const currentShapeId = useRef(null);



  const handleMouseDown = async () => {
    if (selectedShape === "pointer"||eraserOn) return;
    console.log("1")
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
          fillColor: ((selectedShape === "line" || selectedShape === "freehand") ? fillColor : fillColor + "6F"),
          strokeColor: ((selectedShape === "line" || selectedShape === "freehand") ? strokeColor : strokeColor + "6F"),
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
    if (!isDrawing.current || !currentShapeId.current || selectedShape === "pointer"||eraserOn) return;
    console.log("2")
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
      console.log(response.data);

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
    if (!currentShapeId.current || selectedShape === "pointer"||eraserOn) return;
    console.log("3")
    try {
      const finalizeRequest = {
        fillColor: fillColor,
        strokeColor: strokeColor
      };
      let tempId = currentShapeId.current;
      const response = await axios.put(
        `${API_BASE_URL}/${currentShapeId.current}/finalize`,
        finalizeRequest
      );

      setShapes((prevShapes) => {
        const newShapes = [...prevShapes];

        const shapeIndex = newShapes.findIndex(
          (s) => s.shapeId === tempId
        );
        console.log(shapes);
        
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
    if(eraserOn)return
    console.log("4")
    const pos = e.target.position();
    try {
      const moveRequest = {
        xStart: pos.x,
        yStart: pos.y,
      };
      console.log("moveRequest json", JSON.stringify(moveRequest));
      const response = await axios.put(
        `${API_BASE_URL}/${shape.shapeId}/move`,
        moveRequest
      );
      console.log("api response data", response.data);
      
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
      console.error("Error updating shape position:", error);
    }
  };

  const handleShapeClick = async(e) => {
    console.log(e.target);
    if(eraserOn){
      setShapes(shapes.filter((s) => s.shapeId !== shapes[e.target.index].shapeId))
      await axios.delete(
        `${API_BASE_URL}/${shapes[e.target.index].shapeId}/erase`);
    }
  };

  const renderShape = (shape) => {
    const draggable = (selectedShape === "pointer"&&!eraserOn);
    const shapeProps = {
      key: shape.shapeId,
      shape: shape,
      draggable: (draggable),
      onDragEnd: (e) => handleDragEnd(e, shape),
      onClick:(e)=>handleShapeClick(e)
    };

    switch (shape.type) {
      case "freehand":
        return <Freehand {...shapeProps} />;
      case "line":
        return <LineDraw {...shapeProps} />;
      case "rectangle":
        return <Rectangle {...shapeProps} />;
      case "square":
        return <Square {...shapeProps} />;
      case "circle":
        return <CircleDraw {...shapeProps} />;
      case "ellipse":
        return <EllipseDraw {...shapeProps} />;
      case "triangle":
        return <Triangle {...shapeProps} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const stageWidth = window.innerWidth;
    const stageHeight = window.innerHeight;

    const dotSpacing = 50;
    const dotRadius = 1.5;

    const dottedPattern = [];

    for (let x = 7; x < stageWidth; x += dotSpacing) {
      for (let y = 7; y < stageHeight; y += dotSpacing) {
        dottedPattern.push([x, y]);
      }
    }

    const newDots = dottedPattern.map((coord, index) => (
      <Line
        key={`dot-${index}`}
        points={[coord[0], coord[1], coord[0] + dotRadius, coord[1]]}
        stroke="gray"
        strokeWidth={1.5}
      />
    ));

    setDots(newDots);
  }, []);

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
        <Layer>{shapes.map((shape, i) => renderShape(shape, i))}</Layer>
      </Stage>
    </div>
  );
};

export default Canvas;
