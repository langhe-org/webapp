import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import { ControlMode, GreenhouseState } from '../types/greenhouse-state';
import Dialog from './dialog';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';

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
  open: boolean,
  greenhouseState?: GreenhouseState,
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
            // onChange={onChange}
          />}
          label="Auto Mode"
        />
        <Typography variant='h1' sx={styles.manualControlHeader}>
          Manual Control
        </Typography>

        { greenhouseState?.actuator.valves.map((valve, i) => (
          <FormControlLabel
            key={i}
            value="auto"
            control={<Switch
              checked={valve}
              // onChange={onChange}
            />}
            label={`Zone ${i + 1}`}
          />
        )) }
      </div>
    </Dialog>
  )
}

export default Irrigation
