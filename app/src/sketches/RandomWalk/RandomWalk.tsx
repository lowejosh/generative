import { getRandomWalkSketch } from "./RandomWalk.sketch";
import { RandomWalkMenu } from "./RandomWalk.menu";
import { SketchDiv } from "components/StyledUI";
import React, { Fragment } from "react";
import { P5Defaults } from "types/p5";
import { useP5 } from "hooks";
import p5 from "p5";

export interface RandomWalkVars extends P5Defaults {
  POS_VARIANCE: number;
  COLOR_VARIANCE: number;
  ELLIPSE_radius: number;
  ELLIPSE_OPACITY: number;
  SPEED: number;
}

const initialVars: RandomWalkVars = {
  POS_VARIANCE: 20,
  COLOR_VARIANCE: 20,
  ELLIPSE_radius: 40,
  ELLIPSE_OPACITY: 80,
  SPEED: 1,
  refresh: (p: p5) => {
    p.setup();
  },
};

/**
 * Component showing an example of using live-updating p5.js initialVars controlled by react components
 */
export const RandomWalk = () => {
  const sketch = getRandomWalkSketch(initialVars);
  const { ref, p5Instance } = useP5(sketch);

  return (
    <Fragment>
      <SketchDiv ref={ref} />
      <RandomWalkMenu initialVars={initialVars} p5Instance={p5Instance} />
    </Fragment>
  );
};
