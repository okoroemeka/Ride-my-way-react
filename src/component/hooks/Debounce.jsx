import React, { useEffect, useState } from 'react';

// got this Idea from Dev.to
const Debounce = (value, delay) => {
  // state and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    // set debounced value passed in after some specific delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value]);
  return debouncedValue;
};

export default Debounce;
