import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import NoteState from "./context/notes/NoteState";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/About";
import Login from "./components/Login";   
import Signup from "./components/Signup";

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
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
          </Routes>
          </div>
        </NoteState>
      </>
    </Router>
  );
}

export default App;
