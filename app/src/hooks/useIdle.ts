import { useState, useRef, useEffect, useCallback } from "react";

export const useIdle = (msToIdle: number) => {
  const [isIdle, setIsIdle] = useState(true);
  const timeout = useRef<any>();

  // set idle timeout on mouse move
  const handleMouseMove = useCallback(() => {
    if (timeout) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => {
      setIsIdle(true);
    }, msToIdle);

    if (isIdle) {
      setIsIdle(false);
    }
  }, [isIdle, msToIdle]);

  // handle / cleanup listeners
  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      clearTimeout(timeout.current);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isIdle, msToIdle, handleMouseMove]);

  return isIdle;
};
