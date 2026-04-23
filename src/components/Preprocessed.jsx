import styles from '../styles/ADAGE.module.css'
import CodeBlock from './CodeBlock'
import AccordianObjectS from './AccordianObject'
import CurlRequest from './CurlRequest'

const curl = `curl -X 'GET' \
  'https://nv2ymlpynf.execute-api.us-east-1.
  amazonaws.com/weather/preprocessed?date=INSERT_DATE' \\  
-H 'accept: application/json'
`
const ADAGE_Object = `{
  "data_source": "ClearPath",
  "dataset_type": "Weather observations and severity",
  "dataset_id": "dynamodb://clearpath-weather-data/2026-02-18",
  "events": [
    {
      "event_type": "Weather observations and severity",
      "event_time": {
        "time_stamp": "2026-02-18T09:00:00",
        "duration": 86400,
        "duration_unit": "seconds",
        "time_zone": "Australia/Sydney"
      },
      "event_attributes": {
        "date": "2026-02-18",
        "tempMin_C": 21.2,
        "tempMax_C": 36.6,
        "rainfall_mm": 0.4,
        "sunshineHours_hours": 7.4,
        "maxWindSpeed_kmh": 61,
        "9am": {
          "temp_C": 26.1,
          "humidity_percent": 55
        },
        "3pm": {
          "temp_C": 22.8,
          "humidity_percent": 85
        },
        "weatherSeverity": {
          "sunSeverity": "Partly Cloudy",
          "rainSeverity": "Light rain",
          "tempSeverity": "Warm",
          "windSeverity": "Gale",
          "humiditySeverity": "High Humidity"
        }
      }
    }
  ]
}`

const items = [
  {
    title: 'data_source',
    type: 'string',
    content: 'Origin of the dataset'
  },
  {
    title: 'dataset_type',
    type: 'string',
    content: 'Classification of the dataset'
  },
  {
    title: 'dataset_id',
    type: 'string',
    content: 'A unique identifier for the dataset, such as an AWS S3 link'
  },
  {
    title: 'events',
    type: 'object',
    content: 'Nested object containing event, time object ,event type, event attributes',
    children: [
      {
        title: 'event_type',
        type: 'string',
        content: 'Nature of the event'
      },
      {
        title: 'event_time',
        type: 'object',
        content: 'Nested object containing time_stamp duration duration_unit, time_zone',
        children: [
          {
            title: 'time_stamp',
            type: 'string',
            content: 'Specifies the exact time an event occurred'
          },
          {
            title: 'duration',
            type: 'integer',
            content: 'Time duration for the event'
          },
          {
            title: 'duration_unit',
            type: 'string',
            content: 'Duration unit of measurement'
          },
          {
            title: 'duration_unit',
            type: 'string',
            content: 'Time zone for the event'
          }
        ]
      },
      {
        title: 'event_attributes',
        type: 'string',
        content: 'Specific data points related to the event',
        children: [
          {
            title: 'date',
            type: 'string',
            content: 'The date the meteorological recording was conducted'
          },
          {
            title: 'tempMin_C',
            type: 'float',
            content: 'The minimum temperature recorded that day'
          },
          {
            title: 'tempMax_c',
            type: 'float',
            content: 'The maximum temperature recorded that day'
          },
          {
            title: 'rainfall_mm',
            type: 'float',
            content: 'The amount of precipitation that occurred on the day'
          },
          {
            title: 'maxWindSpeed_kmh',
            type: 'integer',
            content: 'The maximum speed of the wind that day'
          },
          {
            title: '9am',
            type: 'object',
            content: 'Nested object containing weather observations taken at 9 am',
            children: [
              {
                title: 'temp_C',
                type: 'float',
                content: 'Temperature at 9 am'
              },
              {
                title: 'humidity_percent',
                type: 'float',
                content: 'Relative humidity percentage at 9 am'
              },
            ]
          },
          {
            title: '3pm',
            type: 'object',
            content: 'Nested object containing weather observations taken at 3 pm',
            children: [
              {
                title: 'temp_C',
                type: 'float',
                content: 'Temperature at 3 pm'
              },
              {
                title: 'humidity_percent',
                type: 'float',
                content: 'Relative humidity percentage at 3 pm'
              }
            ]
          },
          {
            title: 'weatherSeverity',
            type: 'object',
            content: 'Nested object containing weather severity classifications',
            children: [
              {
                title: 'Sunshine Severity',
                type: 'string',
                content: 'Sun severity based off daily sunshine hours'
              },
              {
                title: 'rainSeverity',
                type: 'string',
                content: 'Rainfall severity based off daily rainfall amount'
              },
              {
                title: 'tempSeverity',
                type: 'string',
                content: 'Temperature severity based off daily max, min, 9am and 3pm temp'
              },
              {
                title: 'windSeverity',
                type: 'string',
                content: 'Wind severity based off daily max wind speed'
              },
              {
                title: 'humiditySeverity',
                type: 'string',
                content: 'Humidity severity based off 9am and 3pm humidity amount'
              }
            ]
          },
        ]
      }
    ]
  },
]

const Preprocessed = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <h2 className={styles.title}>/preprocessed</h2>
        <p className={styles.description}>
          Returns the ADAGE 3.0 compliant weather object for a specific date with weather severity classifications.
          Contains only the weather data used to calculate the severity classifications. 
        </p>
        <p className={styles.description}>
          If data was unavailable (i.e. error, not taken etc), it’s parameter is a string with content “Unavailable”.
        </p>

        <h3 className={styles.title}>Paramaters</h3>
        <p>date (string) - Date of desired Weather Data</p>
        <h3 className={styles.title}>Object Returned</h3>
        <AccordianObjectS  items={items} />
      </div>

      <div className={styles.right}>
        <CurlRequest
					method="GET"
          endpoint="/processed"
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

export default Preprocessed