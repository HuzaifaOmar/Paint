import React, { useState } from "react";
import { ChromePicker } from "react-color";

const ColorPicker = ({color,setColor,showPicker,setShowPicker}) => {

  const handleColorChange = (newColor) => {
    const { r, g, b, a } = newColor.rgb; // Get color with transparency
    const rgbaColor = `rgba(${r}, ${g}, ${b}, ${a})`;
    setColor(rgbaColor);
    console.log("Selected color:", rgbaColor);
  };

  return (
    <div>
      {/* Current color display */}
      <div
        style={{
          width: "20px",
          height: "15px",
          background: color,
          border: "1px solid #ccc",
          cursor: "pointer",
        }}
        onClick={() => setShowPicker(!showPicker)}
      ></div>

      {/* Color picker */}
      {showPicker && (
        <div style={{ position: "absolute", zIndex: 2 }}>
          <ChromePicker
            color={color}
            onChange={handleColorChange}
          />
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
