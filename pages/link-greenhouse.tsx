import type { NextPage } from 'next'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import { SyntheticEvent, useState } from 'react'
import { useRouter } from 'next/router'
import { api } from '../services/api';

const styles = {
  form: {
    display: "grid",
    padding: "30px 10px",
    gap: "24px",
    justifyItems: "center",
    height: "100vh",
    alignContent: "start",
  },
};

const LinkGreenhouse: NextPage = () => {
  const router = useRouter();
  const [greenhouseId, setGreenhouseId] = useState<string>("");

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    api(`/account/link-greenhouse/${greenhouseId}`)
      .then(() => {
        router.push("/");
      });
  }

  return (
    <div>
      <form style={styles.form} onSubmit={onSubmit}>
        <Typography variant='h1' sx={{ fontSize: 30 }}>
          Link Greenhouse
        </Typography>
        <FormControl>
          <InputLabel htmlFor="greenhouse-id">Greenhouse ID</InputLabel>
          <OutlinedInput
            id="greenhouse-id"
            value={greenhouseId}
            onChange={e => setGreenhouseId(e.target.value)}
            label="Greenhouse ID"
          />
        </FormControl>
        <Button type="submit" variant="contained">Link</Button>
      </form>
    </div>
  )
}

export default LinkGreenhouse
