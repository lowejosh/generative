import { SketchInstance } from "utils/types/p5";
import { useRef, useEffect, useState } from "react";
import p5 from "p5";

export const useP5 = (sketch: SketchInstance) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [p5Instance, setP5Instance] = useState<p5 | null>(null);

  useEffect(() => {
    if (!p5Instance) {
      setP5Instance(new p5(sketch, ref.current || undefined));
    }

    return () => {
      p5Instance && p5Instance.remove();
    };
  }, [sketch, p5Instance]);

  return { ref, p5Instance };
};
