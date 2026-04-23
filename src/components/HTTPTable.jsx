import styles from '../styles/HTTPTable.module.css'

const statusCodes = [
  { code: '200', name: 'OK',             description: 'Works as expected' },
  { code: '400', name: 'Bad Request',    description: 'Request data had some issue' },
  { code: '404', name: 'Not Found',      description: 'Requested data does not exist' },
  { code: '500', name: 'Server Errors',  description: 'Error occurred on ClearPath end' },
]

const HTTPTable = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <h2 className={styles.title}>HTTP Status Codes</h2>
        <p className={styles.description}>
          ClearPath uses standard HTTP response codes to illustrate success/failure of a request.
          Typically, codes in the 2XX range indicate some sort of success, 4XX indicates failure
          due to user provided information and 5XX is due to ClearPath failures.
        </p>
      </div>

      <div className={styles.right}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th colSpan={3}>HTTP Response Codes</th>
            </tr>
          </thead>
          <tbody>
            {statusCodes.map((row) => (
              <tr key={row.code}>
                <td className={styles.code}>{row.code}</td>
                <td className={styles.name}>{row.name}</td>
                <td className={styles.desc}>{row.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default HTTPTable