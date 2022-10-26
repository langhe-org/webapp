import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import MenuItem from '@mui/material/MenuItem'
import { ControlMode, GreenhouseState, SulfurIntensity, sulfur_intensity_display } from '../types/greenhouse-state';
import Dialog from './dialog';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import { Command } from '../types/command';
import Loadable from './loadable';
import { TextField } from '@mui/material';

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
  },
  sulfurIntensity: {
    width: "300px",
  },
};

interface Props {
  onClose: () => void;
  onCommand: (command: Command) => void;
  open: boolean,
  greenhouseState?: GreenhouseState,
  queuedCommands?: Command,
}

const PestControl = (props: Props) => {
  const greenhouseState = props.greenhouseState;

  return (
    <Dialog {...props}>
      { greenhouseState && (
        <div style={styles.main}>
          <IconButton sx={styles.backButton} onClick={props.onClose}>
            <Icon>close</Icon>
          </IconButton>
          <Typography variant='h1' sx={{ fontSize: 60 }}>
            Pest Control
          </Typography>
          <Loadable isLoading={props.queuedCommands?.ipm?.mode !== undefined ?? false}>
            <FormControlLabel
              value="auto"
              control={<Switch
                checked={greenhouseState?.control.ipm.mode === ControlMode.Automatic}
                onChange={e => props.onCommand({ipm: { mode: e.target.checked ? ControlMode.Automatic : ControlMode.Manual }})}
              />}
              label="Auto Mode"
            />
          </Loadable>
          <Loadable isLoading={props.queuedCommands?.ipm?.recipe?.intensity !== undefined ?? false}>
            <TextField
              label="Sulfur Level"
              variant="filled"
              sx={styles.sulfurIntensity}
              select
              value={greenhouseState?.recipes.ipm.intensity}
              onChange={e => props.onCommand({ipm: { recipe: { intensity: e.target.value as SulfurIntensity } }})}
            >
              <MenuItem value={SulfurIntensity.off}>{sulfur_intensity_display(SulfurIntensity.off)}</MenuItem>
              <MenuItem value={SulfurIntensity.low}>{sulfur_intensity_display(SulfurIntensity.low)}</MenuItem>
              <MenuItem value={SulfurIntensity.medium}>{sulfur_intensity_display(SulfurIntensity.medium)}</MenuItem>
              <MenuItem value={SulfurIntensity.high}>{sulfur_intensity_display(SulfurIntensity.high)}</MenuItem>
            </TextField>
          </Loadable>
        </div>
      )}
    </Dialog>
  )
}

export default PestControl
