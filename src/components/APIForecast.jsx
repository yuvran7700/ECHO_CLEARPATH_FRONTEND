import styles from '../styles/ADAGE.module.css'
import CodeBlock from './CodeBlock'
import AccordianObjectS from './AccordianObject'
import CurlRequest from './CurlRequest'

const curl = `curl -X 'GET' \
  'https://nv2ymlpynf.execute-api.us-east-1.
  amazonaws.com/alert/collection?base_query=from%
  INSERT_ACCOUNT&start_date=INSERT_DATE&end_date=INSERT_DATE' \
  
  -H 'accept: application/json'
`
const ADAGE_Object = `{
  "lat": -33.815,
  "lon": 151.0011,
  "days": [
    {
      "date": "2026-04-20",
      "weather_summary": "Light rain",
      "tempSeverity": "Mild",
      "rainSeverity": "Light rain",
      "windSeverity": "Breezy",
      "humiditySeverity": "High Humidity",
      "sunSeverity": "Cloudy",
      "risk": 0.3601,
      "risk_level": "Moderate",
      "message": "Based on forecasted conditions, this train line has a 36% estimated disruption risk (Moderate)."
    }
  ]
}`

const items = [
  {
    title: 'lat',
    type: 'float',
    content: 'Latitude of the location'
  },
  {
    title: 'lon',
    type: 'float',
    content: 'Longitude of the location'
  },
  {
    title: 'days',
    type: 'object',
    content: 'Each day in 5-day forecast',
    children: [
      {
        title: 'date',
        type: 'string',
        content: 'Date of forecast data'
      },
      {
        title: 'weather_summary',
        type: 'string',
        content: 'Major cause for disruptions based on weather',
      },
      {
        title: 'tempSeverity',
        type: 'string',
        content: 'Temperature severity based off daily max, min, 9am and 3pm temp',
      },
      {
        title: 'rainSeverity',
        type: 'string',
        content: 'Rainfall severity based off daily rainfall amount',
      },
      {
        title: 'windSeverity',
        type: 'string',
        content: 'Wind severity based off daily max wind speed',
      },
      {
        title: 'humiditySeverity',
        type: 'string',
        content: 'Humidity severity based off 9am and 3pm humidity amount',
      },
      {
        title: 'sunSeverity',
        type: 'string',
        content: 'Sun severity based off daily sunshine hours',
      },
      {
        title: 'risk',
        type: 'float',
        content: 'Disruption risk score based on weather severity',
      },
      {
        title: 'risk_level',
        type: 'string',
        content: 'Ranking of risk from [Low, Moderate, High, Very High, Unknown]',
      },
      {
        title: 'message',
        type: 'string',
        content: 'Summary of risk score and level',
      },
    ]
  },
]

const APIForecast = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <h2 className={styles.title}>/disruption-forecast</h2>
        <p className={styles.description}>
          Fetches a 5-day weather forecast for a given location, classifies each day's conditions 
          into severity labels, and returns a predicted disruption risk score and risk level per day.
        </p>

        <h3 className={styles.title}>Paramaters</h3>
        <p>lat (float) - Latitude of the location. Defaults to Parramatta (-33.8150).</p>
        <p>lon (float) - Longitude of the location. Defaults to Parramatta (151.0011).</p>
        <h3 className={styles.title}>Object Returned</h3>
        <AccordianObjectS  items={items} />
      </div>

      <div className={styles.right}>
        <CurlRequest
					method="GET"
          endpoint="/transport/disruption-forecast"
          language="JSON"
          code={curl}
				/>
        <CodeBlock
          language="JSON"
          code={ADAGE_Object}
        />
      </div>
    </div>
  )
}

export default APIForecast