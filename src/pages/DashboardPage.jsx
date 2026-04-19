import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardNav from "../components/SharedComponents/DashboardNavBar";
import DashboardHeader from "../components/SharedComponents/DashboardHeader";

const DashboardLayout = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const result = await fetchForecast();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <div>
      <DashboardNav />    {/* Always visible */}
      <DashboardHeader /> {/* Always visible */}
      
      <main className="content-area mx-auto px-6 pb-20">
        <Outlet context={{ data, loading, error }} />
      </main>
    </div>
  );
};

export default DashboardLayout