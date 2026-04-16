import styles from '../styles/DeveloperPanel.module.css'

const links = [
  {
    title: 'API documentation',
    description: 'Open the reference for weather, alert and social media search endpoints, request parameters, and response schemas.',
    buttonLabel: 'Open docs',
    href: '#'
  },
  {
    title: 'Integration guide',
    description: 'See the setup flow for frontend apps, server-side services, and testing environments.',
    buttonLabel: 'View guide',
    href: '#'
  }
]

const DeveloperPanel = () => {
  return (
    <div className={styles.panel}>
      <h2>Developer access</h2>
      <p className={styles.subtitle}>Fast links for engineers integrating predictions into apps, dashboards, or internal tools.</p>

      <div className={styles.cards}>
        {links.map((link) => (
          <div key={link.title} className={styles.card}>
            <h3>{link.title}</h3>
            <p>{link.description}</p>
            <a href={link.href} className={styles.button}>
              {link.buttonLabel}
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DeveloperPanel
