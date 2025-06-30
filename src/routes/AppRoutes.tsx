import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminRoutes } from "./AdminRoutes";
import { PublicRoutes } from "./PublicRoutes";

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<PublicRoutes />} />
                <Route path="/admin/*" element={<AdminRoutes />} />
            </Routes>
        </BrowserRouter>
    );
};
