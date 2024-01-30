import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";

const CityContext = createContext();

function CitiesContext({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchCities() {
      setIsLoading(true);
      try {
        const res = await fetch("http://localhost:3000/cities");
        const data = await res.json();
        setCities(data);
      } catch (err) {
        throw new Error("Cities Not Found");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`http://localhost:3000/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch {
      throw new Error("City Not Found");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CityContext.Provider value={{ cities, isLoading, getCity, currentCity }}>
      {children}
    </CityContext.Provider>
  );
}

function useCities() {
  const context = useContext(CityContext);
  if (context === undefined) throw new Error("Context used outside the scope");

  return context;
}
export { CitiesContext, useCities };
