import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import NoteState from "./context/notes/NoteState";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/About";

function App() {
  return (
    <Router>
      <>
        <NoteState>
          <Navbar />
          <div className="container">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/about" element={<About />}></Route>
          </Routes>
          </div>
        </NoteState>
      </>
    </Router>
  );
}

export default App;
