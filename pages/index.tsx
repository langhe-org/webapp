import type { NextPage } from 'next'
import Head from 'next/head'
// import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { useState } from 'react'
import { User, Units } from '../types/user'
import { Greenhouse, GreenhouseType } from '../types/greenhouse'
import { ControlMode, EnvironmentState, GreenhouseState, IpmState, LightningState } from '../types/greenhouse-state'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardMedia, Chip, Icon, IconButton } from '@mui/material';

function networkDelay() {
  const min = 100;
  const max = 1200;
  return Math.floor(Math.random() * (max - min + 1) + min);
}
const Home: NextPage = () => {
  const [user, setUser] = useState<User>();
  const [greenhouse, setGreenhouse] = useState<Greenhouse>();
  const [greenhouseState, setGreenhouseState] = useState<GreenhouseState>();

  setTimeout(() => {
    setGreenhouse({
      id: 1,
      name: "Main prototype",
      type: GreenhouseType.proto_1_ithaca,
      location_name: "Itheca, NY",
      longitude: 90,
      latitude: 90,
    });
  }, networkDelay());
  setTimeout(() => {
    setGreenhouseState({
      id: 1,
      greenhouse_id: 1,
      time: new Date,
      timezone: 1,
      dst: true,
      temperature: 1,
      humidity: 1,
      quantum: 1,
      environment_mode: ControlMode.Automatic,
      environment_state: EnvironmentState.Default,
      ipm_mode: ControlMode.Manual,
      ipm_state: IpmState.Default,
      lighting_mode: ControlMode.Manual,
      lighting_state: LightningState.Default,
      heater: true,
      exhaust: true,
      ventilator: true,
      sulfur: true,
    });
  }, networkDelay());
  setTimeout(() => {
    setUser({
      id: 1,
      name: "Mendy",
      email: "mendy@example.com",
      units: Units.Imperial,
    });
  }, networkDelay());

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
          <Link href="/settings">
            <IconButton color="inherit">
              <Icon>settings</Icon>
            </IconButton>
          </Link>
        </CardContent>
      </Card>
      <Card sx={{ ...styles.stateSection }}>
        <CardContent>
        </CardContent>
      </Card>
      <Link href="/environment">
        <a>
          <Card sx={{ ...styles.pageLinkCard, ...styles.pageLinkEnvironment }}>
            <CardActionArea sx={styles.pageLinkAction}>
              <CardContent sx={ styles.pageLinkContent }>
                <Typography variant='h6' color="text.secondary">
                  Environment
                </Typography>
                <Typography variant='h3' color="text.secondary">
                  {greenhouseState?.environment_state}
                </Typography>
                <Chip label={greenhouseState?.environment_mode} sx={styles.cardChip} />
              </CardContent>
            </CardActionArea>
          </Card>
        </a>
      </Link>
      <Link href="/lighting">
        <a>
          <Card sx={{ ...styles.pageLinkCard, ...styles.pageLinkLighting }}>
            <CardActionArea sx={styles.pageLinkAction}>
              <CardContent sx={ styles.pageLinkContent }>
                <Typography variant='h6' color="text.secondary">
                  Lighting
                </Typography>
                <Typography variant='h3' color="text.secondary">
                  {greenhouseState?.lighting_state}
                </Typography>
                <Chip label={greenhouseState?.lighting_mode} sx={styles.cardChip} />
              </CardContent>
            </CardActionArea>
          </Card>
        </a>
      </Link>
      <Link href="/irrigation">
        <a>
          <Card sx={{ ...styles.pageLinkCard, ...styles.pageLinkIrrigation }}>
            <CardActionArea sx={styles.pageLinkAction}>
              <CardContent sx={ styles.pageLinkContent }>
                <Typography variant='h6' color="text.secondary">
                  Irrigation
                </Typography>
                <Typography variant='h3' color="text.secondary">
                  ??
                </Typography>
                <Chip label="??" sx={styles.cardChip} />
              </CardContent>
            </CardActionArea>
          </Card>
        </a>
      </Link>
      <Link href="/pest-control">
        <a>
          <Card sx={{ ...styles.pageLinkCard, ...styles.pageLinkPestControl }}>
            <CardActionArea sx={styles.pageLinkAction}>
              <CardContent sx={ styles.pageLinkContent }>
                <Typography variant='h6' color="text.secondary">
                  Pest Control
                </Typography>
                <Typography variant='h3' color="text.secondary">
                  ??
                </Typography>
                <Chip label="??" sx={styles.cardChip} />
              </CardContent>
            </CardActionArea>
          </Card>
        </a>
      </Link>
    </div>
  )
}

export default Home
