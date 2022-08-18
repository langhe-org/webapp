import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import InputAdornment from '@mui/material/InputAdornment'
import { ControlMode, GreenhouseState } from '../types/greenhouse-state'
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

const Environment = (props: Props) => {
  const greenhouseState = props.greenhouseState;
  return (
    <Dialog {...props}>
      <div style={styles.main}>
        <IconButton sx={styles.backButton} onClick={props.onClose}>
          <Icon>close</Icon>
        </IconButton>
        <Typography variant='h1' sx={{ fontSize: 60 }}>
          Environment
        </Typography>
        <FormControlLabel
          value="auto"
          control={<Switch
            checked={greenhouseState?.control.environment.mode === ControlMode.Automatic}
            // onChange={onChange}
          />}
          label="Auto Mode"
        />
        <FormControl>
          <InputLabel htmlFor="component-outlined">Day Setpoint</InputLabel>
          <OutlinedInput
            sx={{ textAlign: "end" }}
            id="component-outlined"
            value={20}
            // onChange={handleChange}
            type="number"
            label="Day Setpoint"
            endAdornment={<InputAdornment position="start">°C</InputAdornment>}
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="component-outlined">Night Setpoint</InputLabel>
          <OutlinedInput
            sx={{ textAlign: "end" }}
            id="component-outlined"
            value={1}
            // onChange={handleChange}
            type="number"
            label="Night Setpoint"
            endAdornment={<InputAdornment position="start">°C</InputAdornment>}
          />
        </FormControl>
        <Typography variant='h1' sx={styles.manualControlHeader}>
          Manual Control
        </Typography>
        <FormControlLabel
          value="auto"
          control={<Switch
            checked={greenhouseState?.actuator.heater ?? false}
            // onChange={onChange}
          />}
          label="Heater"
        />
        <FormControlLabel
          value="auto"
          control={<Switch
            checked={greenhouseState?.actuator.ventilator ?? false}
            // onChange={onChange}
          />}
          label="Ventilator"
        />
        <FormControlLabel
          value="auto"
          control={<Switch
            checked={greenhouseState?.actuator.exhaust ?? false}
            // onChange={onChange}
          />}
          label="Exhaust Fan"
        />
      </div>
    </Dialog>
  )
}

export default Environment
