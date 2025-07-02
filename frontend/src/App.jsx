import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Homepage";
import Yoga from "./pages/Yoga";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Workout from "./pages/Workout";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/yoga" element={<Yoga />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/about" element={<About />} />
                <Route path="/workout" element={<Workout />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
