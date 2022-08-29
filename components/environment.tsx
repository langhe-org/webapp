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
import { Command } from '../types/command';
import Loadable from './loadable';

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
        <Loadable isLoading={props.queuedCommands?.environment?.mode !== undefined ?? false}>
          <FormControlLabel
            value="auto"
            control={<Switch
              checked={greenhouseState?.control.environment.mode === ControlMode.Automatic}
              onChange={e => props.onCommand({environment: { mode: e.target.value ? ControlMode.Automatic : ControlMode.Manual }})}
            />}
            label="Auto Mode"
          />
        </Loadable>
        <Loadable isLoading={props.queuedCommands?.environment?.recipe?.day_temperature !== undefined ?? false}>
          <FormControl>
            <InputLabel htmlFor="component-outlined">Day Setpoint</InputLabel>
            <OutlinedInput
              sx={{ textAlign: "end" }}
              id="component-outlined"
              value={greenhouseState?.recipes.environment.day_temperature}
              onChange={e => props.onCommand({environment: { recipe: { day_temperature: parseInt(e.target.value) }}})}
              type="number"
              label="Day Setpoint"
              endAdornment={<InputAdornment position="start">°C</InputAdornment>}
            />
          </FormControl>
        </Loadable>
        <Loadable isLoading={props.queuedCommands?.environment?.recipe?.night_temperature !== undefined ?? false}>
          <FormControl>
            <InputLabel htmlFor="component-outlined">Night Setpoint</InputLabel>
            <OutlinedInput
              sx={{ textAlign: "end" }}
              id="component-outlined"
              value={greenhouseState?.recipes.environment.night_temperature}
              onChange={e => props.onCommand({environment: { recipe: { night_temperature: parseInt(e.target.value) }}})}
              type="number"
              label="Night Setpoint"
              endAdornment={<InputAdornment position="start">°C</InputAdornment>}
            />
          </FormControl>
        </Loadable>
        <Typography variant='h1' sx={styles.manualControlHeader}>
          Manual Control
        </Typography>
        <Loadable isLoading={props.queuedCommands?.environment?.heat !== undefined ?? false}>
          <FormControlLabel
            value="auto"
            control={<Switch
              checked={greenhouseState?.actuator.heater ?? false}
              onChange={e => props.onCommand({environment: { heat: e.target.checked }})}
            />}
            label="Heater"
            disabled={greenhouseState?.control.environment.mode !== ControlMode.Manual}
          />
        </Loadable>
        <Loadable isLoading={props.queuedCommands?.environment?.vent !== undefined ?? false}>
          <FormControlLabel
            value="auto"
            control={<Switch
              checked={greenhouseState?.actuator.ventilator ?? false}
              onChange={e => props.onCommand({environment: { vent: e.target.checked }})}
            />}
            label="Ventilator"
            disabled={greenhouseState?.control.environment.mode !== ControlMode.Manual}
          />
        </Loadable>
        <Loadable isLoading={props.queuedCommands?.environment?.exhaust !== undefined ?? false}>
          <FormControlLabel
            value="auto"
            control={<Switch
              checked={greenhouseState?.actuator.exhaust ?? false}
              onChange={e => props.onCommand({environment: { exhaust: e.target.checked }})}
            />}
            label="Exhaust Fan"
            disabled={greenhouseState?.control.environment.mode !== ControlMode.Manual}
          />
        </Loadable>
      </div>
    </Dialog>
  )
}

export default Environment
