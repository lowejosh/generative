import React, { Fragment } from "react";
import { useP5 } from "hooks";

import { SketchDiv } from "components/generic";

import { getDriftSketch } from "./Drift.sketch";
import { DriftMenu } from "./Drift.menu";

export const Drift = () => {
  const sketch = getDriftSketch();
  const { ref, p5Instance } = useP5(sketch);

  return (
    <Fragment>
      <SketchDiv ref={ref} />
      <DriftMenu p5Instance={p5Instance} />
    </Fragment>
  );
};
