import styles from '../styles/StatCards.module.css'

const StatCards = ({ stats }) => {
  return (
    <div className={styles.grid}>
      {stats.map((stat) => (
        <div key={stat.label} className={styles.card}>
          <h2>{stat.value}</h2>
          <p>{stat.label}</p>
        </div>
      ))}
    </div>
  )
}

export default StatCards