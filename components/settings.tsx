import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { User } from '../types/user'
import { Greenhouse } from '../types/greenhouse'
import Dialog from './dialog'
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';

const styles = {
  main: {
    display: "grid",
    gap: "10px",
    justifyItems: "center",
    height: "100%",
    alignItems: "start",
  },
  backButton: {
    justifySelf: "start",
  }
};

interface Props {
  onClose: () => void;
  open: boolean,
  user?: User,
  greenhouse?: Greenhouse,
}

const Settings = (props: Props) => {
  return (
    <Dialog {...props}>
      <div style={styles.main}>
        <IconButton sx={styles.backButton} onClick={props.onClose}>
          <Icon>close</Icon>
        </IconButton>
        <Typography variant='h1' sx={{ fontSize: 60 }}>
          Settings
        </Typography>
        <FormControl>
          <InputLabel htmlFor="component-outlined">Name</InputLabel>
          <OutlinedInput
            id="component-outlined"
            value={props.user?.name ?? ""}
            // onChange={handleChange}
            label="Name"
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="component-outlined">Greenhouse ID</InputLabel>
          <OutlinedInput
            id="component-outlined"
            value={props.greenhouse?.id ?? ""}
            // onChange={handleChange}
            label="Greenhouse ID"
            readOnly={true}
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="component-outlined">Location</InputLabel>
          <OutlinedInput
            id="component-outlined"
            value={props.greenhouse?.location_name ?? ""}
            // onChange={handleChange}
            label="Location "
            readOnly={true}
          />
        </FormControl>
        <FormControl fullWidth>
          <InputLabel htmlFor="component-outlined">Units</InputLabel>
          <Select
            labelId="component-outlined"
            value={props.user?.units}
            label="Sulfur Level"
          // onChange={handleChange}
          >
            <MenuItem value={"metric"}>Metric</MenuItem>
            <MenuItem value={"imperial"}>Imperial</MenuItem>
          </Select>
        </FormControl>
      </div>
    </Dialog>
  )
}

export default Settings
