import styles from '../styles/DeveloperPanel.module.css'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const links = [
  {
    title: 'API documentation',
    description: 'Open the reference for weather, alert and social media search endpoints, request parameters, and response schemas.',
    buttonLabel: 'Open docs',
    href: '/api-doc'
  },
  {
    title: 'Integration guide',
    description: 'See the setup flow for frontend apps, server-side services, and testing environments.',
    buttonLabel: 'View guide',
    href: '#'
  }
]

const DeveloperPanel = () => {

  const navigate = useNavigate()

  const handleClick = (href) => {
    if (href === '/api-doc') {
      navigate('/api-doc')
    } else {
      navigate('/integration-guide')
    }
    }
  
  return (
    <div className={styles.panel}>
      <h2>Developer access</h2>
      <p className={styles.subtitle}>Fast links for engineers integrating predictions into apps, dashboards, or internal tools.</p>

      <div className={styles.cards}>
        {links.map((link) => (
          <div key={link.title} className={styles.card}>
            <h3>{link.title}</h3>
            <p>{link.description}</p>
            <Button
              variant="contained"
              onClick={() => handleClick(link.href)}
              sx={{
                background: 'var(--accent)',
                textTransform: 'none',
                borderRadius: '6px',
              }}
            >
              {link.buttonLabel}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DeveloperPanel
