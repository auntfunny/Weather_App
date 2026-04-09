import { useWeather } from "../context/WeatherContext";

const HumidityCard = () => {
    const {weather} = useWeather(); 
    return (
        <div className="flex flex-col justify-between items-center  w-xs min-h-48 bg-bg2 p-3">
              <h3 className="text-text1">Humidity</h3>
              <div className="flex items-center">
                <p className="text-6xl text-text1 font-bold">{weather.main.humidity}</p>
                <p className="text-4xl text-text1 font-medium">%</p>
              </div>
              <div className="flex flex-col w-56">
                <div className="flex justify-between w-full text-text2 text-xs font-medium">
                    <p>0</p>
                    <p>50</p>
                    <p>100</p>
                </div>
                <div className="w-full h-2 bg-text1 rounded-full">
                    <div className="h-2 bg-accYellow rounded-full " style={{width: weather.main.humidity + "%"}}></div>
                </div>
                <p className="text-text2 text-sm font-medium place-self-end">%</p>
              </div>
            </div>
    );
}

export default HumidityCard;
