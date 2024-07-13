import { useState, useEffect, useRef, useCallback } from 'react';

// Custom hook to handle clicking outside a referenced element
export function useClickOutside(initialIsOpen) {
  const [isOpen, setIsOpen] = useState(initialIsOpen);
  const ref = useRef(null);

  const handleClickOutside = useCallback(
    (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    },
    [ref]
  );

  const handleWindowBlur = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (isOpen&ref) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("blur", handleWindowBlur);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("blur", handleWindowBlur);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("blur", handleWindowBlur);
    };
  }, [isOpen, handleClickOutside, handleWindowBlur]);

  return [ref, isOpen, setIsOpen];
}
