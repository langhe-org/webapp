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
import { utcTimeToLocal } from '../utils/time';

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
        {greenhouseState?.recipes.irrigation.zones.map((zone, i) => (
          <Stack key={i} spacing={2}>
            <Stack direction="row" spacing={2}>
              <Typography variant='h5'>
                Irrigation Window
              </Typography>
              <TextField
                type="time"
                label="From"
                value={utcTimeToLocal(zone.start_window)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                type="time"
                label="To"
                value={utcTimeToLocal(zone.stop_window)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Stack>
            <Stack direction="row" spacing={2}>
              <Typography variant='h5'>

              </Typography>
              <TextField
                type="number"
                label="Duration"
                value={zone.duration}
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
              <TextField
                select
                label="Frequency"
                value={zone.frequency}
                fullWidth
                // onChange={handleChange}
              >
                <MenuItem value={6 * 60 * 60}>6 Hours</MenuItem>
                <MenuItem value={12 * 60 * 60}>12 Hours</MenuItem>
                <MenuItem value={24 * 60 * 60}>24 Hours</MenuItem>
                <MenuItem value={48 * 60 * 60}>48 Hours</MenuItem>
              </TextField>
            </Stack>
          </Stack>
        ))}

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
