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
  "data_source": "Twitter",
  "dataset_type": "Historical Tweets",
  "dataset_id": "twitter:2026-03-01:2026-03-23:1234567890",
  "time_object": {
    "timestamp": "2026-03-23 12:00:00",
    "timezone": "UTC"
  },
  "events": [
    {
      "time_object": {
        "timestamp": "2026-03-23",
        "duration": 0,
        "duration_unit": "second",
        "timezone": "UTC"
      },
      "event_type": "transport disruption tweet",
      "attribute": {
        "account_name": "T1 Sydney Trains",
        "text": "Allow extra travel time due to an incident at Hornsby.",
        "date": "2026-03-23"
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
        title: 'attribute',
        type: 'string',
        content: 'Specific data points related to the event',
        children: [
          {
            title: 'account_name',
            type: 'string',
            content: 'Name of account tweets were taken from'
          },
          {
            title: 'text',
            type: 'string',
            content: 'Text taken from tweet'
          },
          {
            title: 'date',
            type: 'string',
            content: 'Date tweet was posted'
          },
        ]
      }
    ]
  },
]

const AlertCollection = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <h2 className={styles.title}>/collection</h2>
        <p className={styles.description}>
          Retrieves historical tweets from a specified Twitter account within a 
          date range and returns them as an ADAGE-formatted dataset. 
        </p>

        <h3 className={styles.title}>Paramaters</h3>
        <p>base_query (string) - Twitter account filter. Must include a 'from:' prefix e.g. from:T1SydneyTrains.</p>
        <p>start_date (string) - Start date for tweet retrieval in YYYY-MM-DD format.</p>
        <p>end_date (string) - End date for tweet retrieval in YYYY-MM-DD format.</p>
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

export default AlertCollection