import { useState } from "react";
import location from "../assets/location.svg";
import location_on from "../assets/location_on.svg";
import { useWeather } from "../context/WeatherContext";
import Search from "./Search";

const Today = () => {
  const [toggleSearch, setToggleSearch] = useState(false);
  const currentDate = new Date().toString().split(" ").slice(0, 3).join(" ");
  const { metric, city, weather, loading, setToMe, error } = useWeather();
  let degrees = 0;

  if (!loading && weather) {
    if (metric) {
      degrees = weather.main.temp;
    } else {
      degrees = (weather.main.temp * 9) / 5 + 32;
    }
  }

  return (
    <aside className="flex flex-col md:flex-row lg:flex-col justify-around items-center bg-bg2 w-full h-screen md:h-96 md:pb-5 lg:h-screen lg:w-sm lg:min-w-sm ">
      {toggleSearch && <Search setToggleSearch={setToggleSearch} /> }
      {error ? <p className="text-text1 p-3 text-2xl text-center">Oh no, something's not right! Please try again later.</p> : <div className="flex flex-col items-center w-full md:w-1/2 lg:w-full">
        <header className="flex items-end justify-around w-full">
          <button
            onClick={() => setToggleSearch(true)}
            type="button"
            className="bg-button1 w-44 h-9 text-center text-text1 hover:cursor-pointer hover:bg-button2"
          >
            Search for Places
          </button>
          <button
            onClick={setToMe}
            type="button"
            className="bg-button2 rounded-full p-2 hover:cursor-pointer hover:bg-button3"
          >
            <img src={location} alt="Location" className="size-6" />
          </button>
        </header>
        <div className="relative flex justify-center items-center">
          <img
            src="/weatherapp/others/Cloud-background.png"
            alt="Clouds"
            className="w-full opacity-5"
          />
          {loading ? (
            <div
              className={`absolute size-16 rounded-full border-8 border-text2 border-t-accYellow animate-spin`}
            ></div>
          ) : (
            <img
              src={`/weatherapp/weather/${weather.weather[0].icon}.png`}
              alt="Sunny"
              className="absolute w-36"
            />
          )}
        </div>
      </div>}
      {!error && <div className="flex flex-col items-center">
        <h1 className="text-9xl font-medium text-text1 pb-6">
          {loading ? "--" : degrees.toFixed(0)}
          <span className="text-6xl text-text2">&deg;{metric ? "C" : "F"}</span>
        </h1>
        <h2 className="text-3xl font-semibold text-text2 p-5 capitalize">
          {loading ? (
            <div
              className={`size-8 rounded-full border-4 border-text2 border-t-accYellow animate-spin`}
            ></div>
          ) : (
            weather.weather[0].description
          )}
        </h2>
        <div className="flex gap-4 text-xl text-text2 font-medium py-4">
          <p>Today</p>
          <p>.</p>
          <p>{currentDate}</p>
        </div>
        <div className="flex gap-4 items-end text-xl text-text2 font-semibold py-4">
          <img src={location_on} alt="Location Pointer" className="size-8" />
          {loading ? (
            <div
              className={`size-8 rounded-full border-4 border-text2 border-t-accYellow animate-spin`}
            ></div>
          ) : (
            <p>{city.name}, {city.country_code}</p>
          )}
        </div>
      </div>}
    </aside>
  );
};

export default Today;
