// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useReducer } from "react";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import ButtonBack from "./ButtonBack";
import { useMapPosition } from "../hooks/useMapPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import DatePicker from "react-datepicker";
import { useCities } from "../Context/CitiesContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const initialState = {
  cityName: "",
  country: "",
  date: new Date(),
  notes: "",
  isLoadingGeoCode: false,
  emoji: "",
  geoError: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoadingGeoCode: true, geoError: "" };
    case "dataReceived":
      return {
        ...state,
        isLoadingGeoCode: false,
        cityName: action.payload.city,
        country: action.payload.countryName,
        emoji: convertToEmoji(action.payload.countryCode),
      };
    case "dataFailed":
      return { ...state, isLoadingGeoCode: false, geoError: action.payload };
    case "setDate":
      return { ...state, date: action.payload };
    case "setNotes":
      return { ...state, notes: action.payload };
  }
}

function Form() {
  const [Maplat, Maplng] = useMapPosition();
  // const [cityName, setCityName] = useState("");
  // const [country, setCountry] = useState("");
  // const [date, setDate] = useState(new Date());
  // const [notes, setNotes] = useState("");
  // const [isLoadingGeoCode, setIsLoadingGeoCode] = useState(false);
  // const [emoji, setEmoji] = useState("");
  // const [geoError, setGeoError] = useState("");
  const { createNewCity, isLoading } = useCities();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { cityName, country, date, notes, isLoadingGeoCode, emoji, geoError } =
    state;
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!Maplat && !Maplng) return;
      async function getLocationData() {
        try {
          // setIsLoadingGeoCode(true);
          // setGeoError("");
          dispatch({ type: "loading" });
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${Maplat}&longitude=${Maplng}`
          );
          const data = await res.json();
          // console.log(data);
          if (!data.countryCode)
            throw new Error("It Doesn't seem to be city. Click Somewhere else");
          // console.log(data);
          // setCityName(data.city || data.locality || "");
          dispatch({
            type: "dataReceived",
            payload: data,
          });
          // setCountry(data.countryName);
          // dispatch({ type: "setCountry", payload: data.countryName });
          // setEmoji(convertToEmoji(data.countryCode));
          // dispatch({type: "setEmoji", payload: convertToEmoji(data.countryCode)});
        } catch (err) {
          // setGeoError(err.message);
          dispatch({ type: "dataFailed", payload: err.message });
        }
        // finally {
        //   // setIsLoadingGeoCode(false);
        //   dispatch({ type: "setLoadingGeoCode", payload: false });
        // }
      }
      getLocationData();
    },
    [Maplat, Maplng]
  );

  if (geoError) return <Message message={geoError} />;
  if (!Maplat && !Maplng)
    return <Message message="Start by Clicking on the Map" />;

  if (isLoadingGeoCode) return <Spinner />;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!cityName || !date) return;
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat: Maplat, lng: Maplng },
    };
    await createNewCity(newCity);
    navigate("/app/cities");
  }
  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) =>
            dispatch({ type: "setCityName", payload: e.target.value })
          }
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          onChange={(date) => dispatch({ type: "setDate", payload: date })}
          selected={date}
          dateFormat="dd/MM/yyyy"
          fixedHeight={false}
          dropdownMode="scroll"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) =>
            dispatch({ type: "setNotes", payload: e.target.value })
          }
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
