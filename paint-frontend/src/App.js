import "./App.css";
import Canvas from "./components/Canvas";
import ToolBar from "./components/ToolBar";
import "./styles/main.css";

function App() {
  return (
    <div className="main-screen">
      <ToolBar />
      <Canvas />
    </div>
  );
}

export default App;
