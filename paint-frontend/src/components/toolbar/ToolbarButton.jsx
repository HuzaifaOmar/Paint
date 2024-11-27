import React from "react";

const ToolbarButton = ({ icon, onClick, title, label,clicked }) => {
  return (
    <div className={`toolbar-button-container`}>
      <div className={`toolbar-button ${clicked?"clicked":""}`} onClick={onClick} title={title}>
        {React.isValidElement(icon) ? icon : null}
      </div>
      {label && <div className={`toolbar-label ${clicked?"clicked":""}`}>{label}</div>}
    </div>
  );
};

export default ToolbarButton;
