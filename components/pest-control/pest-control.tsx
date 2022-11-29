import Switch from '@mui/material/Switch'
import { ControlMode, GreenhouseState, SulfurIntensity, sulfur_intensity_display } from '../../types/greenhouse-state';
import Dialog from '../dialog/dialog';
import { Command } from '../../types/command';
import Loadable from '../loadable';
import Typography from '@mui/material/Typography';
import styles from "./pest-control.module.css";
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import Disableable from '../disableable';

interface Props {
  onClose: () => void;
  onCommand: (command: Command) => void;
  open: boolean,
  greenhouseState?: GreenhouseState,
  queuedCommands?: Command,
}

const PestControl = (props: Props) => {
  const greenhouseState = props.greenhouseState;

  const isAuto: () => boolean = () => {
    return greenhouseState?.control.ipm.mode === ControlMode.Automatic;
  }
  const isManual: () => boolean = () => {
    return greenhouseState?.control.ipm.mode === ControlMode.Manual;
  }

  return (
    <Dialog {...props} title="Pest Control" rootClass={styles.dialog}>
      { greenhouseState && (
        <div className={styles.main}>
          <div className="switch-container">
            <div>AUTO MODE</div>
            <Loadable isLoading={props.queuedCommands?.ipm?.mode !== undefined ?? false}>
              <Switch
                checked={greenhouseState?.control.ipm.mode === ControlMode.Automatic}
                onChange={e => props.onCommand({ipm: { mode: e.target.checked ? ControlMode.Automatic : ControlMode.Manual }})}
              />
            </Loadable>
          </div>
          <Disableable isDisabled={isManual()}>
            <Loadable isLoading={props.queuedCommands?.ipm?.recipe?.intensity !== undefined ?? false}>
              <Typography>Sulfur Level</Typography>
              {/* <Typography className={styles.toggleButtonGroupLabel}>Sulfur Level</Typography> */}
              <ToggleButtonGroup
                aria-label="sulfur level"
                classes={{
                  root: styles.toggleButtonsGroup
                }}
                disabled={isManual()}
              >
                <ToggleButton
                  value={SulfurIntensity.low}
                  selected={greenhouseState.recipes.ipm.intensity === SulfurIntensity.low}
                  onClick={() => {
                    props.onCommand({ipm: { recipe: { intensity: SulfurIntensity.low } }})
                  }}
                  classes={{
                    root: styles.toggleButtonRoot
                  }}
                >
                  {sulfur_intensity_display(SulfurIntensity.low)}
                  <br />
                  45 mins
                </ToggleButton>
                <ToggleButton
                  value={SulfurIntensity.medium}
                  selected={greenhouseState.recipes.ipm.intensity === SulfurIntensity.medium}
                  onClick={() => {
                    props.onCommand({ipm: { recipe: { intensity: SulfurIntensity.medium } }})
                  }}
                  classes={{
                    root: styles.toggleButtonRoot
                  }}
                >
                  {sulfur_intensity_display(SulfurIntensity.medium)}
                  <br />
                  90 mins
                </ToggleButton>
                <ToggleButton
                  value={SulfurIntensity.high}
                  selected={greenhouseState.recipes.ipm.intensity === SulfurIntensity.high}
                  onClick={() => {
                    props.onCommand({ipm: { recipe: { intensity: SulfurIntensity.high } }})
                  }}
                  classes={{
                    root: styles.toggleButtonRoot
                  }}
                >
                  {sulfur_intensity_display(SulfurIntensity.high)}
                  <br />
                  180 mins
                </ToggleButton>
              </ToggleButtonGroup>
            </Loadable>
          </Disableable>
          <Disableable isDisabled={isAuto()}>
            <Typography className="manual-control-heading" variant='h2' >
              Manual Control
            </Typography>
            <div className="switch-container">
              <div>Sulfur Evaporator</div>
                <Loadable isLoading={props.queuedCommands?.ipm?.sulfur !== undefined ?? false}>
                  <Switch
                    checked={greenhouseState.actuator.sulfur}
                    onChange={e => props.onCommand({ipm: { sulfur: e.target.checked }})}
                    disabled={isAuto()}
                  />
                </Loadable>
            </div>
          </Disableable>
        </div>
      )}
    </Dialog>
  )
}

export default PestControl
