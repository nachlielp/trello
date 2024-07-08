import { useState, useEffect, useRef, useCallback } from 'react';

// Custom hook to handle clicking outside a referenced element
export function useClickOutside(initialIsOpen) {
  const [isOpen, setIsOpen] = useState(initialIsOpen);
  const ref = useRef(null);

  const handleClickOutside = useCallback(
    function (event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    },
    [ref]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return function cleanup() {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  return [ref, isOpen, setIsOpen];
}