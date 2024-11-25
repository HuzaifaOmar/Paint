import React from "react";

const ToolbarButton = ({ icon, onClick, title, label }) => {
  return (
    <div className="toolbar-button-container">
      <div className="toolbar-button" onClick={onClick} title={title}>
        {React.isValidElement(icon) ? icon : null}
      </div>
      {label && <div className="toolbar-label">{label}</div>}
    </div>
  );
};

export default ToolbarButton;
