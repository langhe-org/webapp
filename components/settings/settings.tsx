import { Units, User } from '../../types/user'
import { Greenhouse } from '../../types/greenhouse'
import Dialog from '../dialog/dialog'
import { useContext, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { api, JWT_KEY } from '../../services/api';
import { UserContext } from '../../contexts/user';
import Loadable from '../loadable';
import styles from './settings.module.css';
import IconButton from '@mui/material/IconButton/IconButton';
import Icon from '@mui/material/Icon/Icon';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton/ToggleButton';
import InputChange from '../input-change';
import Typography from '@mui/material/Typography/Typography';
import router from 'next/router';

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

  const saveChanges = (user: User) => {
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

  const updateUser = (user: User) => {
    setUser(user);
    saveChanges(user);
  }

  const unlinkGreenhouse = () => {
    if(!user) return;
    setIsLoading(true);
    let greenhouse_id = user.greenhouse_ids[0];
    api(`/account/link-greenhouse/${greenhouse_id}`, "DELETE")
      .then(() => {
        globalUserContext.setUser({
          ...user,
          greenhouse_ids: []
        });
        setIsLoading(false);
        router.push(`/link-greenhouse`);
      })
      .catch(() => {
        alert("Error saving changes");
        location.reload();
      })
  }

  const logout = () => {
    localStorage.removeItem(JWT_KEY)
    location.pathname = "/login";
  }

  return (
    <Dialog
      {...props}
      contentClass={styles.dialogContent}
      title="User Settings"
      secondaryAction={
        <IconButton onClick={logout}>
          <Icon>logout</Icon>
        </IconButton>
      }
    >
      <Loadable isLoading={isLoading}>
        <div className={styles.main}>
          { user && <>
            <div className={styles.settingsSection}>
              <InputChange
                label="Users Name"
                variant="filled"  
                value={user?.name ?? ""}
                onChange={e => {
                  updateUser({
                    ...user,
                    name: e.target.value
                  });
                }}
              />
              <div className={styles.idContainer}>
                <TextField
                  label="Greenhouse Identifier"
                  variant="filled"
                  value={props.greenhouse?.id ?? ""}
                  disabled
                />
                <Button
                  size="small"
                  className={styles.relink}
                  onClick={unlinkGreenhouse}
                >Relink</Button>
              </div>
              <TextField
                label="Location"
                variant="filled"
                value={props.greenhouse?.location_name ?? ""}
                disabled
              />
              <div>
                <Typography>Units</Typography>
                <ToggleButtonGroup aria-label="Units">
                  <ToggleButton
                    value={Units.Metric}
                    selected={user?.units === Units.Metric}
                    onClick={() => {
                      updateUser({
                        ...user,
                        units: Units.Metric
                      });
                    }}
                  >
                    °C
                  </ToggleButton>
                  <ToggleButton
                    value={Units.Imperial}
                    selected={user?.units === Units.Imperial}
                    onClick={() => {
                      updateUser({
                        ...user,
                        units: Units.Imperial
                      });
                    }}
                  >
                    °F
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
            </div>
            <div className={styles.bottomSection}>
              <div className={styles.contactUs}>
                <Typography>Do you need help?</Typography>
                <Button href="mailto:help@langhe.io">Contact us</Button>
              </div>
              <Button
                className={styles.privacyPolicyLink}
                size="small"
                href="https://langhe.io"
              >Privacy policy</Button>
            </div>
          </> }
        </div>
      </Loadable>
    </Dialog>
  )
}

export default Settings
