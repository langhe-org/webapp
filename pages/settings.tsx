import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

const Settings: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1>settings</h1>
      <Link href="/">
        <a>back</a>
      </Link>
      <br />

      <div className='fields'>
        <label>
          User
          <input />
        </label>
      </div>
    </div>
  )
}

export default Settings
