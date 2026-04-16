import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import styles from '../styles/DisruptionChart.module.css'

const DisruptionChart = ({ data }) => {
  return (
    <div className={styles.container}>
      <h2>Rainfall vs Disruptions</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#b7b7b7" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="rainfall" stroke="#436CAB" strokeWidth={2} dot={false} activeDot={{fill: "#F07C62", stroke: "#ffffff"}} />
          <Line type="monotone" dataKey="disruptions" stroke="#22d3ee" strokeWidth={2} dot={false} activeDot={{fill: "#F07C62", stroke: "#ffffff"}}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default DisruptionChart
