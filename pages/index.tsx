import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { useContext, useEffect, useState } from 'react'
import { User } from '../types/user'
import { Greenhouse } from '../types/greenhouse'
import { control_mode_display, GreenhouseState, sulfur_intensity_display } from '../types/greenhouse-state'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { CardActionArea, Chip, Icon, IconButton } from '@mui/material';
import { api } from '../services/api'
import { UserContext } from '../contexts/user'
import Environment from '../components/environment/environment'
import PestControl from '../components/pest-control/pest-control'
import Lighting from '../components/lighting/lighting'
import Irrigation from '../components/irrigation/irrigation'
import Settings from '../components/settings/settings'
import { Command } from '../types/command'
import lodash from 'lodash'
import { temperatureFromMetric, unitsSymbol } from '../utils/temperature'
import { latitudeLongitudeDisplay } from '../utils/geolocation'
import router from 'next/router'

const PING_INTERVAL_MILLIS = 1 * 1000;

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
  const [activePopup, setActivePopup] = useState<ActivePopup>();

  const onCommand = (command: Command) => {
    if(!user) return;
    setQueuedCommands(queuedCommands => {
      return structuredClone(lodash.merge(queuedCommands, command));
    });
    api(`/greenhouse-command/${user.greenhouse_ids[0]}`, "post", command);
  }

  const getGreenhouseState = () => {
    if(!user) return;
    if(!user.greenhouse_ids[0]) {
      router.push(`/link-greenhouse`);
      return;
    }
    api<GreenhouseState>(`/greenhouse-state/${user.greenhouse_ids[0]}`)
      .then(greenhouseState => {
        setGreenhouseState(greenhouseState)
        setQueuedCommands(queuedCommands => {
          return removeResolvedCommands(queuedCommands, greenhouseState);
        });
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
    if(!user.greenhouse_ids[0]) {
      router.push(`/link-greenhouse`);
      return;
    }
    api<Greenhouse>(`/greenhouse/${user.greenhouse_ids[0]}`)
      .then(greenhouse => {
        setGreenhouse(greenhouse)
      })
  }, [user]);

  return (
    <div className={styles.main}>
      <div className={styles.widthHolder}>
        <div className={styles.header}>
          <Typography className={styles.title} variant='h1'>langhe</Typography>
          <IconButton className={styles.settingLink} onClick={() => setActivePopup(ActivePopup.Settings)}>
            <Icon>person</Icon>
          </IconButton>
        </div>
        <Divider className={styles.divider} />
        <Typography className={styles.greeting} variant='h4'>
          Hi,<br />{user?.name}
        </Typography>
        <Card className={styles.infoSectionCard}>
          <CardContent className={styles.infoSectionContent}>
            <Typography className={styles.infoSectionCity}>{greenhouse?.location_name}</Typography>
            <Typography className={styles.infoSectionLocation}>{greenhouse && `${latitudeLongitudeDisplay({
              latitude: greenhouse.latitude,
              longitude: greenhouse.longitude,
            })}`}</Typography>
            <Divider className={styles.infoSectionDivider} />
            <Typography className={styles.infoSectionWeather}>
              <span className={styles.infoSectionWeatherSky}>{greenhouseState?.weather?.current.sky}</span>
              
              <span>{greenhouseState?.weather?.current.temperature !== undefined && greenhouseState?.weather?.current.humidity !== undefined && user ? (
                `${temperatureFromMetric(greenhouseState.weather.current.temperature, user.units).toFixed(0)} ${unitsSymbol(user.units)} | ${greenhouseState.weather.current.humidity.toFixed(0)}% RH`
              ) : ""}</span>
            </Typography>
          </CardContent>
        </Card>
        <div className={styles.pageLinksContainer}>
          <Card className={styles.pageLinkCard} onClick={() => setActivePopup(ActivePopup.Environment)}>
            <CardActionArea className={styles.pageLinkAction}>
              <CardContent className={styles.pageLinkContent}>
                <Icon className={styles.pageLinkIcon}>device_thermostat</Icon>
                <Typography variant='h3' className={styles.pageLinkTitle}>
                  Environment
                </Typography>
                <Typography className={styles.pageLinkText}>
                  { greenhouseState?.sensor.temperature !== undefined && greenhouseState?.sensor.humidity !== undefined && user ? (
                    `${temperatureFromMetric(greenhouseState.sensor.temperature, user.units).toFixed(0)} ${unitsSymbol(user.units)} | ${greenhouseState.sensor.humidity.toFixed(0)}% RH`
                  ) : "-"}
                </Typography>
                <Chip label={control_mode_display(greenhouseState?.control.environment.mode)}className={styles.cardChip} />
              </CardContent>
            </CardActionArea>
          </Card>
          <Card className={styles.pageLinkCard} onClick={() => setActivePopup(ActivePopup.Lighting)}>
            <CardActionArea className={styles.pageLinkAction}>
              <CardContent className={styles.pageLinkContent}>
                <Icon className={styles.pageLinkIcon}>emoji_objects</Icon>
                <Typography variant='h3' className={styles.pageLinkTitle}>
                  Lighting
                </Typography>
                <Typography className={styles.pageLinkText}>
                  DLI - {greenhouseState?.status?.lighting?.dli?.toFixed(1)}
                </Typography>
                <Chip label={control_mode_display(greenhouseState?.control.lighting.mode)}className={styles.cardChip} />
              </CardContent>
            </CardActionArea>
          </Card>
          <Card className={styles.pageLinkCard} onClick={() => setActivePopup(ActivePopup.Irrigation)}>
            <CardActionArea className={styles.pageLinkAction}>
              <CardContent className={styles.pageLinkContent}>
                <Icon className={styles.pageLinkIcon}>water_drop</Icon>
                <Typography variant='h3' className={styles.pageLinkTitle}>
                  Irrigation
                </Typography>
                { greenhouseState?.status?.irrigation?.next_time !== undefined && greenhouseState?.status?.irrigation?.next_zone !== undefined ? (
                  <>
                    <Typography className={styles.pageLinkText}>
                      {nextTimeString(greenhouseState.status.irrigation.next_time)}
                    </Typography>
                    <Typography className={styles.pageLinkSubtext}>
                      Zone {greenhouseState.status.irrigation.next_zone + 1}
                    </Typography>
                  </>
                ) : "-" }
                <Chip label={control_mode_display(greenhouseState?.control.irrigation.mode)} className={styles.cardChip} />
              </CardContent>
            </CardActionArea>
          </Card>
          <Card className={styles.pageLinkCard} onClick={() => setActivePopup(ActivePopup.PestControl)}>
            <CardActionArea className={styles.pageLinkAction}>
              <CardContent className={styles.pageLinkContent}>
                <Icon className={styles.pageLinkIcon}>pest_control</Icon>
                <Typography variant='h3' className={styles.pageLinkTitle}>
                  Pest Control
                </Typography>
                { greenhouseState?.status?.ipm?.next_time !== undefined && greenhouseState?.recipes.ipm.intensity !== undefined ? (
                  <>
                    <Typography className={styles.pageLinkText}>
                      {nextTimeString(greenhouseState.status.ipm.next_time)}
                    </Typography>
                    <Typography className={styles.pageLinkSubtext}>
                      Intensity: {sulfur_intensity_display(greenhouseState.recipes.ipm.intensity)}
                    </Typography>
                  </>
                ) : "-" }
                <Chip label={control_mode_display(greenhouseState?.control.ipm.mode)} className={styles.cardChip} />
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
        <Settings
          onClose={() => setActivePopup(undefined)}
          open={activePopup === ActivePopup.Settings}
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
    </div>
  )
}

