import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch'
import { ControlMode, GreenhouseState } from '../../types/greenhouse-state'
import Dialog from '../dialog/dialog';
import Loadable from '../loadable';
import { Command } from '../../types/command';
import { timeWithoutSeconds, timeWithSeconds } from '../../utils/time';
import TimeRelatedInput from "../time-related-input";
import styles from "./lighting.module.css";
import Divider from '@mui/material/Divider';
import Disableable from '../disableable';


interface Props {
  onClose: () => void;
  onCommand: (command: Command) => void;
  open: boolean,
  greenhouseState?: GreenhouseState,
  queuedCommands?: Command,
}

const Lighting = (props: Props) => {
  const greenhouseState = props.greenhouseState;

  const isAuto: () => boolean = () => {
    return greenhouseState?.control.lighting.mode === ControlMode.Automatic;
  }
  const isManual: () => boolean = () => {
    return greenhouseState?.control.lighting.mode === ControlMode.Manual;
  }

  return (
    <Dialog {...props} rootClass={styles.dialog} title="Lighting">
      { greenhouseState && (
        <div className={styles.main}>
          <div className="switch-container">
            <div>AUTO MODE</div>
            <Loadable isLoading={props.queuedCommands?.lighting?.mode !== undefined ?? false}>
              <Switch
                checked={greenhouseState?.control.lighting.mode === ControlMode.Automatic}
                onChange={e => props.onCommand({lighting: { mode: e.target.checked ? ControlMode.Automatic : ControlMode.Manual }})}
              />
            </Loadable>
          </div>
          <Disableable isDisabled={isManual()}>
            <Typography className={styles.supplemental}>Supplemental Lighting Period</Typography>
            <Loadable isLoading={props.queuedCommands?.lighting?.recipe?.start_at !== undefined ?? false}>
              <label className={styles.inputLabel}>
                <span className="label">Morning ON</span>
                <TimeRelatedInput
                  type="time"
                  value={timeWithoutSeconds(greenhouseState.recipes.lighting.start_at)}
                  onChange={start_at => props.onCommand({lighting: { recipe: { start_at: timeWithSeconds(start_at) }}})}
                  disabled={isManual()}
                />
              </label>
              <Divider />
            </Loadable>
            <Loadable isLoading={props.queuedCommands?.lighting?.recipe?.stop_at !== undefined ?? false}>
              <label className={styles.inputLabel}>
                <span className="label">Night OFF</span>
                <TimeRelatedInput
                  type="time"
                  value={timeWithoutSeconds(greenhouseState.recipes.lighting.stop_at)}
                  onChange={stop_at => props.onCommand({lighting: { recipe: { stop_at: timeWithSeconds(stop_at) }}})}
                />
              </label>
              <Divider /> 
            </Loadable>
          </Disableable>
          <Disableable isDisabled={isAuto()}>
            <Typography className="manual-control-heading" variant='h2'>
              Manual Control
            </Typography>
            <div className="switch-container">
              <div>LEDs ALL</div>
              <Loadable isLoading={props.queuedCommands?.lighting?.light !== undefined ?? false}>
                <Switch
                  checked={greenhouseState?.actuator.lights ?? false}
                  onChange={e => props.onCommand({lighting: { light: e.target.checked }})}
                  disabled={isAuto()}
                />
              </Loadable>
            </div>
          </Disableable>
        </div>
      ) }
    </Dialog>
  )
}

export default Lighting
