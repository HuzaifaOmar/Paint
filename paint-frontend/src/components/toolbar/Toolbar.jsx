import React, { useState } from "react";
import { useDrawingContext } from "../../contexts/DrawingContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ColorPicker from "./ColorPicker.jsx";
import {
  faCaretUp,
  faCaretDown,
  faEraser,
  faRotateLeft,
  faRotateRight,
  faDownload,
  faUpload,
  faPaintBrush,
  faRulerHorizontal,
  faSquare,
  faCircle,
  faArrowPointer,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";
import EllipseIcon from "./icons/ellipse.jsx";
import TriangleIcon from "./icons/triangle.jsx";
import RectangleIcon from "./icons/rectangle.jsx";
import ToolbarButton from "./ToolbarButton";
import "../../styles/Toolbar.css";
import ShapeService from "../../services/ShapeService.js";
const Toolbar = () => {
  const {
    selectedTool,
    setSelectedTool,
    fillColor,
    setFillColor,
    strokeColor,
    setStrokeColor,
    lineWidth,
    setLineWidth,
    isEraserActive,
    setIsEraserActive,
    setIsPopupOpen,
    isLoadPopupOpen,
    setIsLoadPopupOpen,
    setIsDuplicateToolActive,
    setUndoRequest,
    setRedoRequest,
  } = useDrawingContext();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLineWidthDropdownOpen, setIsLineWidthDropdownOpen] = useState(false);
  const [isToolbarHidden, setIsToolbarHidden] = useState(false);
  const [showFillColorPicker, setShowFillColorPicker] = useState(false);
  const [showStrokeColorPicker, setShowStrokeColorPicker] = useState(false);

  const tools = [
    { id: "pointer", icon: faArrowPointer, label: "Pointer" },
    { id: "freehand", icon: faPaintBrush, label: "Freehand" },
    { id: "line", icon: faRulerHorizontal, label: "Line" },
    { id: "square", icon: faSquare, label: "Square" },
    { id: "circle", icon: faCircle, label: "Circle" },
    { id: "rectangle", icon: RectangleIcon, label: "Rectangle" },
    { id: "triangle", icon: TriangleIcon, label: "Triangle" },
    { id: "ellipse", icon: EllipseIcon, label: "Ellipse" },
  ];

  const renderIcon = (tool) => {
    if (tool.icon instanceof Function) {
      const IconComponent = tool.icon;
      return <IconComponent />;
    }
    return <FontAwesomeIcon icon={tool.icon} />;
  };

  const handleSave = async () => {
    try {
      console.log("Saving...");
      setIsPopupOpen(true);
    } catch (error) {
      console.error("Error saving shapes:", error);
      alert("Failed to save shapes. Please try again.");
    }
  };

  const toggleEraser = () => {
    setIsEraserActive(!isEraserActive);
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

  const handleDuplicate = () => {
    setIsDuplicateToolActive(true);
  };

  const handleUndo = async () => {
    const response = await ShapeService.undo();
    if (response.success === false) {
      return;
    } else {
      setUndoRequest(response);
    }
  };

  const handleRedo = async () => {
    const response = await ShapeService.redo();
    if (response.success === false) {
      return;
    } else {
      setRedoRequest(response);
    }
  };

  const handleLoad = () => {
    setIsLoadPopupOpen(true);
  };

  return (
    <>
      <div className={`toolbar ${isToolbarHidden ? "hidden" : ""}`}>
        {/* Tool Selection Dropdown */}
        <div
          className="toolbar-dropdown-container"
          onClick={() => {
            setIsDropdownOpen(!isDropdownOpen);
            setIsLineWidthDropdownOpen(false);
          }}
        >
          <div className="toolbar-dropdown-selected">
            {getSelectedToolIcon()}
          </div>
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
                  onClick={() => {
                    setSelectedTool(tool.id);
                    setIsDropdownOpen(false);
                  }}
                >
                  {renderIcon(tool)}
                  <span>{tool.label}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <ColorPicker
          title="Fill Color"
          color={fillColor}
          setColor={setFillColor}
          showPicker={showFillColorPicker}
          setShowPicker={setShowFillColorPicker}
          setOtherPicker={setShowStrokeColorPicker}
        />

        <ColorPicker
          title="Stroke Color"
          color={strokeColor}
          setColor={setStrokeColor}
          showPicker={showStrokeColorPicker}
          setShowPicker={setShowStrokeColorPicker}
          setOtherPicker={setShowFillColorPicker}
        />
        <div
          className="toolbar-dropdown-container"
          onClick={() => {
            setIsLineWidthDropdownOpen(!isLineWidthDropdownOpen);
            setIsDropdownOpen(false);
          }}
        >
          <div className="toolbar-dropdown-selected">
            <span
              style={{
                fontSize: lineWidth + 7,
                display: lineWidth !== 0 ? "flex" : "none",
              }}
            >
              <FontAwesomeIcon icon={faCircle} />
            </span>
            <span
              style={{
                fontSize: 10,
                fontWeight: "bold",
                display: lineWidth === 0 ? "flex" : "none",
              }}
            >
              None
            </span>
          </div>
          <FontAwesomeIcon
            icon={faCaretDown}
            className="toolbar-dropdown-toggle"
          />
          {isLineWidthDropdownOpen && (
            <ul className="toolbar-dropdown-list">
              <li
                key={0}
                className="toolbar-dropdown-item"
                onClick={() => handleLineWidthSelection(0)}
                style={{
                  display:
                    selectedTool === "line" || selectedTool === "freehand"
                      ? "none"
                      : "block",
                  fontSize: 10,
                  justifyContent: "center",
                }}
              >
                None
              </li>
              {[2, 3, 5, 7, 9].map((width) => (
                <li
                  key={width}
                  className="toolbar-dropdown-item"
                  onClick={() => handleLineWidthSelection(width)}
                  style={{
                    fontSize: width + 7,
                    justifyContent: "center",
                  }}
                >
                  <FontAwesomeIcon icon={faCircle} />
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Buttons */}
        <ToolbarButton
          icon={<FontAwesomeIcon icon={faEraser} />}
          onClick={toggleEraser}
          title="Eraser"
          label="Eraser"
          clicked={isEraserActive}
        />

        <ToolbarButton
          icon={<FontAwesomeIcon icon={faCopy} />}
          onClick={() => handleDuplicate()}
          title="Duplicate"
          label="Duplicate"
        />

        <ToolbarButton
          icon={<FontAwesomeIcon icon={faRotateLeft} />}
          onClick={() => handleUndo()}
          title="Undo"
          label="Undo"
        />
        <ToolbarButton
          icon={<FontAwesomeIcon icon={faRotateRight} />}
          onClick={() => handleRedo()}
          title="Redo"
          label="Redo"
        />
        <ToolbarButton
          icon={<FontAwesomeIcon icon={faDownload} />}
          onClick={() => handleSave()}
          title="Save"
          label="Save"
        />
        <ToolbarButton
          icon={<FontAwesomeIcon icon={faUpload} />}
          onClick={() => handleLoad()}
          title="Load"
          label="Load"
        />
      </div>

      {/* Hide/Show Button */}
      <button
        className={`toolbar-toggle ${isToolbarHidden ? "hidden" : ""}`}
        style={{
          display:
            showFillColorPicker || showStrokeColorPicker ? "none" : "flex",
        }}
        onClick={() => {
          setIsToolbarHidden(!isToolbarHidden);
          setIsLineWidthDropdownOpen(false);
          setIsDropdownOpen(false);
        }}
      >
        <FontAwesomeIcon icon={isToolbarHidden ? faCaretDown : faCaretUp} />
      </button>
    </>
  );
};

export default Toolbar;
