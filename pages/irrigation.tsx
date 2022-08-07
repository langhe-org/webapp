import type { NextPage } from 'next'
import Link from 'next/link'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import Icon from '@mui/material/Icon'
import Head from 'next/head'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'

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

const Settings: NextPage = () => {
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

      <Typography variant='h1' sx={styles.manualControlHeader}>
        Manual Control
      </Typography>
      <FormControlLabel
        value="auto"
        control={<Switch />}
        label="Zone 1"
      />
      <FormControlLabel
        value="auto"
        control={<Switch />}
        label="Zone 2"
      />
      <FormControlLabel
        value="auto"
        control={<Switch />}
        label="Zone 3"
      />
      <FormControlLabel
        value="auto"
        control={<Switch />}
        label="Zone 4"
      />
    </div>
  )
}

export default Settings
