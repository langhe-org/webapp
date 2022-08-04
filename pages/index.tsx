import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { useState } from 'react'
import { User, Units } from './types/user'
import { Greenhouse, GreenhouseType } from './types/greenhouse'
import { ControlMode, EnvironmentState, GreenhouseState, IpmState, LightningState } from './types/greenhouse-state'

function networkDelay() {
  const min = 100;
  const max = 1200;
  return Math.floor(Math.random() * (max - min + 1) + min);
}
const Home: NextPage = () => {
  const [user, setUser] = useState<User>();
  const [greenhouse, setGreenhouse] = useState<Greenhouse>();
  const [greenhouseState, setGreenhouseState] = useState<GreenhouseState>();

  setTimeout(() => {
    setGreenhouse({
      id: 1,
      name: "Main prototype",
      type: GreenhouseType.proto_1_ithaca,
      location_name: "Itheca, NY",
      longitude: 90,
      latitude: 90,
    });
  }, networkDelay());
  setTimeout(() => {
    setGreenhouseState({
      id: 1,
      greenhouse_id: 1,
      time: new Date,
      timezone: 1,
      dst: true,
      temperature: 1,
      humidity: 1,
      quantum: 1,
      environment_mode: ControlMode.Automatic,
      environment_state: EnvironmentState.Default,
      ipm_mode: ControlMode.Manual,
      ipm_state: IpmState.Default,
      lighting_mode: ControlMode.Manual,
      lighting_state: LightningState.Default,
      heater: true,
      exhaust: true,
      ventilator: true,
      sulfur: true,
    });
  }, networkDelay());
  setTimeout(() => {
    setUser({
      id: 1,
      name: "Mendy",
      email: "mendy@example.com",
      units: Units.Imperial,
    });
  }, networkDelay());

  return (
    <div className={styles.container}>
      <Head>
        <title>Langhe</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className='top-section'>
        <Link href="/settings">
          <a>settings</a>
        </Link>
        <br />
        <p>Hi, {user?.name}</p>
      </section>
      <section className='state-section'>

      </section>
      <Link href="/environment">
        <a>
          <section>
            <h3>Environment</h3>
            <p>{greenhouseState?.environment_state}</p>
            <span>{greenhouseState?.environment_mode}</span>
          </section>
        </a>
      </Link>
      <br />
      <Link href="/lighting">
        <a>
          <section>
            <h3>lighting</h3>
            <p>{greenhouseState?.lighting_state}</p>
            <span>{greenhouseState?.lighting_mode}</span>
          </section>
        </a>
      </Link>
      <br />
      <Link href="/irrigation">
        <a>
          <section>
            <h3>Environment</h3>
            <p>??</p>
            <span>??</span>
          </section>
        </a>
      </Link>
      <br />
      <Link href="/pest-control">
        <a>
          <section>
            <h3>Pest Control</h3>
            <p>??</p>
            <span>??</span>
          </section>
        </a>
      </Link>

    </div>
  )
}

export default Home
