import { useState, useRef, useEffect } from "react";

export const useIdle = (msToIdle: number) => {
  const [isIdle, setIsIdle] = useState(true);
  const timeout = useRef<any>();

  useEffect(() => {
    document.addEventListener("mousemove", () => {
      if (timeout) {
        clearTimeout(timeout.current);
      }
      timeout.current = setTimeout(() => {
        setIsIdle(true);
      }, msToIdle);

      if (isIdle) {
        setIsIdle(false);
      }
    });
  }, [isIdle, msToIdle]);

  return isIdle;
};
