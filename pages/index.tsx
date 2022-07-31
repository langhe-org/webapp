import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Langhe</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Link href="/settings">
        <a>settings</a>
      </Link>
      <br />
      <Link href="/environment">
        <a>environment</a>
      </Link>
      <br />
      <Link href="/lighting">
        <a>lighting</a>
      </Link>
      <br />
      <Link href="/irrigation">
        <a>irrigation</a>
      </Link>
      <br />
      <Link href="/pest-control">
        <a>pest-control</a>
      </Link>

    </div>
  )
}

export default Home
