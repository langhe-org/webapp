import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem'
import { Units, User } from '../types/user'
import { Greenhouse } from '../types/greenhouse'
import Dialog from './dialog'
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import { useContext, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { api } from '../services/api';
import { UserContext } from '../contexts/user';
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
  }
};

interface Props {
  onClose: () => void;
  open: boolean,
  greenhouse?: Greenhouse,
}

const Settings = (props: Props) => {
  const globalUserContext = useContext(UserContext);
  const [user, setUser] = useState<User | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // set user after load
  useEffect(() => {
    setUser(globalUserContext.user);
  }, [globalUserContext]);

  const onSave = () => {
    setIsLoading(true);
    api(`/account`, "PATCH", user)
      .then(() => {
        globalUserContext.setUser(user!);
        setIsLoading(false);
      })
      .catch(() => {
        alert("Error saving changes");
        location.reload();
      })
  }

  return (
    <Dialog {...props}>
      <Loadable isLoading={isLoading}>
        <div style={styles.main}>
          { user && <>
            <IconButton sx={styles.backButton} onClick={props.onClose}>
              <Icon>close</Icon>
            </IconButton>
            <Typography variant='h1' sx={{ fontSize: 60 }}>
              Settings
            </Typography>
            <TextField
              label="Users Name"
              variant="filled"
              value={user?.name ?? ""}
              onChange={e => setUser({
                ...user,
                name: e.target.value
              })}
            />
            <TextField
              label="Greenhouse Identifier"
              variant="filled"
              value={props.greenhouse?.id ?? ""}
              disabled
            />
            <TextField
              label="Location"
              variant="filled"
              value={props.greenhouse?.location_name ?? ""}
              disabled
            />
            <TextField
              label="Units"
              variant="filled"
              select
              value={user?.units ?? ""}
              onChange={e => {
                setUser({
                  ...user,
                  units: e.target.value as Units
                })
              }}
            >
              <MenuItem value={Units.Metric}>Metric</MenuItem>
              <MenuItem value={Units.Imperial}>Imperial</MenuItem>
            </TextField>
            <Button
              variant="contained"
              onClick={onSave}
            >Save</Button>
          </> }
        </div>
      </Loadable>
    </Dialog>
  )
}

export default Settings
