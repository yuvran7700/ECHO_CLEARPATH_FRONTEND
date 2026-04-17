import styles from '../styles/APICards.module.css'
import weather_icon from '../assets/weather_icon.png'
import twitter_icon from '../assets/twitter_icon.png'
import analytics_icon from '../assets/analytics_icon.png'

const cards = [
  {
    image: weather_icon,
    title: 'Weather',
    description: '14 months of granular weather data for Sydney NSW, delivered in ADAGE-compliant format.',
    color: '#7EC2CB',
  },
  {
    image: twitter_icon,
    title: 'Twitter',
    description: 'Keyword-driven ingestion of public posts to surface real-time community reporting on user given events.',
    color: '#69AD6F',
  },
  {
    image: analytics_icon,
    title: 'Analytics',
    description: '7-day predictive model for train disruptions across the Sydney network, correlating historical weather patterns with transport delay data.',
    color: '#F5935B',
  },
]

const APICards = () => {
  return (
    <div className={styles.grid}>
      {cards.map((card) => (
        <div
          key={card.title}
          className={styles.card}
          style={{ background: card.color }}
        >
          <div className={styles.iconWrapper}>
            <img src={card.image} alt={card.title} className={styles.icon} />
          </div>
          <h2 className={styles.title}>{card.title}</h2>
          <p className={styles.description}>{card.description}</p>
        </div>
      ))}
    </div>
  )
}

export default APICards