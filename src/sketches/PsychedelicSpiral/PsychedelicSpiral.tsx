import React, { Fragment } from "react";
import { useP5 } from "hooks";

import { SketchDiv } from "components/generic";

import { getPsychedelicSpiralSketch } from "./PsychedelicSpiral.sketch";
import { PsychedelicSpiralMenu } from "./PsychedelicSpiral.menu";

export const PsychedelicSpiral = () => {
  const sketch = getPsychedelicSpiralSketch();
  const { ref, p5Instance } = useP5(sketch);

  return (
    <Fragment>
      <SketchDiv ref={ref} />
      <PsychedelicSpiralMenu p5Instance={p5Instance} />
    </Fragment>
  );
};
