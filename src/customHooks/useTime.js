import { useState, useEffect } from 'react';

const getFormattedTime = (timestamp) => {
  const now = Date.now();
  const diff = now - timestamp;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return `${seconds} seconds ago`;
  if (minutes < 60) return `${minutes} minutes ago`;
  if (hours < 24) return `${hours} hours ago`;

  return new Date(timestamp).toLocaleString();
};

const useTime = (timestamp) => {
  const [time, setTime] = useState(() => getFormattedTime(timestamp));

  useEffect(() => {
    const updateInterval = () => {
      const now = Date.now();
      const diff = now - timestamp;

      if (diff < 60000) return 10000; // Update every 10 seconds if less than a minute ago
      if (diff < 3600000) return 60000; // Update every minute if less than an hour ago
      if (diff < 86400000) return 3600000; // Update every hour if less than a day ago

      return null; // Do not update if more than a day ago
    };

    const interval = updateInterval();
    if (interval !== null) {
      const id = setInterval(() => {
        setTime(getFormattedTime(timestamp));
      }, interval);
      return () => clearInterval(id);
    }
  }, [timestamp]);

  return time;
};

export default useTime;
