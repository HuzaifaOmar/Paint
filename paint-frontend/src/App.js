import React, { useRef, useState } from "react";
import { Stage, Layer, Line, Rect, Circle, RegularPolygon } from "react-konva";
import ReactDOM from "react-dom/client";

const App = () => {
  const [lines, setLines] = useState([]);
  const [shapes, setShapes] = useState([]); // Array to store the drawn shapes
  const [color, setColor] = useState("#000000");
  const [lineWidth, setLineWidth] = useState(2);
  const [shapeType, setShapeType] = useState("line"); // Shape type: "line", "rect", "circle", "triangle"

  const isDrawing = useRef(false);
  const stageRef = useRef();
  const startX = useRef(0); // Starting X position for drawing
  const startY = useRef(0); // Starting Y position for drawing

  const handleMouseDown = () => {
    isDrawing.current = true;
    const pos = stageRef.current.getPointerPosition();
    startX.current = pos.x;
    startY.current = pos.y;

    if (shapeType === "line") {
      setLines([
        ...lines,
        {
          points: [startX.current, startY.current, pos.x, pos.y],
          color,
          lineWidth,
        },
      ]);
    } else {
      // Create a new shape (rectangle, circle, or triangle)
      setShapes([
        ...shapes,
        {
          type: shapeType,
          x: pos.x,
          y: pos.y,
          color,
          lineWidth,
          // For triangle, we will define the initial points
          points: shapeType === "triangle" ? [0, -50, 50, 50, -50, 50] : [],
        },
      ]);
    }
  };

  const handleMouseMove = () => {
    if (!isDrawing.current) return;

    const pos = stageRef.current.getPointerPosition();

    if (shapeType === "line") {
      const newLines = [...lines];
      const lastLine = newLines[newLines.length - 1];
      lastLine.points = [startX.current, startY.current, pos.x, pos.y];
      setLines(newLines);
    } else {
      // Update the position or size of the shape
      const newShapes = [...shapes];
      const lastShape = newShapes[newShapes.length - 1];
      if (shapeType === "rect") {
        lastShape.width = pos.x - lastShape.x;
        lastShape.height = pos.y - lastShape.y;
      } else if (shapeType === "circle") {
        lastShape.radius = Math.sqrt(
          Math.pow(pos.x - lastShape.x, 2) + Math.pow(pos.y - lastShape.y, 2)
        );
      } else if (shapeType === "triangle") {
        // For triangle, we just move it for now
        lastShape.points = [
          lastShape.x,
          lastShape.y - 50,
          lastShape.x + 50,
          lastShape.y + 50,
          lastShape.x - 50,
          lastShape.y + 50,
        ];
      }
      setShapes(newShapes);
    }
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const saveCanvas = () => {
    const json = JSON.stringify({ lines, shapes });
    const blob = new Blob([json], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "drawing.json";
    link.click();
  };

  return (
    <div className="app">
      <div className="toolbar">
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <input
          type="range"
          min="1"
          max="10"
          value={lineWidth}
          onChange={(e) => setLineWidth(Number(e.target.value))}
        />
        <select
          onChange={(e) => setShapeType(e.target.value)}
          value={shapeType}
        >
          <option value="line">Line</option>
          <option value="rect">Rectangle</option>
          <option value="circle">Circle</option>
          <option value="triangle">Triangle</option>
        </select>
        <button onClick={saveCanvas}>Save</button>
      </div>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        ref={stageRef}
      >
        <Layer>
          {/* Render Lines */}
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke={line.color}
              strokeWidth={line.lineWidth}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
            />
          ))}
          {/* Render Shapes */}
          {shapes.map((shape, i) => {
            if (shape.type === "rect") {
              return (
                <Rect
                  key={i}
                  x={shape.x}
                  y={shape.y}
                  width={shape.width}
                  height={shape.height}
                  stroke={shape.color}
                  strokeWidth={shape.lineWidth}
                />
              );
            } else if (shape.type === "circle") {
              return (
                <Circle
                  key={i}
                  x={shape.x}
                  y={shape.y}
                  radius={shape.radius}
                  stroke={shape.color}
                  strokeWidth={shape.lineWidth}
                />
              );
            } else if (shape.type === "triangle") {
              return (
                <RegularPolygon
                  key={i}
                  x={shape.x}
                  y={shape.y}
                  sides={3} // Number of sides for the triangle
                  radius={50} // Radius of the triangle
                  fill={shape.color}
                  stroke={shape.color}
                  strokeWidth={shape.lineWidth}
                />
              );
            }
            return null;
          })}
        </Layer>
      </Stage>
    </div>
  );
};

// Add some basic styling
const styles = `
.app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.toolbar {
  display: flex;
  align-items: center;
  background-color: #f0f0f0;
  padding: 10px;
  gap: 10px;
}

button {
  padding: 5px 10px;
  cursor: pointer;
}
`;

// Inject styles into the document head
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

// Correct usage of ReactDOM.createRoot
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error(
    'Root element not found. Make sure you have a <div id="root"></div> in your index.html.'
  );
}
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
