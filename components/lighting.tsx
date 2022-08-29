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
import { localTimeToUtc, utcTimeToLocal } from '../utils/time';

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
      { greenhouseState && (
        <div style={styles.main}>
          <IconButton sx={styles.backButton} onClick={props.onClose}>
            <Icon>close</Icon>
          </IconButton>
          <Typography variant='h1' sx={{ fontSize: 60 }}>
            Lighting
          </Typography>
          <Loadable isLoading={props.queuedCommands?.lighting?.mode !== undefined ?? false}>
            <FormControlLabel
              value="auto"
              control={<Switch
                checked={greenhouseState?.control.lighting.mode === ControlMode.Automatic}
                onChange={e => props.onCommand({lighting: { mode: e.target.value ? ControlMode.Automatic : ControlMode.Manual }})}
              />}
              label="Auto Mode"
            />
          </Loadable>
          <Loadable isLoading={props.queuedCommands?.lighting?.recipe?.start_at !== undefined ?? false}>
            <FormControl>
              <InputLabel shrink htmlFor="component-outlined">Morning On</InputLabel>
              <OutlinedInput
                sx={{ textAlign: "end" }}
                id="component-outlined"
                value={utcTimeToLocal(greenhouseState?.recipes.lighting.start_at)}
                onChange={e => props.onCommand({lighting: { recipe: {start_at: localTimeToUtc(e.target.value)} }})}
                type="time"
                label="Morning On"
              />
            </FormControl>
          </Loadable>
          <Loadable isLoading={props.queuedCommands?.lighting?.recipe?.stop_at !== undefined ?? false}>
            <FormControl>
              <InputLabel shrink htmlFor="component-outlined">Night Off</InputLabel>
              <OutlinedInput
                sx={{ textAlign: "end" }}
                id="component-outlined"
                value={utcTimeToLocal(greenhouseState.recipes.lighting.stop_at)}
                onChange={e => props.onCommand({lighting: { recipe: {stop_at: localTimeToUtc(e.target.value)} }})}
                type="time"
                label="Night Off"
              />
            </FormControl>
          </Loadable>
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
      ) }
    </Dialog>
  )
}

export default Lighting
