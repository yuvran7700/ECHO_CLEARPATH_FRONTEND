import { Routes, Route, Navigate } from 'react-router-dom';
import ChooseMode from './pages/ChooseMode';
import LandingPage from './pages/LandingPage';
import CommuterDashboard from './pages/CommuterDashboard';
import AnalyticsDashboardPage from './pages/AnalyticsDashboardPage';
import APIDoc from './pages/APIDoc';
import APIDocCollected from './pages/APICollected';
import DashboardLayout from './pages/DashboardPage';
import ForecastProvider from "./context/ForecastProvider";

function App() {
  return (
      <>
      <ForecastProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/choose-mode" element={<ChooseMode />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="plan-your-journey" element={<CommuterDashboard />} />
            <Route path="analytics" element={<AnalyticsDashboardPage />} />
            <Route index element={<Navigate to="plan-your-journey" replace />} />
          </Route>
          {/* <Route path="/dashboard/plan-your-journey" element={<CommuterDashboard />} />
          <Route path="/dashboard/analytics" element={<AnalyticsDashboardPage />} /> */}
          <Route path="/api-doc" element={<APIDoc />} />
          <Route path="/api-doc/collected" element={<APIDocCollected />} />
        </Routes>
      </ForecastProvider>
      </>
  );
}

export default App;
