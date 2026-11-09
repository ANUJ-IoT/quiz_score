import Home from "./Home";
import Quiz from "./Quiz";
import Score from "./Score";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Quiz/:amount/:category/:difficulty" element={<Quiz />} />
        <Route path="/Score" element={<Score />} />
      </Routes>
    </>
  );
}

export default App;
