import type { NextPage } from 'next'
import Link from 'next/link'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import Icon from '@mui/material/Icon'
import Head from 'next/head'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

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

const PestControl: NextPage = () => {
  return (
    <div style={styles.main}>
      <Head>
        <title>Langhe - Pest Control</title>
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
        Pest Control
      </Typography>
      <FormControlLabel
        value="auto"
        control={<Switch />}
        label="Auto Mode"
      />

      <FormControl fullWidth>
        <InputLabel htmlFor="component-outlined">Sulfur Level</InputLabel>
        <Select
          labelId="component-outlined"
          value={"medium"}
          label="Sulfur Level"
          // onChange={handleChange}
        >
          <MenuItem value={"low"}>Low</MenuItem>
          <MenuItem value={"Medium"}>Medium</MenuItem>
          <MenuItem value={"Hight"}>Hight</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

export default PestControl
