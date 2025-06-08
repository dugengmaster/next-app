import { useState, useCallback } from 'react';

interface useControllableStateProps<T> {
  defaultValue: T;
  value?: T;
  onChange?: (value: T) => void;
}

export const useControllableState = <T>({ 
  defaultValue, 
  value, 
  onChange 
}: useControllableStateProps<T>) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const setValue = useCallback((newValue: T) => {
    if (isControlled) {
      onChange?.(newValue);
    } else {
      setInternalValue(newValue);
      onChange?.(newValue);
    }
  }, [isControlled, onChange]);

  return [currentValue, setValue] as const;
};