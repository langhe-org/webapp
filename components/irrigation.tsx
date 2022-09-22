import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import { ControlMode, GreenhouseState } from '../types/greenhouse-state';
import Dialog from './dialog';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import { localTimeToUtc, utcTimeToLocal } from '../utils/time';
import { Command, IrrigationRecipeCommand } from '../types/command';
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

const Irrigation = (props: Props) => {
  const greenhouseState = props.greenhouseState;

  return (
    <Dialog {...props}>
      <div style={styles.main}>
        <IconButton sx={styles.backButton} onClick={props.onClose}>
          <Icon>close</Icon>
        </IconButton>
        <Typography variant='h1' sx={{ fontSize: 60 }}>
          Irrigation
        </Typography>
        <FormControlLabel
          value="auto"
          control={<Switch
            checked={greenhouseState?.control.irrigation.mode === ControlMode.Automatic}
            onChange={e => props.onCommand({irrigation: { mode: e.target.checked ? ControlMode.Automatic : ControlMode.Manual }})}
          />}
          label="Auto Mode"
        />
        {greenhouseState?.recipes.irrigation.zones.map((zone, i) => (
          <Stack key={i} spacing={2}>
            <Stack direction="row" spacing={2}>
              <Loadable isLoading={props.queuedCommands?.irrigation?.recipes?.[i]?.time !== undefined ?? false}>
                <TextField
                  type="time"
                  label="Start time"
                  value={utcTimeToLocal(zone.time)}
                  onChange={e => {
                    const recipes: IrrigationRecipeCommand[] = [];
                    recipes[i] = { time: localTimeToUtc(e.target.value) };
                    props.onCommand({irrigation: { recipes }})
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Loadable>
              <Loadable isLoading={props.queuedCommands?.irrigation?.recipes?.[i]?.duration !== undefined ?? false}>
                <TextField
                  type="number"
                  label="Duration"
                  value={zone.duration}
                  onChange={e => {
                    const recipes: IrrigationRecipeCommand[] = [];
                    recipes[i] = { duration: parseInt(e.target.value) };
                    props.onCommand({irrigation: { recipes }})
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        Seconds
                      </InputAdornment>
                    ),
                  }}
                />
              </Loadable>
            </Stack>
          </Stack>
        ))}

        <Typography variant='h1' sx={styles.manualControlHeader}>
          Manual Control
        </Typography>

        { greenhouseState?.actuator.valves.map((valve, i) => (
          <Loadable isLoading={false} key={i}>
            <FormControlLabel
              value="auto"
              control={<Switch
                checked={valve}
                onChange={e => {
                  // TODO:
                  // if(e.target.checked) {
                  //   props.onCommand({irrigation: { trigger_valve: i }})
                  // }
                }}
              />}
              disabled={greenhouseState?.control.irrigation.mode !== ControlMode.Manual}
              label={`Zone ${i + 1}`}
            />
          </Loadable>
        )) }
      </div>
    </Dialog>
  )
}

export default Irrigation
