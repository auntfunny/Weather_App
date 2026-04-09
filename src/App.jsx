import Today from "./components/Today";
import WeatherDetails from "./components/WeatherDetails";
import { WeatherProvider } from "./context/WeatherContext";

function App() {
  return (
    <div className="flex flex-col lg:flex-row font-raleway">
      <WeatherProvider>
        <Today />
        <WeatherDetails />
      </WeatherProvider>
    </div>
  );
}

export default App;
