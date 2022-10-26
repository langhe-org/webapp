import { IrrigationRecipeZone } from '../../types/greenhouse-state';
import { Command, IrrigationRecipeCommand } from '../../types/command';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Drawer from '@mui/material/Drawer';
import styles from './edit-day.module.css';
import { ChangeEvent, useState } from 'react';
import { millisecondsToMinutes, minutesToMilliseconds, timeWithoutSeconds } from '../../utils/time';
import lodash from 'lodash'

interface Props {
  recipeZone: IrrigationRecipeZone,
  onClose: () => void;
  onChange: (recipeCommand: IrrigationRecipeCommand) => void;
}

const EditDay = (props: Props) => {
  const [zone, setZone] = useState({...props.recipeZone});

  const onSave = () => {
    const recipe: IrrigationRecipeCommand = {};
    if(zone.time !== props.recipeZone.time)
      recipe.time = zone.time;
    if(zone.duration !== props.recipeZone.duration)
      recipe.duration = zone.duration;
    if(zone.monday !== props.recipeZone.monday)
      recipe.monday = zone.monday;
    if(zone.tuesday !== props.recipeZone.tuesday)
      recipe.tuesday = zone.tuesday;
    if(zone.wednesday !== props.recipeZone.wednesday)
      recipe.wednesday = zone.wednesday;
    if(zone.thursday !== props.recipeZone.thursday)
      recipe.thursday = zone.thursday;
    if(zone.friday !== props.recipeZone.friday)
      recipe.friday = zone.friday;
    if(zone.saturday !== props.recipeZone.saturday)
      recipe.saturday = zone.saturday;
    if(zone.sunday !== props.recipeZone.sunday)
      recipe.sunday = zone.sunday;

    // don't trigger onChange if empty
    if(lodash.isEmpty(recipe))
      props.onClose();
    else
      props.onChange(recipe);
  };

  return (
    <Drawer
      // keep drawer on top of dialog https://mui.com/material-ui/customization/z-index/
      style={{zIndex: 1301}}
      anchor="bottom"
      open
      onClose={props.onClose}
    >
      <div className={styles.main}>
        <TextField
          label="Name of Zone"
          variant="filled"
          value={zone.name}
          onChange={e => setZone({...zone, name: e.target.value})}
        />
        <ToggleButtonGroup
          color="primary"
          aria-label="Weekdays"
        >
          <ToggleButton
            value="mon"
            selected={zone.monday}
            onClick={() => {
              setZone({...zone, monday: !zone.monday});
            }}
          >MON</ToggleButton>
          <ToggleButton
            value="tue"
            selected={zone.tuesday}
            onClick={() => {
              setZone({...zone, tuesday: !zone.tuesday});
            }}
          >TUE</ToggleButton>
          <ToggleButton
            value="wed"
            selected={zone.wednesday}
            onClick={() => {
              setZone({...zone, wednesday: !zone.wednesday});
            }}
          >WED</ToggleButton>
          <ToggleButton
            value="thu"
            selected={zone.thursday}
            onClick={() => {
              setZone({...zone, thursday: !zone.thursday});
            }}
          >THU</ToggleButton>
          <ToggleButton
            value="fri"
            selected={zone.friday}
            onClick={() => {
              setZone({...zone, friday: !zone.friday});
            }}
          >FRI</ToggleButton>
          <ToggleButton
            value="sat"
            selected={zone.saturday}
            onClick={() => {
              setZone({...zone, saturday: !zone.saturday});
            }}
          >SAT</ToggleButton>
          <ToggleButton
            value="sun"
            selected={zone.sunday}
            onClick={() => {
              setZone({...zone, sunday: !zone.sunday});
            }}
          >SUN</ToggleButton>
        </ToggleButtonGroup>
        <TextField
          type="time"
          label="Start Time"
          variant="filled"
          value={timeWithoutSeconds(zone.time)}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const time = e.target.value;
            setZone({...zone, time});
          }}
        />
        <TextField
          type="number"
          // min="0"
          // max="?"
          label="Duration"
          variant="filled"
          value={millisecondsToMinutes(zone.duration)}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const duration = minutesToMilliseconds(parseInt(e.target.value));
            setZone({...zone, duration});
          }}
        />
        <Button
          variant="contained"
          onClick={onSave}
        >Save</Button>
      </div>
    </Drawer>
  )
}

export default EditDay;
