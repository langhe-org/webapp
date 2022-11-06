import { Icon, Typography } from '@mui/material';
import ButtonBase from '@mui/material/ButtonBase';
// import InputBase from '@mui/material/InputBase';
import styles from './duration.module.css';

interface Props {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

const Duration = (props: Props) => {
  const onIncrease = () => {
    props.onChange(props.value + 1);
  };

  const onDecrease = () => {
    props.onChange(props.value - 1);
  };

  // const onInputChange = (e) => {
  //   props.onChange(parseInt(e.target.value));
  // };

  return (
    <div className={styles.main}>
        <ButtonBase
          className={styles.decrease}
          onClick={onDecrease}
          disabled={props.value <= (props.min || 0)}
        >
            <Icon>chevron_left</Icon>
        </ButtonBase>
        <Typography className={styles.text}>{props.value} mins</Typography>
        {/* <InputBase
          value={isNaN(props.value) ? "" : props.value}
          endAdornment="mins"
          onChange={onInputChange}
        /> */}
        <ButtonBase
          className={styles.increase}
          onClick={onIncrease}
          disabled={props.value >= (props.max || Infinity)}
        >
            <Icon>chevron_right</Icon>
        </ButtonBase>
    </div>
  )
}

export default Duration;
