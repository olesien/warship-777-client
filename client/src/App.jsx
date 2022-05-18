import Startpage from "./pages/Startpage";
import Game from "./pages/Game";
import { Routes, Route } from "react-router";
import "./App.css";
import Grid from "./components/Grid";

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Startpage />} />
                <Route path="/game" element={<Game />} />
            </Routes>
        </>
    );
};

export default App;
