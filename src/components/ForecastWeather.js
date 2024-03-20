import React from 'react';

const ForecastWeather = ({ forecastData }) => {
    console.log("Forecast", forecastData)
  return (
    <div>
      <h2>Forecast Weather</h2>
      {forecastData.data.timelines[0].intervals.map((interval, index) => (
        <div key={index}>
          <p>Date: {interval.startTime}</p>
          <p>Temperature: {interval.values.temperature}</p>
          <p>Weather: {interval.values.weatherCode}</p>
        </div>
      ))}
    </div>
  );
};

export default ForecastWeather;
