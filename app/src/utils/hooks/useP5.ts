import { SketchInstance } from "utils/types/p5";
import { useRef, useEffect } from "react";
import p5 from "p5";

export const useP5 = (sketch: SketchInstance) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const p5Instance = new p5(sketch, ref.current || undefined);

    return () => {
      p5Instance.remove();
    };
  }, [sketch]);

  return ref;
};
