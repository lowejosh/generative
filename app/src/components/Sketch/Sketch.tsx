import { SketchInstance } from "types/p5";
import { useP5 } from "hooks";
import React from "react";
import { SketchDiv } from "components/StyledUI";

type Props = {
  sketch: SketchInstance;
};

/**
 * For displaying sketches with no live-updating variables
 */
export const Sketch = ({ sketch }: Props) => {
  const { ref } = useP5(sketch);
  return <SketchDiv ref={ref} />;
};
