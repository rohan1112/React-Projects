import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useCities } from "../Context/CitiesContext";
import { useEffect, useState } from "react";
import { useGeoLocation } from "../hooks/useGeoLocation";
import Button from "./Button";
import { useMapPosition } from "../hooks/useMapPosition";
function Map() {
  const [mapPosition, setMapPosition] = useState([51.505, -0.09]);
  const { cities } = useCities();
  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeoLocation();
  const [Maplat, Maplng] = useMapPosition();

  useEffect(
    function () {
      if (Maplat && Maplng) return setMapPosition([Maplat, Maplng]);
    },
    [Maplat, Maplng]
  );

  useEffect(
    function () {
      if (geoLocationPosition)
        return setMapPosition([
          geoLocationPosition.lat,
          geoLocationPosition.lng,
        ]);
    },
    [geoLocationPosition]
  );

  return (
    <div className={styles.mapContainer}>
      {!geoLocationPosition && (
        <Button type={"position"} onClick={getPosition}>
          {isLoadingPosition ? "...Loading" : "Get Current Position"}
        </Button>
      )}
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span> {city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        <ChangeCenter poisiton={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ poisiton }) {
  const map = useMap();
  map.setView(poisiton);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

export default Map;
