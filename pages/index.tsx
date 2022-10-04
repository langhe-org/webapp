import type { NextPage } from 'next'
import Head from 'next/head'
// import styles from '../styles/Home.module.css'
import { useContext, useEffect, useRef, useState } from 'react'
import { User } from '../types/user'
import { Greenhouse } from '../types/greenhouse'
import { control_mode_display, environment_state_display, GreenhouseState, ipm_state_display, irrigation_state_display, lightning_state_display } from '../types/greenhouse-state'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, Chip, createTheme, Icon, IconButton, ThemeProvider } from '@mui/material';
import { api } from '../services/api'
import { UserContext } from '../contexts/user'
import Environment from '../components/environment'
import PestControl from '../components/pest-control'
import Lighting from '../components/lighting'
import Irrigation from '../components/irrigation/irrigation'
import Settings from '../components/settings'
import { Command } from '../types/command'
import lodash from 'lodash'

const PING_INTERVAL_MILLIS = 3 * 1000;

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
  const [queuedCommands, setQueuedCommands] = useState<Command>({});
  const queuedCommandsRef = useRef(queuedCommands);
  const [activePopup, setActivePopup] = useState<ActivePopup>();

  const onCommand = (command: Command) => {
    if(!user) return;
    let v = lodash.merge(queuedCommandsRef.current, command);
    setQueuedCommands({...v});
    api(`/greenhouse-command/${user.greenhouse_ids[0]}`, "post", command);
  }

  const getGreenhouseState = () => {
    if(!user) return;
    api<GreenhouseState>(`/greenhouse-state/${user.greenhouse_ids[0]}`)
      .then(greenhouseState => {
        setGreenhouseState(greenhouseState)
        let commands = removeResolvedCommands(queuedCommandsRef.current, greenhouseState);
        setQueuedCommands(commands);
      })
      .finally(() => {
        setTimeout(getGreenhouseState, PING_INTERVAL_MILLIS)
      })
  }

  useEffect(() => {
    getGreenhouseState();
  }, [user]);
  useEffect(() => {
    if(!user)
      api<User>("/account")
        .then(user => setUser(user))
  }, []);
  useEffect(() => {
    if(!user) return;
    api<Greenhouse>(`/greenhouse/${user.greenhouse_ids[0]}`)
      .then(greenhouse => {
        setGreenhouse(greenhouse)
        setTimeout(() => console.log("after setting greenhouse and timeoute: ", greenhouse), 100)
      })
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
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  )
}

export default Home

const theme = createTheme({
  palette: {
    primary: {
      main: '#0A8E00'
    },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        sx: {
          fontWeight: 500
        }
      }
    }
  }
});

function removeResolvedCommands(command: Command, greenhouseState: GreenhouseState): Command {
  // this function can really use unit tests
  command = structuredClone(command);

  if(command?.environment?.mode === greenhouseState.control.environment.mode)
    delete command.environment.mode;

  if(command?.environment?.recipe?.day_temperature === greenhouseState.recipes.environment.day_temperature)
    delete command.environment.recipe?.day_temperature;
  if(command?.environment?.recipe?.night_temperature === greenhouseState.recipes.environment.night_temperature)
    delete command.environment.recipe?.night_temperature;
  if(command?.environment?.recipe?.humidity_limit === greenhouseState.recipes.environment.humidity_limit)
    delete command.environment.recipe?.humidity_limit;
  if(command?.environment?.recipe && lodash.isEmpty(command.environment.recipe))
    delete command.environment.recipe;

  if(command?.environment?.heater === greenhouseState.actuator.heater)
    delete command.environment.heater;
  if(command?.environment?.ventilator === greenhouseState.actuator.ventilator)
    delete command.environment.ventilator;
  if(command?.environment?.exhaust === greenhouseState.actuator.exhaust)
    delete command.environment.exhaust;

  if(command?.environment && lodash.isEmpty(command.environment))
    delete command.environment;


  if(command?.ipm?.mode === greenhouseState.control.ipm.mode)
    delete command.ipm.mode;

  if(command?.ipm?.recipe?.intensity === greenhouseState.recipes.ipm.intensity)
    delete command.ipm.recipe.intensity;
  if(command?.ipm?.recipe && lodash.isEmpty(command.ipm.recipe))
    delete command.ipm.recipe;

  if(command?.ipm?.sulfur === greenhouseState.actuator.sulfur)
    delete command.ipm.sulfur;

  if(command?.ipm && lodash.isEmpty(command.ipm))
    delete command.ipm;


  if(command?.lighting?.mode === greenhouseState.control.lighting.mode)
    delete command.lighting.mode;

  if(command?.lighting?.recipe?.start_at === greenhouseState.recipes.lighting.start_at)
    delete command.lighting.recipe.start_at;
  if(command?.lighting?.recipe?.stop_at === greenhouseState.recipes.lighting.stop_at)
    delete command.lighting.recipe.stop_at;
  if(command?.lighting?.recipe?.intensity === greenhouseState.recipes.lighting.intensity)
    delete command.lighting.recipe.intensity;
  if(command?.lighting?.recipe && lodash.isEmpty(command.lighting.recipe))
    delete command.lighting.recipe;

  if(command?.lighting?.light === greenhouseState.actuator.lights)
    delete command.lighting.light;

  if(command?.lighting && lodash.isEmpty(command.lighting))
    delete command.lighting;


  if(command?.irrigation?.mode === greenhouseState.control.irrigation.mode)
    delete command.irrigation.mode;

  // TODO: irrigation

  if(command?.irrigation && lodash.isEmpty(command.irrigation))
    delete command.irrigation;

  return command;
}
