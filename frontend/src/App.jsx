import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Homepage";
import Yoga from "./pages/Yoga";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/yoga" element={<Yoga />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
