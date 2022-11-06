import Typography from '@mui/material/Typography';
import { IrrigationRecipeZone } from '../../types/greenhouse-state';
import Icon from '@mui/material/Icon';
import styles from './day.module.css';
import Divider from '@mui/material/Divider';
import ButtonBase from '@mui/material/ButtonBase';
import { millisecondsToMinutes, timeDisplay } from '../../utils/time';

interface Props {
  onClick: () => void;
  recipeZone?: IrrigationRecipeZone,
}

const IrrigationDay = (props: Props) => {
  const zone = props.recipeZone;

  return (
    <>
      <ButtonBase className={styles.main} onClick={props.onClick}>
        <Typography className={styles.zoneName} color="primary">{zone?.name}</Typography>
        <div className={styles.days}>
          <div className={`${styles.day} ${zone?.monday ? styles.activeDay : ''}`}>
            <div>Mon</div>
            <Icon className={styles.circle}>circle</Icon>
          </div>
          <div className={`${styles.day} ${zone?.tuesday ? styles.activeDay : ''}`}>
            <div>Tue</div>
            <Icon className={styles.circle}>circle</Icon>
          </div>
          <div className={`${styles.day} ${zone?.wednesday ? styles.activeDay : ''}`}>
            <div>Wed</div>
            <Icon className={styles.circle}>circle</Icon>
          </div>
          <div className={`${styles.day} ${zone?.thursday ? styles.activeDay : ''}`}>
            <div>Thu</div>
            <Icon className={styles.circle}>circle</Icon>
          </div>
          <div className={`${styles.day} ${zone?.friday ? styles.activeDay : ''}`}>
            <div>Fri</div>
            <Icon className={styles.circle}>circle</Icon>
          </div>
          <div className={`${styles.day} ${zone?.saturday ? styles.activeDay : ''}`}>
            <div>Sat</div>
            <Icon className={styles.circle}>circle</Icon>
          </div>
          <div className={`${styles.day} ${zone?.sunday ? styles.activeDay : ''}`}>
            <div>Sun</div>
            <Icon className={styles.circle}>circle</Icon>
          </div>
        </div>
        <div className={styles.start_time}>
          <Typography className="label" color="#00000099">Start Time</Typography>
          <Typography className={styles.value}>{zone ? timeDisplay(zone.time) : ""}</Typography>
        </div>
        <div className={styles.duration}>
          <Typography className="label" color="#00000099">Duration</Typography>
          <Typography className={styles.value}>{zone? millisecondsToMinutes(zone.duration) : ""} Mins</Typography>
        </div>
      </ButtonBase>
      <Divider />
    </>
  )
}

export default IrrigationDay
