import React, { useState } from "react";
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
    faCopy, // Import the copy icon
} from "@fortawesome/free-solid-svg-icons";
import EllipseIcon from "./icons/ellipse.jsx";
import TriangleIcon from "./icons/triangle.jsx";
import RectangleIcon from "./icons/rectangle.jsx";
import ToolbarButton from "./ToolbarButton";
import "../../styles/Toolbar.css";
const Toolbar = ({
  selectedTool,
  setSelectedTool,
  fillColor,
  setFillColor,
  strokeColor,
  setStrokeColor,
  lineWidth,
  setLineWidth,
  eraserOn,
  setEraserOn,
  setIsPopupOpen,
  copyTool,
  setCopyTool,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLineWidthDropdownOpen, setIsLineWidthDropdownOpen] = useState(false);
  const [isToolbarHidden, setIsToolbarHidden] = useState(false);
  const [showFillColorPicker,setShowFillColorPicker]=useState(false);
  const [showStrokeColorPicker,setShowStrokeColorPicker]=useState(false);

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
        setEraserOn(!eraserOn);
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

  const handleCopy = () =>{
    console.log("xx");
    
    setCopyTool(true);
}

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
                <div
                    className="toolbar-dropdown-container"
                    onClick={() => {
                        setIsLineWidthDropdownOpen(!isLineWidthDropdownOpen);
                        setIsDropdownOpen(false);
                    }}
                >
                    <div className="toolbar-dropdown-selected">
                        <span
                            style={{ fontSize: lineWidth + 7, display: "flex" }}
                        >
                            <FontAwesomeIcon icon={faCircle} />
                        </span>
                    </div>
                    <FontAwesomeIcon
                        icon={faCaretDown}
                        className="toolbar-dropdown-toggle"
                    />
                    {isLineWidthDropdownOpen && (
                        <ul className="toolbar-dropdown-list">
                            {[2, 3, 5, 7, 9].map((width) => (
                                <li
                                    key={width}
                                    className="toolbar-dropdown-item"
                                    onClick={() =>
                                        handleLineWidthSelection(width)
                                    }
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
          clicked={eraserOn}
        />
        {/* <input
          type="color"
          className="toolbar-color-input"
          value={fillColor}
          onChange={(e) => setFillColor(e.target.value)}
          onBlur={handleFillColorBlur} 
          title="Fill Color"
        /> */}
        
        {/* <input
          type="color"
          className="toolbar-color-input"
          value={strokeColor}
          onChange={(e) => setStrokeColor(e.target.value)}
          onBlur
          title="Stroke Color"
        /> */}

        <ColorPicker 
            color={fillColor} 
            setColor={setFillColor}
            showPicker={showFillColorPicker}
            setShowPicker={setShowFillColorPicker}
            setOtherPicker={setShowStrokeColorPicker}
            />

        <ColorPicker
            color={strokeColor} 
            setColor={setStrokeColor}
            showPicker={showStrokeColorPicker} 
            setShowPicker={setShowStrokeColorPicker}
            setOtherPicker={setShowFillColorPicker}
            />

        <ToolbarButton
          icon={<FontAwesomeIcon icon={faRotateLeft} />}
          onClick={() => console.log("Undo action")}
          title="Undo"
          label="Undo"
        />
        <ToolbarButton
          icon={<FontAwesomeIcon icon={faRotateRight} />}
          onClick={() => console.log("Redo action")}
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
          onClick={() => console.log("Load action")}
          title="Load"
          label="Load"
        />
        <ToolbarButton
          icon={<FontAwesomeIcon icon={faCopy} />}
          onClick={() =>handleCopy()}
          title="Copy"
          label="Copy"
        />
      </div>

            {/* Hide/Show Button */}
            <button
                className={`toolbar-toggle ${isToolbarHidden ? "hidden" : ""}`}
                style={{display:(showFillColorPicker||showStrokeColorPicker)?"none":"flex"}}
                onClick={() => {
                    setIsToolbarHidden(!isToolbarHidden);
                    setIsLineWidthDropdownOpen(false);
                    setIsDropdownOpen(false);
                }}
            >
                <FontAwesomeIcon
                    icon={isToolbarHidden ? faCaretDown : faCaretUp}
                />
            </button>
        </>
    );
};

export default Toolbar;


