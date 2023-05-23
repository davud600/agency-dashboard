import { RefObject, useEffect } from "react";

/**
 * Hook that takes callback and element ref to do something when clicked outside that element
 */
export function useOutsideClickDetector(
  ref: RefObject<HTMLDivElement>,
  callback: Function
) {
  useEffect(() => {
    /**
     * Check if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}
