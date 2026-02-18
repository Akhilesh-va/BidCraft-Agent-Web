import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import { useAuth } from "./context/AuthContext";
import CompanyProfile from "./pages/Profile/CompanyProfile";
import Profile from "./pages/Profile/Profile";
import Layout from "./components/Layout/Layout";
import Processing from "./pages/Processing/Processing";
import ReviewSummary from "./pages/Review/ReviewSummary";
import ProposalResult from "./pages/Proposal/ProposalResult";
import Analytics from "./pages/Analytics/Analytics";
import History from "./pages/History/History";

const AppRoutes: React.FC = () => {
  const { user, loading, backendUser } = useAuth();
  if (loading) return null;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            user ? (
              <Layout>
                <Routes>
                  <Route
                    path="/"
                    element={backendUser && backendUser.companyProfile ? <Home /> : <CompanyProfile />}
                  />
                  <Route path="company-profile" element={<CompanyProfile />} />
                  <Route path="analytics" element={<Analytics />} />
                  <Route path="history" element={<History />} />
                  <Route
                    path="review"
                    element={backendUser && backendUser.companyProfile ? <ReviewSummary /> : <CompanyProfile />}
                  />
                  <Route
                    path="processing"
                    element={backendUser && backendUser.companyProfile ? <Processing /> : <CompanyProfile />}
                  />
                  <Route
                    path="proposal"
                    element={backendUser && backendUser.companyProfile ? <ProposalResult /> : <CompanyProfile />}
                  />
                  <Route path="profile" element={<Profile />} />
                </Routes>
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;

