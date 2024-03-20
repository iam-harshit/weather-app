import React, { useState } from 'react';
import useWeatherData from './utils/useWeatherData';
import useWeatherForecast from './utils/useWeatherForecast';
import Weather from './components/Weather';
import ForecastWeather from './components/ForecastWeather';
import useGeoLocation from './utils/useGeoLocation';
import {API_KEY} from './utils/constants';

const App = () => {
  const [location, setLocation] = useState('');
  const { coordinates, error: geoError } = useGeoLocation();
  const { weatherData, loading: weatherLoading, error: weatherError } = useWeatherData(location || coordinates, API_KEY);
  const { forecastData, loading: forecastLoading, error: forecastError } = useWeatherForecast(location || coordinates, API_KEY);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Fetch data
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={location} onChange={handleLocationChange} />
        <button type="submit">Search</button>
      </form>

      {(weatherLoading || forecastLoading) && <div>Loading...</div>}
      {(weatherError || forecastError || geoError) && <div>Error: {weatherError || forecastError || geoError}</div>}

      {weatherData && <Weather weatherData={weatherData} />}
      {/* {forecastData && <ForecastWeather forecastData={forecastData} />} */}
    </div>
  );
};

export default App;
