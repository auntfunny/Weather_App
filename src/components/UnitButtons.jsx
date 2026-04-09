import { useWeather } from "../context/WeatherContext";

const UnitButtons = () => {
  const { metric, setMetric } = useWeather();

  return (
    <div className="flex justify-end items-end gap-4 w-full h-24 pr-10">
      <button
        type="button"
        onClick={() => setMetric(true)}
        className={`w-10 h-10 text-xl rounded-full font-bold ${metric ? "bg-text1 text-bg1" : "bg-button3 text-text1 hover:cursor-pointer hover:bg-button1"}`}
      >
        &deg;C
      </button>
      <button
        type="button"
        onClick={() => setMetric(false)}
        className={`w-10 h-10 text-xl rounded-full font-bold ${metric ? "bg-button3 text-text1 hover:cursor-pointer hover:bg-button1" : "bg-text1 text-bg1 "}`}
      >
        &deg;F
      </button>
    </div>
  );
};

export default UnitButtons;
