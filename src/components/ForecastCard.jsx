import { useEffect, useState } from "react";
import { useWeather } from "../context/WeatherContext";

const ForecastCard = ({ day }) => {
  const { metric } = useWeather();

  const tempMaxC = Math.max(...day.map((hour) => hour.main.temp_max));
  const tempMaxF = (tempMaxC * 9) / 5 + 32;
  const tempMinC = Math.min(...day.map((hour) => hour.main.temp_min));
  const tempMinf = (tempMinC * 9) / 5 + 32;

  const [maxT, setMaxT] = useState(tempMaxC);
  const [minT, setMinT] = useState(tempMinC);
  
  const tomorrow = new Date(Date.now() + 86400000)
    .toString()
    .split(" ")
    .slice(0, 3)
    .join(" ");
  const itemDate = new Date(day[0].dt_txt)
    .toString()
    .split(" ")
    .slice(0, 3)
    .join(" ");
  const cardDate = tomorrow === itemDate ? "Tomorrow" : itemDate;

  useEffect(() => {
    if (metric) {
      setMaxT(tempMaxC);
      setMinT(tempMinC);
    } else {
      setMaxT(tempMaxF);
      setMinT(tempMinf);
    }
  }, [metric]);

  return (
    <li className="flex flex-col justify-around items-center gap-2 w-30 h-40 bg-bg2 py-3">
      <h3 className="text-text1 text-lg font-bold">{cardDate}</h3>
      <img
        src={`/weatherapp/weather/${day.length > 5 ? day[4].weather[0].icon : day[day.length - 1].weather[0].icon}.png`}
        alt="Clear Skies"
        className="w-14"
      />
      <div className="flex gap-4">
        <p className="text-text1 font-semibold text-sm">
          {maxT.toFixed(0)}&deg;{metric ? "C" : "F"}
        </p>
        <p className="text-text2 font-semibold text-sm">
          {minT.toFixed(0)}&deg;{metric ? "C" : "F"}
        </p>
      </div>
    </li>
  );
};

export default ForecastCard;
