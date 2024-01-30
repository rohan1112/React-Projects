// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import ButtonBack from "./ButtonBack";
import { useMapPosition } from "../hooks/useMapPosition";
import Message from "./Message";
import Spinner from "./Spinner";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [Maplat, Maplng] = useMapPosition();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingGeoCode, setIsLoadingGeoCode] = useState(false);
  const [emoji, setEmoji] = useState("");
  const [geoError, setGeoError] = useState("");
  const navigate = useNavigate();

  useEffect(
    function () {
      async function getLocationData() {
        try {
          setIsLoadingGeoCode(true);
          setGeoError("");
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${Maplat}&longitude=${Maplng}`
          );
          const data = await res.json();
          console.log(data);
          if (!data.countryCode)
            throw new Error("It Doesn't seem to be city. Click Somewhere else");
          setCityName(data.city || data.locality || "");
          setCountry(data.countryName);
          setEmoji(convertToEmoji(data.countryCode));
        } catch (err) {
          setGeoError(err.message);
        } finally {
          setIsLoadingGeoCode(false);
        }
      }
      getLocationData();
    },
    [Maplat, Maplng]
  );

  if (geoError) return <Message message={geoError} />;
  if (isLoadingGeoCode) return <Spinner />;
  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <ButtonBack></ButtonBack>
      </div>
    </form>
  );
}

export default Form;
