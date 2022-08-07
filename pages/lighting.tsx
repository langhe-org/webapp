import type { NextPage } from 'next'
import Link from 'next/link'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import Icon from '@mui/material/Icon'
import Head from 'next/head'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import InputAdornment from '@mui/material/InputAdornment'

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
        <title>Langhe - Lighting</title>
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
        Lighting
      </Typography>
      <FormControlLabel
        value="auto"
        control={<Switch />}
        label="Auto Mode"
      />
      <FormControl>
        <InputLabel shrink htmlFor="component-outlined">Morning On</InputLabel>
        <OutlinedInput
          sx={{ textAlign: "end" }}
          id="component-outlined"
          value={20}
          // onChange={handleChange}
          type="time"
          label="Morning On"
        />
      </FormControl>
      <FormControl>
        <InputLabel shrink htmlFor="component-outlined">Night Off</InputLabel>
        <OutlinedInput
          sx={{ textAlign: "end" }}
          id="component-outlined"
          value={1}
          // onChange={handleChange}
          type="time"
          label="Night Off"
        />
      </FormControl>
      <Typography variant='h1' sx={styles.manualControlHeader}>
        Manual Control
      </Typography>
      <FormControlLabel
        value="auto"
        control={<Switch />}
        label="LEDs (all)"
      />
    </div>
  )
}

export default Settings
