import { useEffect, useState } from "react";
import { useWeather } from "../context/WeatherContext";
import ForecastCard from "./ForecastCard";
import UnitButtons from "./UnitButtons";
import WindCard from "./WindCard";
import HumidityCard from "./HumidityCard";

const WeatherDetails = () => {
  const { weather, metric, forecast, loading } = useWeather();
  const [fiveDayForecast, setFiveDayForecast] = useState([]);


  useEffect(() => {
    if (forecast?.list) {
      const nextFiveDays = [];

      for (let i = 0; i < 5; i++) {
        let myDate = new Date();
        myDate.setDate(myDate.getDate() + i + 1)
        const day = myDate.toISOString().split("T")[0];
        const dailyForecast = forecast.list.filter((item) =>
          item.dt_txt.includes(day),
        );
        nextFiveDays.push(dailyForecast);
      }

      setFiveDayForecast(nextFiveDays);
    }
  }, [forecast]);

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-bg1">
      <UnitButtons />
      <section className="w-full py-2">
        <ul className="flex justify-center gap-4 w-full px-2">
          {loading
            ? Array(5)
                .fill(null)
                .map((_, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-center w-30 h-40 bg-bg2 animate-pulse "
                  >
                    <img
                      src="/weatherapp/others/Cloud-background.png"
                      alt="Loading..."
                      className="w-full object-cover opacity-10"
                    />
                  </li>
                ))
            : fiveDayForecast.map((day, index) => (
                <ForecastCard day={day} key={index} />
              ))}
        </ul>
      </section>
      <section className="py-4 w-xs md:w-2xl">
        <h2 className="text-2xl text-text1 font-bold text-start">
          Today's Highlights
        </h2>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 place-content-center place-items-center">
            <div className="flex flex-col items-center gap-4 w-xs min-h-48 bg-bg2 p-2">
              <h3 className="text-text1">Wind Status</h3>
              <div
                className={`size-8 rounded-full border-4 border-text2 border-t-accYellow animate-spin`}
              ></div>
            </div>
            <div className="flex flex-col items-center gap-4 w-xs min-h-48 bg-bg2 p-2">
              <h3 className="text-text1">Humidity</h3>
              <div
                className={`size-8 rounded-full border-4 border-text2 border-t-accYellow animate-spin`}
              ></div>
            </div>
            <div className="flex flex-col items-center gap-4 w-xs min-h-40 bg-bg2 p-2">
              <h3 className="text-text1">Visibility</h3>
              <div
                className={`size-8 rounded-full border-4 border-text2 border-t-accYellow animate-spin`}
              ></div>
            </div>
            <div className="flex flex-col items-center gap-4 w-xs min-h-40 bg-bg2 p-2">
              <h3 className="text-text1">Air Pressure</h3>
              <div
                className={`size-8 rounded-full border-4 border-text2 border-t-accYellow animate-spin`}
              ></div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 place-content-center place-items-center">
            <WindCard />
            <HumidityCard />
            <div className="relative flex flex-col justify-center items-center  w-xs min-h-40 bg-bg2 p-3">
              <h3 className="absolute top-3 text-text1">Visibility</h3>
              <div className="flex items-center">
                <p className="text-6xl text-text1 font-bold">{metric ? (weather.visibility/1000).toFixed(2) : ((weather.visibility/1000)/1.609).toFixed(2) }</p>
                <p className="text-4xl text-text1 font-medium">{metric ? "km" : "miles"}</p>
              </div>
              
            </div>
            <div className="relative flex flex-col justify-center items-center  w-xs min-h-40 bg-bg2 p-3">
              <h3 className="absolute top-3 text-text1">Air Pressure</h3>
              <div className="flex items-center">
                <p className="text-6xl text-text1 font-bold">{weather.main.pressure}</p>
                <p className="text-4xl text-text1 font-medium">mb</p>
              </div>
              
            </div>
            
          </div>
        )}
      </section>
    </div>
  );
};

export default WeatherDetails;
