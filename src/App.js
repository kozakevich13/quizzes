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
        <Route exact path="/quizzes/" element={<Home />} />
        <Route path="/quizzes/play" element={<Play />} />
        <Route path="/quizzes/finish" element={<Finish />} />
        <Route path="/quizzes/statistics" element={<Statistics />} />
      </Routes>
    </Router>
  );
}

export default App;
