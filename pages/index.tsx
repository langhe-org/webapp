import type { NextPage } from 'next'
import Head from 'next/head'
// import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import { User, Units } from '../types/user'
import { Greenhouse, GreenhouseType } from '../types/greenhouse'
import { ControlMode, control_mode_display, EnvironmentState, environment_state_display, GreenhouseState, IpmState, ipm_state_display, IrrigationState, irrigation_state_display, LightingState, lightning_state_display } from '../types/greenhouse-state'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardMedia, Chip, Icon, IconButton } from '@mui/material';
import { api } from '../services/api'
import { UserContext } from '../contexts/user'
import Dialog from '../components/dialog'
import Environment from '../components/environment'
import PestControl from '../components/pest-control'
import Lighting from '../components/lighting'
import Irrigation from '../components/irrigation'
import Settings from '../components/settings'
import { Command } from '../types/command'

enum ActivePopup {
  Settings,
  Environment,
  Lighting,
  Irrigation,
  PestControl,
}

const Home: NextPage = () => {
  const {user, setUser} = useContext(UserContext);
  const [greenhouse, setGreenhouse] = useState<Greenhouse>();
  const [greenhouseState, setGreenhouseState] = useState<GreenhouseState>();
  const [queuedCommands, setQueuedCommands] = useState<Command>();
  const [activePopup, setActivePopup] = useState<ActivePopup>();

  const onCommand = (command: Command) => {
    setQueuedCommands({...queuedCommands, ...command});
    api(`/command`, "post", command);
  }

  useEffect(() => {
    if(!user)
      api<User>("/account")
        .then(user => setUser(user))
  }, []);
  useEffect(() => {
    if(!user) return;
    api<Greenhouse>(`/greenhouse/${user.greenhouse_ids[0]}`)
      .then(greenhouse => setGreenhouse(greenhouse))
  }, [user]);
  useEffect(() => {
    if(!user) return;
    api<GreenhouseState>(`/greenhouse-state/${user.greenhouse_ids[0]}`)
      .then(greenhouseState => setGreenhouseState(greenhouseState))
  }, [user]);

  const styles = {
    main: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gridAutoRows: "1fr",
      minHeight: "100vh",
      maxWidth: "600px",
      margin: "auto",
      gap: 10,
      padding: 10,
    },
    topSection: {
      gridColumn: "1 / -1",
      backgroundImage: "url(/images/home-top-background.webp)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      color: "#fff",
    },
    stateSection: {
      gridColumn: "1 / -1",
      backgroundColor: "#d0cece",
    },
    pageLinkCard: {
      height: "100%",
    },
    pageLinkAction: {
      height: "100%",
    },
    pageLinkEnvironment: {
      backgroundColor: "#f7caac"
    },
    pageLinkLighting: {
      backgroundColor: "#fee599"
    },
    pageLinkIrrigation: {
      backgroundColor: "#8da9db"
    },
    pageLinkPestControl: {
      backgroundColor: "#a8d08c"
    },
    pageLinkContent: {
      textAlign: "center",
      display: "grid",
      alignContent: "space-between",
      height: "100%",
    },
    pageLinkH3: {
      fontSize: 36,
    },
    cardChip: {
      justifySelf: "end"
    },
  }

  return (
    <div style={styles.main}>
      <Head>
        <title>Langhe</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </Head>

      <Card sx={styles.topSection}>
        <CardContent sx={{display: "flex", justifyContent: "space-between", alignItems: "end", height: "100%"}}>
          <Typography variant='h4' color="inherit">
            Hi, {user?.name}
          </Typography>
          <IconButton color="inherit" onClick={() => setActivePopup(ActivePopup.Settings)}>
            <Icon>settings</Icon>
          </IconButton>
        </CardContent>
      </Card>
      <Card sx={{ ...styles.stateSection }}>
        <CardContent>
        </CardContent>
      </Card>
      <Card sx={{ ...styles.pageLinkCard, ...styles.pageLinkEnvironment }} onClick={() => setActivePopup(ActivePopup.Environment)}>
        <CardActionArea sx={styles.pageLinkAction}>
          <CardContent sx={ styles.pageLinkContent }>
            <Typography variant='h6' color="text.secondary">
              Environment
            </Typography>
            <Typography variant='h3' sx={styles.pageLinkH3} color="text.secondary">
              {environment_state_display(greenhouseState?.control.environment.state)}
            </Typography>
            <Chip label={control_mode_display(greenhouseState?.control.environment.mode)} sx={styles.cardChip} />
          </CardContent>
        </CardActionArea>
      </Card>
      <Card sx={{ ...styles.pageLinkCard, ...styles.pageLinkLighting }} onClick={() => setActivePopup(ActivePopup.Lighting)}>
        <CardActionArea sx={styles.pageLinkAction}>
          <CardContent sx={ styles.pageLinkContent }>
            <Typography variant='h6' color="text.secondary">
              Lighting
            </Typography>
            <Typography variant='h3' sx={styles.pageLinkH3} color="text.secondary">
              {lightning_state_display(greenhouseState?.control.lighting.state)}
            </Typography>
            <Chip label={control_mode_display(greenhouseState?.control.lighting.mode)} sx={styles.cardChip} />
          </CardContent>
        </CardActionArea>
      </Card>
      <Card sx={{ ...styles.pageLinkCard, ...styles.pageLinkIrrigation }} onClick={() => setActivePopup(ActivePopup.Irrigation)}>
        <CardActionArea sx={styles.pageLinkAction}>
          <CardContent sx={ styles.pageLinkContent }>
            <Typography variant='h6' color="text.secondary">
              Irrigation
            </Typography>
            <Typography variant='h3' sx={styles.pageLinkH3} color="text.secondary">
              {irrigation_state_display(greenhouseState?.control.irrigation.state)}
            </Typography>
            <Chip label={control_mode_display(greenhouseState?.control.irrigation.mode)}  sx={styles.cardChip} />
          </CardContent>
        </CardActionArea>
      </Card>
      <Card sx={{ ...styles.pageLinkCard, ...styles.pageLinkPestControl }} onClick={() => setActivePopup(ActivePopup.PestControl)}>
        <CardActionArea sx={styles.pageLinkAction}>
          <CardContent sx={ styles.pageLinkContent }>
            <Typography variant='h6' color="text.secondary">
              Pest Control
            </Typography>
            <Typography variant='h3' sx={styles.pageLinkH3} color="text.secondary">
              {ipm_state_display(greenhouseState?.control.ipm.state)}
            </Typography>
            <Chip label={control_mode_display(greenhouseState?.control.ipm.mode)}  sx={styles.cardChip} />
          </CardContent>
        </CardActionArea>
      </Card>
      <Settings
        onClose={() => setActivePopup(undefined)}
        open={activePopup === ActivePopup.Settings}
        user={user}
        greenhouse={greenhouse}
      />
      <Environment
        onClose={() => setActivePopup(undefined)}
        onCommand={onCommand}
        open={activePopup === ActivePopup.Environment}
        greenhouseState={greenhouseState}
        queuedCommands={queuedCommands}
      />
      <Lighting
        onClose={() => setActivePopup(undefined)}
        onCommand={onCommand}
        open={activePopup === ActivePopup.Lighting}
        greenhouseState={greenhouseState}
        queuedCommands={queuedCommands}
      />
      <Irrigation
        onClose={() => setActivePopup(undefined)}
        onCommand={onCommand}
        open={activePopup === ActivePopup.Irrigation}
        greenhouseState={greenhouseState}
        queuedCommands={queuedCommands}
      />
      <PestControl
        onClose={() => setActivePopup(undefined)}
        onCommand={onCommand}
        open={activePopup === ActivePopup.PestControl}
        greenhouseState={greenhouseState}
        queuedCommands={queuedCommands}
      />
    </div>
  )
}

export default Home
