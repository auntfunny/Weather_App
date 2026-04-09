import { createContext, useContext, useEffect, useState } from "react";
import cities from "../data/cities.json";
import useFetch from "../hooks/useFetch";

const WeatherContext = createContext();

export function WeatherProvider({ children }) {
  const [city, setCity] = useState({});
  const [metric, setMetric] = useState(true);

  const API_KEY = import.meta.env.VITE_API_KEY;
  const API_TOKEN = import.meta.env.VITE_IP_API_TOKEN;

  const {
    data: ipData,
    loading: ipLoading,
    error: ipError,
  } = useFetch(`https://api.ipinfo.io/lite/me?token=${API_TOKEN}`);
  const myLocation = cities.find(
    (city) => city.country_code === ipData?.country_code,
  );

  const weatherURL = city?.lat
    ? `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}&units=metric`
    : null;
  const forecastURL = city?.lat
    ? `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}&units=metric`
    : null;

  const {
    data: weather,
    loading: weatherLoading,
    error: weatherError,
  } = useFetch(weatherURL);
  const {
    data: forecast,
    loading: forecastLoading,
    error: forecastError,
  } = useFetch(forecastURL);

  const loading = ipLoading || weatherLoading || forecastLoading;
  const error = ipError || weatherError || forecastError;

  useEffect(() => {
    if (myLocation) {
      setCity(myLocation);
    }
  }, [myLocation]);

  const setToMe = () => {
    if (myLocation) {
      setCity(myLocation);
    }
  };

  const searchCity = (newSearch) => {
    if (newSearch) {
      setCity(newSearch);
    }
  };

  return (
    <WeatherContext.Provider
      value={{
        metric,
        setMetric,
        city,
        weather,
        forecast,
        setToMe,
        searchCity,
        loading,
        error,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export const useWeather = () => useContext(WeatherContext);
