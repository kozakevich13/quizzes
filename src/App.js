import "./App.css";
import Finish from "./pages/Finish";
import Home from "./pages/Home";
import Play from "./pages/Play";
import Statistics from "./pages/Statistics";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/play" element={<Play />} />
        <Route path="/finish" element={<Finish />} />
        <Route path="/statistics" element={<Statistics />} />
      </Routes>
    </Router>
  );
}

export default App;
