import { useContext, useEffect, useState } from 'react';
import Slider from '@mui/material/Slider';
import styles from './temperature-slider.module.css';
import Divider from '@mui/material/Divider';
import Icon from '@mui/material/Icon';
import Typography from '@mui/material/Typography';
import { UserContext } from '../../contexts/user';
import { temperatureFromMetric, temperatureToMetric } from '../../utils/temperature';

const MAX_TEMP = 95;
const MIN_TEMP = 42;

interface Props {
  label: string,
  icon: string,
  value: number,
  onChange: (value: number) => void;
  disabled?: boolean;
}

const TemperatureSlider = (props: Props) => {
  const { user } = useContext(UserContext);
  const [value, setValue] = useState<number>(props.value);

  useEffect(() => {
    if(value && user) {
      setValue(Math.round(temperatureFromMetric(
        props.value,
        user.units
      )))
    }
  }, [props.value, user]);

  return (
    <div>
      <div className={styles.topRow}>
        <Typography className={styles.label}>{props.label}</Typography>
        <Icon>{props.icon}</Icon>
      </div>
      <Slider
        value={value}
        step={1}
        min={MIN_TEMP}
        max={MAX_TEMP}
        valueLabelDisplay="on"
        disabled={props.disabled}
        onChange={e => {
          setValue((e.target as any).value)
        }}
        onChangeCommitted={(_, value) => {
          if(user) {
            value = temperatureToMetric(
              value as number,
              user.units
            );
            props.onChange(value as number);
          }
        }}
        classes={{
          rail: styles.sliderRail,
          track: styles.sliderTrack,
          thumb: styles.sliderThumb,
          active: styles.sliderActive,
          valueLabel: styles.sliderValueLabel,
        }}
      />
      <div className={styles.minMax}>
        <span className={styles.min}>{MIN_TEMP} °F</span>
        <span className={styles.max}>{MAX_TEMP} °F</span>
      </div>
      <Divider />
    </div>
  )
}

export default TemperatureSlider