export default Home


const nextDateFormatter = new Intl.DateTimeFormat(undefined, {
  month: "numeric",
  day: "2-digit",
});
const nextTimeFormatter = new Intl.DateTimeFormat(undefined, {
  hour: "numeric",
  minute: "2-digit",
});
function nextTimeString(datetime: string): string {
  const dayInSeconds = 24 * 60 * 60;
  const date = new Date(datetime);
  let tomorrow = new Date();
  tomorrow.setSeconds(tomorrow.getSeconds() + dayInSeconds);
  if(date > tomorrow) {
    let day = nextDateFormatter.format(date);
    return `NEXT ON ${day}`;
  } else {
    let time = nextTimeFormatter.format(date);
    return `NEXT @ ${time}`;
  }
}

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

  if(command.irrigation?.recipes) {
    for(const i in command.irrigation.recipes) {
      if(command.irrigation.recipes[i]?.name === greenhouseState.recipes.irrigation.zones[i]?.name)
        delete command.irrigation.recipes[i]?.name;
      if(command.irrigation.recipes[i]?.time === greenhouseState.recipes.irrigation.zones[i]?.time)
        delete command.irrigation.recipes[i]?.time;
      if(command.irrigation.recipes[i]?.duration === greenhouseState.recipes.irrigation.zones[i]?.duration)
        delete command.irrigation.recipes[i]?.duration;
      if(command.irrigation.recipes[i]?.sunday === greenhouseState.recipes.irrigation.zones[i]?.sunday)
        delete command.irrigation.recipes[i]?.sunday;
      if(command.irrigation.recipes[i]?.monday === greenhouseState.recipes.irrigation.zones[i]?.monday)
        delete command.irrigation.recipes[i]?.monday;
      if(command.irrigation.recipes[i]?.tuesday === greenhouseState.recipes.irrigation.zones[i]?.tuesday)
        delete command.irrigation.recipes[i]?.tuesday;
      if(command.irrigation.recipes[i]?.wednesday === greenhouseState.recipes.irrigation.zones[i]?.wednesday)
        delete command.irrigation.recipes[i]?.wednesday;
      if(command.irrigation.recipes[i]?.thursday === greenhouseState.recipes.irrigation.zones[i]?.thursday)
        delete command.irrigation.recipes[i]?.thursday;
      if(command.irrigation.recipes[i]?.friday === greenhouseState.recipes.irrigation.zones[i]?.friday)
        delete command.irrigation.recipes[i]?.friday;
      if(command.irrigation.recipes[i]?.saturday === greenhouseState.recipes.irrigation.zones[i]?.saturday)
        delete command.irrigation.recipes[i]?.saturday;

      if(lodash.isEmpty(command.irrigation.recipes[i]))
        delete command.irrigation.recipes[i];
    }

    if(command.irrigation.recipes.every(v => v === undefined))
      delete command.irrigation.recipes;
  }

  if(command.irrigation?.trigger_valve) {
    for(const i in command.irrigation.trigger_valve)
      if(command.irrigation.trigger_valve[i] === greenhouseState.actuator.valves[i])
        delete command.irrigation.trigger_valve[i];

    if(command.irrigation.trigger_valve.every(v => v === undefined))
      delete command.irrigation.trigger_valve;
  }

  if(command?.irrigation && lodash.isEmpty(command.irrigation))
    delete command.irrigation;


  return command;
}
