import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch'
import { ControlMode, GreenhouseState } from '../../types/greenhouse-state';
import Dialog from '../dialog/dialog';
import { Command, IrrigationRecipeCommand } from '../../types/command';
import Loadable from '../loadable';
import IrrigationDay from './day';
import styles from './irrigation.module.css';
import EditDay from './edit-day';
import { useState } from 'react';

interface Props {
  onClose: () => void;
  onCommand: (command: Command) => void;
  open: boolean,
  greenhouseState?: GreenhouseState,
  queuedCommands?: Command,
}

const Irrigation = (props: Props) => {
  const [editingZone, setEditingZone] = useState<number | undefined>(undefined);
  const greenhouseState = props.greenhouseState;

  return (
    <Dialog {...props} rootClass={styles.dialog} title="Irrigation">
      <div className={styles.main}>
        <div className={styles.switchContainer}>
          <div className={styles.modeLabel}>AUTO MODE</div>
          <Loadable isLoading={props.queuedCommands?.irrigation?.mode !== undefined ?? false}>
            <Switch
              checked={greenhouseState?.control.irrigation.mode === ControlMode.Automatic}
              onChange={e => props.onCommand({irrigation: { mode: e.target.value ? ControlMode.Automatic : ControlMode.Manual }})}
            />
          </Loadable>
        </div>

        <div>
          { greenhouseState?.recipes.irrigation.zones.map((zone, i) => (
            <Loadable key={i} isLoading={props.queuedCommands?.irrigation?.recipes?.[i] !== undefined ?? false}>
              <IrrigationDay
                recipeZone={zone}
                onClick={() => {
                  setEditingZone(i);
                }}
              ></IrrigationDay>
            </Loadable>
          )) }
        </div>

        <Typography className={styles.manualControlLabel} variant='h2' >
          Manual Control
        </Typography>

        { greenhouseState?.actuator.valves.map((valve, i) => (
          <div key={i} className={styles.switchContainer}>
            <div className={styles.modeLabel}>{greenhouseState.recipes.irrigation.zones[i].name}</div>
            <Loadable key={i} isLoading={props.queuedCommands?.irrigation?.trigger_valve?.[i] !== undefined ?? false}>
              <Switch
                checked={valve}
                onChange={e => {
                  let trigger_valve: (boolean | undefined)[] = [];
                  trigger_valve[i] = e.target.checked;
                  props.onCommand({irrigation: { trigger_valve }});
                }}
              />
            </Loadable>
          </div>
        )) }

        { props.greenhouseState !== undefined && editingZone !== undefined && (
          <EditDay
            recipeZone={{...props.greenhouseState.recipes.irrigation.zones[editingZone]}}
            onClose={() => {
              setEditingZone(undefined);
            }}
            onChange={recipeCommand => {
              let recipes: IrrigationRecipeCommand[] = [];
              recipes[editingZone] = recipeCommand;
              props.onCommand({irrigation: { recipes }});
              setEditingZone(undefined);
            }}
          />
        ) }
      </div>
    </Dialog>
  )
}

export default Irrigation
