import React, { useState } from "react";
import "./../../styles/ToolBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEraser,
  faFillDrip,
  faRotateLeft,
  faRotateRight,
  faUpDownLeftRight,
  faRotate,
  faDownload,
  faUpload,
  faPaintBrush,
  faRulerHorizontal,
  faSquare,
  faCircle,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import EllipseIcon from "./icons/ellipse.jsx";
import TriangleIcon from "./icons/triangle.jsx";
import RectangleIcon from "./icons/rectangle.jsx";

const ToolBar = () => {
  const [selectedShape, setSelectedShape] = useState("freehand");
  const [firstColor, setFirstColor] = useState("#000000");
  const [secondColor, setSecondColor] = useState("#FFFFFF");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const shapes = [
    {
      id: "freehand",
      icon: faPaintBrush,
      type: "fontawesome",
      label: "Freehand",
    },
    { id: "line", icon: faRulerHorizontal, type: "fontawesome", label: "Line" },
    { id: "square", icon: faSquare, type: "fontawesome", label: "Square" },
    { id: "circle", icon: faCircle, type: "fontawesome", label: "Circle" },
    {
      id: "rectangle",
      icon: RectangleIcon,
      type: "custom",
      label: "Rectangle",
    },
    { id: "triangle", icon: TriangleIcon, type: "custom", label: "Triangle" },
    { id: "ellipse", icon: EllipseIcon, type: "custom", label: "Ellipse" },
  ];

  const handleShapeSelection = (shapeId) => {
    setSelectedShape(shapeId);
    setIsDropdownOpen(false);
  };

  const renderIcon = (shape) => {
    if (shape.type === "fontawesome") {
      return <FontAwesomeIcon icon={shape.icon} />;
    } else if (shape.type === "custom") {
      const IconComponent = shape.icon;
      return <IconComponent />;
    }
    return null;
  };

  const getSelectedShapeIcon = () => {
    const shape = shapes.find((s) => s.id === selectedShape);
    if (!shape) return <FontAwesomeIcon icon={faPaintBrush} />;
    return renderIcon(shape);
  };

  return (
    <div className="toolbar">
      {/* Custom Dropdown for Shape Selection */}
      <div
        className="toolbar-dropdown-container"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <div className="toolbar-dropdown-selected">
          {getSelectedShapeIcon()}
        </div>
        <FontAwesomeIcon
          icon={faCaretDown}
          className="toolbar-dropdown-toggle"
        />
        {isDropdownOpen && (
          <ul className="toolbar-dropdown-list">
            {shapes.map((shape) => (
              <li
                key={shape.id}
                className="toolbar-dropdown-item"
                onClick={() => handleShapeSelection(shape.id)}
              >
                {renderIcon(shape)}
                <span>{shape.label}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Buttons with hoverable labels */}
      <div className="toolbar-button-container">
        <div
          className="toolbar-button"
          onClick={() => alert("Eraser clicked")}
          title="Eraser"
        >
          <FontAwesomeIcon icon={faEraser} />
        </div>
        <div className="toolbar-label">Eraser</div>
      </div>

      <input
        type="color"
        className="toolbar-color-input"
        value={firstColor}
        onChange={(e) => setFirstColor(e.target.value)}
        title="First Color"
      />

      <input
        type="color"
        className="toolbar-color-input"
        value={secondColor}
        onChange={(e) => setSecondColor(e.target.value)}
        title="Second Color"
      />

      <div className="spacer"></div>

      <div className="toolbar-button-container">
        <div
          className="toolbar-button"
          onClick={() => alert("Fill color set to: " + secondColor)}
          title="Fill Color"
        >
          <FontAwesomeIcon icon={faFillDrip} />
        </div>
        <div className="toolbar-label">Fill Color</div>
      </div>

      <div className="toolbar-button-container">
        <div
          className="toolbar-button"
          onClick={() => alert("Move action")}
          title="Move"
        >
          <FontAwesomeIcon icon={faUpDownLeftRight} />
        </div>
        <div className="toolbar-label">Move</div>
      </div>

      <div className="toolbar-button-container">
        <div
          className="toolbar-button"
          onClick={() => alert("Rotate action")}
          title="Rotate"
        >
          <FontAwesomeIcon icon={faRotate} />
        </div>
        <div className="toolbar-label">Rotate</div>
      </div>

      <div className="toolbar-button-container">
        <div
          className="toolbar-button"
          onClick={() => alert("Undo action")}
          title="Undo"
        >
          <FontAwesomeIcon icon={faRotateLeft} />
        </div>
        <div className="toolbar-label">Undo</div>
      </div>

      <div className="toolbar-button-container">
        <div
          className="toolbar-button"
          onClick={() => alert("Redo action")}
          title="Redo"
        >
          <FontAwesomeIcon icon={faRotateRight} />
        </div>
        <div className="toolbar-label">Redo</div>
      </div>

      <div className="toolbar-button-container">
        <div
          className="toolbar-button"
          onClick={() => alert("Save action")}
          title="Save"
        >
          <FontAwesomeIcon icon={faDownload} />
        </div>
        <div className="toolbar-label">Save</div>
      </div>

      <div className="toolbar-button-container">
        <div
          className="toolbar-button"
          onClick={() => alert("Load action")}
          title="Load"
        >
          <FontAwesomeIcon icon={faUpload} />
        </div>
        <div className="toolbar-label">Load</div>
      </div>
    </div>
  );
};

export default ToolBar;
