import { SketchInstance } from "utils/types/p5";
import { useP5 } from "utils/hooks/useP5";
import React from "react";

type Props = {
  sketch: SketchInstance;
};

export const Sketch = ({ sketch }: Props) => {
  const ref = useP5(sketch);
  return <div ref={ref} />;
};
