import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

const PestControl: NextPage = () => {
  return (
    <div className={styles.container}>
      Pest control
      <br />

      <Link href="/">
        <a>back</a>
      </Link>
    </div>
  )
}

export default PestControl
