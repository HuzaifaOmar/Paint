import "../styles/ToolBar.css";
function ToolBar() {
  return (
    <div className="tool-bar">
      <div className="shape">
        <button>Choose Shape</button>
      </div>
      <div className="pen"></div>
      <div className="save"></div>
      <div className="load"></div>
    </div>
  );
}
export default ToolBar;
