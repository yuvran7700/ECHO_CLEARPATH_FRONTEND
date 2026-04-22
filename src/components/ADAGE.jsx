import styles from '../styles/ADAGE.module.css'
import CodeBlock from './CodeBlock'
import AccordianObjectS from './AccordianObject'

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
            title: 'example_attribute',
            type: 'string',
            content: 'Example event attribute'
          },
        ]
      }
    ]
  },
]


const ADAGE = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <h2 className={styles.title}>ADAGE Object</h2>
        <p className={styles.description}>
          The ADAGE 3.0 Data Model is used by the FAIC research group to ensure all data 
        	stored adheres to the same set of conventions. The data model is able to be 
        	deconstructed into an array of information and transformed into a hierarchical 
        	structure. The object is broken down into 4 groups of hierarchical structure 
        	File -{'>'} Dataset -{'>'} Event -{'>'} Event Attributes.
        </p>
        <AccordianObjectS  items={items} />
      </div>

      <div className={styles.right}>
				<CodeBlock
					language="JSON"
					code={ADAGE_Object}
				/>
      </div>
    </div>
  )
}

export default ADAGE