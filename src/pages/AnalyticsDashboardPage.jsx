import styles from '../styles/analytics.module.css'
import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import TrainDropDown from '../components/TrainDropDown';
import RiskBanner from '../components/RiskBanner'
import StatCards from '../components/StatCards'
import DeveloperPanel from '../components/DeveloperPanel'
import DisruptionChart from '../components/DisruptionChart'

const stats = [
  { value: '90%',   label: 'Rainfall Impact Score' },
  { value: '160',   label: 'Total Disruptions' },
  { value: 'Delay', label: 'Most Frequent Disruption Type' },
]

const mockData = [
  { month: 'Jan', rainfall: 30000, disruptions: 25000 },
  { month: 'Feb', rainfall: 28000, disruptions: 27000 },
  { month: 'Mar', rainfall: 35000, disruptions: 30000 },
  { month: 'Apr', rainfall: 40000, disruptions: 32000 },
  { month: 'May', rainfall: 38000, disruptions: 28000 },
  { month: 'Jun', rainfall: 32000, disruptions: 26000 },
  { month: 'Jul', rainfall: 29000, disruptions: 24000 },
]

const AnalyticsDashboardPage = () => {
  useEffect(() => {
    document.body.style.background = 'rgb(255, 255, 255)'
    return () => { document.body.style.background = '' }
  }, [])

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.container}>
				<h1>Explore Disruption Data</h1>
				<p>Check current disruption risk for a line, then jump directly to the API reference and integration guide from the same page.</p>
				<TrainDropDown />
				<RiskBanner risk={49.65} />
				<div className={styles.twoColumn}>
								<div className={styles.left}>
									<div className={styles.dashboard}>
											<StatCards stats={stats} />
											<DisruptionChart data={mockData}/>
									</div>
								</div>
								<div className={styles.right}>
									<div className={styles.dashboard}>
											<DeveloperPanel />
									</div>
								</div>
						</div>
				</div>
    </div>
  );
};


export default AnalyticsDashboardPage;