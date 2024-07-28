import { useState, useEffect } from 'react';

const formatDate = (date) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
  return date.toLocaleDateString(undefined, options);
};

const getTimeString = (timestamp) => {
  const now = new Date();
  const time = new Date(timestamp);
  const diffInSeconds = Math.floor((now - time) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} ${diffInSeconds === 1 ? 'second' : 'seconds'} ago`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
  }

  return formatDate(time);
};

const useTime = (timestamp) => {
  const [timeString, setTimeString] = useState(getTimeString(timestamp));

  useEffect(() => {
    const updateInterval = () => {
      const now = new Date();
      const time = new Date(timestamp);
      const diffInSeconds = Math.floor((now - time) / 1000);

      if (diffInSeconds < 60) {
        return 10000; // Refresh every 10 seconds
      }

      const diffInMinutes = Math.floor(diffInSeconds / 60);
      if (diffInMinutes < 60) {
        return 60000; // Refresh every minute
      }

      const diffInHours = Math.floor(diffInMinutes / 60);
      if (diffInHours < 24) {
        return 3600000; // Refresh every hour
      }

      return 86400000; // Refresh every day
    };

    const interval = setInterval(() => {
      setTimeString(getTimeString(timestamp));
    }, updateInterval());

    // Clear the interval on component unmount or when timestamp changes
    return () => clearInterval(interval);
  }, [timestamp]);

  return timeString;
};

export default useTime;
