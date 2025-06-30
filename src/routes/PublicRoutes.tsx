import { Routes, Route, Outlet } from "react-router-dom";
import LoginPage from "../pages/LoginPage.tsx";
import DashboardPage from "../pages/user/DashboardPage.tsx";
import { RolesGuard } from "../guards/RolesGuard.tsx";
import { Layout } from "../layout/Layout.tsx";
import AuctionDashboardPage from "../pages/DashboardPage.tsx";
import BidHistoryPage from "../pages/user/BidHistoryPage.tsx";

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        element={
          <RolesGuard requiredRole="user">
            <Layout />
          </RolesGuard>
        }
      >
        <Route path="dashboard" element={<AuctionDashboardPage />} />
        <Route path="auctions" element={<BidHistoryPage />} />
      </Route>
    </Routes>
  );
};
