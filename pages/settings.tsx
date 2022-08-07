import type { NextPage } from 'next'
import Link from 'next/link'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import Icon from '@mui/material/Icon'
import Head from 'next/head'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

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
  }
};


const Settings: NextPage = () => {
  return (
    <div style={styles.main}>
      <Head>
        <title>Langhe - Settings</title>
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
        Settings
      </Typography>
      <FormControl>
        <InputLabel htmlFor="component-outlined">Name</InputLabel>
        <OutlinedInput
          id="component-outlined"
          value={"Mendy"}
          // onChange={handleChange}
          label="Name"
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="component-outlined">Greenhouse ID</InputLabel>
        <OutlinedInput
          id="component-outlined"
          value={1}
          // onChange={handleChange}
          label="Greenhouse ID"
          readOnly={true}
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="component-outlined">Location</InputLabel>
        <OutlinedInput
          id="component-outlined"
          value={"Ithaca, NY"}
          // onChange={handleChange}
          label="Location "
          readOnly={true}
        />
      </FormControl>
      <FormControl fullWidth>
        <InputLabel htmlFor="component-outlined">Sulfur Level</InputLabel>
        <Select
          labelId="component-outlined"
          value={"metric"}
          label="Sulfur Level"
        // onChange={handleChange}
        >
          <MenuItem value={"metric"}>Metric</MenuItem>
          <MenuItem value={"imperial"}>Imperial</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

export default Settings
