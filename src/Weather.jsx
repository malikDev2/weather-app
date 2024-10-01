import React, { useState } from 'react';

function Weather() {
    /* Access weather API */
    const apiKey = "66256e01603d6f52ae9f9d83da4440cd";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

    /* Create  mutatable variables using useState */
    const [location, setLocation] = useState("");
    const [place, setPlace] = useState("");
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(false); 

    /* Set location from search bar */ 
    function handleInputChange(event) {
        setLocation(event.target.value);
    }

    /* Retrieve data from weather API */
    async function checkWeather(city) {
        try {
            const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=imperial`);
            const data = await response.json();
            if (data.cod === 200) {
                setWeather(data);
                setError(false); 
            } else {
                setWeather(null); 
                setError(true); 
            }
        } catch (error) {
            console.error("Error fetching weather data:", error);
            setWeather(null); 
            setError(true); 
        }
    }

    /* Capitalize every letter of location */
    function Search() {
        if (location.trim()) {
            const formattedLocation = location
                .split(" ")
                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join(" ");
            setPlace(formattedLocation);
            checkWeather(formattedLocation); 
            setLocation("");
        }
    }

    /* Add functionality to 'Enter' button */
    function checkEnter(event) {
        if (event.key === "Enter") {
            Search();
        }
    }

    /* Format time for sunrise and sunset */
    function formatTime(timestamp) {
        const date = new Date(timestamp * 1000); 
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    /* Capitalize first letter of weather condition */
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <div className="weather-container">
            <div className="top">
                <input
                    type="text"
                    className="search-bar"
                    placeholder="Enter Location"
                    value={location}
                    onChange={handleInputChange}
                    onKeyDown={checkEnter}
                />
                <button className="search" onClick={Search}>🔍</button>
            </div>
            <div className="content">
                <p>{place}, {weather ? weather.sys.country : ''}</p>
                {/* Render different screens for invalid input, valid input, and awaiting input */}
                {error ? (
                    <p>Location not found</p>
                ) : weather ? (
                    <>
                        <h2 className ="the-temperature">{Math.round(weather.main.temp)}°F</h2>
                        <p>{capitalizeFirstLetter(weather.weather[0].description)}</p>
                        <div className="temperatures">
                            <p>H: {Math.round(weather.main.temp_max)}°F</p>
                            <p>L: {Math.round(weather.main.temp_min)}°F</p>
                            <p>Feels like: {Math.round(weather.main.feels_like)}°F</p>
                            <p>Sunrise: {weather.sys.sunrise ? formatTime(weather.sys.sunrise) : 'N/A'}</p>
                            <p>Sunset: {weather.sys.sunset ? formatTime(weather.sys.sunset) : 'N/A'}</p>
                        </div>
                    </>
                ) : (
                    <p>Loading weather...</p>
                )}
            </div>
        </div>
    );
}

export default Weather;
