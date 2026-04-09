import { useState } from "react";
import search from "../assets/search.svg";
import cities from "../data/cities.json";
import SearchResultCard from "./SearchResultCard";

const Search = ({ setToggleSearch }) => {
  const [citySearch, setCitySearch] = useState("");
  const [cityList, setCityList] = useState([]);

  const handleInput = (event) => {
    setCitySearch(event.target.value);
  };
  const handleSumbit = (event) => {
    event.preventDefault();
    let searchCities = cities.filter(
      (city) => {
        const searching = citySearch.trim().toLowerCase();
        const current = `${city.name} ${city.country}`.toLowerCase();
        let found = false;

        if (current.includes(searching)) {
          found = true;
        }

        const words = searching.split(" ").filter(Boolean);
        if(words.every(word => current.includes(word))){
          found = true;
        }

        return found;
      },
    );
    setCityList([...searchCities]);
  };
  

  return (
    <div className="absolute flex flex-col z-30 p-8 pt-18 items-center bg-bg2 w-full h-screen md:h-96 md:pb-5 lg:h-screen lg:w-sm">
      <form className="relative flex gap-6" onSubmit={handleSumbit}>
        <input
          onChange={handleInput}
          type="text"
          value={citySearch}
          name="citySearch"
          id="citySearch"
          placeholder="search location"
          className="w-60 p-1 pl-10 border border-white text-text1 placeholder-text2"
        />
        <button
          type="submit"
          className="py-1.5 w-20 font-semibold bg-accBlue text-text1 hover:text-accYellow hover:cursor-pointer"
        >
          Search
        </button>
        <img
          src={search}
          alt="Search Icon"
          className="absolute top-1.5 left-1.5 size-6"
        />
      </form>
      <button
        onClick={() => setToggleSearch(false)}
        type="button"
        className="absolute top-8 right-8 text-text1 hover:text-red-500 hover:cursor-pointer active:scale-110"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>
      <nav className="grid grid-cols-1 overflow-y-auto md:grid-cols-2 lg:grid-cols-1 gap-4 w-xs md:w-2xl lg:w-full p-8">
        {cityList.map((city) => (
          <SearchResultCard
            city={city}
            setToggleSearch={setToggleSearch}
            key={city.id}
          />
        ))}
      </nav>
    </div>
  );
};

export default Search;
