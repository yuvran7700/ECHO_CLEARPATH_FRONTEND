import { Routes, Route } from 'react-router-dom';
import ChooseMode from './pages/ChooseMode';
import LandingPage from './pages/LandingPage';
import CommuterDashboard from './pages/CommuterDashboard';
function App() {
  return (
      <>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/choose-mode" element={<ChooseMode />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/dashboard/plan-your-journey" element={<CommuterDashboard />} />
          {/* <Route path="/dashboard/analytics" element={<AnalyticsDashboard />} /> */}
        </Routes>
      </>
  );
}

export default App;
