import styles from '../styles/ADAGE.module.css'
import CodeBlock from './CodeBlock'
import AccordianObjectS from './AccordianObject'
import CurlRequest from './CurlRequest'

const curl = `curl -X 'GET' \\'https://nv2ymlpynf.execute-api.us-east-1.
amazonaws.com/weather/collection?date=INSERT_DATE' \\  
-H 'accept: application/json'
`
const ADAGE_Object = `{
  "data_source": "BOM",  
  "dataset_type": 
  "Daily weather observations",  
  "dataset_id": "s3://clearpath-weather-index-v1/
                weather_collected/2026-03-18.json",  
  "events": [{
    "event_type": "Daily weather observations",
    "event_time": {
      "time_stamp": "2026-03-18T09:00:00",
      "duration": 86400,
      "duration_unit": "seconds",
      "time_zone": "Australia/Sydney"
    },      
    "event_attributes": {
      "attribute": "1234567890"
    }    
  }]
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
            title: 'evaporation_mm',
            type: 'float',
            content: 'Daily evaporation levels'
          },
          {
            title: 'sunshineHours_hours',
            type: 'integer',
            content: 'Amount of bright sun recorded'
          },
          {
            title: 'windWindDir',
            type: 'string',
            content: 'The direction the maximum level of wind was blowing'
          },
          {
            title: 'maxWindSpeed_kmh',
            type: 'integer',
            content: 'The maximum speed of the wind that day'
          },
          {
            title: 'maxWindTime',
            type: 'string',
            content: 'The time at which the maximum wind speed occurred'
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
              {
                title: 'cloudAmount',
                type: 'float',
                content: 'Cloud amount at 9 am'
              },
              {
                title: 'windDir',
                type: 'string',
                content: 'The direction the wind was blowing in at 9 am'
              },
              {
                title: 'mslp_hPA',
                type: 'float',
                content: 'The wind speed at 9 am'
              }
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
              },
              {
                title: 'cloudAmount',
                type: 'float',
                content: 'Cloud amount at 3 pm'
              },
              {
                title: 'windDir',
                type: 'string',
                content: 'The direction the wind was blowing in at 3 pm'
              },
              {
                title: 'mslp_hPA',
                type: 'float',
                content: 'The wind speed at 3 pm'
              }
            ]
          },
        ]
      }
    ]
  },
]

const Collected = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <h1 className={styles.title}>/collection</h1>
        <p className={styles.description}>
          Returns the ADAGE 3.0 compliant weather object for a specific date. All data is taken from the bureau of meteorology taken from primarily Observatory Hill in Sydney NSW.
        </p>
        <p className={styles.description}>
          If data was unavailable (i.e. error, not taken etc), it’s parameter is a string with content “Unavailable”.
        </p>

        <h2 className={styles.title}>Paramaters</h2>
        <p className={styles.title}>Date - Date of desired Weather Data</p>
        <h3 className={styles.title}>Object Returned</h3>
        <AccordianObjectS  items={items} />
      </div>

      <div className={styles.right}>
        <CurlRequest
					method="GET"
          endpoint="/collection"
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

export default Collected