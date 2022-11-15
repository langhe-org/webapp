import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch'
import { ControlMode, GreenhouseState } from '../../types/greenhouse-state'
import Dialog from '../dialog/dialog';
import { Command } from '../../types/command';
import Loadable from '../loadable';
import { useContext } from 'react';
import { UserContext } from '../../contexts/user';
import TemperatureSlider from './temperature-slider';
import styles from './environment.module.css';

interface Props {
  onClose: () => void;
  onCommand: (command: Command) => void;
  open: boolean,
  greenhouseState?: GreenhouseState,
  queuedCommands?: Command,
}

const Environment = (props: Props) => {
  const greenhouseState = props.greenhouseState;
  const { user } = useContext(UserContext);

  return (
    <Dialog {...props} title="Environment" rootClass={styles.dialog}>
      { user && <div className={styles.main}>
        <div className="switch-container">
          <div className={styles.modeLabel}>AUTO MODE</div>
          <Loadable isLoading={props.queuedCommands?.environment?.mode !== undefined ?? false}>
            <Switch
              checked={greenhouseState?.control.environment.mode === ControlMode.Automatic}
              onChange={e => props.onCommand({environment: { mode: e.target.checked ? ControlMode.Automatic : ControlMode.Manual }})}
            />
          </Loadable>
        </div>
        <Loadable isLoading={props.queuedCommands?.environment?.recipe?.day_temperature !== undefined ?? false}>
          { greenhouseState?.recipes.environment.day_temperature !== undefined && (
            <TemperatureSlider
              label="Day Setpoint"
              icon="light_mode"
              value={greenhouseState.recipes.environment.day_temperature || 0}
              onChange={day_temperature => {
                props.onCommand({environment: { recipe: { day_temperature }}});
              }}
            />
          )}
        </Loadable>
        <Loadable isLoading={props.queuedCommands?.environment?.recipe?.night_temperature !== undefined ?? false}>
          { greenhouseState?.recipes.environment.night_temperature !== undefined && (
            <TemperatureSlider
              label="Night Setpoint"
              icon="nights_stay"
              value={greenhouseState.recipes.environment.night_temperature || 0}
              onChange={night_temperature => {
                props.onCommand({environment: { recipe: { night_temperature }}});
              }}
            />
          )}
        </Loadable>
        <Typography className="manual-control-heading" variant='h2'>
          Manual Control
        </Typography>
        <div className="switch-container">
          <div className={styles.modeLabel}>Heater</div>
          <Loadable isLoading={props.queuedCommands?.environment?.heater !== undefined ?? false}>
           <Switch
              checked={greenhouseState?.actuator.heater ?? false}
              onChange={e => props.onCommand({environment: { heater: e.target.checked }})}
            />
          </Loadable>
        </div>
        <div className="switch-container">
          <div className={styles.modeLabel}>Ventilator</div>
          <Loadable isLoading={props.queuedCommands?.environment?.ventilator !== undefined ?? false}>
            <Switch
              checked={greenhouseState?.actuator.ventilator ?? false}
              onChange={e => props.onCommand({environment: { ventilator: e.target.checked }})}
            />
          </Loadable>
        </div>
        <div className="switch-container">
          <div className={styles.modeLabel}>Exhaust Fan</div>
          <Loadable isLoading={props.queuedCommands?.environment?.exhaust !== undefined ?? false}>
            <Switch
              checked={greenhouseState?.actuator.exhaust ?? false}
              onChange={e => props.onCommand({environment: { exhaust: e.target.checked }})}
            />
          </Loadable>
        </div>
      </div> }
    </Dialog>
  )
}

export default Environment
