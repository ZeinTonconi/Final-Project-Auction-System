import { Routes, Route, Outlet } from "react-router-dom";
import AdminDashboardPage from "../pages/DashboardPage.tsx";
import {RolesGuard} from "../guards/RolesGuard.tsx";
import {Layout} from "../layout/Layout.tsx";
import ProductManagementPage from "../pages/admin/ProductManagementPage.tsx";
import UserManagementPage from "../pages/admin/UserManagementPage.tsx";
import AuctionDashboardPage from "../pages/DashboardPage.tsx";

export const AdminRoutes = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <RolesGuard requiredRole="admin">
                        <Layout/>
                    </RolesGuard>
                }
            >
                <Route path="dashboard" element={<AuctionDashboardPage />} />
                <Route path="products" element={<ProductManagementPage />} />
                <Route path="users" element={<UserManagementPage/>}/>
                {/* add more admin routes here */}
            </Route>
        </Routes>
    );
};
