import { useState, useEffect } from 'react';
import axios from 'axios';
import { FORECAST_API_BASE_URL } from './constants';

const useWeatherForecast = (location, apiKey) => {
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let debounceTimer;
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${FORECAST_API_BASE_URL}?location=${location}&apikey=${apiKey}&timesteps=1d&startTime=now&endTime=2024-03-27`);
        setForecastData(response.data);
        setLoading(false);
        setError(null);
      } catch (error) {
        setError('Failed to fetch forecast data');
        setLoading(false);
      }
    };

    const debouncedFetchData = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(fetchData, 500);
    };

    if(location && apiKey){
      debouncedFetchData();
    }

    return () => clearTimeout(debounceTimer);
  }, [location, apiKey]);

  return { forecastData, loading, error };
};

export default useWeatherForecast;
