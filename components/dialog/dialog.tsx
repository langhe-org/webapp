import * as React from 'react';
import styles from "./dialog.module.css";
import MuiDialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { TransitionProps } from '@mui/material/transitions';
import Slide from '@mui/material/Slide';
import { ReactNode } from 'react';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';

interface Props {
  onClose: () => void,
  open: boolean,
  children: ReactNode,
  rootClass?: string,
  title: string,
}

export default function Dialog(props: Props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <MuiDialog
      fullScreen={fullScreen}
      open={props.open}
      onClose={props.onClose}
      TransitionComponent={Transition}
      classes={{
        paper: `${styles.main} ${props.rootClass}`
      }}
    >
      <DialogContent className={styles.content}>
        <div className={styles.header}>
          <IconButton onClick={props.onClose}>
            <Icon>chevron_left</Icon>
          </IconButton>
          <Typography className={styles.title}>{props.title}</Typography>
        </div>
        {props.children}
      </DialogContent>
    </MuiDialog>
  );
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
