import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Homepage";
import Yoga from "./pages/Yoga";
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/yoga" element={<Yoga />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
