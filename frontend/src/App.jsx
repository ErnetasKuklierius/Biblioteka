import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login }from "./components/login";
import { Register } from "./components/register";
import { Authors } from "./pages/Authors";
import './App.css' 

export const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> <Link to="/authors">Authors</Link> <Link to="/login">Login</Link> <Link to="/register">Register</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}
