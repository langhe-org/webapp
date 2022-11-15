import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import { ControlMode, GreenhouseState } from '../types/greenhouse-state'
import Dialog from './dialog/dialog';
import Loadable from './loadable';
import { Command } from '../types/command';
import { timeWithoutSeconds } from '../utils/time';

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
    <Dialog {...props} title="Lighting">
      { greenhouseState && (
        <div style={styles.main}>
          <Loadable isLoading={props.queuedCommands?.lighting?.mode !== undefined ?? false}>
            <FormControlLabel
              value="auto"
              control={<Switch
                checked={greenhouseState?.control.lighting.mode === ControlMode.Automatic}
                onChange={e => props.onCommand({lighting: { mode: e.target.checked ? ControlMode.Automatic : ControlMode.Manual }})}
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
                value={timeWithoutSeconds(greenhouseState.recipes.lighting.start_at)}
                onChange={e => props.onCommand({lighting: { recipe: {start_at: e.target.value} }})}
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
                value={timeWithoutSeconds(greenhouseState.recipes.lighting.stop_at)}
                onChange={e => props.onCommand({lighting: { recipe: {stop_at: e.target.value} }})}
                type="time"
                label="Night Off"
              />
            </FormControl>
          </Loadable>
          <Typography className="manual-control-heading" variant='h2'>
            Manual Control
          </Typography>
          <Loadable isLoading={props.queuedCommands?.lighting?.light !== undefined ?? false}>
            <FormControlLabel
              value="auto"
              control={<Switch
                checked={greenhouseState?.actuator.lights ?? false}
                onChange={e => props.onCommand({lighting: { light: e.target.checked }})}
              />}
              disabled={greenhouseState?.control.lighting.mode !== ControlMode.Manual}
              label="LEDs (all)"
            />
          </Loadable>
        </div>
      ) }
    </Dialog>
  )
}

export default Lighting
