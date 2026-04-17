import { Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import AnalyticsDashboardPage from './pages/AnalyticsDashboardPage';
import APIDoc from './pages/APIDoc';

function App() {
  return (
      <>
        <Routes>
          {/* <Route path="/" element={<LandingPage />} /> */}
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          {/* <Route path="/dashboard/plan" element={<CommuterDashboard />} /> */}
          <Route path="/dashboard/analytics" element={<AnalyticsDashboardPage />} />
          <Route path="/api-doc" element={<APIDoc />} />
        </Routes>
      </>
  );
}

export default App;
