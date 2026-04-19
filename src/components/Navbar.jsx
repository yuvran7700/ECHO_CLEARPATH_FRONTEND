import { Link, useLocation  } from 'react-router-dom'
import styles from '../styles/AnaNavbar.module.css'
import logo from '../assets/logo_temp.png';

const Navbar = () => {
  const location = useLocation()
  const isAnalytics = location.pathname === '/dashboard/analytics'

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}> <img src={logo} alt="Company Logo" className="photo" /> </div>
      <div className={styles.links}>
        <div className={styles.toggle}>
          <Link
            to="/dashboard/plan-your-journey"
            className={`${styles.toggleBtn} ${!isAnalytics ? styles.active : ''}`}
          >
            Plan Journey
          </Link>
          <Link
            to="/dashboard/analytics"
            className={`${styles.toggleBtn} ${isAnalytics ? styles.active : ''}`}
          >
            Explore Data
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar