import React, { useState, useEffect } from 'react';

const useLocalStorage = (key, initialValue = undefined) => {
  const [value, setValue] = useState(localStorage.getItem(key) || initialValue || []);
  const saveValueInStorage = newValue => {
    localStorage.setItem(key, newValue);
    setValue(newValue);
  }

  useEffect(() => {
    const value = localStorage.getItem(key);
    if(value !== null && initialValue){
      localStorage.setItem(key, newValue);
    }
  }, []);

  return [value, saveValueInStorage];
}

export default useLocalStorage;
