import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage.tsx";
import { RolesGuard } from "../guards/RolesGuard.tsx";
import { Layout } from "../layout/Layout.tsx";
import AuctionDashboardPage from "../pages/DashboardPage.tsx";
import BidHistoryPage from "../pages/BidHistoryPage.tsx";
import ProductBidHistoryPage from "../pages/ProductBidHistoryPage.tsx";
import { ErrorBoundary } from "react-error-boundary";
import { BetButton } from "../components/BetButton.tsx";
import OhNoPage from "../pages/OhNoPage.tsx";


export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        element={
          <RolesGuard>
            <Layout />
          </RolesGuard>
        }
      >
        <Route path="dashboard" element={<AuctionDashboardPage />} />
        <Route path="auctions" element={
                <ErrorBoundary FallbackComponent={OhNoPage}>
                  <BidHistoryPage />
                  <BetButton/>
                </ErrorBoundary>
          } />
        <Route path="/bid-history/:auctionId" element={<ProductBidHistoryPage />} />
      </Route>
    </Routes>
  );
};
