import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

const Lighting: NextPage = () => {
  return (
    <div className={styles.container}>
      Lighting
      <br />

      <Link href="/">
        <a>back</a>
      </Link>
    </div>
  )
}

export default Lighting
