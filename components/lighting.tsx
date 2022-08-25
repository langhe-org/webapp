import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import { ControlMode, GreenhouseState } from '../types/greenhouse-state'
import Dialog from './dialog'
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import Loadable from './loadable';
import { Command } from '../types/command';

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
  onCommand: (command: Command) => void;
  open: boolean,
  greenhouseState?: GreenhouseState,
  queuedCommands?: Command,
}

const Lighting = (props: Props) => {
  const greenhouseState = props.greenhouseState;

  return (
    <Dialog {...props}>
      <div style={styles.main}>
        <IconButton sx={styles.backButton} onClick={props.onClose}>
          <Icon>close</Icon>
        </IconButton>
        <Typography variant='h1' sx={{ fontSize: 60 }}>
          Lighting
        </Typography>
        <FormControlLabel
          value="auto"
          control={<Switch
            checked={greenhouseState?.control.lighting.mode === ControlMode.Automatic}
            // onChange={onChange}
          />}
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
        <Loadable isLoading={props.queuedCommands?.lighting?.light !== undefined ?? false}>
          <FormControlLabel
            value="auto"
            control={<Switch
              checked={greenhouseState?.actuator.lights ?? false}
              onChange={e => props.onCommand({lighting: { light: e.target.checked }})}
            />}
            label="LEDs (all)"
          />
        </Loadable>
      </div>
    </Dialog>
  )
}

export default Lighting
