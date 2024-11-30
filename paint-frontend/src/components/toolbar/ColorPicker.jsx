import { ChromePicker } from "react-color";

const ColorPicker = ({color,setColor,showPicker,setShowPicker,setOtherPicker,title}) => {

  const handleColorChange = (newColor) => {
    const { r, g, b, a } = newColor.rgb;
    const rgbaColor = `rgba(${r}, ${g}, ${b}, ${a})`;
    setColor(rgbaColor);
    console.log("Selected color:", rgbaColor);
  };
  

  return (
    <div>
      {/* Current color display */}
      <div
      title={title}
        style={{
          width: "25px",
          height: "25px",
          margin:"0 10px",
          borderRadius:"50%",
          background: color,
          border: "1px solid #ccc",
          cursor: "pointer",
        }}
        onClick={() => {setShowPicker(!showPicker)
          setOtherPicker(false)
        }
        }
      ></div>

      {/* Color picker */}
      {showPicker && (
        <div style={{ position: "absolute", zIndex: 2 }}>
          <ChromePicker
            color={color}
            onChangeComplete={handleColorChange}
          />
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
