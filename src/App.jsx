import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Assume you have a CSS file for styling

const API_KEY = '9fd938103ec5b5fb92be500ba2c85323'; // Replace 'YOUR_API_KEY' with your actual API key
const BASE_URL = `https://api.openweathermap.org/data/2.5/weather`;

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=imperial`);
      setWeatherData(response.data);
      console.log(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching data:', error);
      setWeatherData(null);
      setError('City not found');
    }
  };

  return (
    <div className="app-container">
      <div className="weather-container">
        <h1>Weather Information</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        {error && <p className="error-message">{error}</p>}
        {weatherData && (
          <div className="weather-info">
          <div className="weather-info-box">
            <p>City: {weatherData.name}</p>
            <img
                src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
                alt="Weather Icon"
              />
          </div>
          <div className="weather-info-box">
            <p>Temperature: {weatherData.main.temp}°F</p>
            <img
                src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
                alt="Weather Icon"
              />
          </div>
          <div className="weather-info-box">
            <p>Weather: {weatherData.weather[0].description}</p>
            <img
                src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
                alt="Weather Icon"
              />
          </div>
        </div>
        )}
      </div>
    </div>
  );
}

export default App;
