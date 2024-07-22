import { Routes, Route } from "react-router-dom";
import App from "./App"
import InputPicture from "./input"


export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/input" element={<InputPicture />} />
        </Routes>
    )
}

export default AppRoutes;