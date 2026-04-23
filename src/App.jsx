import { Routes, Route, Navigate } from 'react-router-dom';
import ChooseMode from './pages/ChooseMode';
import LandingPage from './pages/LandingPage';
import CommuterDashboard from './pages/CommuterDashboard';
import AnalyticsDashboardPage from './pages/AnalyticsDashboardPage';
import APIDoc from './pages/APIDoc';
import APIDocCollected from './pages/APICollected';
import APIPreprocessed from './pages/APIPreprocessed';
import APIAlertCollected from './pages/APIAlertCollection';
import DashboardLayout from './pages/DashboardPage';
import ForecastProvider from "./context/ForecastProvider";
import APIForecastPage from './pages/APIForecastPage';
import APIAnalyticsPage from './pages/APIAnalyticsPage';

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
          <Route path="/api-doc" element={<APIDoc />} />
          <Route path="/api-doc/weather/collected" element={<APIDocCollected />} />
          <Route path="/api-doc/weather/preprocessed" element={<APIPreprocessed />} />
          <Route path="/api-doc/alert/collection" element={<APIAlertCollected />} />
          <Route path="/api-doc/transport/disruption-forecast" element={<APIForecastPage />} />
          <Route path="/api-doc/transport/disruption-analytics" element={<APIAnalyticsPage />} />
        </Routes>
      </ForecastProvider>
      </>
  );
}

export default App;
