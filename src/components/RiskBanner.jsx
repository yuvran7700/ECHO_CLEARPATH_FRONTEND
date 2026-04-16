import styles from '../styles/RiskBanner.module.css'

const RiskBanner = ({ risk }) => {
  return (
    <div className={styles.banner}>
      <h2>{risk}%</h2>
      <p>Risk of Disruption (current)</p>
    </div>
  )
}

export default RiskBanner