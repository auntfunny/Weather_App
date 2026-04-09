import navegation from "../assets/navigation.svg";
import { useWeather } from "../context/WeatherContext";

const WindCard = () => {
  const { weather, metric } = useWeather();
  const deg = weather.wind.deg;
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]
  const index = (deg/45).toFixed(0) % 8
  const windDirection = directions[index];


  return (
    <div className="flex flex-col justify-between items-center  w-xs min-h-48 bg-bg2 p-3">
      <h3 className="text-text1">Wind Status</h3>
      <div className="flex items-center">
        <p className="text-6xl text-text1 font-bold">{metric ? weather.wind.speed : (weather.wind.speed * 2.237).toFixed(2)}</p>
        <p className="text-4xl text-text1 font-medium">{metric ? "ms" : "mph"}</p>
      </div>
      <div className="flex justify-between items-center w-20">
        <div className="flex items-center justify-center bg-button1 w-10 h-10 rounded-full">
          <img
            src={navegation}
            alt={`degrees`}
            className="size-6"
            style={{ rotate: deg + "deg" }}
          />
        </div>
        <p className="text-text1">{windDirection}</p>
      </div>
    </div>
  );
};

export default WindCard;
