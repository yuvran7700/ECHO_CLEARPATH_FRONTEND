import { Link, useLocation  } from 'react-router-dom'
import styles from '../styles/APINavbar.module.css'
import logo from '../assets/logo_white_temp.png';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Plan Journey', path: '/dashboard/plan' },
  { label: 'Explore Data', path: '/dashboard/analytics' },
]

const Navbar = () => {
  const location = useLocation()

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logo}>
        <div className={styles.logo}> <img src={logo} alt="Company Logo" className="photo" /> </div>
      </Link>
      <div className={styles.links}>
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`${styles.link} ${location.pathname === link.path ? styles.active : ''}`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>

  )
}

export default Navbar