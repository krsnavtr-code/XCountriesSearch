import React, { useState, useEffect } from "react";
import style from "./CountryFlagSearch.module.css";

const CountryFlagSearch = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) {
          throw new Error("Failed to fetch countries");
        }
        const data = await response.json();
        setCountries(data);
        setFilteredCountries(data);
      } catch (error) {
        setError(error.message);
        console.error(error);
      }
    };
    fetchCountries();
  }, []);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  return (
    <div>
      {error && <p>Error: {error}</p>}
      <div className={style.searchInput}>
        <input
          type="text"
          placeholder="Search for countries..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className={style.container}>
        {filteredCountries.map((country) => (
          <div
            key={country.name.common}
            className={`${style.card} countryCard`}
          >
            <img
              src={country.flags.png}
              alt={country.flags.alt}
              className={style.flag}
            />
            <h4>{country.name.common}</h4>
          </div>
        ))}
        {filteredCountries.length === 0 && (
          <p>No countries found matching the search term.</p>
        )}
      </div>
    </div>
  );
};

export default CountryFlagSearch;
