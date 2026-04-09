import arrow from "../assets/arrow.svg"
import { useWeather } from "../context/WeatherContext";

const SearchResultCard = ({city, setToggleSearch}) => {
    const {searchCity} = useWeather();

    const handleClick = () => {
        searchCity(city);
        setToggleSearch(false);
    }

    return (
        <button onClick={handleClick} type="button" className="group flex justify-between items-center w-full p-4 text-text1 text-lg text-start font-semibold hover:cursor-pointer hover:pl-5 hover:inset-ring-1 hover:inset-ring-text2">
            {city.name}, {city.country_code}
            <img src={arrow} alt="Arrow Icon" className="size-6 opacity-0 group-hover:opacity-100" />
        </button>
    );
}

export default SearchResultCard;
