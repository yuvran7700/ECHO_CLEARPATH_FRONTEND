import { Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import AnalyticsDashboardPage from './pages/AnalyticsDashboardPage';
import APIDoc from './pages/APIDoc';
import APIDocCollected from './pages/APICollected';

function App() {
  return (
      <>
        <Routes>
          {/* <Route path="/" element={<LandingPage />} /> */}
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          {/* <Route path="/dashboard/plan" element={<CommuterDashboard />} /> */}
          <Route path="/dashboard/analytics" element={<AnalyticsDashboardPage />} />
          <Route path="/api-doc" element={<APIDoc />} />
          <Route path="/api-doc/collected" element={<APIDocCollected />} />
        </Routes>
      </>
  );
}

export default App;
