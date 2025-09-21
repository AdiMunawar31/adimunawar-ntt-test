import { useState, useEffect } from "react";

type SetValue<T> = (value: T | ((val: T) => T)) => void;

/**
 * Custom hook for managing localStorage with React state sync.
 *
 * @param key - localStorage key
 * @param defaultValue - initial value if nothing stored
 */
export default function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, SetValue<T>] {
  const [value, setValue] = useState<T>(() => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue === null ? defaultValue : JSON.parse(storedValue);
    } catch (error) {
      console.warn(`Error parsing localStorage key "${key}":`, error);
      return defaultValue;
    }
  });

  useEffect(() => {
    const listener = (e: StorageEvent) => {
      if (e.storageArea === localStorage && e.key === key) {
        setValue(e.newValue ? JSON.parse(e.newValue) : defaultValue);
      }
    };
    window.addEventListener("storage", listener);

    return () => {
      window.removeEventListener("storage", listener);
    };
  }, [key, defaultValue]);

  const setValueInLocalStorage: SetValue<T> = (newValue) => {
    setValue((currentValue) => {
      const result =
        newValue instanceof Function ? newValue(currentValue) : newValue;
      localStorage.setItem(key, JSON.stringify(result));
      return result;
    });
  };

  return [value, setValueInLocalStorage];
}
