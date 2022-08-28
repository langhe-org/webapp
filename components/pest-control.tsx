import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { ControlMode, GreenhouseState, SulfurIntensity } from '../types/greenhouse-state';
import Dialog from './dialog';
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
  },
  manualControlHeader: {
    color: "#c0c0c0",
    fontSize: "28px",
  }
};

interface Props {
  onClose: () => void;
  open: boolean,
  greenhouseState?: GreenhouseState,
}

const PestControl = (props: Props) => {
  const greenhouseState = props.greenhouseState;

  return (
    <Dialog {...props}>
      <div style={styles.main}>
        <IconButton sx={styles.backButton} onClick={props.onClose}>
          <Icon>close</Icon>
        </IconButton>
        <Typography variant='h1' sx={{ fontSize: 60 }}>
          Pest Control
        </Typography>
        <FormControlLabel
          value="auto"
          control={<Switch
            checked={greenhouseState?.control.ipm.mode === ControlMode.Automatic}
            // onChange={onChange}
          />}
          label="Auto Mode"
        />

        <FormControl fullWidth>
          <InputLabel htmlFor="component-outlined">Sulfur Level</InputLabel>
          <Select
            labelId="component-outlined"
            value={greenhouseState?.recipes.ipm.intensity}
            label="Sulfur Level"
            // onChange={handleChange}
          >
            <MenuItem value={SulfurIntensity.off}>Off</MenuItem>
            <MenuItem value={SulfurIntensity.low}>Low</MenuItem>
            <MenuItem value={SulfurIntensity.medium}>Medium</MenuItem>
            <MenuItem value={SulfurIntensity.high}>Hight</MenuItem>
          </Select>
        </FormControl>
      </div>
    </Dialog>
  )
}

export default PestControl