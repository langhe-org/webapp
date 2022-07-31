import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

const Environment: NextPage = () => {
  return (
    <div className={styles.container}>
      environment
      <br />

      <Link href="/">
        <a>back</a>
      </Link>
    </div>
  )
}

export default Environment
