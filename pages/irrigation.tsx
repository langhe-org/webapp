import type { NextPage } from 'next'
import Link from 'next/link'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import Icon from '@mui/material/Icon'
import Head from 'next/head'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { ControlMode, GreenhouseState } from '../types/greenhouse-state';

const styles = {
  main: {
    display: "grid",
    padding: "10px",
    gap: "10px",
    justifyItems: "center",
    height: "100vh",
    alignItems: "start",
  },
  backButton: {
    justifySelf: "start",
  },
  manualControlHeader: {
    color: "#c0c0c0",
    fontSize: "28px",
  }
};

const Irrigation: NextPage = () => {
  const [greenhouseState, setGreenhouseState] = useState<GreenhouseState>();

  useEffect(() => {
    api<GreenhouseState>("/greenhouse-state/1")
      .then(greenhouseState => setGreenhouseState(greenhouseState))
  }, []);

  return (
    <div style={styles.main}>
      <Head>
        <title>Langhe - Irrigation</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </Head>

      <Link href="/">
        <a style={styles.backButton}>
          <Button variant="text" startIcon={<Icon>arrow back</Icon>}>
            Back
          </Button>
        </a>
      </Link>
      <Typography variant='h1' sx={{ fontSize: 60 }}>
        Irrigation
      </Typography>
      <FormControlLabel
        value="auto"
        control={<Switch
          checked={greenhouseState?.control.irrigation.mode === ControlMode.Automatic}
          // onChange={onChange}
        />}
        label="Auto Mode"
      />
      <Typography variant='h1' sx={styles.manualControlHeader}>
        Manual Control
      </Typography>

      { greenhouseState?.actuator.valves.map((valve, i) => (
        <FormControlLabel
          key={i}
          value="auto"
          control={<Switch
            checked={valve}
            // onChange={onChange}
          />}
          label={`Zone ${i + 1}`}
        />
      )) }
    </div>
  )
}

export default Irrigation
