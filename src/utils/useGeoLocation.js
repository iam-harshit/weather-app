import { useState, useEffect } from 'react';

const useGeoLocation = () => {
  const [coordinates, setCoordinates] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const successHandler = (position) => {
      setCoordinates({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    };

    const errorHandler = (error) => {
      setError('Failed to retrieve location');
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
    } else {
      setError('Geolocation is not supported');
    }
  }, []);

  return { coordinates, error };
};

export default useGeoLocation;
