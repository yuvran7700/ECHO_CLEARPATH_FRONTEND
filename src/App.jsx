import { Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';

function App() {
  return (
      <>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          {/* <Route path="/dashboard/plan" element={<CommuterDashboard />} />
          <Route path="/dashboard/analytics" element={<AnalyticsDashboard />} /> */}
        </Routes>
      </>
  );
}

export default App;
