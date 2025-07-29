import { getRandomWalkSketch } from "./RandomWalk.sketch";
import { RandomWalkMenu } from "./RandomWalk.menu";
import { SketchDiv } from "components/generic";
import React, { Fragment } from "react";
import { useP5 } from "hooks";

/**
 * Component showing an example of using live-updating p5.js initialVars controlled by react components
 */
export const RandomWalk = () => {
  const sketch = getRandomWalkSketch();
  const { ref, p5Instance } = useP5(sketch);

  return (
    <Fragment>
      <SketchDiv ref={ref} />
      <RandomWalkMenu p5Instance={p5Instance} />
    </Fragment>
  );
};
