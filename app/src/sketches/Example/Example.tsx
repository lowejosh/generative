import { getExampleSketch, ExampleConstants } from "./Example.sketch";
import { Sketch } from "components/Sketch";
import React, { useMemo } from "react";
import { useIdle } from "utils/hooks/useIdle";

export const Example = () => {
  const constants: ExampleConstants = useMemo(
    () => ({
      POS_VARIANCE: 50,
      COLOR_VARIANCE: 20,
      ELLIPSE_RADIUS: 20,
      ELLIPSE_OPACITY: 20,
    }),
    []
  );

  const sketch = useMemo(
    () => <Sketch sketch={getExampleSketch(constants)} />,
    [constants]
  );

  const isIdle = useIdle(2000);
  console.log(isIdle);

  return sketch;
};
