import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

const Irrigation: NextPage = () => {
  return (
    <div className={styles.container}>
      Irrigation
      <br />

      <Link href="/">
        <a>back</a>
      </Link>
    </div>
  )
}

export default Irrigation
