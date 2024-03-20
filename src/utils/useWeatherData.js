import { useState, useEffect } from 'react';
import axios from 'axios';
import { REALTIME_API_BASE_URL } from './constants';

const useWeatherData = (location, apiKey) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let debounceTimer;
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${REALTIME_API_BASE_URL}?location=${location}&apikey=${apiKey}`);
        console.log("realtime", response);
        setWeatherData(response.data);
        setLoading(false);
        setError(null);
      } catch (error) {
        setError('Failed to fetch data');
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

  return { weatherData, loading, error };
};

export default useWeatherData;
