import styles from '../styles/CurlRequest.module.css'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import { useEffect, useState } from 'react'

const CurlRequest = ({ code, language, method, endpoint }) => {

  const [copied, setCopied] = useState(false)

  useEffect(() => {
    Prism.highlightAll()
  }, [code])

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        {method && endpoint ? (
          <div className={styles.endpoint}>
            <span className={styles.method}>{method}</span>
            <span className={styles.endpointPath}>{endpoint}</span>
          </div>
        ) : (
          <span className={styles.language}>{language}</span>
        )}
        <div className={styles.headerRight}>
          {method && <span className={styles.language}>{language?.toUpperCase()}</span>}
          <button className={styles.copyBtn} onClick={handleCopy}>
            {copied ? (
              <span className={styles.copiedText}>Copied!</span>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
            )}
          </button>
        </div>
      </div>
      <pre className={styles.pre}>
        <code className={`language-${language} ${styles.code}`}>{code}</code>
      </pre>
    </div>
  )
}

export default CurlRequest;