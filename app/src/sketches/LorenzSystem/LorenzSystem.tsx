import { getLorenzSystemSketch } from "./LorenzSystem.sketch";
import { LorenzSystemMenu } from "./LorenzSystem.menu";
import { SketchDiv } from "components/StyledUI";
import React, { Fragment } from "react";
import { useP5 } from "hooks";

export const LorenzSystem = () => {
  const sketch = getLorenzSystemSketch();
  const { ref, p5Instance } = useP5(sketch);

  return (
    <Fragment>
      <SketchDiv ref={ref} />
      <LorenzSystemMenu p5Instance={p5Instance} />
    </Fragment>
  );
};
