import type { NextPage } from 'next'
import { useContext, useState } from 'react'
import { api } from '../services/api';
import { UserContext } from '../contexts/user';
import { User } from '../types/user';
import "/node_modules/leaflet/dist/leaflet.css";
import type { Map, Marker } from "leaflet";
import { Greenhouse } from '../types/greenhouse';
import CreateForm, { NewGreenhouseData } from '../components/create-greenhouse/create-form';
import CreateSuccess from '../components/create-greenhouse/create-success';
import { Props as CreateSuccessProps } from '../components/create-greenhouse/create-success';


const styles = {
  main: {
    padding: "0 10px",
  },
  widthHolder: {
    maxWidth: "600px",
    margin: "auto",
  },
};


const CreateGreenhouse: NextPage = () => {
  const {user, setUser} = useContext(UserContext);
  const [greenhouseAuth, setGreenhouseAuth] = useState<CreateSuccessProps | undefined>();

  const onSubmit = (data: NewGreenhouseData) => {
    interface Res {
      greenhouse: Greenhouse;
      token: string;
    }
    api<Res>(`/greenhouse`, "POST", data)
      .then(({token, greenhouse}) => {
        setUser({
          ...user,
          greenhouse_ids: [greenhouse.id]
        } as User);
        setGreenhouseAuth({
          token,
          id: greenhouse.id
        });
      });
  }

  return (
    <div>
      <div style={styles.widthHolder}>
        {greenhouseAuth ? (
          <CreateSuccess token={greenhouseAuth.token} id={greenhouseAuth.id} />
        ) : (
          <CreateForm onSubmit={onSubmit} />
        )}
      </div>
    </div>
  )
}

export default CreateGreenhouse

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
