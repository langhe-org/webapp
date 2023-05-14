import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import { SyntheticEvent, useEffect, useRef, useState } from 'react'
import "/node_modules/leaflet/dist/leaflet.css";
import type { Map, Marker } from "leaflet";
import styles from './create-form.module.css';

let mapInitialized = false;

export interface NewGreenhouseData {
  name?: string,
  type: "proto_1_ithaca",
  location_name?: string,
  longitude?: number,
  latitude?: number,
  timezone: string,
}

interface Props {
  onSubmit: (newGreenhouseData: NewGreenhouseData) => void;
}

const CreateForm = (props: Props) => {
  const [greenhouseName, setGreenhouseName] = useState<string | undefined>();
  const [greenhouseLocation, setGreenhouseLocation] = useState<string | undefined>();
  const [greenhouseLat, setGreenhouseLat] = useState<number | undefined>();
  const [greenhouseLng, setGreenhouseLng] = useState<number | undefined>();
  const mapRef = useRef<HTMLDivElement>(null);

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    props.onSubmit({
        name: greenhouseName,
        type: "proto_1_ithaca",
        location_name: greenhouseLocation,
        longitude: greenhouseLat,
        latitude: greenhouseLng,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    })
  }

  useEffect(() => {
    if (typeof window !== 'undefined' && !mapInitialized) {
      mapInitialized = true;
      initMap(
        mapRef.current!,
        loc => {
          setGreenhouseLat(loc.latLng.lat);
          setGreenhouseLng(loc.latLng.lng);
          if(loc.cityName) {
            setGreenhouseLocation(loc.cityName);
          }
        }
      );
    }
  }, []);

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <Typography variant='h1' sx={{ fontSize: 30 }}>
        Create Greenhouse
      </Typography>
      <div className={styles.mapWrapper}>
        <Typography variant='h6' sx={{ fontSize: 14 }}>
          Select the location of the greenhouse on the map
        </Typography>
        <div className={styles.map} ref={mapRef}></div>
      </div>
      <TextField
        label="Greenhouse Name"
        variant="filled"
        value={greenhouseName ?? ""}
        onChange={e => setGreenhouseName(e.target.value)}
      />
      <TextField
        label="Greenhouse Location"
        variant="filled"
        value={greenhouseLocation ?? ""}
        onChange={e => setGreenhouseLocation(e.target.value)}

      />
      <TextField
        label="Greenhouse Latitude"
        variant="filled"
        helperText="Select the location of the greenhouse on map"
        value={greenhouseLat ?? ""}
        disabled
      />
      <TextField
        label="Greenhouse Longitude"
        variant="filled"
        helperText="Select the location of the greenhouse on map"
        value={greenhouseLng ?? ""}
        disabled
      />
      <Button type="submit" variant="contained">Save</Button>
    </form>
  )
}

export default CreateForm

interface UserLocation {
  latLng: LatLng,
  cityName: string | undefined,
}

interface LatLng {
  lat: number,
  lng: number,
}

const defaultLatLng: LatLng = {
  lat: 42.439705849161065,
  lng: -76.49687461535645,
}
async function getUserLatLng(): Promise<LatLng> {
  let loc = await getUserLocation();
  return {
    lat: loc.coords.latitude,
    lng: loc.coords.longitude,
  }
}

function getUserLocation(options?: PositionOptions): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}

async function reverseGeocoding(latLng: LatLng): Promise<string | undefined> {
  let r = await fetch(`https://nominatim.openstreetmap.org/reverse?format=geocodejson&lat=${latLng.lat}&lon=${latLng.lng}`);
  let j = await r.json();
  let geocoding = j?.features?.[0]?.properties?.geocoding;
  let city = geocoding?.city || geocoding?.state || geocoding?.country;
  return city;
}

function setMapCenter(map: Map, latLng: LatLng) {
  map.setView([latLng.lat, latLng.lng], 17);
}
function setMarker(leaflet: any, map: Map, marker: Marker, latLng: LatLng): Marker {
  if(!marker) {
    return leaflet.marker(
      [latLng.lat, latLng.lng],
      {
        icon: new leaflet.Icon({
          iconUrl: "/favicon.ico",
          iconSize: [20, 20],
          iconAnchor: [10, 10],
        })
      }
    ).addTo(map);
  } else {
    return marker.setLatLng([latLng.lat, latLng.lng]);
  }
}
async function initMap(container: HTMLElement, onChange: (loc: UserLocation) => void) {
  let map: Map;
  let marker: Marker;
  let latLng = defaultLatLng;
  getUserLatLng()
    .then(userLatLng => {
      latLng = userLatLng;
      if(map) {
        setMapCenter(map, latLng);
      }
    });
  import('leaflet')
    .then(leaflet => {
      map = leaflet.map(container);
      setMapCenter(map, latLng);
      leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);

      map.on("click", (e) => {
        marker = setMarker(leaflet, map, marker, e.latlng);
        reverseGeocoding(e.latlng)
          .then(cityName => {
            onChange({
              cityName,
              latLng: e.latlng,
            });
          })
      });
      return map;
    })
}
