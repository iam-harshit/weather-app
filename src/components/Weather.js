import React from 'react';

const Weather = ({ weatherData }) => {
    console.log(weatherData);
  return (
    <div>
      <h2>Current Weather</h2>
      <p>Temperature: {weatherData.data.values.temperature}</p>
      <p>Weather: {weatherData.data.values.weatherCode}</p>
    </div>
  );
};

export default Weather;
