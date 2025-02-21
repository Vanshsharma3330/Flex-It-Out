import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Homepage";
import Yoga from "./pages/Yoga";
import Workout from "./pages/Workout";

function App() {
    return (
        <>
            <Toaster position="top-right" />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/yoga" element={<Yoga />} />
                    <Route path="/workout" element={<Workout />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
