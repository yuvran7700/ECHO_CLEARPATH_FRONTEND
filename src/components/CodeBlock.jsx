import styles from '../styles/CodeBlock.module.css'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import { useEffect } from 'react'

const CodeBlock = ({ code, language }) => {

  useEffect(() => {
    Prism.highlightAll()
  }, [code])

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.language}>{language}</span>
      </div>
      <pre className={styles.pre}>
        <code className={styles.code}>{code}</code>
      </pre>
    </div>
  )
}

export default CodeBlock;