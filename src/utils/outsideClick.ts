import {
  type RefObject,
  useEffect,
  type Dispatch,
  type SetStateAction,
} from "react";

/**
 * Hook that takes callback and element ref to do something when clicked outside that element
 */
export function useOutsideClickDetector(
  ref: RefObject<HTMLDivElement>,
  callback: Dispatch<SetStateAction<undefined>>
) {
  useEffect(() => {
    /**
     * Check if clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as unknown as Node)) {
        callback(undefined);
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
