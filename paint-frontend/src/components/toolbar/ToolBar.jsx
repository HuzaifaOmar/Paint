import React, { useState } from "react";
import "./../../styles/ToolBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEraser,
  faRotateLeft,
  faRotateRight,
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

const Toolbar = ({ selectedTool, setSelectedTool, primaryColor, setPrimaryColor, secondaryColor, setSecondaryColor, lineWidth, setLineWidth }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLineWidthDropdownOpen, setIsLineWidthDropdownOpen] = useState(false);

  const tools = [
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

  const handleToolSelection = (toolId) => {
    setSelectedTool(toolId);
    setIsDropdownOpen(false);
  };

  const renderIcon = (tool) => {
    if (tool.type === "fontawesome") {
      return <FontAwesomeIcon icon={tool.icon} />;
    } else if (tool.type === "custom") {
      const IconComponent = tool.icon;
      return <IconComponent />;
    }
    return null;
  };

  const getSelectedToolIcon = () => {
    const tool = tools.find((t) => t.id === selectedTool);
    if (!tool) return <FontAwesomeIcon icon={faPaintBrush} />;
    return renderIcon(tool);
  };

  const handleLineWidthSelection = (width) => {
    setLineWidth(width);
    setIsLineWidthDropdownOpen(false);
  };

  return (
    <div className="toolbar">
      {/* Custom Dropdown for Tool Selection */}
      <div
        className="toolbar-dropdown-container"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <div className="toolbar-dropdown-selected">{getSelectedToolIcon()}</div>
        <FontAwesomeIcon
          icon={faCaretDown}
          className="toolbar-dropdown-toggle"
        />
        {isDropdownOpen && (
          <ul className="toolbar-dropdown-list">
            {tools.map((tool) => (
              <li
                key={tool.id}
                className="toolbar-dropdown-item"
                onClick={() => handleToolSelection(tool.id)}
              >
                {renderIcon(tool)}
                <span>{tool.label}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Dropdown for Line Width Selection */}
      <div
        className="toolbar-dropdown-container"
        onClick={() => setIsLineWidthDropdownOpen(!isLineWidthDropdownOpen)}
      >
        <div className="toolbar-dropdown-selected">{lineWidth}</div>
        <FontAwesomeIcon
          icon={faCaretDown}
          className="toolbar-dropdown-toggle"
        />
        {isLineWidthDropdownOpen && (
          <ul className="toolbar-dropdown-list">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((width) => (
              <li
                key={width}
                className="toolbar-dropdown-item"
                onClick={() => handleLineWidthSelection(width)}
              >
                {width}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Buttons with hoverable labels */}
      <div className="toolbar-button-container">
        <div
          className="toolbar-button"
          onClick={() => console.log("Eraser clicked")}
          title="Eraser"
        >
          <FontAwesomeIcon icon={faEraser} />
        </div>
        <div className="toolbar-label">Eraser</div>
      </div>

      <input
        type="color"
        className="toolbar-color-input"
        value={primaryColor}
        onChange={(e) => setPrimaryColor(e.target.value)}
        title="First Color"
      />

      <input
        type="color"
        className="toolbar-color-input"
        value={secondaryColor}
        onChange={(e) => setSecondaryColor(e.target.value)}
        title="Second Color"
      />

      <div className="spacer"></div>

      <div className="toolbar-button-container">
        <div
          className="toolbar-button"
          onClick={() => console.log("Undo action")}
          title="Undo"
        >
          <FontAwesomeIcon icon={faRotateLeft} />
        </div>
        <div className="toolbar-label">Undo</div>
      </div>

      <div className="toolbar-button-container">
        <div
          className="toolbar-button"
          onClick={() => console.log("Redo action")}
          title="Redo"
        >
          <FontAwesomeIcon icon={faRotateRight} />
        </div>
        <div className="toolbar-label">Redo</div>
      </div>

      <div className="toolbar-button-container">
        <div
          className="toolbar-button"
          onClick={() => console.log("Save action")}
          title="Save"
        >
          <FontAwesomeIcon icon={faDownload} />
        </div>
        <div className="toolbar-label">Save</div>
      </div>

      <div className="toolbar-button-container">
        <div
          className="toolbar-button"
          onClick={() => console.log("Load action")}
          title="Load"
        >
          <FontAwesomeIcon icon={faUpload} />
        </div>
        <div className="toolbar-label">Load</div>
      </div>
    </div>
  );
};

export default Toolbar;
