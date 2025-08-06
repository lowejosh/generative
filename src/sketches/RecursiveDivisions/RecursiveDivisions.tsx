import React, { Fragment } from "react";
import { useP5 } from "hooks";

import { SketchDiv } from "components/generic";

import { getRecursiveDivisionsSketch } from "./RecursiveDivisions.sketch";
import { RecursiveDivisionsMenu } from "./RecursiveDivisions.menu";

export const RecursiveDivisions = () => {
  const sketch = getRecursiveDivisionsSketch();
  const { ref, p5Instance } = useP5(sketch);

  return (
    <Fragment>
      <SketchDiv ref={ref} />
      <RecursiveDivisionsMenu p5Instance={p5Instance} />
    </Fragment>
  );
};
